
import { SaveData, PlayerStats, Neighborhood, Business } from '../types';
import C from '../constants';
import { baseCityStructure } from '../data/cityData';

/**
 * Sanitizes the player stats object to ensure it conforms to the current structure.
 * This acts as a "self-healing" mechanism for save files, fixing missing keys,
 * null arrays, or corrupted data types regardless of the save version.
 */
function sanitizePlayerStats(stats: PlayerStats): PlayerStats {
    // 1. Merge with initial stats to ensure all top-level keys exist.
    // We spread stats second so that existing player data overrides defaults.
    const merged = { ...C.INITIAL_PLAYER_STATS, ...stats };

    // 2. Ensure critical arrays are actually arrays (fix null/undefined issues from AI)
    merged.city = Array.isArray(merged.city) ? merged.city : [];
    merged.relationships = Array.isArray(merged.relationships) ? merged.relationships : [];
    merged.properties = Array.isArray(merged.properties) ? merged.properties : [];
    merged.tasks = Array.isArray(merged.tasks) ? merged.tasks : [];
    merged.hobbies = Array.isArray(merged.hobbies) ? merged.hobbies : [];
    merged.memories = Array.isArray(merged.memories) ? merged.memories : [];
    merged.investments = Array.isArray(merged.investments) ? merged.investments : [];

    // 3. Ensure Numeric values are valid numbers (fix NaN) and Clamp 0-100 stats
    const clampedKeys: (keyof PlayerStats)[] = ['health', 'happiness', 'intelligence', 'appearance', 'stress', 'notoriety', 'criminality'];
    clampedKeys.forEach(key => {
        // @ts-ignore
        let val = merged[key];
        if (typeof val !== 'number' || isNaN(val)) val = C.INITIAL_PLAYER_STATS[key];
        // @ts-ignore
        merged[key] = Math.max(0, Math.min(100, val));
    });

    // Ensure strictly positive/valid numbers for non-clamped fields
    if (typeof merged.age !== 'number') merged.age = 0;
    if (typeof merged.year !== 'number') merged.year = 2024;
    if (typeof merged.money !== 'number') merged.money = 0; // Money can be negative (debt), so we don't clamp to 0

    // 4. Deep sanitization for Business (if exists)
    if (merged.business) {
        const b = merged.business as Business;
        if (!Array.isArray(b.executives)) b.executives = [];
        if (!Array.isArray(b.subsidiaries)) b.subsidiaries = [];
        if (!Array.isArray(b.enterprises)) b.enterprises = [];
        if (!Array.isArray(b.gameProjects)) b.gameProjects = [];
        if (!Array.isArray(b.technologies)) b.technologies = [];
        
        // Ensure critical business numbers are numbers
        if (typeof b.value !== 'number' || isNaN(b.value)) b.value = 0;
        if (typeof b.annualRevenue !== 'number' || isNaN(b.annualRevenue)) b.annualRevenue = 0;
        
        // Sanitize morale
        if (typeof b.morale !== 'number') b.morale = 50;
        b.morale = Math.max(0, Math.min(100, b.morale));
    }

    // 5. Deep sanitization for Neighborhoods
    const sanitizeNeighborhood = (n: any): Neighborhood => {
        // Handle non-object neighborhood (e.g. string from old save or corrupted data)
        if (!n || typeof n !== 'object') {
             const name = typeof n === 'string' ? n : "Bairro Desconhecido";
             return {
                id: `recovered_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                name: name,
                description: "Área recuperada de dados antigos.",
                safety: 50,
                wealthLevel: 'Média',
                position: { x: 0, y: 0 },
                buildings: [],
                notableNPCs: [],
                propertiesForSale: [],
                localJobs: [],
                shopItems: [],
                currentEvent: null,
            };
        }

        // It is an object, ensure arrays exist
        if (!Array.isArray(n.buildings)) n.buildings = [];
        if (!Array.isArray(n.notableNPCs)) n.notableNPCs = [];
        if (!Array.isArray(n.propertiesForSale)) n.propertiesForSale = [];
        if (!Array.isArray(n.localJobs)) n.localJobs = [];
        if (!Array.isArray(n.shopItems)) n.shopItems = [];
        
        return n as Neighborhood;
    };

    if (merged.currentNeighborhood) {
        merged.currentNeighborhood = sanitizeNeighborhood(merged.currentNeighborhood);
    }
    // Filter out nulls/undefineds just in case before mapping
    merged.city = (merged.city || []).map(sanitizeNeighborhood);

    return merged;
}

/**
 * Migrates a save data object to the latest version.
 * This function checks the version of the save data and applies necessary updates
 * to make it compatible with the current game version, preventing data loss
 * after application updates.
 * @param {SaveData} saveData The save data object to migrate.
 * @returns {SaveData} The migrated and up-to-date save data object.
 */
export function migrate(saveData: SaveData): SaveData {
  let currentSave = { ...saveData };
  let playerStats = { ...currentSave.playerStats };

  // If there's no version, it's a pre-versioning save (let's call it v1).
  const version = currentSave.version || 1;

  if (version < C.CURRENT_SAVE_VERSION) {
      // --- Version Specific Logic (Historical) ---
      
      if (version < 10) {
          if (playerStats.business) { 
              if (playerStats.business.type !== 'Legal') {
                  if (!('enterprises' in playerStats.business)) {
                      playerStats.business.enterprises = [];
                  }
              } else {
                  const business = playerStats.business as any;
                  if (!business.industry) business.industry = 'Jogos';
                  if (typeof business.quality === 'undefined') business.quality = 20;
                  if (typeof business.marketing === 'undefined') business.marketing = 10;
                  if (typeof business.staffCount === 'undefined') business.staffCount = 1;
      
                  if (business.incomePerYear && typeof business.annualRevenue === 'undefined') {
                      business.annualRevenue = business.incomePerYear;
                      business.annualExpenses = business.incomePerYear * 0.8; 
                      delete business.incomePerYear;
                  } else if (typeof business.annualRevenue === 'undefined') {
                      business.annualRevenue = 0;
                      business.annualExpenses = 0;
                  }
              }
          }
      }
      
      if (version < 4) {
          if (!('properties' in playerStats)) {
              // @ts-ignore
              playerStats.properties = [];
          }
          if (playerStats.currentNeighborhood && !('propertiesForSale' in playerStats.currentNeighborhood)) {
              // @ts-ignore
              playerStats.currentNeighborhood.propertiesForSale = [];
          }
      }

      if (version < 5 && playerStats.currentNeighborhood?.currentEvent && !('durationInYears' in playerStats.currentNeighborhood.currentEvent)) {
          // @ts-ignore
          playerStats.currentNeighborhood.currentEvent.durationInYears = 1;
      }
      
      if (version < 6) {
          if (!('day' in playerStats)) {
              // @ts-ignore
              playerStats.day = 1;
              // @ts-ignore
              playerStats.month = 1;
              // @ts-ignore
              playerStats.year = 2024 + playerStats.age;
              // @ts-ignore
              playerStats.birthDay = 1;
              // @ts-ignore
              playerStats.birthMonth = 1;
          }
      }
      
      if (version < 7) {
          if (!('tasks' in playerStats)) {
              // @ts-ignore
              playerStats.tasks = [];
          }
      }

      if (version < 8) {
          if (playerStats.relationships) {
              playerStats.relationships.forEach(rel => {
                  if (typeof rel.mentorshipDetails === 'undefined') {
                      rel.mentorshipDetails = null;
                  }
              });
          }
          if (playerStats.currentNeighborhood?.notableNPCs) {
              playerStats.currentNeighborhood.notableNPCs.forEach(npc => {
                  if (typeof npc.isPotentialMentor === 'undefined') {
                      npc.isPotentialMentor = false;
                  }
                  if (typeof npc.mentorArea === 'undefined') {
                      npc.mentorArea = undefined;
                  }
              });
          }
      }
      
      if (version < 9) {
          const addPersonality = (npc: any) => {
              if (!npc.personalityTraits) npc.personalityTraits = [];
              if (!npc.motivations) npc.motivations = [];
              if (!npc.background) npc.background = 'Nenhum histórico conhecido.';
              if (!npc.quirks) npc.quirks = [];
              return npc;
          };

          if (playerStats.relationships) {
              playerStats.relationships = playerStats.relationships.map(addPersonality);
          }
          if (playerStats.currentNeighborhood?.notableNPCs) {
              playerStats.currentNeighborhood.notableNPCs = playerStats.currentNeighborhood.notableNPCs.map(addPersonality);
          }
      }
      
      if (version < 11) {
          // @ts-ignore
          if (!playerStats.city || playerStats.city.length === 0) {
              // @ts-ignore
              playerStats.city = baseCityStructure.map((n, index) => ({
                  id: `migrated_neighborhood_${index}_${Date.now()}`,
                  name: n.name,
                  description: "Este bairro foi restaurado a partir de dados antigos. A vida aqui continua, com novas histórias a serem descobertas.",
                  safety: n.safety,
                  wealthLevel: n.wealthLevel,
                  position: n.position,
                  buildings: [],
                  notableNPCs: [],
                  propertiesForSale: [],
                  localJobs: [],
                  currentEvent: null,
              }));
          } else {
              // @ts-ignore
              playerStats.city.forEach(n => {
                  if (typeof n === 'object' && n !== null && !n.position) {
                      const base = baseCityStructure.find(b => b.name === n.name);
                      n.position = base ? base.position : { x: 2, y: 2 }; 
                  }
              });
          }

          if (playerStats.currentNeighborhood && typeof playerStats.currentNeighborhood === 'object' && !playerStats.currentNeighborhood.position) {
              const base = baseCityStructure.find(b => b.name === playerStats.currentNeighborhood?.name);
              // @ts-ignore
              playerStats.currentNeighborhood.position = base ? base.position : { x: 2, y: 2 };
          }
      }

      if (version < 12) {
          // @ts-ignore
          if (!playerStats.currentWeather) {
            // @ts-ignore
              playerStats.currentWeather = 'Ensolarado';
          }
      }
      
      if (version < 13) {
            if (playerStats.relationships) {
                playerStats.relationships.forEach(rel => {
                    if (typeof rel.competencies === 'undefined') {
                        rel.competencies = {};
                    }
                });
            }
            if (playerStats.business) {
                if (typeof (playerStats.business as any).subsidiaries === 'undefined' || (playerStats.business as any).subsidiaries === null) {
                    (playerStats.business as any).subsidiaries = [];
                }
                 if (typeof (playerStats.business as any).enterprises === 'undefined' || (playerStats.business as any).enterprises === null) {
                    (playerStats.business as any).enterprises = [];
                }
            }
             if (playerStats.currentNeighborhood?.notableNPCs) {
              playerStats.currentNeighborhood.notableNPCs.forEach(npc => {
                if (typeof (npc as any).competencies === 'undefined') {
                    (npc as any).competencies = {};
                }
              });
            }
        }
      
      if (version < 14) {
          if (playerStats.business) {
              if (typeof (playerStats.business as any).gameProjects === 'undefined') {
                  (playerStats.business as any).gameProjects = [];
              }
              if (typeof (playerStats.business as any).technologies === 'undefined') {
                  (playerStats.business as any).technologies = [];
              }
          }
      }

      if (version < 15) {
          if (playerStats.business && playerStats.business.type === 'Legal') {
              if (typeof playerStats.business.customerCount === 'undefined') {
                  const defaultPrice = playerStats.business.monthlySubscriptionPrice || 50;
                  playerStats.business.monthlySubscriptionPrice = defaultPrice;
                  const monthlyRevenue = playerStats.business.annualRevenue / 12;
                  playerStats.business.customerCount = monthlyRevenue > 0 && defaultPrice > 0 ? Math.floor(monthlyRevenue / defaultPrice) : 10;
              }
          }
      }
      
      if (version < 16) {
        if (playerStats.relationships) {
            playerStats.relationships.forEach(rel => {
                if (!('portraitBase64' in rel)) {
                    (rel as any).portraitBase64 = undefined;
                }
            });
        }
        const addPortraitToNpc = (npc: any) => {
            if (!('portraitBase64' in npc)) {
                npc.portraitBase64 = undefined;
            }
            return npc;
        };
        if (playerStats.city) {
            playerStats.city.forEach(n => {
                if (typeof n === 'object' && n && n.notableNPCs) {
                    n.notableNPCs = n.notableNPCs.map(addPortraitToNpc);
                }
            });
        }
        if (playerStats.currentNeighborhood && typeof playerStats.currentNeighborhood === 'object' && playerStats.currentNeighborhood.notableNPCs) {
            playerStats.currentNeighborhood.notableNPCs = playerStats.currentNeighborhood.notableNPCs.map(addPortraitToNpc);
        }
      }

      if (version < 17) {
        if (!('playerProfile' in playerStats)) {
          // @ts-ignore
          playerStats.playerProfile = null;
        }
      }

      if (playerStats.business && playerStats.business.type === 'Legal') {
        playerStats.business.industry = 'Jogos';
      }
  }

  // --- Final Step: Universal Integrity Check ---
  // This runs for ALL saves, even if the version matches, to fix corruption
  // or missing fields from manual edits/AI glitches.
  currentSave.playerStats = sanitizePlayerStats(playerStats);
  
  // Update the version number to the latest version after migration.
  currentSave.version = C.CURRENT_SAVE_VERSION;

  return currentSave;
}
