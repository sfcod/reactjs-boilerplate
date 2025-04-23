/**
 * Voter interface
 */
export interface Voter {
    /**
     * Check action using subject
     *
     * @param action
     * @param subject
     */
    vote(action: string, subject: any): boolean;

    /**
     * Check if voter supports action and subject
     *
     * @param action
     * @param subject
     */
    supports(action: string, subject: any): boolean;
}
