import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/modals/product.model';
import { ProductService } from '../../shared/services/product.service';
import { CartService } from '../../shared/services/cart.service';
import { MarqueService } from '../../shared/services/marque.service';
import { Marque } from 'src/app/modals/marque.model';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.sass']
})
export class CompareComponent implements OnInit {

  public product            :   Observable<Product[]> = of([]);
  public products           :   Product[] = [];
  public brend           :   Marque[] = [];


  constructor(private productService: ProductService, private brandService: MarqueService, private cartService: CartService) {

  }

  ngOnInit() {
    this.product = this.productService.getComapreProducts();
    this.product.subscribe(products => this.products = products);
    this.brandService.getMarques().subscribe(marques => this.brend = marques);
  }

     // Add to cart
     public addToCart(product: Product, quantity: number = 1) {
      this.cartService.addToCart(product, quantity);
   }

   // Remove from compare list
   public removeItem(product: Product) {
     this.productService.removeFromCompare(product);
   }

}
