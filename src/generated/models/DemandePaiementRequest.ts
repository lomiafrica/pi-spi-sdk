/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DemandePaiementRequestBase } from './DemandePaiementRequestBase';
export type DemandePaiementRequest = (({
    categorie: DemandePaiementRequest.categorie;
} & DemandePaiementRequestBase) | ({
    categorie: DemandePaiementRequest.categorie;
    /**
     * Montant de l'achat
     */
    montantAchat: number;
    /**
     * Montant du retrait d'espèces (Inclus le montant des frais)
     */
    montantRetrait: number;
    /**
     * Frais de retrait
     */
    montantFrais: number;
} & DemandePaiementRequestBase) | ({
    categorie: DemandePaiementRequest.categorie;
    /**
     * Montant du retrait d'espèces
     */
    montantRetrait: number;
    /**
     * Frais de retrait
     */
    montantFrais: number;
} & DemandePaiementRequestBase) | ({
    categorie: DemandePaiementRequest.categorie;
    /**
     * Indique que le paiement est différé (Acheter maintenant, payer plus tard)
     */
    debitDiffere: boolean;
    /**
     * Remise appliquée sur la facture
     */
    remise: {
        montant?: number;
        taux?: number;
    };
} & DemandePaiementRequestBase) | ({
    categorie: DemandePaiementRequest.categorie;
    /**
     * Date limite de paiement (2 minutes après création)
     */
    dateLimitePaiement: string;
} & DemandePaiementRequestBase) | ({
    categorie: DemandePaiementRequest.categorie;
    /**
     * Indique que le paiement est différé
     */
    debitDiffere: boolean;
    /**
     * Remise appliquée
     */
    remise: {
        /**
         * Montant de la remise
         */
        montant?: number;
        /**
         * Taux de remise
         */
        taux?: number;
    };
} & DemandePaiementRequestBase) | ({
    categorie: DemandePaiementRequest.categorie;
    /**
     * Date limite de paiement de la facture (ex "A payer avant")
     */
    dateLimitePaiement: string;
    /**
     * Date limite de réponse
     */
    dateLimiteReponse?: string;
} & DemandePaiementRequestBase) | ({
    categorie: DemandePaiementRequest.categorie;
    /**
     * Date limite de paiement
     */
    dateLimitePaiement: string;
    /**
     * Date limite de réponse
     */
    dateLimiteReponse: string;
    /**
     * Remise appliquée sur la facture - la remise n'est pas appliquée après la date limite de paiement
     */
    remise: {
        montant?: number;
        taux?: number;
    };
} & DemandePaiementRequestBase));
export namespace DemandePaiementRequest {
    export enum categorie {
        _500 = '500',
    }
}

