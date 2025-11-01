/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DemandePaiementListeItem } from './DemandePaiementListeItem';
export type DemandePaiementListe = {
    data: Array<DemandePaiementListeItem>;
    meta: {
        /**
         * Nombre total de demandes de paiement correspondant aux critères
         */
        total?: number;
        /**
         * Nombre d'éléments par page
         */
        size?: number;
        /**
         * Identifiant de la page actuelle
         */
        page?: string;
        /**
         * Identifiant de la page suivante
         */
        next?: string;
        /**
         * Identifiant de la page précédente
         */
        prev?: string;
    };
};

