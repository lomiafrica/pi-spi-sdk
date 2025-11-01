/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Paiement } from '../models/Paiement';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RetoursdeFondsService {
    /**
     * Retourner les fonds
     * Ce point de terminaison permet au business de retourner les fonds d'un paiement reçu.
     *
     * **Idempotence** : Cet endpoint est idempotent. Plusieurs appels avec le même `end2endId` produiront le même résultat.
     * Si le retour de fonds a déjà été envoyé et irrévocable, le champ `retourStatut` de la réponse sera `IRREVOCABLE`.
     * Si le retour de fonds a été envoyé et rejeté, le retour de fonds sera envoyé à nouveau.
     * Si le retour de fonds est en cours d'envoi, le champ `retourStatut` de la réponse sera `INITIE`.
     *
     * **Notifications webhook** : Après envoi du retour de fonds, si le business a souscrit au service de webhook, il recevra :
     * - Une notification `RETOUR_ENVOYE` en cas de succès du retour de fonds
     * - Une notification `RETOUR_REJETE` en cas de rejet de la demande
     *
     * **Vérification du statut** : Pour obtenir le statut d'un retour de fonds envoyé, vous pouvez invoquer l'endpoint `GET /paiements/{end2endId}` et le champ `retourStatut` de la réponse indiquera l'état du retour de fonds.
     *
     * @returns Paiement Retour de fonds enregistré avec succès
     * @throws ApiError
     */
    public static retourFondsEnvoyer({
        end2EndId,
    }: {
        /**
         * L'identifiant unique de bout en bout de la transaction
         */
        end2EndId: string,
    }): CancelablePromise<Paiement> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/paiements/{end2endId}/retours',
            path: {
                'end2endId': end2EndId,
            },
            errors: {
                401: `Autorisations manquantes`,
                403: `Interdiction d'effectuer le retour de fonds`,
                429: `Erreur inattendue`,
                503: `Erreur inattendue du serveur`,
            },
        });
    }
}
