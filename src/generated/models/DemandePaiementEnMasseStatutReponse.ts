/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type DemandePaiementEnMasseStatutReponse = {
    /**
     * Identifiant de la demande de paiement en masse
     */
    instructionId?: string;
    /**
     * Statut global de la demande de paiement en masse:
     * - `INITIE`: Créée avec confirmation demandée, en attente de confirmation
     * - `CONFIRME`: Confirmée par le business ( pour savoir si le traitement est terminé, vérifiez que `transactionsIrrevocables + transactionsRejetees = transactionsTotal`)
     * - `ANNULE`: Annulée par le business
     *
     * **Évolution selon le mode de création :**
     * - Si créée **avec confirmation** (`confirmation: true`) : `INITIE` → `CONFIRME` (après PUT /confirmations) ou `ANNULE`
     * - Si créée **sans confirmation** (`confirmation: false`) : Directement `CONFIRME` (aucune action requise du business)
     *
     */
    statut?: DemandePaiementEnMasseStatutReponse.statut;
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
     * Nombre total de transactions dans la demande de paiement en masse
     */
    transactionsTotal?: number;
    /**
     * Nombre de transactions à l'état `INITIE` (validées avec succès, prêtes à être envoyées).
     *
     * Si créée avec `confirmation: true`, ces transactions ont passé toutes les validations :
     * - txId unique (pas de duplication)
     * - Alias du payeur valide (recherche d'alias réussie)
     * - Nom et pays du payeur disponibles
     *
     * Ce sont ces transactions qui seront envoyées lors de la confirmation.
     *
     * **Vérification de fin de validation :** La validation est terminée quand `transactionsInitiees + transactionsRejetees = transactionsTotal`.
     *
     */
    transactionsInitiees?: number;
    /**
     * Nombre de transactions à l'état `ENVOYE` (demandes envoyées au payeur)
     */
    transactionsEnvoyees?: number;
    /**
     * Nombre de transactions à l'état `IRREVOCABLE` (demandes acceptées et payées par le payeur)
     */
    transactionsIrrevocables?: number;
    /**
     * Nombre de transactions à l'état `REJETE` (échecs de validation ou refus du payeur).
     *
     * Comprend :
     * - Rejets de validation (avant envoi) : BE23 (alias invalide), DU03 (txId dupliqué)
     * - Rejets d'envoi (après confirmation) : Alias du payeur indisponible, etc.
     * - Refus du payeur (le payeur a rejeté la demande)
     *
     * **Note :** Les transactions rejetées à la validation ne sont jamais envoyées, même si le bulk est confirmé.
     *
     */
    transactionsRejetees?: number;
    /**
     * Date de création de la demande de paiement en masse (date de la demande)
     */
    dateDemande?: string;
    /**
     * Date de confirmation par le business (date d'acceptation de la demande).
     * Présent uniquement si statut = CONFIRME.
     *
     * - Si créée avec confirmation: Date du PUT /confirmations avec decision: true
     * - Si créée sans confirmation: Correspond à dateDemande (confirmation automatique)
     *
     */
    dateConfirmation?: string;
};
export namespace DemandePaiementEnMasseStatutReponse {
    /**
     * Statut global de la demande de paiement en masse:
     * - `INITIE`: Créée avec confirmation demandée, en attente de confirmation
     * - `CONFIRME`: Confirmée par le business ( pour savoir si le traitement est terminé, vérifiez que `transactionsIrrevocables + transactionsRejetees = transactionsTotal`)
     * - `ANNULE`: Annulée par le business
     *
     * **Évolution selon le mode de création :**
     * - Si créée **avec confirmation** (`confirmation: true`) : `INITIE` → `CONFIRME` (après PUT /confirmations) ou `ANNULE`
     * - Si créée **sans confirmation** (`confirmation: false`) : Directement `CONFIRME` (aucune action requise du business)
     *
     */
    export enum statut {
        INITIE = 'INITIE',
        CONFIRME = 'CONFIRME',
        ANNULE = 'ANNULE',
    }
}

