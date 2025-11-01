/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Problem7807 = {
    /**
     * Référence URI qui identifie le type de problème
     */
    type?: string;
    /**
     * Un bref résumé du problème
     */
    title?: string;
    /**
     * Le code d'état HTTP pour cette occurrence du problème
     */
    status?: number;
    /**
     * Explication spécifique à cette occurrence du problème
     */
    detail?: string;
    /**
     * Liste des paramètres invalides
     */
    'invalid-params'?: Array<{
        /**
         * Nom du paramètre invalide
         */
        name?: string;
        /**
         * Raison de l'invalidité du paramètre
         */
        reason?: string;
    }>;
};

