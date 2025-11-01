/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 *
 * **Raisons de rejet ou d'echec des paiements :**
 * - **BE23** (Alias invalid) : L'alias du payeur n'existe pas ou est invalide.
 * - **DU03** (Duplicate Transaction) : Le txId n'est pas unique
 *
 * - **AB03** (Aborted Settlement Timeout) : Message en timeout lors du règlement.
 * - **AB04** (Aborted Settlement Fatal Error) : Transaction rejetée à cause d'une erreur fatale.
 * - **AB08** (Offline Creditor Agent) : Le système du participant payé n'est pas accessible.
 * - **AB09** (Error Creditor Agent) : Transaction rejetée à cause d'une erreur chez le participant payé.
 * - **AC03** (Invalid Creditor Account Number) : Le numéro de compte du payé est invalide.
 * - **AC06** (Blocked Account) : Le compte spécifié est bloqué.
 * - **AC07** (Closed Creditor Account Number) : Le compte du payé est clôturé.
 * - **AG01** (Transaction Forbidden) : Transaction interdite sur ce type de compte.
 * - **AG10** (Agent Suspended) : Le participant payeur est désactivé.
 * - **AG11** (Creditor Agent Suspended) : Le participant payé est désactivé.
 * - **AEXR** (Already Expired RTP) : La demande de paiement a déjà expiré.
 * - **ALAC** (Already Accepted RTP) : La demande de paiement a déjà été acceptée.
 * - **AM02** (Not Allowed Amount) : Le montant de la transaction est supérieur au maximum autorisé.
 * - **AM04** (Insufficient Funds) : Le solde de garantie du participant payeur est insuffisant.
 * - **AM09** (Wrong Amount) : Le montant du transfert est différent du montant attendu.
 * - **AM21** (Limit Exceeded) : Le montant de la transaction dépasse les limites convenues entre le participant et le client.
 * - **ARFR** (Already Refused RTP) : La demande de paiement a déjà été refusée.
 * - **ARJR** (Already Rejected RTP) : La demande de paiement a déjà été rejetée.
 * - **BE01** (Inconsistent With End Customer) : L'identification du client final n'est pas liée au numéro de compte associé.
 * - **FR01** (Fraud) : Rejeté pour suspicion de fraude.
 * - **IRNR** (Initial RTP Never Received) : La demande de paiement n'a jamais été reçue.
 * - **RR04** (Regulatory Reason) : Raison règlementaire, notamment lorsque le bénéficiaire figure dans une liste d'interdiction.
 *
 */
export enum PaiementStatutRaison {
    BE23 = 'BE23',
    DU03 = 'DU03',
    AB03 = 'AB03',
    AB04 = 'AB04',
    AB08 = 'AB08',
    AB09 = 'AB09',
    AC03 = 'AC03',
    AC06 = 'AC06',
    AC07 = 'AC07',
    AG01 = 'AG01',
    AG10 = 'AG10',
    AG11 = 'AG11',
    AEXR = 'AEXR',
    ALAC = 'ALAC',
    AM02 = 'AM02',
    AM04 = 'AM04',
    AM09 = 'AM09',
    AM21 = 'AM21',
    ARFR = 'ARFR',
    ARJR = 'ARJR',
    BE01 = 'BE01',
    FR01 = 'FR01',
    IRNR = 'IRNR',
    RR04 = 'RR04',
}
