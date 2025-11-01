/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WebhookCreationResponse } from './WebhookCreationResponse';
export type WebhookList = {
    /**
     * Liste des webhooks configurés
     */
    data: Array<WebhookCreationResponse>;
    meta: {
        /**
         * Nombre total de webhooks configurés
         */
        total: number;
    };
};

