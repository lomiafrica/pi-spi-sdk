/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 *
 * **Raisons de rejet ou d'echec des demandes de paiement :**
 * - **BE23** (Alias invalid) : L'alias du payeur n'existe pas ou est invalide.
 * - **DU03** (Duplicate Transaction) : Le txId n'est pas unique
 *
 * - **AC04** (Closed Account Number) : Le compte du client payeur est clôturé.
 * - **AC06** (Blocked Account) : Le compte du client payeur est bloqué.
 * - **AEXR** (Already Expired RTP) : La demande de paiement a déjà expiré.
 * - **AG03** (Transaction Not Supported) : Le client n'est pas autorisé à payer en mode débit différé.
 * - **AG10** (Agent Suspended) : Le participant payeur est suspendu.
 * - **AG11** (Creditor Agent Suspended) : Le participant payé est désactivé.
 * - **ALAC** (Already Accepted RTP) : La demande de paiement a déjà été acceptée.
 * - **AM02** (Not Allowed Amount) : Le montant spécifique de la transaction dépasse le montant maximum autorisé.
 * - **AM09** (Wrong Amount) : Le montant reçu ne correspond pas au montant convenu ou attendu.
 * - **AM14** (Amount Exceeds Agreed Limit) : Le montant de la transaction fait dépasser le plafond de débit différé du client.
 * - **APAR** (Already Paid RTP) : Le paiement demandé a déjà été effectué par le payeur.
 * - **ARFR** (Already Refused RTP) : La demande de paiement a déjà été refusée.
 * - **ARJR** (Already Rejected RTP) : La demande de paiement a déjà été rejetée.
 * - **BE01** (Inconsistent With End Customer) : L'identification du client final n'est pas liée au numéro de compte associé.
 * - **BE05** (Unrecognised Initiating Party) : La partie qui a initié le message n'est pas reconnue par le client final.
 * - **FR01** (Fraud) : Rejeté pour suspicion de fraude.
 * - **RR07** (Remittance Information Invalid) : Le justificatif de la demande de paiement est invalide (par exemple, le numéro de facture est invalide).
 *
 */
export enum DemandePaiementStatutRaison {
    BE23 = 'BE23',
    DU03 = 'DU03',
    AC04 = 'AC04',
    AC06 = 'AC06',
    AEXR = 'AEXR',
    AG03 = 'AG03',
    AG10 = 'AG10',
    AG11 = 'AG11',
    ALAC = 'ALAC',
    AM02 = 'AM02',
    AM09 = 'AM09',
    AM14 = 'AM14',
    APAR = 'APAR',
    ARFR = 'ARFR',
    ARJR = 'ARJR',
    BE01 = 'BE01',
    BE05 = 'BE05',
    FR01 = 'FR01',
    RR07 = 'RR07',
}
