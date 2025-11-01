/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 *
 * **Motifs d'annulation d'un paiement:**
 * - **AC03** Erreur sur le destinataire
 * - **AM09** Erreur sur le montant
 * - **SVNR** Service non rendu
 * - **DUPL** Transaction déjà payée
 * - **FRAD** Suspicion de fraude
 *
 */
export enum PaiementAnnulationMotif {
    AC03 = 'AC03',
    AM09 = 'AM09',
    SVNR = 'SVNR',
    DUPL = 'DUPL',
    FRAD = 'FRAD',
}
