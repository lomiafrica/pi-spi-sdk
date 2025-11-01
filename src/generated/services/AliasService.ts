/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AliasCreationReponse } from '../models/AliasCreationReponse';
import type { AliasCreationRequest } from '../models/AliasCreationRequest';
import type { AliasReponseListe } from '../models/AliasReponseListe';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AliasService {
    /**
     * Créer un alias
     * Le répertoire des alias de compte permet de créer les types d'alias suivants :
     * - Une adresse de paiement, codifiée par SHID: cet alias est obtenu par génération d'une clé aléatoire unique sur 36 positions par le système.
     * - Un identifiant de compte marchand, codifié par MCOD: ce type d'alias est prévu pour supporter les paiements par code USSD.
     * - Un numéro de téléphone mobile, codifié par MBNO.
     *
     * Les types d'alias qu'on peut créer dépendent du type de client.
     * Les clients de type P (particuliers, personnes physiques) peuvent créer des alias de types MBNO et SHID.
     * Les clients de types C, B, et G (commerçants ou entreprises individuelles, entreprises, entités gouvernementales) peuvent créer des alias de types SHID et MCOD.
     *
     * Un client business peut créer plusieurs alias pour un compte donné.
     * Une limite de 20 alias par compte est fixée par défaut. Cette limite peut être augmentée selon les besoins du client.
     *
     * @returns AliasCreationReponse Opération effectuée avec succès
     * @throws ApiError
     */
    public static aliasCreer({
        numero,
        requestBody,
    }: {
        /**
         * Le numéro de compte sur lequel porte la demande
         */
        numero: string,
        /**
         * Données pour la création d'alias.
         */
        requestBody: AliasCreationRequest,
    }): CancelablePromise<AliasCreationReponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/comptes/{numero}/alias',
            path: {
                'numero': numero,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `La requête est malformée`,
                401: `Autorisations manquantes`,
                403: `Opération interdite`,
                404: `La ressource n'existe pas dans le système`,
                429: `Erreur inattendue`,
                503: `Erreur inattendue du serveur`,
            },
        });
    }
    /**
     * Lister les alias
     * Ce point de terminaison permet de consulter la liste des alias d'un compte.
     *
     * @returns AliasReponseListe Succès de l'opération
     * @throws ApiError
     */
    public static aliasLister({
        numero,
    }: {
        /**
         * Le numéro de compte sur lequel porte la demande
         */
        numero: string,
    }): CancelablePromise<AliasReponseListe> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/comptes/{numero}/alias',
            path: {
                'numero': numero,
            },
            errors: {
                401: `Autorisations manquantes`,
                429: `Erreur inattendue`,
                503: `Erreur inattendue du serveur`,
            },
        });
    }
    /**
     * Supprimer un alias
     * Le client peut supprimer à tout moment un alias de compte.
     *
     * @returns void
     * @throws ApiError
     */
    public static aliasSupprimer({
        numero,
        cle,
    }: {
        /**
         * Le numéro de compte
         */
        numero: string,
        /**
         * La cle de l'alias
         */
        cle: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/comptes/{numero}/alias/{cle}',
            path: {
                'numero': numero,
                'cle': cle,
            },
            errors: {
                401: `Autorisations manquantes`,
                404: `La ressource n'existe pas dans le système`,
                429: `Erreur inattendue`,
                503: `Erreur inattendue du serveur`,
            },
        });
    }
}
