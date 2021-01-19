import { Injectable } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartItem } from 'src/app/modals/cart-item';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subscriber } from 'rxjs';
import { Forfait } from 'src/app/modals/forfait.model';
import { ForfaitTelephone } from 'src/app/modals/forfaitTelephone.model';
import { ProductService } from './product.service';

// Get product from Localstorage
let forfaitTelephones = JSON.parse(localStorage.getItem("cartItem")) || [];


@Injectable({
  providedIn: 'root'
})
export class CartService {

// Array
public cartItems  :  BehaviorSubject<CartItem[]> = new BehaviorSubject([]);
public observer   :  Subscriber<{}>;

  constructor(public snackBar: MatSnackBar, public productService: ProductService) {
    this.cartItems.subscribe(
      forfaitTelephones => forfaitTelephones = forfaitTelephones
    );

    this.productService.getProducts().subscribe((products) => {
      forfaitTelephones.forEach(forfaitTel => {
        let prod = products.filter(product => product.id === forfaitTel.forfaitTelephone.product.id).pop();
        if(prod === undefined){
           this.removeFromCart(forfaitTel);
        }
      });
    });
    
   }

    // Get Products
  public getItems(): Observable<CartItem[]> {
    const itemsStream = new Observable(observer => {
      observer.next(forfaitTelephones);
      observer.complete();
    });
    return <Observable<CartItem[]>>itemsStream;
  }

   // Add to cart
   public addToCart(forfaitTelephone: ForfaitTelephone, quantity: number) {
    let message, status;
     var item: CartItem | boolean = false;
     // If Products exist
     let hasItem = forfaitTelephones.find((items, index) => {
       console.log(item);
       if(items.forfaitTelephone.product.id === forfaitTelephone.product.id && ((items.forfaitTelephone.forfait && 
        forfaitTelephone.forfait && items.forfaitTelephone.forfait.id === forfaitTelephone.forfait.id)|| (!items.forfaitTelephone.forfait && !forfaitTelephone.forfait))) {
            
        let qty = forfaitTelephones[index].quantity + quantity;
         let stock = this.calculateStockCounts(forfaitTelephones[index], quantity);
         if(qty != 0 && stock) {
          forfaitTelephones[index]['quantity'] = qty;
           message = 'Le produit '+ forfaitTelephone.product.name +' a été ajouté à votre panier';
           status = 'success';
           this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
         }
         return true;
      }
     } );

     // If Products does not exist (Add New Products)
     if(!hasItem) {
      item = { forfaitTelephone: forfaitTelephone, quantity: quantity };
      forfaitTelephones.push(item);
      message = 'Le produit '+ forfaitTelephone.product.name +' a été ajouté à votre panier';
      status = 'success';
       this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
  }

     localStorage.setItem("cartItem", JSON.stringify(forfaitTelephones));
     return item;

   }

// Calculate Product stock Counts
public calculateStockCounts(forfaitTel: CartItem, quantity): CartItem | Boolean {
  let message, status;
  let totalSumProduct = forfaitTelephones.reduce((val, listItem) => {
    if(listItem.forfaitTelephone.product.id === forfaitTel.forfaitTelephone.product.id){
      val+=listItem.quantity;
    }
    return val;
  },0);
  let qty   = totalSumProduct + quantity;
  let stock = forfaitTel.forfaitTelephone.product.stock;
  if(stock < qty) {
    // this.toastrService.error('You can not add more items than available. In stock '+ stock +' items.');
    this.snackBar.open('Vous ne pouvez pas choisir un nombre supérieur au stock pour le produit '+forfaitTel.forfaitTelephone.product.name+'. En stock :  ' + stock + '.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    return false
  }
  return true
}





// Removed in cart
public removeFromCart(item: CartItem) {
  if (item === undefined) return false;
    const index = forfaitTelephones.indexOf(item);
    forfaitTelephones.splice(index, 1);
    localStorage.setItem("cartItem", JSON.stringify(forfaitTelephones));

}

// Total amount
public getTotalAmount(): Observable<number> {
  return this.cartItems.pipe(map((product: CartItem[]) => {
    return forfaitTelephones.reduce((prev, curr: CartItem) => {
      let prixForfait = 0;
      if(curr.forfaitTelephone.forfait && curr.forfaitTelephone.forfait.typePrePostPaid==="prePaid"){
        prixForfait=curr.forfaitTelephone.forfait.montant;
      }
      return prev + (prixForfait + curr.forfaitTelephone.product.salePrice) * curr.quantity;
    }, 0);
  }));
}

// Update Cart Value
public updateCartQuantity(forfaitTel: ForfaitTelephone, quantity: number): CartItem | boolean {
  return forfaitTelephones.find((items, index) => {
    if(items.forfaitTelephone.product.id == forfaitTel.product.id) {
      if((items.forfaitTelephone.forfait && forfaitTel.forfait && items.forfaitTelephone.forfait.id === forfaitTel.forfait.id) || (!items.forfaitTelephone.forfait && !forfaitTel.forfait)){
        let qty = forfaitTelephones[index].quantity + quantity;
      let stock = this.calculateStockCounts(forfaitTelephones[index], quantity);
      if (qty != 0 && stock)
      forfaitTelephones[index]['quantity'] = qty;
      localStorage.setItem("cartItem", JSON.stringify(forfaitTelephones));
      return true;
    
      }
      
    }
  });
}


}
