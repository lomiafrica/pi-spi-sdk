/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 *
 * **Raisons de rejet ou d'echec des retours de fonds :**
 * - **AB03** (Aborted Settlement Timeout) : Message en timeout lors du règlement.
 * - **AB04** (Aborted Settlement Fatal Error) : Transaction rejetée à cause d'une erreur fatale.
 * - **AC06** (Blocked Account) : Le compte spécifié est bloqué.
 * - **AG10** (Agent Suspended) : Le participant payeur est désactivé.
 * - **AG11** (Creditor Agent Suspended) : Le participant payé est désactivé.
 * - **AM04** (Insufficient Funds) : Le solde de garantie du participant payé est insuffisant.
 * - **AM09** (Wrong Amount) : Le montant du transfert est différent du montant attendu.
 * - **FR01** (Fraud) : Rejeté pour suspicion de fraude.
 * - **RR04** (Regulatory Reason) : Raison règlementaire, notamment lorsque le bénéficiaire figure dans une liste d'interdiction.
 *
 */
export enum RetourStatutRaison {
    AB03 = 'AB03',
    AB04 = 'AB04',
    AC06 = 'AC06',
    AG10 = 'AG10',
    AG11 = 'AG11',
    AM04 = 'AM04',
    AM09 = 'AM09',
    FR01 = 'FR01',
    RR04 = 'RR04',
}
