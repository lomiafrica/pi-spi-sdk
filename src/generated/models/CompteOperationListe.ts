/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompteOperation } from './CompteOperation';
export type CompteOperationListe = {
    data?: Array<CompteOperation>;
    meta?: {
        /**
         * total d'éléments correspondants à la recherche
         */
        length?: number;
        /**
         * numéro ou identifiant de la page suivante
         */
        page?: string;
        /**
         * nombre d'éléments retournés
         */
        limit?: number;
    };
};

