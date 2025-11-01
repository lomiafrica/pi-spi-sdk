/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DemandePaiementRequestCategorie } from './DemandePaiementRequestCategorie';
import type { DemandePaiementStatut } from './DemandePaiementStatut';
import type { DemandePaiementStatutRaison } from './DemandePaiementStatutRaison';
import type { RefDocType } from './RefDocType';
export type DemandePaiementReponse = {
    /**
     * Identifiant de la demande de paiement dans le SI du client
     */
    txId?: string;
    /**
     * Alias de compte du client payeur à qui est adressé la demande
     */
    payeurAlias?: string;
    /**
     * L'alias de compte dans lequel le client payé souhaite recevoir les paiements
     */
    payeAlias?: string;
    /**
     * Lorsque le PSP recoit la demande, il effectue une recherche d'alias en vue d'obtenir les informations de compte du client payeur.
     *
     * L'attribut `confirmation` permet au client d'indiquer à son PSP si celui-ci doit lui retourner les resultats de la recherche d'alias pour confirmation:
     *
     * * La valeur `true` de la confirmation indique au PSP qu'il doit retourner le resultat de la recherche d'alias au client et attendre une confirmation
     * * La valeur `false` indique qu'une confirmation n'est pas requise pour la demande, de ce fait le PSP transmet directement la demande à PI
     *
     */
    confirmation?: boolean;
    categorie?: DemandePaiementRequestCategorie;
    /**
     * La date limite à laquelle le payeur doit avoir effectuer le paiement.
     * Dans le cas d'une demande de paiement de facture, il s'agit en général de la date indiquée avec la mention "A payer avant".
     *
     */
    dateLimitePaiement?: string;
    /**
     * C'est la date limite avant laquelle une réponse doit être fournie par le payeur.
     * La demande de paiement expire à cette date. Le client payé ne peut ni accepter ni refuser après cette date.
     * Par défaut, la date limite de réponse est la date de la demande + 92 jours (3 mois).
     *
     */
    dateLimiteReponse?: string;
    /**
     * Le montant du paiement à effectué
     */
    montant?: number;
    /**
     * Le montant de l'achat dans le cadre d'une demande de paiement PICO
     */
    montantAchat?: number;
    /**
     * Le montant du retrait dans le cadre d'une demande de paiement PICO ou PICASH
     */
    montantRetrait?: number;
    /**
     * Les frais de retrait dans le cadre d'une demande de paiement PICO
     */
    montantFrais?: number;
    /**
     * Remise appliquée pour un paiement immédiat dés réception de la demande
     *
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
     * Indique si le payeur peut acheter maintenant et payer plus tard.
     *
     * La valeur est true pour un paiement immédiat avec débit différé (Acheter maintenant, payer plus tard).
     * Dans le cas du débit différé, le participant du client payeur paye le montant demandé prenant en compte la remise.
     *
     */
    debitDiffere?: boolean;
    /**
     * Le motif de la demande de paiement
     */
    motif?: string;
    /**
     * Le numéro / la reference du document justificatif
     */
    refDocNumero?: string;
    refDocType?: RefDocType;
    statut?: DemandePaiementStatut;
    statutRaison?: DemandePaiementStatutRaison;
    /**
     * Le nom du payeur.
     *
     * **Présence selon le statut :**
     * - `INITIE` (avec confirmation) : Présent ✅
     * - `ENVOYE` (sans confirmation) : Présent ✅
     * - `REJETE` avec BE23 ou DU03 : Absent ❌
     *
     */
    payeurNom?: string;
    /**
     * Le pays de résidence du payeur.
     *
     * **Présence selon le statut :**
     * - `INITIE` (avec confirmation) : Présent ✅
     * - `ENVOYE` (sans confirmation) : Présent ✅
     * - `REJETE` avec BE23 ou DU03 : Absent ❌
     *
     */
    payeurPays?: string;
    /**
     * Identifiant unique de bout en bout de la transaction
     */
    end2endId?: string;
    /**
     * Date d'envoi de la demande de paiement par le business
     */
    dateDemande?: string;
    /**
     * Date d'envoi de la demande de paiement par le participant
     */
    dateEnvoi?: string;
    /**
     * Date de confirmation de la demande si le client avait requis la confirmation de la demande de paiement.
     * Il s'agit de la date et heure à laquelle le client a confirmé la demande.
     *
     */
    dateConfirmation?: string;
};

