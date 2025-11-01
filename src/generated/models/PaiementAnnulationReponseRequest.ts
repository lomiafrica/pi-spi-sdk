/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaiementAnnulationReponseRequestAccepter } from './PaiementAnnulationReponseRequestAccepter';
import type { PaiementAnnulationReponseRequestRejeter } from './PaiementAnnulationReponseRequestRejeter';
/**
 * Réponse à une demande d'annulation de paiement.
 *
 * Le business peut accepter ou refuser la demande d'annulation :
 * - `decision: true` : Accepte la demande d'annulation
 * - `decision: false` : Refuse la demande d'annulation
 *
 */
export type PaiementAnnulationReponseRequest = (PaiementAnnulationReponseRequestAccepter | PaiementAnnulationReponseRequestRejeter);

