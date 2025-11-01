/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WebhookCreationRequest } from './WebhookCreationRequest';
export type WebhookCreationResponse = (WebhookCreationRequest & {
    id?: string;
    /**
     * Date et heure d'enregistrement du webhook. Conforme à la RFC ISO 8601
     */
    dateCreation?: string;
    /**
     * Le secret doit être enregistré de façon sécurisée . Il n'est envoyé qu'à la création du webhook.
     */
    secret?: string;
});

