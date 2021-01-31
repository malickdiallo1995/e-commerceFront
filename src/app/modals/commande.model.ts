export class CommandeModel{
  id?: number;
  prix_total?:number;
  dateCommande?:Date;
  statutCommande?:string;


  constructor(id: number, prix_total: number, dateCommande: Date, statutCommande: string) {
    this.id = id;
    this.prix_total = prix_total;
    this.dateCommande = dateCommande;
    this.statutCommande = statutCommande;
  }
}
