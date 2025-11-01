/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompteTransfertIntraRequest } from './CompteTransfertIntraRequest';
export type CompteTransfertIntraReponse = (CompteTransfertIntraRequest & {
    /**
     * - `INITIE` Le transfert est en cours de traitement
     * - `IRREVOCABLE` Le tranfert à été effectué avec succès
     *
     */
    statut?: CompteTransfertIntraReponse.statut;
    /**
     * Identifiant unique de bout en bout de la transaction
     */
    end2endId?: string;
    /**
     * Date d'envoi du transfert de fonds: date et heure à laquelle le transfert à été initié
     *
     */
    dateEnvoi?: string;
    /**
     * Date d'irrévocabilité du transfert de fonds: date et heure à laquelle le transfert à été irrévocable
     *
     */
    dateIrrevocabilite?: string;
});
export namespace CompteTransfertIntraReponse {
    /**
     * - `INITIE` Le transfert est en cours de traitement
     * - `IRREVOCABLE` Le tranfert à été effectué avec succès
     *
     */
    export enum statut {
        INITIE = 'INITIE',
    }
}

