/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Paiement } from '../models/Paiement';
import type { PaiementAnnulationReponseRequest } from '../models/PaiementAnnulationReponseRequest';
import type { PaiementAnnulationRequest } from '../models/PaiementAnnulationRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DemandeAnnulationService {
    /**
     * Demander l'annulation d'un paiement
     * Ce point de terminaison permet de demander l'annulation d'un paiement envoyé.
     *
     * À l'acceptation de la demande d'annulation, le payé effectue un retour de fonds et le business recevra une notification `RETOUR_RECU` s'il a souscrit au service de webhook.
     *
     * Si le payé refuse la demande d'annulation, le business recevra une notification `ANNULATION_REJETE`.
     *
     * **Note importante sur l'idempotence :**
     *
     * Cet endpoint utilise **POST (pas PUT)** car chaque appel envoie une **nouvelle demande d'annulation** au PSP bénéficiaire.
     *
     * **Comportement :**
     * - Premier appel → Nouvelle demande d'annulation envoyée
     * - Deuxième appel → **Nouvelle demande d'annulation envoyée** (pas idempotent)
     * - Troisième appel → **Nouvelle demande d'annulation envoyée**
     *
     * **Cas d'usage :**
     * - La première demande a été refusée, vous réessayez
     * - Vous voulez relancer une demande en attente
     * - Vous avez de nouvelles informations justifiant l'annulation
     *
     * @returns Paiement Demande d'annulation envoyée
     * @throws ApiError
     */
    public static demandeAnnulationEnvoyer({
        end2EndId,
        requestBody,
    }: {
        /**
         * L'identifiant unique de bout en bout de la transaction
         */
        end2EndId: string,
        requestBody: PaiementAnnulationRequest,
    }): CancelablePromise<Paiement> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/paiements/{end2endId}/annulations',
            path: {
                'end2endId': end2EndId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Autorisations manquantes`,
                403: `Interdiction d'effectuer la demande d'annulation`,
                429: `Erreur inattendue`,
                503: `Erreur inattendue du serveur`,
            },
        });
    }
    /**
     * Répondre à une demande d'annulation
     * Ce point de terminaison permet au business de répondre à une demande d'annulation de paiement.
     *
     * Le business peut accepter ou refuser la demande d'annulation :
     * - `decision: true` : Accepte la demande d'annulation (le business effectuera un retour de fonds)
     * - `decision: false` : Refuse la demande d'annulation
     *
     * **Idempotence** : Cet endpoint est idempotent.
     * - Premier appel avec `decision: true` → Accepte la demande, retourne `200 OK {statut: "ACCEPTEE"}`
     * - Appels suivants avec `decision: true` → Retourne `200 OK` avec l'état actuel - idempotent
     * - Premier appel avec `decision: false` → Refuse la demande, retourne `200 OK {statut: "REJETEE"}`
     * - Appels suivants avec `decision: false` → Retourne `200 OK {statut: "REJETEE"}` (idempotent)
     * - `decision: true` après `decision: false` → Retourne `403 Forbidden` (déjà refusée)
     * - `decision: false` après `decision: true` → Retourne `403 Forbidden` (déjà acceptée)
     *
     * @returns Paiement Réponse à la demande d'annulation enregistrée.
     *
     * La réponse retourne l'objet `Paiement` complet avec les champs mis à jour selon la décision :
     *
     * **En cas d'acceptation (`decision: true`)** :
     * - `annulationStatut` : Mis à jour pour indiquer l'acceptation
     * - `annulationDateReponse` : Date et heure de la réponse à la demande d'annulation
     * - Un retour de fonds est automatiquement initié par le participant, donc les champs suivants sont également renseignés :
     * - `retourStatut` : Statut du retour de fonds (ex: `INITIE`, `ENVOYE`, `IRREVOCABLE`)
     * - `retourStatutRaison` : Raison du statut du retour de fonds
     * - `retourDateDemande` : Date de création du retour de fonds
     * - `retourDateIrrevocabilite` : Date à laquelle le retour de fonds est irrévocable (si applicable)
     *
     * **En cas de rejet (`decision: false`)** :
     * - `annulationStatut` : Mis à jour pour indiquer le rejet (ex: `REJETE`)
     * - `annulationDateReponse` : Date et heure de la réponse à la demande d'annulation
     * - Les champs `retour*` ne sont **pas** renseignés car aucun retour de fonds n'est effectué
     *
     * @throws ApiError
     */
    public static demandeAnnulationRepondre({
        end2EndId,
        requestBody,
    }: {
        /**
         * L'identifiant unique de bout en bout de la transaction
         */
        end2EndId: string,
        /**
         * La réponse du business à la demande d'annulation
         */
        requestBody: PaiementAnnulationReponseRequest,
    }): CancelablePromise<Paiement> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/paiements/{end2endId}/annulations/reponses',
            path: {
                'end2endId': end2EndId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Autorisations manquantes`,
                403: `Opération interdite`,
                429: `Erreur inattendue`,
                503: `Erreur inattendue du serveur`,
            },
        });
    }
}
