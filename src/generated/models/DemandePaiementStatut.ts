/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * - `INITIE` si la confirmation du client est attendue suite à la recherche d'alias
 * - `ENVOYE` si les validations sont concluantes et que le PSP a envoyé la demande
 * - `IRREVOCABLE` si le payeur a accepté la demande
 * - `REJETE` si le payeur rejette la demande
 *
 */
export enum DemandePaiementStatut {
    INITIE = 'INITIE',
    ENVOYE = 'ENVOYE',
    IRREVOCABLE = 'IRREVOCABLE',
    REJETE = 'REJETE',
}
