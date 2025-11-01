/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaiementImmediatRequest } from './PaiementImmediatRequest';
export type PaiementImmediatConfirmationReponse = (PaiementImmediatRequest & {
    statut?: PaiementImmediatConfirmationReponse.statut;
    /**
     * Identifiant unique de bout en bout de la transaction
     */
    end2endId?: string;
    /**
     * Le nom du payé
     */
    payeNom?: string;
    /**
     * Le pays de residence du payé
     */
    payePays?: string;
    /**
     * Date de création du paiement
     */
    dateDemande?: string;
    /**
     * Date de confirmation de la demande si le client payé avait requis la confirmation du paiement.
     * Il s'agit de la date et heure à laquelle le business a confirmé l'envoi du paiement.
     *
     */
    dateConfirmation?: string;
});
export namespace PaiementImmediatConfirmationReponse {
    export enum statut {
        ENVOYE = 'ENVOYE',
    }
}

