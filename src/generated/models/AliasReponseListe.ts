/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AliasCreationReponse } from './AliasCreationReponse';
export type AliasReponseListe = {
    data?: Array<AliasCreationReponse>;
    meta?: {
        /**
         * total d'éléments correspondants à la recherche
         */
        total?: number;
        /**
         * nombre d'éléments retournés
         */
        size?: number;
        /**
         * numéro ou identifiant de la page suivante
         */
        page?: string;
        /**
         * numéro ou identifiant de la page suivante
         */
        next?: string;
        /**
         * numéro ou identifiant de la page précédente
         */
        prev?: string;
    };
};

