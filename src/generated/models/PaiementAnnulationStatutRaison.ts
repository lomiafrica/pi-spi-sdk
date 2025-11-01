/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 *
 * **Raisons de rejet ou d'echec des demandes d'annulation :**
 * - **CUST** (Customer Decision) : Lorsque la demande d'annulation (camt.056) est rejetée par le client payé.
 * - **AC04** (Closed Account Number) : Le numéro de compte spécifié a été clôturé dans les livres du participant payé
 * - **ARDT** (Already Returned) : La transaction a déjà été annulée
 * - **AG10** (Agent Suspended) : Le participant payeur est désactivé.
 * - **AG11** (Creditor Agent Suspended) : Le participant payé est désactivé.
 * - **FR01** (Fraud) : Rejeté pour suspicion de fraude.
 * - **RR04** (Regulatory Reason) : Raison règlementaire, notamment lorsque le bénéficiaire figure dans une liste d'interdiction.
 *
 */
export enum PaiementAnnulationStatutRaison {
    CUST = 'CUST',
    AC04 = 'AC04',
    ARDT = 'ARDT',
    AG10 = 'AG10',
    AG11 = 'AG11',
    FR01 = 'FR01',
    RR04 = 'RR04',
}
