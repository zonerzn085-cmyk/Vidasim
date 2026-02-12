
import React, { createContext, useContext, useState, useCallback } from 'react';

export type PanelName = 
    | 'none' 
    | 'relationships' 
    | 'neighborhood' 
    | 'map' 
    | 'phone' 
    | 'planner' 
    | 'company_management' 
    | 'company_registry' 
    | 'chatbot' 
    | 'stats' 
    | 'job_search' 
    | 'education' 
    | 'shopping' 
    | 'investments' 
    | 'image_studio' 
    | 'memories';

export type ModalName = 
    | 'none' 
    | 'npc_interaction' 
    | 'npc_profile' 
    | 'npc_chat';

interface UIContextType {
    activePanel: PanelName;
    openPanel: (panel: PanelName) => void;
    closePanel: () => void;
    
    activeModal: ModalName;
    modalData: any;
    openModal: (modal: ModalName, data?: any) => void;
    closeModal: () => void;

    actionFeedback: { icon: React.ReactNode, text: string } | null;
    showFeedback: (icon: React.ReactNode, text: string) => void;

    isSummaryMode: boolean;
    toggleSummaryMode: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children?: React.ReactNode }) {
    const [activePanel, setActivePanel] = useState<PanelName>('none');
    const [activeModal, setActiveModal] = useState<ModalName>('none');
    const [modalData, setModalData] = useState<any>(null);
    const [actionFeedback, setActionFeedback] = useState<{ icon: React.ReactNode, text: string } | null>(null);
    const [isSummaryMode, setIsSummaryMode] = useState(false);

    const openPanel = useCallback((panel: PanelName) => {
        setActivePanel(panel);
        setActiveModal('none');
        setModalData(null);
    }, []);

    const closePanel = useCallback(() => {
        setActivePanel('none');
    }, []);

    const openModal = useCallback((modal: ModalName, data?: any) => {
        setActiveModal(modal);
        setModalData(data);
    }, []);

    const closeModal = useCallback(() => {
        setActiveModal('none');
        setModalData(null);
    }, []);

    const showFeedback = useCallback((icon: React.ReactNode, text: string) => {
        setActionFeedback({ icon, text });
        setTimeout(() => setActionFeedback(null), 3000);
    }, []);

    const toggleSummaryMode = useCallback(() => {
        setIsSummaryMode(prev => !prev);
    }, []);

    return (
        <UIContext.Provider value={{
            activePanel,
            openPanel,
            closePanel,
            activeModal,
            modalData,
            openModal,
            closeModal,
            actionFeedback,
            showFeedback,
            isSummaryMode,
            toggleSummaryMode
        }}>
            {children}
        </UIContext.Provider>
    );
}

export function useUI() {
    const context = useContext(UIContext);
    if (!context) throw new Error("useUI must be used within a UIProvider");
    return context;
}
