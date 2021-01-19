import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/modals/product.model';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { Router } from '@angular/router';
import { Forfait } from 'src/app/modals/forfait.model';
import { ForfaitService } from 'src/app/components/shared/services/forfait.service';
import { ForfaitTelephone } from 'src/app/modals/forfaitTelephone.model';
import { Operateur } from 'src/app/modals/operateur.model';
import { OperateurService } from 'src/app/components/shared/services/operateur.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.sass']
})
export class ProductDialogComponent implements OnInit {

  public products           :   Product[] = [];
  public forfaits           :   Forfait[] = [];
  public forfaitsByType: Forfait[] = [];
  public operateurs: Operateur[] = [];
  defaultTypeForfait = 'Aucun';

  public typeForfait = ["Aucun", "Sans Engagement", "Avec Engagement"];
  public selectedForfait: Forfait = null;

  
  public counter            :   number = 1;
  public variantImage       :   any = '';
  public selectedColor      :   any = '';
  public selectedSize       :   any = '';
  Forfait:String;

  constructor(private router: Router, public productsService: ProductService, 
    private forfaitsService: ForfaitService, private cartService: CartService, 
    public operateurService: OperateurService,
    public dialogRef: MatDialogRef<ProductDialogComponent>, @Inject(MAT_DIALOG_DATA) public product: Product) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe(product => this.products = product);
    this.forfaitsService.getForfaits().subscribe(forfaits => {
      this.forfaits = forfaits;

      this.operateurService.getOperateurs().subscribe((operateurs) =>{
        this.operateurs = operateurs;
      });


    });

  }


  public selectForfait(event){
    this.selectedForfait = event.value;
  }

  public selectTypeForfait(event){
    //get list of forfait by type (Sans Engagement - Avec Engagement) and select the fist as default
    if(event.value === 'Sans Engagement'){
      this.forfaitsByType = this.forfaits.filter(forfait => forfait.typePrePostPaid === 'prePaid');
      if(this.forfaitsByType.length>0){
        this.selectedForfait = this.forfaitsByType[0];
      }
    }else if(event.value === 'Avec Engagement'){
      this.forfaitsByType = this.forfaits.filter(forfait => forfait.typePrePostPaid === 'postPaid');
      if(this.forfaitsByType.length>0){
        this.selectedForfait = this.forfaitsByType[0];
      }
    }else{
      this.forfaitsByType = [];
      this.selectedForfait = null;
      console.log(this.selectedForfait);
    }
  }



  public close(): void {
    this.dialogRef.close();
  }

  public increment() {
    this.counter += 1;
  }

  public decrement() {
    if(this.counter >1){
       this.counter -= 1;
    }
  }

     // Add to cart
  //    public buyNow() {
  //     if(this.selectForfait !== null){
  //     // ajouter this.selectedForfait a forfait telephone
        
  //     }
  //     this.router.navigate(['/home/product', this.product.id]);
  //     this.close();
  //  }


  public showDetailPage(){
    console.log('CLICK');
        this.router.navigate(['/home/product', this.product.id]);
        this.close();
  }

   // Add to cart
  public addToCart(product: Product, quantity) {
    if (quantity == 0) return false;
    if(this.selectForfait !== null){
      // ajouter this.selectedForfait a forfait telephone
    }
    // this.cartService.addToCart(product, parseInt(quantity), this.selectedForfait);
    let forfaitTelephone = new ForfaitTelephone();
    if(this.selectedForfait){
    forfaitTelephone.idForfait = this.selectedForfait.id;
    forfaitTelephone.forfait = this.selectedForfait;
    }
    forfaitTelephone.idTelephone = product.id;
    forfaitTelephone.product = product;
    this.cartService.addToCart(forfaitTelephone, quantity);

  }

  // Add to cart
  public buyNow(product: Product, quantity) {
    if (quantity > 0){
      if(this.selectForfait !== null){
        // ajouter this.selectedForfait a forfait telephone

      }
      let forfaitTelephone = new ForfaitTelephone();
      if(this.selectedForfait){
        forfaitTelephone.idForfait = this.selectedForfait.id;
        forfaitTelephone.forfait = this.selectedForfait;
      }
      forfaitTelephone.idTelephone = product.id;
      forfaitTelephone.product = product;
      // this.cartService.addToCart(product,parseInt(quantity), this.selectedForfait);
      this.cartService.addToCart(forfaitTelephone, quantity);

      this.router.navigate(['/pages/checkout']);
      this.close();
    }

  }


getOperateurById(id: number){

  let operateur= this.operateurs.filter(operateur => operateur.id === id)[0];
  return operateur;

}

}
