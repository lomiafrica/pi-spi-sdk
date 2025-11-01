/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CompteOperation = {
    /**
     * Identifiant de la transaction dans le SI du client
     */
    txId: string;
    /**
     * Le montant du transfert à effectuer.
     */
    montant: number;
    /**
     * Le motif du transfert
     */
    motif?: string;
    /**
     * Le numéro de compte du payeur. Requis si `payeurAlias` n'est pas fourni.
     */
    payeurNumero: string;
    /**
     * Le numéro de compte du payé. Requis si `payeAlias` n'est pas fourni.
     */
    payeNumero: string;
    /**
     * - `INITIE` Le transfert est en cours de traitement
     * - `IRREVOCABLE` Le tranfert à été effectué avec succès
     * - `REJETE` Le tranfert à été rejeté
     *
     */
    statut: CompteOperation.statut;
    /**
     * Raisons du rejet d'un tranfert':
     * - SOLDE_INSUFFISANT le solde du compte debiteur est insuffisant pour effectuer l'opération.
     * - COMPTE_BLOQUE le compte debiteur ou le compte crediteur est bloqué
     * - COMPTE_CLOTURE le compte debiteur ou le compte crediteur est cloturé
     *
     */
    statutRaison?: CompteOperation.statutRaison;
    /**
     * Identifiant unique de bout en bout de la transaction
     */
    end2endId?: string;
    /**
     * Date d'envoi du transfert de fonds: date et heure à laquelle le transfert à été initié
     *
     */
    dateEnvoi: string;
    /**
     * Date d'irrévocabilité du transfert de fonds: date et heure à laquelle le transfert à été irrévocable
     *
     */
    dateIrrevocabilite?: string;
};
export namespace CompteOperation {
    /**
     * - `INITIE` Le transfert est en cours de traitement
     * - `IRREVOCABLE` Le tranfert à été effectué avec succès
     * - `REJETE` Le tranfert à été rejeté
     *
     */
    export enum statut {
        INITIE = 'INITIE',
    }
    /**
     * Raisons du rejet d'un tranfert':
     * - SOLDE_INSUFFISANT le solde du compte debiteur est insuffisant pour effectuer l'opération.
     * - COMPTE_BLOQUE le compte debiteur ou le compte crediteur est bloqué
     * - COMPTE_CLOTURE le compte debiteur ou le compte crediteur est cloturé
     *
     */
    export enum statutRaison {
        SOLDE_INSUFFISANT = 'SOLDE_INSUFFISANT',
    }
}

