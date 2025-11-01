/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DemandePaiementConfirmationAnnulationRaison } from './DemandePaiementConfirmationAnnulationRaison';
import type { DemandePaiementRequest } from './DemandePaiementRequest';
export type DemandePaiementConfirmationReponse = (DemandePaiementRequest & {
    /**
     * - `ENVOYE` si les validations sont concluantes et que le PSP a envoyé la demande
     * - `ANNULE` si la demande n'est pas envoye pour une raison
     *
     */
    statut?: DemandePaiementConfirmationReponse.statut;
    statutRaison?: DemandePaiementConfirmationAnnulationRaison;
    /**
     * Le nom du payeur
     */
    payeurNom?: string;
    /**
     * Le pays de residence du payeur
     */
    payeurPays?: string;
    /**
     * Date d'envoie de la demande: date et heure à laquelle la demande de paiement est envoyée par le PSP
     *
     */
    dateEnvoie?: string;
    /**
     * Date de confirmation de la demande si le client avait requis la confirmation de la demande de paiement.
     * Il s'agit de la date et heure à laquelle le client a confirmé la demande.
     *
     */
    dateConfirmation?: string;
});
export namespace DemandePaiementConfirmationReponse {
    /**
     * - `ENVOYE` si les validations sont concluantes et que le PSP a envoyé la demande
     * - `ANNULE` si la demande n'est pas envoye pour une raison
     *
     */
    export enum statut {
        ENVOYE = 'ENVOYE',
        ANNULE = 'ANNULE',
    }
}

