export class LigneCommande{
  id?:number;
  prixTelephone?:number;
  montantForfait?:number;
  total?:number;
  containforfait?:boolean;
  engagement?:string;
  nbMoisEngagement?:number;
  date?:string;
  idmodeReglement?:number;
  clientIdClient?:number;
  idForfait?:number;
  idCommande?:number;
  quantity?: number;
  idProduit?:number;

  constructor(
    id?: number,
    prixTelephone?:number,
    montantForfait?:number,
    total?:number,
    containforfait?:boolean,
    engagement?:string,
    nbMoisEngagement?:number,
    date?:string,
    idmodeReglement?:number,
    clientIdClient?:number,
    idForfait?:number,
    idCommande?:number,
    quantity?:number,
    idProduit?:number) {

    this.id = id;
    this.prixTelephone = prixTelephone;
    this.montantForfait = montantForfait;
    this.total = total;
    this.containforfait = containforfait;
    this.engagement = engagement;
    this.nbMoisEngagement = nbMoisEngagement;
    this.date = date;
    this.idmodeReglement = idmodeReglement;
    this.clientIdClient = clientIdClient;
    this.idForfait = idForfait;
    this.idCommande = idCommande;
    this.quantity = quantity;
    this.idProduit = idProduit;
  }
}
