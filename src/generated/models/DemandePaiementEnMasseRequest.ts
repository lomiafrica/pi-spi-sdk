/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RefDocType } from './RefDocType';
export type DemandePaiementEnMasseRequest = {
    /**
     * L'alias de compte dans lequel le client souhaite recevoir les paiements
     *
     */
    payeAlias: string;
    /**
     * Indique si une confirmation du business est requise avant d'envoyer les demandes de paiement.
     *
     * - `true` : Le PSP effectue la recherche d'alias pour tous les payeurs, retourne leurs noms et pays, et attend la confirmation du business avant d'envoyer les demandes de paiement.
     * - `false` : Le PSP envoie directement les demandes de paiement sans attendre de confirmation.
     *
     * **Note :** Si `true`, le business doit confirmer via `PUT /demandes-paiements-groupes/{instructionId}/confirmations` dans un délai adaptatif (24h, 48h ou 72h selon le nombre de transactions).
     *
     */
    confirmation?: boolean;
    /**
     * Identifiant de la demande de paiement en masse dans le SI du client
     */
    instructionId: string;
    /**
     * Le motif commun à toutes les demandes de paiement du groupe.
     * Si toutes les demandes de paiement du groupe ont le même motif, ce champ peut être utilisé pour optimiser la taille du lot.
     * Dans le cas contraire, chaque demande de paiement doit avoir son propre motif.
     *
     */
    motif?: string;
    transactions: Array<{
        /**
         * Identifiant de la transaction dans le SI du client
         */
        txId: string;
        /**
         * L'alias du client payeur.
         */
        payeurAlias: string;
        /**
         * Le montant à payer
         */
        montant: number;
        /**
         * Remise appliquée sur la facture - la remise n'est pas appliquée après la date limite de paiement
         */
        remise?: {
            montant?: number;
            taux?: number;
        };
        /**
         * La date limite à laquelle le payeur doit avoir effectué le paiement.
         *
         * Dans le cas d'une demande de paiement de facture, il s'agit en général de la date indiquée avec la mention "À payer avant".
         *
         */
        dateLimitePaiement: string;
        /**
         * C'est la date limite avant laquelle une réponse doit être fournie par le payeur.
         * La demande de paiement expire à cette date. Le client payé ne peut pas envoyer
         *
         */
        dateLimiteReponse?: string;
        /**
         * Le motif de la demande de paiement.
         * Si toutes les demandes de paiement du groupe ont le même motif, ce champ doit être omis, et le motif du groupe doit être utilisé.
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

