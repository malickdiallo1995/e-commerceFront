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

  amount: number;
  payments: string[] = ['Create an Account?', 'Flat Rate'];

  paymantWay: string[] = ['Paiement à la livraison','Mobile Money'];
  selected: any;
  transaction : Transaction;
  capture_url : string = '';

  constructor(private cartService: CartService, public productService: ProductService, public transactionService: TransactionService, private datePipe: DatePipe) { }

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
    console.log(this.buyProducts);
    let product = this.buyProducts[0]['forfaitTelephone']['product'];
    this.transaction = new Transaction();
    this.transaction.status = "PENDING";
    this.transaction.application_id = environment.application_id;
    this.transaction.price = product.price;
    this.transaction.quantity =  this.buyProducts[0]['quantity'].toString();
    // this.transaction.product_code = ;
    this.transaction.product_name = product.name;
    this.transaction.items = '1';
    let date = new Date();
    let formattedDate = this.datePipe.transform(date, 'yyyy MM dd hh mm s');
    this.transaction.order_ref = product.name+formattedDate.toString();
    this.transaction.order_ref = this.transaction.order_ref.replace(/\s/g, "")
    this.transaction.payment_options = "instant";
    this.transaction.currency = "XOF";
    this.transaction.total = product.price * this.buyProducts[0]['quantity'];
    // let response;
    this.transactionService.addTransaction(this.transaction).subscribe((response : Transaction) => {
      console.log(response);
      console.log(response.capture_url);
      if(response.capture_url !== ""){
        this.capture_url = response.capture_url.toString();
        console.log(this.capture_url);
        window.open(this.capture_url);
      }else{
        console.log("in else");
        alert("ERREUR LORS DU PAIEMENT");
      }
    });


  }
  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
    }

}
