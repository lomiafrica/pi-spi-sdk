/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DemandePaiementStatutRaison } from './DemandePaiementStatutRaison';
import type { RefDocType } from './RefDocType';
export type DemandePaiementConsultationReponse = {
    /**
     * Identifiant de la demande de paiement dans le SI du client
     */
    txId?: string;
    /**
     * Categorie de la demande de paiement
     */
    categorie?: DemandePaiementConsultationReponse.categorie;
    /**
     * L'alias de compte dans lequel le client payé souhaite recevoir les paiements
     */
    payeAlias?: string;
    /**
     * L'URL du logo du business ou d'un produit du business qui sera affiché au client payeur
     */
    logoUrl?: string;
    /**
     * Alias de compte du client payeur à qui est adressée la demande
     */
    payeurAlias?: string;
    /**
     * Lorsque le PSP reçoit la demande, il effectue une recherche d'alias en vue d'obtenir les informations de compte du client payeur.
     *
     * L'attribut `confirmation` permet au client d'indiquer à son PSP si celui-ci doit lui retourner les résultats de la recherche d'alias pour confirmation:
     *
     * * La valeur `true` de la confirmation indique au PSP qu'il doit retourner le résultat de la recherche d'alias au client et attendre une confirmation
     * * La valeur `false` indique qu'une confirmation n'est pas requise pour la demande, de ce fait le PSP transmet directement la demande à PI
     *
     */
    confirmation?: boolean;
    /**
     * Remise appliquée sur la demande de paiement
     */
    remise?: {
        /**
         * Le montant de la remise
         */
        montant?: number;
        /**
         * Le taux de la remise
         */
        taux?: number;
    };
    /**
     * Indique si le client peut acheter maintenant et payer plus tard.
     */
    debitDiffere?: boolean;
    /**
     * Le montant total du paiement à effectuer
     */
    montant?: number;
    /**
     * Le montant de l'achat
     */
    montantAchat?: number;
    /**
     * Le montant du retrait
     */
    montantRetrait?: number;
    /**
     * Les frais de retrait
     */
    montantFrais?: number;
    /**
     * Le motif de la demande de paiement
     */
    motif?: string;
    /**
     * Le numéro / la référence du document justificatif
     */
    refDocNumero?: string;
    refDocType?: RefDocType;
    /**
     * - `INITIE` si la confirmation du client est attendue suite à la recherche d'alias,
     * - `ENVOYE` si les validations sont concluantes et que le PSP a envoyé la demande
     * - `IRREVOCABLE` si le payeur a accepté la demande
     * - `REJETE` si le payeur rejète la demande
     *
     */
    statut?: DemandePaiementConsultationReponse.statut;
    statutRaison?: DemandePaiementStatutRaison;
    /**
     * Le nom du payeur
     */
    payeurNom?: string;
    /**
     * Le pays de residence du payeur
     */
    payeurPays?: string;
    /**
     * Date limite de paiement
     */
    dateLimitePaiement?: string;
    /**
     * Date limite de réponse
     */
    dateLimiteReponse?: string;
    /**
     * Date de la demande de paiement
     *
     */
    dateDemande?: string;
    /**
     * Date de confirmation de la demande si le client avait requis la confirmation de la demande de paiement.
     * Il s'agit de la date et heure à laquelle le client a confirmé la demande.
     *
     */
    dateConfirmation?: string;
    /**
     * Date d'envoi de la demande: date et heure à laquelle la demande de paiement est envoyée par le PSP
     *
     */
    dateEnvoi?: string;
    /**
     * Date à laquelle le payeur à repondu à la demande de paiement
     *
     */
    dateReponse?: string;
    /**
     * Date à laquelle le paiement accepté est irrévocable
     *
     */
    dateIrrevocabilite?: string;
};
export namespace DemandePaiementConsultationReponse {
    /**
     * Categorie de la demande de paiement
     */
    export enum categorie {
        _631 = '631',
        _500 = '500',
        _521 = '521',
        _401 = '401',
    }
    /**
     * - `INITIE` si la confirmation du client est attendue suite à la recherche d'alias,
     * - `ENVOYE` si les validations sont concluantes et que le PSP a envoyé la demande
     * - `IRREVOCABLE` si le payeur a accepté la demande
     * - `REJETE` si le payeur rejète la demande
     *
     */
    export enum statut {
        INITIE = 'INITIE',
        ENVOYE = 'ENVOYE',
        IRREVOCABLE = 'IRREVOCABLE',
        REJETE = 'REJETE',
    }
}

