
// Utility functions for VidaSim

export function formatMoney(amount: number, currency: string = 'BRL'): string {
    try {
        return new Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: currency 
        }).format(amount);
    } catch (e) {
        // Fallback for invalid currency codes
        return `${currency} ${amount.toFixed(2)}`;
    }
}
