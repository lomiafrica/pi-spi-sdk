/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Raisons de l'annulation ou du rejet de la demande de paiement:
 * - ERREUR_ALIAS le client s'est trompé sur l'alias
 * - ERREUR_MONTANT le client s'est trompé sur le montant
 * - ERREUR_TXID le client s'est trompé sur le txId
 * - PAYEUR_INCONNU les informations du client payeur retournées suite à la recherche d'alias ne sont pas ceux attendues par le client.
 *
 */
export enum DemandePaiementConfirmationAnnulationRaison {
    ERREUR_ALIAS = 'ERREUR_ALIAS',
    ERREUR_MONTANT = 'ERREUR_MONTANT',
    ERREUR_TXID = 'ERREUR_TXID',
    PAYEUR_INCONNU = 'PAYEUR_INCONNU',
}
