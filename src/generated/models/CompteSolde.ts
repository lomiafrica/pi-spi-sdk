/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CompteSolde = {
    /**
     * Le type du compte.
     * Types de comptes disponibles :
     * - **CACC** (Current Account) : Compte courant utilisé pour enregistrer les débits et crédits lorsqu'aucun compte spécifique n'a été désigné.
     * - **CARD** (Card Account) : Compte utilisé pour les paiements par carte de crédit.
     * - **CASH** (Cash Payment) : Compte utilisé pour le paiement en espèces.
     * - **CHAR** (Charges) : Compte utilisé pour les frais s'il diffère du compte de paiement.
     * - **CISH** (Cash Income) : Compte utilisé pour le paiement des revenus s'il diffère du compte courant en espèces.
     * - **COMM** (Commission) : Compte utilisé pour les commissions s'il diffère du compte de paiement.
     * - **CPAC** (Clearing Participant Settlement Account) : Compte utilisé pour enregistrer les écritures de règlement débit et crédit au nom d'un participant de compensation désigné.
     * - **LLSV** (Limited Liquidity Savings Account) : Compte utilisé pour l'épargne avec des conditions spéciales d'intérêt et de retrait.
     * - **LOAN** (Loan) : Compte utilisé pour les prêts.
     * - **MGLD** (Marginal Lending) : Compte utilisé pour une facilité de prêt marginal.
     * - **MOMA** (Money Market) : Compte utilisé pour les marchés monétaires s'il diffère du compte en espèces.
     * - **NREX** (Non Resident External) : Compte utilisé pour les non-résidents externes.
     * - **ODFT** (Overdraft) : Compte utilisé pour les découverts.
     * - **ONDP** (Over Night Deposit) : Compte utilisé pour les dépôts au jour le jour.
     * - **SACC** (Settlement Account) : Compte utilisé pour enregistrer les écritures débit et crédit résultant de transactions compensées et réglées via un système spécifique de compensation et de règlement.
     * - **SLRY** (Salary) : Comptes utilisés pour les paiements de salaires.
     * - **SVGS** (Savings) : Compte utilisé pour l'épargne.
     * - **TAXE** (Tax) : Compte utilisé pour les taxes s'il diffère du compte de paiement.
     * - **TRAN** (Transacting Account) : Compte de transaction, le type de compte bancaire le plus basique. La principale différence entre les comptes de transaction et les comptes chèques est qu'il n'y a généralement pas de chéquier ni de facilité de découvert.
     * - **TRAS** (Cash Trading) : Compte utilisé pour le trading s'il diffère du compte en espèces courant.
     * - **VACC** (Virtual Account) : Compte créé virtuellement pour faciliter la collecte et le rapprochement.
     * - **OTHR** (Other Account) : Type de compte non spécifié
     *
     */
    type?: CompteSolde.type;
    /**
     * Le numéro de compte
     */
    numero?: string;
    /**
     * La date d'ouverture du compte au format ISO8601 (YYYY-MM-DD)
     */
    dateOuverture?: string;
    /**
     * Le solde du compte
     */
    solde?: number;
    /**
     * Le statut actuel du compte.
     *
     * Statuts disponibles :
     *
     * - **OUVERT** : Le compte est actif et opérationnel. Toutes les opérations sont autorisées.
     * - **BLOQUE** : Le compte est temporairement bloqué. Aucune opération n'est autorisée.
     * - **CLOTURE** : Le compte est fermé définitivement. Aucune opération n'est possible.
     *
     */
    statut?: CompteSolde.statut;
    /**
     * Indique si l'attribut preConfirmation est présent.
     * PreConfirmation est un attribut optionnel.
     * Par défaut, pour les clients business (entreprises et les gouvernements), PI marque l'irrévocabilité du transfert de fonds sans demander une confirmation au participant payé.
     * La valeur par défaut est false pour indiquer que le compte reçoit des transferts sans préconfirmation.
     *
     */
    preConfirmation?: boolean;
};
export namespace CompteSolde {
    /**
     * Le type du compte.
     * Types de comptes disponibles :
     * - **CACC** (Current Account) : Compte courant utilisé pour enregistrer les débits et crédits lorsqu'aucun compte spécifique n'a été désigné.
     * - **CARD** (Card Account) : Compte utilisé pour les paiements par carte de crédit.
     * - **CASH** (Cash Payment) : Compte utilisé pour le paiement en espèces.
     * - **CHAR** (Charges) : Compte utilisé pour les frais s'il diffère du compte de paiement.
     * - **CISH** (Cash Income) : Compte utilisé pour le paiement des revenus s'il diffère du compte courant en espèces.
     * - **COMM** (Commission) : Compte utilisé pour les commissions s'il diffère du compte de paiement.
     * - **CPAC** (Clearing Participant Settlement Account) : Compte utilisé pour enregistrer les écritures de règlement débit et crédit au nom d'un participant de compensation désigné.
     * - **LLSV** (Limited Liquidity Savings Account) : Compte utilisé pour l'épargne avec des conditions spéciales d'intérêt et de retrait.
     * - **LOAN** (Loan) : Compte utilisé pour les prêts.
     * - **MGLD** (Marginal Lending) : Compte utilisé pour une facilité de prêt marginal.
     * - **MOMA** (Money Market) : Compte utilisé pour les marchés monétaires s'il diffère du compte en espèces.
     * - **NREX** (Non Resident External) : Compte utilisé pour les non-résidents externes.
     * - **ODFT** (Overdraft) : Compte utilisé pour les découverts.
     * - **ONDP** (Over Night Deposit) : Compte utilisé pour les dépôts au jour le jour.
     * - **SACC** (Settlement Account) : Compte utilisé pour enregistrer les écritures débit et crédit résultant de transactions compensées et réglées via un système spécifique de compensation et de règlement.
     * - **SLRY** (Salary) : Comptes utilisés pour les paiements de salaires.
     * - **SVGS** (Savings) : Compte utilisé pour l'épargne.
     * - **TAXE** (Tax) : Compte utilisé pour les taxes s'il diffère du compte de paiement.
     * - **TRAN** (Transacting Account) : Compte de transaction, le type de compte bancaire le plus basique. La principale différence entre les comptes de transaction et les comptes chèques est qu'il n'y a généralement pas de chéquier ni de facilité de découvert.
     * - **TRAS** (Cash Trading) : Compte utilisé pour le trading s'il diffère du compte en espèces courant.
     * - **VACC** (Virtual Account) : Compte créé virtuellement pour faciliter la collecte et le rapprochement.
     * - **OTHR** (Other Account) : Type de compte non spécifié
     *
     */
    export enum type {
        CACC = 'CACC',
        CARD = 'CARD',
        CASH = 'CASH',
        CHAR = 'CHAR',
        CISH = 'CISH',
        COMM = 'COMM',
        CPAC = 'CPAC',
        LLSV = 'LLSV',
        LOAN = 'LOAN',
        MGLD = 'MGLD',
        MOMA = 'MOMA',
        NREX = 'NREX',
        ODFT = 'ODFT',
        ONDP = 'ONDP',
        OTHR = 'OTHR',
        SACC = 'SACC',
        SLRY = 'SLRY',
        SVGS = 'SVGS',
        TAXE = 'TAXE',
        TRAN = 'TRAN',
        TRAS = 'TRAS',
        VACC = 'VACC',
    }
    /**
     * Le statut actuel du compte.
     *
     * Statuts disponibles :
     *
     * - **OUVERT** : Le compte est actif et opérationnel. Toutes les opérations sont autorisées.
     * - **BLOQUE** : Le compte est temporairement bloqué. Aucune opération n'est autorisée.
     * - **CLOTURE** : Le compte est fermé définitivement. Aucune opération n'est possible.
     *
     */
    export enum statut {
        OUVERT = 'OUVERT',
        BLOQUE = 'BLOQUE',
        CLOTURE = 'CLOTURE',
    }
}

