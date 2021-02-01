import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/modals/cart-item';
import { ProductService } from '../../shared/services/product.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Transaction} from '../../../modals/transaction.model';
import {environment} from '../../../../environments/environment';
import {TransactionService} from '../../shared/services/transaction.service';
import { DatePipe } from '@angular/common';
import {Commande} from '../../../modals/commande.model';
import {CommandeService} from '../../shared/services/commande.service';
import {LigneCommande} from '../../../modals/ligneCommande.model';
import {LigneCommandeService} from '../../shared/services/ligne-commande.service';
import {JsonObject} from '@angular/compiler-cli/ngcc/src/packages/entry_point';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass'],
  providers : [DatePipe]
})
export class CheckoutComponent implements OnInit {

  public cartItems: Observable<CartItem[]> = of([]);
  public buyProducts: CartItem[] = [];
  public userInfoForm: FormGroup;
  public idCommande : number;
  transactionJson : any = {
    selected_payment_way : "",
    application_id : environment.application_id,
    date : "",
    amount : 0,
    currency : "",
    payment_options : "",
    order_ref : "",
    items : "",
    cart : []
  }

  amount: number;
  payments: string[] = ['Create an Account?', 'Flat Rate'];

  paymantWay: string[] = ['Paiement à la livraison','Mobile Money'];
  selectedPaymentWay: any;
  transaction : Transaction;
  capture_url : string = '';

  constructor(private cartService: CartService,
              public productService: ProductService,
              public transactionService: TransactionService,
              private datePipe: DatePipe,
              public commandeService: CommandeService,
              public ligneCommandeService : LigneCommandeService ) { }

  ngOnInit() {
    this.initForm();
    this.cartItems = this.cartService.getItems();
    this.cartItems.subscribe(products => this.buyProducts = products);
    this.getTotal().subscribe(amount => this.amount = amount);
  }

  initForm(){
    this.userInfoForm = new FormGroup(
      {
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        address: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required)

});
}
  public sendOrderInfo(){
    let amount_order =0;
    console.log(this.buyProducts);
    //add Commande
    let commande: Commande = new Commande();
    commande.dateCommande = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:s');
    this.cartService.getTotalAmount().subscribe((total) => {
      commande.prix_total = total;
    });
    commande.statutCommande = "INIT";
    this.commandeService.addCommande(commande).subscribe((response) => {
      if(response !== null){
        this.idCommande = response.id;
        //add Ligne commande for each item in cart
        for(let i = 0; i < this.buyProducts.length; i++){
          let total = 0;
          if(this.buyProducts[i].forfaitTelephone.forfait && this.buyProducts[i].forfaitTelephone.forfait.typePrePostPaid === 'prePaid'){
            total = (this.buyProducts[i].quantity * this.buyProducts[i].forfaitTelephone.product.salePrice) + this.buyProducts[i].forfaitTelephone.forfait.montant;
          }else{
            total = this.buyProducts[i].quantity * this.buyProducts[i].forfaitTelephone.product.salePrice;
          }
          this.transactionJson.cart.push({
            "product_name": this.buyProducts[i].forfaitTelephone.product.name,
            "product_code": "",
            "quantity": this.buyProducts[i].quantity,
            "price": this.buyProducts[i].forfaitTelephone.product.salePrice,
            "total": total,
            "image": "",
            "description": this.buyProducts[i].forfaitTelephone.product.shortDetails,
            "note_1": "",
            "note_2": "",
            "note_3": "",
            "note_4": "",
            "note_5": "",
            "forfait" : this.buyProducts[i].forfaitTelephone.forfait
          });
          let ligneCommande = new LigneCommande();
          let total_value = 0;
          ligneCommande.idCommande = this.idCommande;
          if(this.selectedPaymentWay =='Mobile Money'){
            ligneCommande.idmodeReglement = 1;
          }else{
            ligneCommande.idmodeReglement = 2;
          }
          ligneCommande.clientIdClient = 0;
          ligneCommande.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:s');
          ligneCommande.quantity = this.buyProducts[i].quantity;
          if(this.buyProducts[i].forfaitTelephone.forfait){
            ligneCommande.idForfait = this.buyProducts[i].forfaitTelephone.forfait.id;
            ligneCommande.containforfait = true;
            ligneCommande.montantForfait = this.buyProducts[i].forfaitTelephone.forfait.montant;

            if(this.buyProducts[i].forfaitTelephone.forfait.typePrePostPaid === 'prePaid'){
              ligneCommande.engagement = 'prePaid';
              ligneCommande.nbMoisEngagement = 0;
              total_value+=this.buyProducts[i].forfaitTelephone.forfait.montant;
            }else{
              ligneCommande.engagement = 'postPaid';
              ligneCommande.nbMoisEngagement = 12;
            }

          }else{
            ligneCommande.idForfait = 0;
            ligneCommande.containforfait = false;
            ligneCommande.montantForfait = 0;
            ligneCommande.engagement = '';
            ligneCommande.nbMoisEngagement = 0;

          }
          ligneCommande.total = (total_value + this.buyProducts[i].forfaitTelephone.product.salePrice) * this.buyProducts[i].quantity;
          amount_order+=ligneCommande.total;
            ligneCommande.prixTelephone = this.buyProducts[i].forfaitTelephone.product.salePrice;
          this.ligneCommandeService.addLigneCommande(ligneCommande).subscribe((ligneCommandeResponse) => {
            // if(ligneCommandeResponse === null ){
            //   this.commandeService.
            // }
          });
      }
        this.transactionJson.selected_payment_way = this.selectedPaymentWay;

        //send tranasction to api if payment method = Mobile Money
        if(this.selectedPaymentWay =='Mobile Money') {


          // this.transactionJson.amount = amount_order;
          // this.transactionJson.currency = "XOF";
          // this.transactionJson.items = this.buyProducts.length.toString();
          // let date = new Date();
          // let formattedDate = this.datePipe.transform(date, 'yyyy MM dd hh mm s');
          // this.transactionJson.order_ref = "Commande_"+this.idCommande+"_"+ formattedDate;
          // this.transactionJson.payment_options = "instant";
          //
          // let product = this.buyProducts[0]['forfaitTelephone']['product'];
          // this.transaction = new Transaction();
          // this.transaction.status = "PENDING";
          // this.transaction.idCommande = this.idCommande;
          // this.transaction.application_id = environment.application_id;
          // // this.transaction.price = product.price;
          // // this.transaction.quantity = this.buyProducts[0]['quantity'].toString();
          // // // this.transaction.product_code = ;
          // // this.transaction.product_name = product.name;
          // this.transaction.order_ref = product.name + formattedDate.toString();
          // this.transaction.order_ref = this.transaction.order_ref.replace(/\s/g, "")
          // this.transaction.payment_options = "instant";
          // this.transaction.currency = "XOF";
          // this.transaction.total = product.price * this.buyProducts[0]['quantity'];



          // let response;
          this.transactionService.addTransaction(this.transaction).subscribe((response: Transaction) => {
            if (response.capture_url !== "") {
              this.capture_url = response.capture_url.toString();
              window.open(this.capture_url);
            } else {
              alert("ERREUR LORS DU PAIEMENT");
            }
          });
        }
      }else{
        alert("ERREUR LORS DU PAIEMENT");
      }
    });


  }
  public sendTransaction(){
    console.log(this.buyProducts);
    for(let i = 0; i < this.buyProducts.length; i++){
      let total = 0;
      if(this.buyProducts[i].forfaitTelephone.forfait && this.buyProducts[i].forfaitTelephone.forfait.typePrePostPaid === 'prePaid'){
        total = (this.buyProducts[i].forfaitTelephone.product.salePrice + this.buyProducts[i].forfaitTelephone.forfait.montant) * this.buyProducts[i].quantity ;
      }else{
        total = this.buyProducts[i].quantity * this.buyProducts[i].forfaitTelephone.product.salePrice;
      }
      let forfait = null;
      if(this.buyProducts[i].forfaitTelephone.forfait){
        forfait = this.buyProducts[i].forfaitTelephone.forfait;
      }
      this.transactionJson.cart.push({
        "product_name": this.buyProducts[i].forfaitTelephone.product.name,
        "product_code": "",
        "quantity": this.buyProducts[i].quantity,
        "price": this.buyProducts[i].forfaitTelephone.product.salePrice,
        "total": total,
        "image": "",
        "description": this.buyProducts[i].forfaitTelephone.product.shortDetails,
        "note_1": "",
        "note_2": "",
        "note_3": "",
        "note_4": "",
        "note_5": "",
        "forfait" : forfait
      });

    }
    this.transactionJson.selected_payment_way = this.selectedPaymentWay;
    this.transactionJson.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:s');
    this.transactionService.addTransaction(this.transactionJson).subscribe((response: Transaction) => {
      if (response.capture_url !== "") {
        this.capture_url = response.capture_url.toString();
        window.open(this.capture_url);
      } else {
        alert("ERREUR LORS DU PAIEMENT");
      }
    });
  }

  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
    }

}
