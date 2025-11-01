/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompteOperationListe } from '../models/CompteOperationListe';
import type { CompteSolde } from '../models/CompteSolde';
import type { CompteTransfertIntraReponse } from '../models/CompteTransfertIntraReponse';
import type { CompteTransfertIntraRequest } from '../models/CompteTransfertIntraRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ComptesService {
    /**
     * Détails d'un compte
     * Cet endpoint permet au client de consulter à tout moment les informations détaillées relatives à un compte spécifique.
     *
     * Les informations retournées incluent :
     * - Le type de compte (compte courant, épargne, etc.)
     * - Le numéro du compte
     * - La date d'ouverture du compte
     * - Le solde actuel du compte
     * - Le statut du compte (ouvert, bloqué ou clôturé)
     * - L'indicateur de pré-confirmation pour les opérations
     *
     * Cette consultation permet au client business de surveiller l'état de ses comptes en temps réel et de prendre des décisions éclairées concernant ses opérations financières.
     *
     * @returns CompteSolde Succès de l'opération
     * @throws ApiError
     */
    public static compteSoldeConsulter({
        numero,
    }: {
        /**
         * Le numéro de compte sur lequel porte la demande
         */
        numero: string,
    }): CancelablePromise<CompteSolde> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/comptes/{numero}',
            path: {
                'numero': numero,
            },
            errors: {
                401: `Autorisations manquantes`,
                404: `La ressource n'existe pas dans le système`,
                429: `Erreur inattendue`,
                503: `Erreur inattendue du serveur`,
            },
        });
    }
    /**
     * Transfert intra-comptes
     * Le transfert intra-comptes est un transfert de fonds entre deux comptes détenus par la même entité juridique et domiciliés au sein de la même institution financière. Le compte source (débiteur/payeur) et le compte destination (créditeur/bénéficiaire) appartiennent donc au même client.
     *
     * @returns CompteTransfertIntraReponse Transfert initié avec succès.
     * @throws ApiError
     */
    public static compteTransfertIntraCreer({
        requestBody,
    }: {
        /**
         * Données à fournir pour effectuer un transfert intra-comptes.
         *
         * Le client business peut effectuer un transfert intra-comptes en utilisant les numéros de compte ou les alias de compte.
         * La création d'alias n'étant possible que sur certains types de comptes, le participant doit supporter les deux modes de transfert.
         *
         */
        requestBody: CompteTransfertIntraRequest,
    }): CancelablePromise<CompteTransfertIntraReponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/comptes/transactions',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `La requête est malformée`,
                401: `Autorisations manquantes`,
                403: `Interdiction d'effectuer le paiement`,
                429: `Erreur inattendue`,
                503: `Erreur inattendue du serveur`,
            },
        });
    }
    /**
     * Lister les transferts intra-comptes
     * @returns CompteOperationListe Succès de l'opération
     * @throws ApiError
     */
    public static compteTransfertIntraLister({
        statut,
        comptePayeur,
        comptePaye,
        dateEnvoi,
        dateIrrevocabilite,
        motif,
        page,
        size,
        sort,
        fields,
    }: {
        statut?: string,
        comptePayeur?: string,
        comptePaye?: string,
        dateEnvoi?: string,
        dateIrrevocabilite?: string,
        motif?: string,
        page?: string,
        size?: string,
        sort?: string,
        fields?: any,
    }): CancelablePromise<CompteOperationListe> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/comptes/transactions',
            query: {
                'statut': statut,
                'comptePayeur': comptePayeur,
                'comptePaye': comptePaye,
                'dateEnvoi': dateEnvoi,
                'dateIrrevocabilite': dateIrrevocabilite,
                'motif': motif,
                'page': page,
                'size': size,
                'sort': sort,
                'fields': fields,
            },
            errors: {
                401: `Autorisations manquantes`,
                429: `Erreur inattendue`,
                503: `Erreur inattendue du serveur`,
            },
        });
    }
}
