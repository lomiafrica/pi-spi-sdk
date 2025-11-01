/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Paiement } from '../models/Paiement';
import type { PaiementImmediatConfirmationReponse } from '../models/PaiementImmediatConfirmationReponse';
import type { PaiementImmediatConfirmationRequest } from '../models/PaiementImmediatConfirmationRequest';
import type { PaiementImmediatReponse } from '../models/PaiementImmediatReponse';
import type { PaiementImmediatRequest } from '../models/PaiementImmediatRequest';
import type { PaiementListe } from '../models/PaiementListe';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PaiementImmediatService {
    /**
     * Envoyer un paiement
     * Ce point de terminaison permet au business d'effectuer des paiements.
     *
     * Le destinataire du paiement est identifié par son alias de compte.
     *
     * Le business peut définir le champ `confirmation` à `true` pour demander une validation en deux étapes : le PSP retournera d'abord le résultat de la recherche d'alias (avec le nom et le pays du bénéficiaire), puis attendra une confirmation explicite avant d'exécuter le paiement via l'endpoint `PUT /paiements/{txId}/confirmations`.
     *
     * **Timeout de confirmation** : Si le business demande une confirmation, il dispose de **24 heures** pour confirmer. Passé ce délai, la demande expire automatiquement.
     *
     * @returns PaiementImmediatReponse Paiement traité. Le champ `statut` indique le résultat :
     * - `INITIE` : En attente de confirmation (si `confirmation: true`)
     * - `ENVOYE` : Paiement envoyé avec succès (si `confirmation: false`)
     * - `REJETE` : Paiement rejeté. Le champ `statutRaison` contient le code d'erreur :
     * - `DU03` : txId dupliqué (déjà utilisé)
     * - `BE23` : Alias bénéficiaire invalide
     * - Autres codes ISO 20022
     *
     * @throws ApiError
     */
    public static paiementCreer({
        requestBody,
    }: {
        /**
         * Pour effectuer le transfert, le client doit fournir l'alias du destinataire ainsi que le montant du transfert à effectuer.
         */
        requestBody: PaiementImmediatRequest,
    }): CancelablePromise<PaiementImmediatReponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/paiements',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `La requête est malformée`,
                401: `Autorisations manquantes`,
                403: `Interdiction d'effectuer le paiement (erreurs métier non-retriables)`,
                429: `Erreur inattendue`,
                503: `Erreur inattendue du serveur`,
            },
        });
    }
    /**
     * Lister les paiements
     * Ce point de terminaison permet de lister les paiements effectués par le client.
     * @returns PaiementListe Succès de l'opération
     * @throws ApiError
     */
    public static paiementLister({
        payeAlias,
        payeCompte,
        payeurAlias,
        payeurCompte,
        dateEnvoi,
        dateIrrevocabilite,
        statut,
        categorie,
        montantAchat,
        montantRetrait,
        motif,
        refDocType,
        instructionId,
        txId,
        annulationStatut,
        annulationMotif,
        retourStatut,
        page,
        size,
        sort,
        fields,
    }: {
        payeAlias?: string,
        payeCompte?: string,
        payeurAlias?: string,
        payeurCompte?: string,
        dateEnvoi?: string,
        dateIrrevocabilite?: string,
        statut?: 'INITIE' | 'ENVOYE' | 'IRREVOCABLE' | 'REJETE',
        categorie?: '631' | '000' | '400' | '733' | '300' | '999' | '500' | '521' | '401',
        montantAchat?: number,
        montantRetrait?: number,
        motif?: string,
        refDocType?: string,
        instructionId?: string,
        txId?: string,
        annulationStatut?: string,
        annulationMotif?: string,
        retourStatut?: string,
        page?: string,
        size?: string,
        sort?: string,
        fields?: any,
    }): CancelablePromise<PaiementListe> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/paiements',
            query: {
                'payeAlias': payeAlias,
                'payeCompte': payeCompte,
                'payeurAlias': payeurAlias,
                'payeurCompte': payeurCompte,
                'dateEnvoi': dateEnvoi,
                'dateIrrevocabilite': dateIrrevocabilite,
                'statut': statut,
                'categorie': categorie,
                'montantAchat': montantAchat,
                'montantRetrait': montantRetrait,
                'motif': motif,
                'refDocType': refDocType,
                'instructionId': instructionId,
                'txId': txId,
                'annulationStatut': annulationStatut,
                'annulationMotif': annulationMotif,
                'retourStatut': retourStatut,
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
     * Détails d'un paiement
     * Cet point de terminaison permet de consulter les details d'un paiement.
     *
     * @returns Paiement Opération effectuée avec succès
     * @throws ApiError
     */
    public static paiementRecuperer({
        txId,
    }: {
        /**
         * L'identifiant de la transaction dans le SI du client
         */
        txId: string,
    }): CancelablePromise<Paiement> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/paiements/{txId}',
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
     * Confirmer le paiement
     * Ce point de terminaison permet d'envoyer la confirmation de l'envoi d'un paiement immédiat
     * après vérification du nom et du pays du bénéficiaire.
     *
     * **Idempotence** : Cet endpoint est idempotent.
     * - Premier appel avec `decision: true` → Lance le paiement, retourne `200 OK {statut: "ENVOYE"}`
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
     * @returns PaiementImmediatConfirmationReponse Paiement en cours d'envoi
     * @throws ApiError
     */
    public static paiementConfirmer({
        txId,
        requestBody,
    }: {
        /**
         * L'identifiant de la transaction dans le SI du payé
         */
        txId: string,
        /**
         * Le client envoie oui ou non s'il confirme l'envoi du paiement.
         */
        requestBody: PaiementImmediatConfirmationRequest,
    }): CancelablePromise<PaiementImmediatConfirmationReponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/paiements/{txId}/confirmations',
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
     * Vérifier un paiement
     * Ce point de terminaison permet de vérifier la réception d’un paiement à partir de l’`end2endId`.
     *
     * Dans certains cas, le **client business** peut ne pas avoir reçu la notification de paiement.
     * Le **client payeur** peut alors lui communiquer l’`end2endId` afin qu’il puisse vérifier manuellement le statut du paiement.
     *
     * Le **participant** doit, dans ce cas, vérifier dans sa base de données et s'il ne trouve pas le paiement, il doit interroger l’endpoint de PI-SPI permettant de **récupérer le statut d’un paiement**,  puis **retourner ce statut** dans sa réponse.
     *
     * Le statut retourné doit être soit :
     * - `IRREVOCABLE` (paiement irrévocable), ou
     * - `REJETE` (paiement rejeté).
     *
     * Un transfert **ne peut pas** être signalé comme « en cours de traitement » dans ce contexte.
     *
     * ⚠️ **Remarques :**
     * - La vérification ne doit concerner que les paiements réalisés depuis **moins de 3 mois (90 jours)** afin de garantir la disponibilité de la réponse.
     * - La garantie de réponse n’est assurée qu’à partir de **20 secondes après l’envoi du transfert**.
     *
     * @returns Paiement Opération effectuée avec succès
     * @throws ApiError
     */
    public static paiementVerifier({
        end2EndId,
    }: {
        /**
         * L'identifiant de bout en bout de la transaction
         */
        end2EndId: string,
    }): CancelablePromise<Paiement> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/paiements/{end2endId}/statuts',
            path: {
                'end2endId': end2EndId,
            },
            errors: {
                401: `Autorisations manquantes`,
                404: `Ce paiement n'a pas été trouvé`,
                429: `Erreur inattendue`,
                503: `Erreur inattendue du serveur`,
            },
        });
    }
}
