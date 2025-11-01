/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WebhookCreationRequest } from '../models/WebhookCreationRequest';
import type { WebhookCreationResponse } from '../models/WebhookCreationResponse';
import type { WebhookData } from '../models/WebhookData';
import type { WebhookList } from '../models/WebhookList';
import type { WebhookModificationRequest } from '../models/WebhookModificationRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NotificationService {
    /**
     * Créer un lien de rappel.
     * Cet endpoint permet au client de configurer des webhooks (liens de rappel) pour recevoir des notifications en temps réel.
     *
     * Le client dispose d'une grande flexibilité dans la configuration de ses webhooks et peut choisir parmi plusieurs stratégies :
     *
     * **1. Callback URL général**
     * - Un seul point de rappel pour toutes les notifications
     * - Tous les événements de tous les comptes/alias sont envoyés à la même URL
     * - Configuration simple, idéale pour centraliser toutes les notifications
     *
     * **2. Callback URL par alias**
     * - Un point de rappel distinct pour chaque alias de compte
     * - Permet de router les notifications vers des systèmes différents selon le compte concerné
     * - Utile pour isoler les flux de notifications par compte ou par service
     *
     * **3. Callback URL par événement**
     * - Un point de rappel spécifique pour chaque type d'événement (PAIEMENT_RECU, RTP_RECU, etc.)
     * - Permet de traiter différemment chaque catégorie d'événement
     * - Facilite la séparation des traitements métier (paiements vs demandes vs retours)
     *
     * **4. Callback URL par événement et alias**
     * - Granularité maximale : un point de rappel pour chaque combinaison événement/alias
     * - Configuration la plus fine pour des besoins très spécifiques
     * - Permet de router précisément chaque notification vers le système approprié
     *
     * Cette flexibilité permet aux clients d'adapter la configuration des webhooks à leur architecture technique et à leurs besoins métier.
     *
     * @returns WebhookCreationResponse Webhook créé avec succès
     * @throws ApiError
     */
    public static webhookCreer({
        requestBody,
    }: {
        requestBody: WebhookCreationRequest,
    }): CancelablePromise<WebhookCreationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/webhooks',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `La requête est malformée`,
                401: `Autorisations manquantes`,
                429: `Erreur inattendue`,
                503: `Erreur inattendue du serveur`,
            },
        });
    }
    /**
     * Lister les webhooks
     * Endpoint pour lister les webhooks
     *
     * @returns WebhookList Liste des webhooks configurés
     * @throws ApiError
     */
    public static webhookLister(): CancelablePromise<WebhookList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/webhooks',
            errors: {
                400: `La requête est malformée`,
                401: `Autorisations manquantes`,
                429: `Erreur inattendue`,
                503: `Erreur inattendue du serveur`,
            },
        });
    }
    /**
     * Modifier un Webhook
     * Endpoint pour la modification d'un webhook.
     *
     * @returns any Le Webhook a été modifié avec succès
     * @throws ApiError
     */
    public static webhookModifier({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: WebhookModificationRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/webhooks/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Autorisations manquantes`,
                429: `Erreur inattendue`,
                503: `Erreur inattendue du serveur`,
            },
        });
    }
    /**
     * Supprimer un Webhook
     * Endpoint pour la suppression d'un webhook.
     *
     * @returns void
     * @throws ApiError
     */
    public static webhookSupprimer({
        id,
    }: {
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/webhooks/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Autorisations manquantes`,
                429: `Erreur inattendue`,
                503: `Erreur inattendue du serveur`,
            },
        });
    }
    /**
     * Recuperer un webhook
     * Endpoint pour la consultation des informations d'un Webhook
     * @returns WebhookData Details du webhook
     * @throws ApiError
     */
    public static webhookConsulter({
        id,
    }: {
        id: string,
    }): CancelablePromise<WebhookData> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/webhooks/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Autorisations manquantes`,
                429: `Erreur inattendue`,
                503: `Erreur inattendue du serveur`,
            },
        });
    }
}
