/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RefDocType } from './RefDocType';
export type DemandePaiementRequestBase = {
    /**
     * Identifiant de la demande de paiement dans le SI du client
     */
    txId: string;
    /**
     * Alias de compte du client payeur à qui est adressée la demande
     */
    payeurAlias: string;
    /**
     * L'alias de compte dans lequel le client payé souhaite recevoir les paiements
     */
    payeAlias: string;
    /**
     * L'URL du logo du business ou d'un produit du business qui sera affiché au client payeur
     */
    logoUrl?: string;
    /**
     * Lorsque le PSP reçoit la demande, il effectue une recherche d'alias en vue d'obtenir les informations de compte du client payeur.
     *
     * L'attribut `confirmation` permet au client d'indiquer à son PSP si celui-ci doit lui retourner les résultats de la recherche d'alias pour confirmation:
     *
     * * La valeur `true` de la confirmation indique au PSP qu'il doit retourner le résultat de la recherche d'alias au client et attendre une confirmation
     * * La valeur `false` indique qu'une confirmation n'est pas requise pour la demande, de ce fait le PSP transmet directement la demande à PI
     *
     */
    confirmation: boolean;
    /**
     * Le montant total du paiement à effectuer
     */
    montant: number;
    /**
     * Le motif de la demande de paiement
     */
    motif?: string;
    /**
     * Le numéro / la référence du document justificatif
     */
    refDocNumero?: string;
    refDocType?: RefDocType;
};

