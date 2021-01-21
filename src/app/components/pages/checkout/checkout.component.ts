import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/modals/cart-item';
import { ProductService } from '../../shared/services/product.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {

  public cartItems: Observable<CartItem[]> = of([]);
  public buyProducts: CartItem[] = [];
  public userInfoForm: FormGroup;

  amount: number;
  payments: string[] = ['Create an Account?', 'Flat Rate'];

  paymantWay: string[] = ['Paiement à la livraison','Mobile Money'];
  selected: any;

  constructor(private cartService: CartService, public productService: ProductService) { }

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
  public sendOrderInfo(){}
  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
    }

}
