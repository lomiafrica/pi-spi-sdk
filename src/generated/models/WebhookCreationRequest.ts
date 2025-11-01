/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WebhooksEvents } from './WebhooksEvents';
export type WebhookCreationRequest = {
    callbackUrl: string;
    /**
     * l'alias auquel est rattaché le point de rappel pour recevoir des notifications liées à un alias de compte
     *
     */
    alias?: string;
    /**
     * les évènements dont les notifications seront envoyés sur le point de terminaison
     *
     */
    events?: Array<WebhooksEvents>;
};

