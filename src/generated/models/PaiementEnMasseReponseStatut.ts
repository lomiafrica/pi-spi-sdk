/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PaiementEnMasseReponseStatut = {
    /**
     * Identifiant du paiement en masse
     */
    instructionId?: string;
    /**
     * Statut global du paiement en masse:
     * - `INITIE`: Créé avec confirmation demandée, en attente de confirmation
     * - `CONFIRME`: Confirmé et en cours de traitement (ou traitement terminé)
     * - `ANNULE`: Annulé par le business avant confirmation
     *
     * **Évolution selon le mode de création :**
     * - Si créé **avec confirmation** (`confirmation: true`) : `INITIE` → `CONFIRME` (après PUT /confirmations) ou `ANNULE`
     * - Si créé **sans confirmation** (`confirmation: false`) : Directement `CONFIRME` (aucune action requise du business)
     *
     */
    statut?: PaiementEnMasseReponseStatut.statut;
    /**
     * Date d'expiration de la confirmation (délai adaptatif selon nombre de transactions).
     * Présent uniquement si statut = INITIE.
     *
     * Délais :
     * - 1 à 500 transactions : 24 heures
     * - 501 à 1000 transactions : 48 heures
     * - Plus de 1000 transactions : 72 heures
     *
     */
    dateExpiration?: string;
    /**
     * Nombre total de transactions dans le paiement en masse
     */
    transactionsTotal?: number;
    /**
     * Nombre de transactions à l'état `INITIE` (validées avec succès, prêtes à être envoyées).
     *
     * Si créé avec `confirmation: true`, ces transactions ont passé toutes les validations :
     * - txId unique (pas de duplication)
     * - Alias valide (recherche d'alias réussie)
     * - Nom et pays du bénéficiaire disponibles
     *
     * Ce sont ces transactions qui seront envoyées lors de la confirmation.
     *
     * **Vérification de fin de validation :** La validation est terminée quand `transactionsInitiees + transactionsRejetees = transactionsTotal`.
     *
     */
    transactionsInitiees?: number;
    /**
     * Nombre de transactions à l'état `ENVOYE` (en cours d'envoi vers le système bancaire)
     */
    transactionsEnvoyees?: number;
    /**
     * Nombre de transactions à l'état `IRREVOCABLE` (paiements réussis et finalisés)
     */
    transactionsIrrevocables?: number;
    /**
     * Nombre de transactions à l'état `REJETE` (échecs de validation ou d'envoi).
     *
     * Comprend :
     * - Rejets de validation (avant envoi) : BE23 (alias invalide), DU03 (txId dupliqué)
     * - Rejets d'envoi (après confirmation) : AM04 (solde insuffisant), AGNT (PSP indisponible), etc.
     *
     * **Note :** Les transactions rejetées à la validation ne sont jamais envoyées, même si le bulk est confirmé.
     *
     */
    transactionsRejetees?: number;
    /**
     * Date de création du paiement en masse (date de la demande)
     */
    dateDemande?: string;
    /**
     * Date de confirmation par le business (date d'acceptation de la demande).
     * Présent uniquement si statut = CONFIRME.
     *
     * - Si créé avec confirmation: Date du PUT /confirmations avec decision: true
     * - Si créé sans confirmation: Correspond à dateDemande (confirmation automatique)
     *
     */
    dateConfirmation?: string;
};
export namespace PaiementEnMasseReponseStatut {
    /**
     * Statut global du paiement en masse:
     * - `INITIE`: Créé avec confirmation demandée, en attente de confirmation
     * - `CONFIRME`: Confirmé et en cours de traitement (ou traitement terminé)
     * - `ANNULE`: Annulé par le business avant confirmation
     *
     * **Évolution selon le mode de création :**
     * - Si créé **avec confirmation** (`confirmation: true`) : `INITIE` → `CONFIRME` (après PUT /confirmations) ou `ANNULE`
     * - Si créé **sans confirmation** (`confirmation: false`) : Directement `CONFIRME` (aucune action requise du business)
     *
     */
    export enum statut {
        INITIE = 'INITIE',
        CONFIRME = 'CONFIRME',
        ANNULE = 'ANNULE',
    }
}

