/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaiementRequest } from './PaiementRequest';
export type PaiementImmediatRequest = (PaiementRequest & {
    /**
     * Lorsque le PSP recoit la demande, il effectue une recherche d'alias en vue d'obtenir les informations de compte du client payé.
     *
     * L'attribut `confirmation` permet au client d'indiquer à son PSP si celui-ci doit lui retourner les resultats de la recherche d'alias pour confirmation:
     *
     * - La valeur `true` de la validation indique au PSP qu'il doit retourner le resultat de la recherche d'alias au client et attendre une validation avant d'effectuer le paiement.
     * - La valeur `false` indique qu'une validation n'est pas requise pour la demande, de ce fait, le PSP transmet la demande à PI sans attendre la validation du client business.
     *
     */
    confirmation: boolean;
});

