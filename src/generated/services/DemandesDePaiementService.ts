/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DemandePaiementConfirmationReponse } from '../models/DemandePaiementConfirmationReponse';
import type { DemandePaiementConfirmationRequest } from '../models/DemandePaiementConfirmationRequest';
import type { DemandePaiementConsultationReponse } from '../models/DemandePaiementConsultationReponse';
import type { DemandePaiementListe } from '../models/DemandePaiementListe';
import type { DemandePaiementReponse } from '../models/DemandePaiementReponse';
import type { DemandePaiementReponseRequest } from '../models/DemandePaiementReponseRequest';
import type { DemandePaiementRequest } from '../models/DemandePaiementRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DemandesDePaiementService {
    /**
     * Envoyer une demande
     * Ce point de terminaison permet d'envoyer une demande de paiement.
     *
     * Le business peut définir le champ `confirmation` à `true` pour demander une validation en deux étapes : le PSP retournera d'abord le résultat de la recherche d'alias (avec le nom et le pays du payeur), puis attendra une confirmation explicite avant d'envoyer la demande de paiement au payeur via l'endpoint `PUT /demandes-paiements/{txId}/confirmations`.
     *
     * Si le champ `confirmation` n'est pas défini ou est à `false`, le système envoie directement la demande de paiement au payeur.
     *
     * **Timeout de confirmation** : Si le business demande une validation en deux étapes , il dispose de **24 heures** pour confirmer ou annuler. Passé ce délai, la demande expire automatiquement.
     *
     * @returns DemandePaiementReponse Demande de paiement traitée. Le champ `statut` indique le résultat :
     * - `INITIE` : En attente de confirmation (si `confirmation: true`)
     * - `ENVOYE` : Demande envoyée au payeur avec succès (si `confirmation: false`)
     * - `REJETE` : Demande rejetée. Le champ `statutRaison` contient le code d'erreur :
     * - `DU03` : txId dupliqué (déjà utilisé)
     * - `BE23` : Alias payeur invalide
     * - Autres codes ISO 20022
     *
     * @throws ApiError
     */
    public static demandePaiementCreer({
        requestBody,
    }: {
        /**
         * Données pour envoyer une demande de paiement.
         */
        requestBody: DemandePaiementRequest,
    }): CancelablePromise<DemandePaiementReponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/demandes-paiements',
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
     * Lister les demandes
     * Ce point de terminaison permet de lister les demandes de paiements effectuées par le client.
     * @returns DemandePaiementListe Succès de l'opération
     * @throws ApiError
     */
    public static demandePaiementLister({
        payeAlias,
        payeCompte,
        dateEnvoi,
        dateLimitePaiement,
        statut,
        categorie,
        payeurAlias,
        payeurCompte,
        montantAchat,
        montantRetrait,
        debitDiffere,
        remise,
        motif,
        refDocType,
        instructionId,
        page,
        size,
        sort,
        fields,
    }: {
        payeAlias?: string,
        payeCompte?: string,
        dateEnvoi?: string,
        dateLimitePaiement?: string,
        statut?: 'INITIE' | 'ENVOYE' | 'IRREVOCABLE' | 'REJETE',
        categorie?: '631' | '500' | '521' | '401',
        payeurAlias?: string,
        payeurCompte?: string,
        montantAchat?: number,
        montantRetrait?: number,
        debitDiffere?: boolean,
        remise?: boolean,
        motif?: string,
        refDocType?: string,
        instructionId?: string,
        page?: string,
        size?: number,
        sort?: string,
        fields?: any,
    }): CancelablePromise<DemandePaiementListe> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/demandes-paiements',
            query: {
                'payeAlias': payeAlias,
                'payeCompte': payeCompte,
                'dateEnvoi': dateEnvoi,
                'dateLimitePaiement': dateLimitePaiement,
                'statut': statut,
                'categorie': categorie,
                'payeurAlias': payeurAlias,
                'payeurCompte': payeurCompte,
                'montantAchat': montantAchat,
                'montantRetrait': montantRetrait,
                'debitDiffere': debitDiffere,
                'remise': remise,
                'motif': motif,
                'refDocType': refDocType,
                'instructionId': instructionId,
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
    /**
     * Consulter une demande
     * Cet point de terminaison permet de consulter les details d'une demande de paiement.
     *
     * @returns DemandePaiementConsultationReponse Opération effectuée avec succès
     * @throws ApiError
     */
    public static demandePaiementRecuperer({
        txId,
    }: {
        /**
         * L'identifiant de la transaction dans le SI du client business
         */
        txId: string,
    }): CancelablePromise<DemandePaiementConsultationReponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/demandes-paiements/{txId}',
            path: {
                'txId': txId,
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
     * Confirmer la demande
     * Ce point de terminaison permet d'envoyer la confirmation de l'envoi d'une demande de paiement.
     *
     * Le client business confirme oui ou non si le PSP peut envoyer la demande au payeur après vérification des informations d'identification (nom et pays du payeur).
     *
     * **Idempotence** : Cet endpoint est idempotent.
     * - Premier appel avec `decision: true` → Envoie la demande, retourne `200 OK {statut: "ENVOYE"}`
     * - Appels suivants avec `decision: true` → Retourne `200 OK` avec l'état actuel (ENVOYE, IRREVOCABLE, ou REJETE) - idempotent
     * - Premier appel avec `decision: false` → Annule, retourne `200 OK {statut: "ANNULE"}`
     * - Appels suivants avec `decision: false` → Retourne `200 OK {statut: "ANNULE"}` (idempotent)
     * - `decision: true` après `decision: false` → Retourne `403 Forbidden` (déjà annulé)
     * - `decision: false` après `decision: true` → Retourne `403 Forbidden` (déjà confirmé)
     *
     * **Timeout** : La confirmation doit être envoyée dans les **24 heures** suivant la création de la demande. Passé ce délai, la demande expire automatiquement et ne peut plus être confirmée.
     *
     * **Changement de décision** : Une fois une décision prise, elle est définitive. Impossible de confirmer après avoir annulé, et vice-versa.
     *
     * @returns DemandePaiementConfirmationReponse Opération effectuée avec succès
     * @throws ApiError
     */
    public static demandePaiementConfirmer({
        txId,
        requestBody,
    }: {
        /**
         * L'identifiant de la transaction dans le SI du payé
         */
        txId: string,
        /**
         * Le client envoie oui ou non s'il confirme l'envoi de la demande
         */
        requestBody: DemandePaiementConfirmationRequest,
    }): CancelablePromise<DemandePaiementConfirmationReponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/demandes-paiements/{txId}/confirmations',
            path: {
                'txId': txId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Autorisations manquantes`,
                403: `Opération interdite`,
                404: `La ressource n'existe pas dans le système`,
                429: `Erreur inattendue`,
                503: `Erreur inattendue du serveur`,
            },
        });
    }
    /**
     * Accepter ou rejeter la demande
     * Ce point de terminaison permet au client d'accepter ou de rejeter une demande de paiement reçue.
     * @returns any Opération effectuée avec succès
     * @throws ApiError
     */
    public static demandePaiementRepondre({
        txId,
        requestBody,
    }: {
        /**
         * L'identifiant de la transaction dans le SI du client
         */
        txId: string,
        /**
         * Réponse à la demande de paiement.
         */
        requestBody: DemandePaiementReponseRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/demandes-paiements/{txId}/reponses',
            path: {
                'txId': txId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Autorisations manquantes`,
                403: `Interdiction d'effectuer le paiement`,
                404: `La ressource n'existe pas dans le système`,
                429: `Erreur inattendue`,
                503: `Erreur inattendue du serveur`,
            },
        });
    }
}
