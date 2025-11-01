/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnnulationStatut } from './AnnulationStatut';
import type { PaiementAnnulationMotif } from './PaiementAnnulationMotif';
import type { PaiementAnnulationStatutRaison } from './PaiementAnnulationStatutRaison';
import type { PaiementRequest } from './PaiementRequest';
import type { PaiementStatut } from './PaiementStatut';
import type { PaiementStatutRaison } from './PaiementStatutRaison';
import type { RetourStatut } from './RetourStatut';
import type { RetourStatutRaison } from './RetourStatutRaison';
export type Paiement = (PaiementRequest & {
    /**
     * Lorsque le PSP recoit la demande, il effectue une recherche d'alias en vue d'obtenir les informations de compte du client payé.
     *
     * L'attribut `confirmation` permet au client d'indiquer à son PSP si celui-ci doit lui retourner les resultats de la recherche d'alias pour confirmation:
     *
     * - La valeur `true` de la validation indique au PSP qu'il doit retourner le resultat de la recherche d'alias au client et attendre une validation avant d'effectuer le paiement.
     * - La valeur `false` indique qu'une validation n'est pas requise pour la demande, de ce fait, le PSP transmet la demande à PI sans attendre la validation du client business.
     *
     */
    confirmation?: boolean;
    /**
     * Le nom du payé (Retourné dans le cas d'un paiement envoyé)
     */
    payeNom?: string;
    /**
     * Le pays de residence du payé (Retourné dans le cas d'un paiement envoyé)
     */
    payePays?: string;
    /**
     * Le nom du payeur (Retourné dans le cas d'un paiement reçu)
     */
    payeurNom?: string;
    /**
     * Le pays de residence du payeur (Retourné dans le cas d'un paiement reçu)
     */
    payeurPays?: string;
    /**
     * Le numéro de compte du payeur
     */
    payeurCompte?: string;
    /**
     * Le numéro de compte du payé
     */
    payeCompte?: string;
    /**
     * La catégorie du paiement / Canal de paiement
     * - `631` Demande de paiement provenant d'un particulier
     * - `000` Paiement par QR Code Statique
     * - `400` Paiement par QR Code Dynamique
     * - `733` Ordre de paiement via l'API Business
     * - `300` Via le canal USSD
     * - `999` Ordre de transfert bancaire
     * - `500` Demande de Paiement sur site
     * - `521` Demande de Paiement e-commerce
     * - `401` Autres demandes de paiement de facture
     *
     */
    categorie?: Paiement.categorie;
    statut?: PaiementStatut;
    statutRaison?: PaiementStatutRaison;
    /**
     * Identifiant unique de bout en bout de la transaction
     */
    end2endId?: string;
    /**
     * Identifiant du paiement en masse dans le SI du client
     */
    instructionId?: string;
    /**
     * Les frais appliqués par le participant (Optionnel - dépend du modèle de facturation utilisé par le participant)
     */
    montantFrais?: number;
    /**
     * Date de création du paiement: date et heure à laquelle le paiement a été initié par le client business.
     *
     */
    dateDemande?: string;
    /**
     * Date de confirmation de la demande si le client payé avait requis la confirmation du paiement.
     * Il s'agit de la date et heure à laquelle le client a confirmé la transaction.
     *
     * Pour un paiement reçu, cette date correspond à la date de confirmation du paiement par le payeur.
     *
     */
    dateConfirmation?: string;
    /**
     * Date d'envoi de la demande: date et heure à laquelle le paiement est envoyé par le participant (PSP)
     *
     */
    dateEnvoi?: string;
    /**
     * Date à laquelle le paiement est irrévocable
     *
     */
    dateIrrevocabilite?: string;
    /**
     * Date à laquelle la réponse du paiement a été reçue
     *
     */
    dateReponse?: string;
    retourStatut?: RetourStatut;
    retourStatutRaison?: RetourStatutRaison;
    /**
     * Date de création du paiement: date et heure à laquelle le retour de fonds a été initié par le client business.
     *
     */
    retourDateDemande?: string;
    /**
     * Date à laquelle le retour de fonds est irrévocable
     *
     */
    retourDateIrrevocabilite?: string;
    /**
     * Date à laquelle la réponse au retour de fonds a été reçue
     *
     */
    retourDateReponse?: string;
    annulationStatut?: AnnulationStatut;
    annulationMotif?: PaiementAnnulationMotif;
    annulationStatutRaison?: PaiementAnnulationStatutRaison;
    /**
     * Date de reception de la demande d'annulation par le participant
     *
     */
    annulationDateDemande?: string;
    /**
     * Date à laquelle la réponse à la demande d'annulation a été reçue (Date de rejet de la demande)
     *
     */
    annulationDateReponse?: string;
});
export namespace Paiement {
    /**
     * La catégorie du paiement / Canal de paiement
     * - `631` Demande de paiement provenant d'un particulier
     * - `000` Paiement par QR Code Statique
     * - `400` Paiement par QR Code Dynamique
     * - `733` Ordre de paiement via l'API Business
     * - `300` Via le canal USSD
     * - `999` Ordre de transfert bancaire
     * - `500` Demande de Paiement sur site
     * - `521` Demande de Paiement e-commerce
     * - `401` Autres demandes de paiement de facture
     *
     */
    export enum categorie {
        _631 = '631',
        _000 = '000',
        _400 = '400',
        _733 = '733',
        _300 = '300',
        _999 = '999',
        _500 = '500',
        _521 = '521',
        _401 = '401',
    }
}

