/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RefDocType } from './RefDocType';
export type PaiementRequest = {
    /**
     * Identifiant de la transaction dans le SI du client
     */
    txId: string;
    /**
     * Le client business a la possibilité de préciser le compte qui sera débité pour le paiement.
     *
     */
    payeurAlias: string;
    /**
     * L'alias du client payé, bénéficiaire de l'ordre de paiement
     */
    payeAlias: string;
    /**
     * Le montant du transfert à effectuer
     */
    montant: number;
    /**
     * Le numéro / la référence du document justificatif
     */
    refDocNumero?: string;
    refDocType?: RefDocType;
    /**
     * Le motif du paiement
     */
    motif?: string;
    /**
     * Indique si le paiement executé est un paiement programmé
     */
    programme?: boolean;
};

