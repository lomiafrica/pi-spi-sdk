/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DemandePaiementEnMasseConfirmationRequest } from '../models/DemandePaiementEnMasseConfirmationRequest';
import type { DemandePaiementEnMasseRequest } from '../models/DemandePaiementEnMasseRequest';
import type { DemandePaiementEnMasseStatutReponse } from '../models/DemandePaiementEnMasseStatutReponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DemandesDePaiementEnMasseService {
    /**
     * Envoyer une demande de paiement en masse
     * Ce point de terminaison permet au client business d'envoyer plusieurs demandes de paiement à la fois.
     *
     * La catégorie des demandes de paiement en masse est toujours `401` (Autres demandes de paiement de facture).
     *
     * **Traitement asynchrone :** La création retourne immédiatement `202 Accepted`. Le traitement des transactions se fait de manière asynchrone.
     *
     * **Sans confirmation (`confirmation: false` ou non spécifié) :**
     * - Les transactions sont créées et validées (unicité des txId)
     * - Les demandes de paiement sont envoyées directement aux payeurs
     * - Les transactions avec txId dupliqué sont automatiquement rejetées avec le code `DU03`
     * - Les transactions avec alias de payeur invalide sont automatiquement rejetées avec le code `BE23`
     *
     * **Avec confirmation (`confirmation: true`) :**
     * - Les transactions sont créées et validées (unicité des txId + recherche d'alias des payeurs)
     * - Les transactions avec alias de payeur invalide sont rejetées avec le code `BE23`
     * - Les transactions avec txId dupliqué sont rejetées avec le code `DU03`
     * - Les transactions valides passent à l'état `INITIE` avec les noms et pays des payeurs
     * - Le business dispose d'un **délai adaptatif** pour confirmer ou annuler via `PUT /demandes-paiements-groupes/{instructionId}/confirmations` :
     * - **1 à 500 transactions** : 24 heures
     * - **501 à 1000 transactions** : 48 heures
     * - **Plus de 1000 transactions** : 72 heures
     * - Lors de la confirmation, seules les transactions `INITIE` sont envoyées (les transactions `REJETE` sont automatiquement exclues)
     * - Passé le délai, la demande expire automatiquement
     *
     * **Consultation des détails :**
     * - Statut global du bulk : `GET /demandes-paiements-groupes/{instructionId}`
     * - Liste de toutes les transactions : `GET /demandes-paiements?instructionId={instructionId}`
     * - Seulement les rejetées (validation) : `GET /demandes-paiements?instructionId={instructionId}&statut=REJETE`
     * - Seulement les valides (avec noms/pays des payeurs) : `GET /demandes-paiements?instructionId={instructionId}&statut=INITIE`
     *
     * **Convention de nommage des instructionId (important) :**
     *
     * L'`instructionId` doit être **unique** pour chaque création de bulk. Pour faciliter le suivi métier, nous recommandons la convention suivante :
     *
     * ```
     * <IDENTIFIANT_METIER>-<NUMERO_TENTATIVE>
     * ```
     *
     * **Exemples :**
     * - Première tentative : `FACTURES-2025-01-1` (factures de janvier 2025, tentative 1)
     * - Deuxième tentative : `FACTURES-2025-01-2` (corrections après échecs)
     * - Troisième tentative : `FACTURES-2025-01-3` (nouvelles corrections)
     *
     * **Avantages :**
     * - ✅ Chaque bulk a un statut indépendant (INITIE, CONFIRME, ANNULE)
     * - ✅ Traçabilité claire des tentatives successives
     * - ✅ Possibilité de filtrer par identifiant métier : `GET /demandes-paiements?instructionId[beginsWith]=FACTURES-2025-01`
     * - ✅ Respect de l'unicité de l'instructionId
     *
     * @returns string La demande a été acceptée et est en cours de traitement.
     *
     * Consultez le statut via `GET /demandes-paiements-groupes/{instructionId}`.
     *
     * @throws ApiError
     */
    public static demandePaiementGroupeCreer({
        requestBody,
    }: {
        requestBody: DemandePaiementEnMasseRequest,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/demandes-paiements-groupes',
            body: requestBody,
            mediaType: 'application/json',
            responseHeader: 'Location',
            errors: {
                400: `La requête est malformée`,
                401: `Autorisations manquantes`,
                409: `Conflit - instructionId déjà utilisé`,
                429: `Erreur inattendue`,
                503: `Erreur inattendue du serveur`,
            },
        });
    }
    /**
     * Détails d'une demande de paiement en masse
     * Ce point de terminaison permet de consulter les détails d'une demande de paiement en masse.
     *
     * **Statut du bulk :**
     * - `INITIE` : Créée avec confirmation demandée, en attente de confirmation
     * - `CONFIRME` : Confirmée par le business (si confirmation demandée) ou en cours de traitement (si sans confirmation)
     * - `ANNULE` : Annulée par le business avant confirmation (seulement si confirmation demandée)
     *
     * **Note :**
     * - Si créée **avec confirmation** (`confirmation: true`) : Le statut évolue de `INITIE` → `CONFIRME` ou `ANNULE`
     * - Si créée **sans confirmation** (`confirmation: false`) : Le statut est directement `CONFIRME` (aucune action requise du business)
     *
     * **Vérification de fin de validation (important pour confirmation) :**
     *
     * Lorsque `confirmation: true`, la validation des transactions se fait de manière asynchrone.
     * Pour savoir si la validation est terminée et que vous pouvez confirmer, vérifiez que :
     *
     * ```
     * transactionsInitiees + transactionsRejetees = transactionsTotal
     * ```
     *
     * - Si égalité → Validation terminée, vous pouvez confirmer ✅
     * - Si inégalité → Validation en cours, attendez encore (consultez à nouveau plus tard) ⏳
     *
     * Le détail de chaque transaction se consulte via `GET /demandes-paiements?txId={txId}`.
     *
     * **Consultation des transactions individuelles :**
     * Pour obtenir la liste détaillée des transactions (avec noms des payeurs, codes d'erreur, etc.), utilisez :
     * - Toutes les transactions : `GET /demandes-paiements?instructionId={instructionId}`
     * - Seulement les rejetées : `GET /demandes-paiements?instructionId={instructionId}&statut=REJETE`
     * - Seulement les réussies : `GET /demandes-paiements?instructionId={instructionId}&statut=IRREVOCABLE`
     *
     * @returns DemandePaiementEnMasseStatutReponse Opération effectuée avec succès
     * @throws ApiError
     */
    public static demandePaiementGroupeConsulter({
        instructionId,
    }: {
        /**
         * L'identifiant de la demande de paiement en masse dans le SI du client
         */
        instructionId: string,
    }): CancelablePromise<DemandePaiementEnMasseStatutReponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/demandes-paiements-groupes/{instructionId}',
            path: {
                'instructionId': instructionId,
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
     * Confirmer la demande de paiement en masse
     * Ce point de terminaison permet de confirmer ou d'annuler une demande de paiement en masse créée avec `confirmation: true`.
     *
     * **Processus de vérification :**
     * 1. Après la création (`POST /demandes-paiements-groupes`), le participant valide toutes les transactions (unicité des txId + recherche d'alias des payeurs)
     * 2. Les transactions invalides sont automatiquement rejetées (`statut: REJETE`) avec codes `BE23` (alias invalide) ou `DU03` (txId dupliqué)
     * 3. Les transactions valides passent à l'état `INITIE` avec les noms et pays des payeurs
     * 4. Le business consulte via `GET /demandes-paiements-groupes/{instructionId}` pour vérifier la progression de la validation
     * 5. **La validation (unicité des txId + recherche d'alias) est terminée quand** : `transactionsInitiees + transactionsRejetees = transactionsTotal`
     * 6. Le business peut alors confirmer ou annuler l'envoi des demandes de paiement
     *
     * **Important :** La confirmation n'est possible que lorsque la validation de toutes les transactions est terminée.
     * Si le business tente de confirmer pendant que la validation est en cours, une erreur 403 sera retournée avec la progression actuelle.
     *
     * **Comportement de la confirmation :**
     * - `decision: true` → Le système envoie **automatiquement SEULEMENT** les demandes de paiement pour les transactions avec `statut: INITIE`
     * - Les transactions `REJETE` (erreurs de validation) sont **automatiquement exclues** (pas besoin de les lister)
     * - Le statut du bulk passe de `INITIE` à `CONFIRME`
     *
     * **Idempotence** : Cet endpoint est idempotent.
     * - Premier appel avec `decision: true` → Envoie les demandes, retourne `200 OK {statut: "CONFIRME"}`
     * - Appels suivants avec `decision: true` → Retourne `200 OK {statut: "CONFIRME"}` (idempotent, ne relance pas)
     * - Premier appel avec `decision: false` → Annule, retourne `200 OK {statut: "ANNULE"}`
     * - Appels suivants avec `decision: false` → Retourne `200 OK {statut: "ANNULE"}` (idempotent)
     * - `decision: true` après `decision: false` → Retourne `403 Forbidden` (déjà annulé)
     * - `decision: false` après `decision: true` → Retourne `403 Forbidden` (déjà confirmé)
     *
     * **Timeout adaptatif** : Le délai pour confirmer dépend automatiquement du nombre de transactions :
     * - **1 à 500 transactions** : 24 heures
     * - **501 à 1000 transactions** : 48 heures
     * - **Plus de 1000 transactions** : 72 heures
     *
     * Passé ce délai, la demande expire automatiquement et ne peut plus être confirmée. Le délai exact est indiqué dans le champ `dateExpiration` retourné par `GET /demandes-paiements-groupes/{instructionId}`.
     *
     * **Changement de décision** : Une fois une décision prise, elle est définitive. Impossible de confirmer après avoir annulé, et vice-versa.
     *
     * @returns DemandePaiementEnMasseStatutReponse Confirmation enregistrée avec succès.
     * - Si `decision: true`, le statut passe à `CONFIRME` et les demandes de paiement sont envoyées
     * - Si `decision: false`, le statut passe à `ANNULE`
     *
     * @throws ApiError
     */
    public static demandePaiementGroupeConfirmer({
        instructionId,
        requestBody,
    }: {
        /**
         * L'identifiant de la demande de paiement en masse dans le SI du client
         */
        instructionId: string,
        /**
         * Le client envoie oui ou non s'il confirme l'envoi de la demande de paiement en masse.
         */
        requestBody: DemandePaiementEnMasseConfirmationRequest,
    }): CancelablePromise<DemandePaiementEnMasseStatutReponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/demandes-paiements-groupes/{instructionId}/confirmations',
            path: {
                'instructionId': instructionId,
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
}
