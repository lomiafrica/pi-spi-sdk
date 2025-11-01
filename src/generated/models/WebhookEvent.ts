/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WebhooksEvents } from './WebhooksEvents';
export type WebhookEvent = {
    evCode: WebhooksEvents;
    /**
     * Date et heure de l'événement.
     * POur un transfert irrévocable par exemple c'est la date d'irrévocabilité
     *
     */
    evDate: string;
    /**
     * Identifiant de la transaction dans le SI du client
     */
    txId: string;
    /**
     * Identifiant de l'ordre de transfert ou de la demande de paiement
     */
    end2endId: string;
    /**
     * Identifiant de l'instruction de paiement (Pour les paiements en masse)
     */
    instructionId?: string;
    /**
     * Le montant du paiement ou demande de paiement ou demande retour
     */
    montant: number;
    /**
     * Le nom du client payeur ou payé en fonction du type d'événement
     */
    client?: string;
    /**
     * Alias de compte du client business sur lequel porte l'événement
     */
    alias?: string;
    /**
     * Le motif d'un paiement reçu ou envoyé est un texte libre renseigné par le client payeur.
     *
     * Le motif d'une demande de paiement reçue est un texte libre renseigné par le client payé.
     *
     * En dehors de ces cas, le motif est l'un des codes suivants en fonction du type d'événement :
     *
     * **Motifs de rejet des demandes de paiement :**
     *
     * - **AC04** (Closed Account Number) : Le compte du client payeur est clôturé.
     * - **AC06** (Blocked Account) : Le compte du client payeur est bloqué.
     * - **AEXR** (Already Expired RTP) : La demande de paiement a déjà expiré.
     * - **AG03** (Transaction Not Supported) : Le client n'est pas autorisé à payer en mode débit différé.
     * - **AG10** (Agent Suspended) : Le participant payeur est suspendu.
     * - **AG11** (Creditor Agent Suspended) : Le participant payé est désactivé.
     * - **ALAC** (Already Accepted RTP) : La demande de paiement a déjà été acceptée.
     * - **AM02** (Not Allowed Amount) : Le montant spécifique de la transaction dépasse le montant maximum autorisé.
     * - **AM09** (Wrong Amount) : Le montant reçu ne correspond pas au montant convenu ou attendu.
     * - **AM14** (Amount Exceeds Agreed Limit) : Le montant de la transaction fait dépasser le plafond de débit différé du client.
     * - **APAR** (Already Paid RTP) : Le paiement demandé a déjà été effectué par le payeur.
     * - **ARFR** (Already Refused RTP) : La demande de paiement a déjà été refusée.
     * - **ARJR** (Already Rejected RTP) : La demande de paiement a déjà été rejetée.
     * - **BE01** (Inconsistent With End Customer) : L'identification du client final n'est pas liée au numéro de compte associé.
     * - **BE05** (Unrecognised Initiating Party) : La partie qui a initié le message n'est pas reconnue par le client final.
     * - **FR01** (Fraud) : Rejeté pour suspicion de fraude.
     * - **RR07** (Remittance Information Invalid) : Le justificatif de la demande de paiement est invalide (par exemple, le numéro de facture est invalide).
     *
     * **Motifs de rejet des paiements :**
     *
     * - **AB03** (Aborted Settlement Timeout) : Message en timeout lors du règlement.
     * - **AB04** (Aborted Settlement Fatal Error) : Transaction rejetée à cause d'une erreur fatale.
     * - **AB08** (Offline Creditor Agent) : Le système du participant payé n'est pas accessible.
     * - **AB09** (Error Creditor Agent) : Transaction rejetée à cause d'une erreur chez le participant payé.
     * - **AC03** (Invalid Creditor Account Number) : Le numéro de compte du payé est invalide.
     * - **AC06** (Blocked Account) : Le compte spécifié est bloqué.
     * - **AC07** (Closed Creditor Account Number) : Le compte du payé est clôturé.
     * - **AG01** (Transaction Forbidden) : Transaction interdite sur ce type de compte.
     * - **AG10** (Agent Suspended) : Le participant payeur est désactivé.
     * - **AG11** (Creditor Agent Suspended) : Le participant payé est désactivé.
     * - **AEXR** (Already Expired RTP) : La demande de paiement a déjà expiré.
     * - **ALAC** (Already Accepted RTP) : La demande de paiement a déjà été acceptée.
     * - **AM02** (Not Allowed Amount) : Le montant de la transaction est supérieur au maximum autorisé.
     * - **AM04** (Insufficient Funds) : Le solde de garantie du participant payeur est insuffisant.
     * - **AM09** (Wrong Amount) : Le montant du transfert est différent du montant attendu.
     * - **AM21** (Limit Exceeded) : Le montant de la transaction dépasse les limites convenues entre le participant et le client.
     * - **ARFR** (Already Refused RTP) : La demande de paiement a déjà été refusée.
     * - **ARJR** (Already Rejected RTP) : La demande de paiement a déjà été rejetée.
     * - **BE01** (Inconsistent With End Customer) : L'identification du client final n'est pas liée au numéro de compte associé.
     * - **FR01** (Fraud) : Rejeté pour suspicion de fraude.
     * - **IRNR** (Initial RTP Never Received) : La demande de paiement n'a jamais été reçue.
     * - **RR04** (Regulatory Reason) : Raison règlementaire, notamment lorsque le bénéficiaire figure dans une liste d'interdiction.
     *
     * **Motifs d'une demandes d'annulation :**
     *
     * - **DUPL** (Duplicate Payment) : Déjà payé.
     * - **AM09** (Wrong Amount) : Erreur sur le montant.
     * - **AC03** (Invalid Creditor Account Number) : Erreur sur le destinataire.
     * - **SVNR** (Service Not Rendered) : Le paiement est annulé car le produit n'a pas été livré ou le service n'a pas été rendu.
     * - **FRAD** (Fraudulent Origin) : Annulation demandée à la suite d'une transaction dont l'origine est frauduleuse.
     *
     * **Motifs de rejet d'une demande d'annulation :**
     *
     * - **ARDT** (Already Returned) : La transaction est déjà retournée.
     * - **CUST** (Customer Decision) : Le client payé rejette la demande d'annulation.
     * - **AC04** (Closed Account Number) : Le numéro de compte spécifié a été clôturé dans les livres du participant payé.
     *
     * **Motifs d'un retour de fonds reçu ou envoyé :**
     *
     * - **AC06** (Blocked Account) : Le compte du payé est bloqué.
     * - **AC07** (Closed Creditor Account Number) : Le compte du payé est clôturé.
     * - **MD06** (Refund Request By End Customer) : Retour de fonds initié par le client payé.
     * - **CUST** (Requested By Customer) : Retour de fonds demandé suite à une demande d'annulation envoyée par le payeur.
     * - **FR01** (Fraud) : Retourné à la suite d'une fraude.
     * - **RR04** (Regulatory Reason) : Raison règlementaire, notamment lorsque le bénéficiaire figure dans une liste d'interdiction.
     *
     *
     * **Motifs de rejet d'un retour de fonds :**
     *
     * - **AB03** (Aborted Settlement Timeout) : Timeout.
     * - **AB04** (Aborted Settlement Fatal Error) : Transaction rejetée à cause d'une erreur fatale.
     * - **AG10** (Agent Suspended) : Le participant payeur est désactivé.
     * - **AG11** (Creditor Agent Suspended) : Le participant payé est désactivé.
     * - **AM04** (Insufficient Funds) : Le solde de garantie du participant payé est insuffisant.
     * - **AC04** (Closed Account Number) : Le compte du payeur est clôturé.
     * - **AC06** (Blocked Account) : Le compte du payeur est bloqué.
     * - **AG01** (Transaction Forbidden) : Transaction interdite sur ce type de compte.
     * - **AM21** (Limit Exceeded) : Le montant de la transaction dépasse les limites convenues entre le participant et le client.
     * - **RR04** (Regulatory Reason) : Raison règlementaire, notamment lorsque le bénéficiaire figure dans une liste d'interdiction.
     * - **FR01** (Fraud) : Rejeté pour suspicion de fraude.
     *
     */
    motif?: string;
    /**
     * Le type de document justificatif associé à la transaction. Les types de documents disponibles sont :
     * - **QUOT** (Quotation) : Devis commercial détaillant les conditions d'offre.
     * - **PROF** (Proforma Invoice) : Facture pro forma, engagement préliminaire du vendeur (prix/conditions), sans enregistrement comptable réel.
     * - **CINV** (Commercial Invoice) : Facture commerciale standard pour la vente de biens ou services. Utilisée pour les paiements directs d'une facture émise par le vendeur.
     * - **CMCN** (Commercial Contract) : Contrat commercial entre les parties, stipulant les termes et conditions de la livraison de biens ou de services.
     * - **DISP** (Dispatch Advice) : Avis d'expédition ou bon de livraison.
     * - **PUOR** (Purchase Order) : Bon de commande émis par l'acheteur.
     * - **CONT** (Contract) : Document contractuel prouvant un accord entre vendeur et acheteur pour biens ou services.
     * - **HIRI** (Hire Invoice) : Facture pour location de ressources humaines (ex : intérim) ou biens/équipements.
     * - **INVS** (Invoice Signed) : Facture signée, validée électroniquement ou physiquement. Indique une approbation formelle avant paiement.
     * - **MSIN** (Metered Service Invoice) : Facture pour services mesurés (ex : gaz, électricité via compteur fixe). Inclut la consommation réelle.
     * - **SPRR** (Seller Presentment) : Document de présentation par le vendeur pour supporter l'acquisition (ex : preuve de livraison ou justificatif).
     * - **TISH** (Time Sheet) : Feuille de temps enregistrant les heures pour services/prestations ou livraison. Pour paiements basés sur le temps (ex : consulting, freelance).
     * - **USAR** (Usage Report) : Rapport d'utilisation indiquant le pattern de consommation (ex : SaaS, télécoms). Similaire à MSIN mais plus large (non forcément mesuré).
     * - **BOLD** (Bill Of Lading) : Document de transport maritime ou logistique (connaissement) prouvant l'expédition des marchandises. Spécifique au transport multimodal (ex : maritime, aérien).
     * - **SOAC** (Statement Of Account) : Relevé de compte émis par le fournisseur, listant les transactions enregistrées pour le débiteur (ex : factures, paiements, ajustements).
     * - **VCHR** (Voucher) : Document électronique de paiement (bon ou coupon) représentant une obligation ou un droit de paiement. Souvent utilisé pour des paiements préautorisés ou des remises spécifiques.
     *
     */
    refDocType?: WebhookEvent.refDocType;
    /**
     * Le numéro du document justificatif
     */
    refDocNumero?: string;
};
export namespace WebhookEvent {
    /**
     * Le type de document justificatif associé à la transaction. Les types de documents disponibles sont :
     * - **QUOT** (Quotation) : Devis commercial détaillant les conditions d'offre.
     * - **PROF** (Proforma Invoice) : Facture pro forma, engagement préliminaire du vendeur (prix/conditions), sans enregistrement comptable réel.
     * - **CINV** (Commercial Invoice) : Facture commerciale standard pour la vente de biens ou services. Utilisée pour les paiements directs d'une facture émise par le vendeur.
     * - **CMCN** (Commercial Contract) : Contrat commercial entre les parties, stipulant les termes et conditions de la livraison de biens ou de services.
     * - **DISP** (Dispatch Advice) : Avis d'expédition ou bon de livraison.
     * - **PUOR** (Purchase Order) : Bon de commande émis par l'acheteur.
     * - **CONT** (Contract) : Document contractuel prouvant un accord entre vendeur et acheteur pour biens ou services.
     * - **HIRI** (Hire Invoice) : Facture pour location de ressources humaines (ex : intérim) ou biens/équipements.
     * - **INVS** (Invoice Signed) : Facture signée, validée électroniquement ou physiquement. Indique une approbation formelle avant paiement.
     * - **MSIN** (Metered Service Invoice) : Facture pour services mesurés (ex : gaz, électricité via compteur fixe). Inclut la consommation réelle.
     * - **SPRR** (Seller Presentment) : Document de présentation par le vendeur pour supporter l'acquisition (ex : preuve de livraison ou justificatif).
     * - **TISH** (Time Sheet) : Feuille de temps enregistrant les heures pour services/prestations ou livraison. Pour paiements basés sur le temps (ex : consulting, freelance).
     * - **USAR** (Usage Report) : Rapport d'utilisation indiquant le pattern de consommation (ex : SaaS, télécoms). Similaire à MSIN mais plus large (non forcément mesuré).
     * - **BOLD** (Bill Of Lading) : Document de transport maritime ou logistique (connaissement) prouvant l'expédition des marchandises. Spécifique au transport multimodal (ex : maritime, aérien).
     * - **SOAC** (Statement Of Account) : Relevé de compte émis par le fournisseur, listant les transactions enregistrées pour le débiteur (ex : factures, paiements, ajustements).
     * - **VCHR** (Voucher) : Document électronique de paiement (bon ou coupon) représentant une obligation ou un droit de paiement. Souvent utilisé pour des paiements préautorisés ou des remises spécifiques.
     *
     */
    export enum refDocType {
        CINV = 'CINV',
        CMCN = 'CMCN',
        DISP = 'DISP',
        PUOR = 'PUOR',
        CONT = 'CONT',
        HIRI = 'HIRI',
        INVS = 'INVS',
        MSIN = 'MSIN',
        PROF = 'PROF',
        QUOT = 'QUOT',
        SPRR = 'SPRR',
        TISH = 'TISH',
        USAR = 'USAR',
        BOLD = 'BOLD',
        SOAC = 'SOAC',
        VCHR = 'VCHR',
    }
}

