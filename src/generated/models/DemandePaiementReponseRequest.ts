/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type DemandePaiementReponseRequest = ({
    /**
     * La décision à `true` indique l'acception de la demande de paiement.
     */
    decision: boolean;
} | {
    /**
     * La décision à `false` indique le rejet de la demande de paiement.
     */
    decision: boolean;
    raison: DemandePaiementReponseRequest.raison;
});
export namespace DemandePaiementReponseRequest {
    export enum raison {
        BE05 = 'BE05',
        AM09 = 'AM09',
        APAR = 'APAR',
        RR07 = 'RR07',
        FR01 = 'FR01',
    }
}

