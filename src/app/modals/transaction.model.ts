export class Transaction {
  id?:number;
  currency?:String;
  payment_options?:String;
  order_ref?:String;
  items?:String;
  amount?:number;
  transaction_id?:String;
  url?:String;
  application_id?:String;
  status?:String;
  expiresAt?: String;
  preorder_end_date?: String;
  createdAt?: String;
  capture_url?:String;
  status_commande?:String;

  constructor(
    id?:number,
    currency?:String,
    payment_options?:String,
    order_ref?:String,
    items?:String,
    amount?:number,
    transaction_id?:String,
    url?:String,
    application_id?:String,
    status?:String,
    expiresAt?: String,
    preorder_end_date?: String,
    createdAt?: String,
    capture_url?:String,
    status_commande?:String
){

    this.id = id;
    this.currency = currency;
    this.payment_options = payment_options;
    this.order_ref = order_ref;
    this.items = items;
    this.transaction_id = transaction_id;
    this.url = url;
    this.application_id = application_id;
    this.status = status;
    this.expiresAt = expiresAt;
    this.preorder_end_date = preorder_end_date;
    this.createdAt = createdAt;
    this.capture_url = capture_url;
    this.status_commande = status_commande;
  }
}
