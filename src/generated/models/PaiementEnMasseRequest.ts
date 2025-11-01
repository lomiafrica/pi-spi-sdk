/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RefDocType } from './RefDocType';
export type PaiementEnMasseRequest = {
    /**
     * Identifiant du paiement en masse dans le SI du client
     */
    instructionId: string;
    /**
     * L'alias du compte du client business qui sera débité pour le paiement.
     *
     */
    payeurAlias: string;
    /**
     * Indique si une confirmation du business est requise avant d'exécuter les paiements.
     *
     * - `true` : Le PSP effectue la recherche d'alias pour tous les bénéficiaires, retourne leurs noms et pays, et attend la confirmation du business avant d'exécuter les paiements.
     * - `false` : Le PSP exécute directement les paiements sans attendre de confirmation.
     *
     * **Note :** Si `true`, le business doit confirmer via `PUT /paiements-groupes/{instructionId}/confirmations` dans un délai adaptatif (24h, 48h ou 72h selon le nombre de transactions).
     *
     */
    confirmation?: boolean;
    /**
     * Le motif commun à tous les paiements du groupe.
     * Si tous les paiements du groupe ont le même motif, ce champ peut être utilisé pour optimiser la taille du lot.
     * Dans le cas contraire, chaque transaction doit avoir son propre motif.
     *
     */
    motif?: string;
    transactions: Array<{
        /**
         * Identifiant de la transaction dans le SI du client
         */
        txId: string;
        /**
         * L'alias du client payé, bénéficiaire de l'ordre de paiement
         */
        payeAlias: string;
        /**
         * Le montant du transfert de fonds à effectuer
         */
        montant: number;
        /**
         * Le motif du paiement.
         * Si tous les paiements du groupe ont le même motif, ce champ doit être omis, et le motif du groupe doit être utilisé.
         *
         */
        motif?: string;
        /**
         * Le numéro / la référence du document justificatif
         */
        refDocNumero?: string;
        refDocType?: RefDocType;
    }>;
};

