/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaiementRequest } from './PaiementRequest';
import type { PaiementStatutRaison } from './PaiementStatutRaison';
export type PaiementImmediatReponse = ((PaiementRequest & {
    statut: PaiementImmediatReponse.statut;
    confirmation: boolean;
    /**
     * Le nom du payé
     */
    payeNom: string;
    /**
     * Le pays de residence du payé
     */
    payePays: string;
    /**
     * Identifiant unique de bout en bout de la transaction
     */
    end2endId: string;
    /**
     * Date de création du paiement: date et heure à laquelle le paiement a été initié par le client business.
     *
     */
    dateDemande: string;
    /**
     * Les frais appliqués par le participant (Optionnel - dépend du modèle de facturation utilisé par le participant)
     */
    montantFrais?: number;
}) | (PaiementRequest & {
    statut: PaiementImmediatReponse.statut;
    confirmation: boolean;
    /**
     * Le nom du bénéficiaire
     */
    payeNom: string;
    /**
     * Le pays de résidence du bénéficiaire
     */
    payePays: string;
    /**
     * Identifiant unique de bout en bout de la transaction
     */
    end2endId: string;
    /**
     * Date de création du paiement: date et heure à laquelle le paiement a été initié par le client business.
     *
     */
    dateDemande: string;
    /**
     * Date d'acceptation de la demande:  date et heure à laquelle l'ordre de transfert du client business est reçu par le participant.
     *
     * Dans le cas d'un paiement sans confirmation, elle correspond également à `dateDemande`.
     *
     */
    dateConfirmation: string;
    /**
     * Date d'envoi du paiement
     */
    dateEnvoi?: string;
    /**
     * Les frais appliqués par le participant (Optionnel - dépend du modèle de facturation utilisé par le participant)
     */
    montantFrais?: number;
}) | (PaiementRequest & {
    statut: PaiementImmediatReponse.statut;
    statutRaison: PaiementStatutRaison;
    /**
     * Le nom du bénéficiaire (présent seulement si la recherche d'alias a réussi).
     *
     * Absent si statutRaison = BE23 (alias invalide).
     * Présent si statutRaison = DU03 (txId dupliqué) ou autres codes.
     *
     */
    payeNom?: string;
    /**
     * Le pays de résidence du bénéficiaire (présent seulement si la recherche d'alias a réussi).
     *
     * Absent si statutRaison = BE23 (alias invalide).
     * Présent si statutRaison = DU03 (txId dupliqué) ou autres codes.
     *
     */
    payePays?: string;
    /**
     * Identifiant unique de bout en bout de la transaction
     */
    end2endId: string;
    /**
     * Date de création du paiement
     */
    dateDemande: string;
    /**
     * Date à laquelle le paiement a été rejeté
     */
    dateReponse?: string;
}));
export namespace PaiementImmediatReponse {
    export enum statut {
        INITIE = 'INITIE',
    }
}

