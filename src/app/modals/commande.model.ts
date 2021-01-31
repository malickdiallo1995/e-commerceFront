export class Commande{
  id?: number;
  prix_total?:number;
  dateCommande?:string;
  statutCommande?:string;


  constructor(id?: number, prix_total?: number, dateCommande?: string, statutCommande?: string) {
    this.id = id;
    this.prix_total = prix_total;
    this.dateCommande = dateCommande;
    this.statutCommande = statutCommande;
  }
}
