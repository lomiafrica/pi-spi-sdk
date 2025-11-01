/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WebhookEvent } from './WebhookEvent';
export type WebhookEventsList = {
    /**
     * Liste des événements notifiés
     */
    data: Array<WebhookEvent>;
    meta: {
        /**
         * Nombre total d'événements dans cette notification
         */
        total: number;
    };
};

