import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ProductZoomComponent } from './product-zoom/product-zoom.component';
import { ForfaitService } from 'src/app/components/shared/services/forfait.service';
import { Forfait } from 'src/app/modals/forfait.model';
import { ForfaitTelephone } from 'src/app/modals/forfaitTelephone.model';
import { OperateurService } from 'src/app/components/shared/services/operateur.service';
import { Operateur } from 'src/app/modals/operateur.model';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.sass']
})
export class ProductDetailsComponent implements OnInit {

  public config: SwiperConfigInterface={};
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();

  @ViewChild('zoomViewer', { static: true }) zoomViewer;
  @ViewChild(SwiperDirective, { static: true }) directiveRef: SwiperDirective;

  public product :   Product = {};
  public products :   Product[] = [];

  public forfaits           :   Forfait[] = [];
  public forfaitsByType: Forfait[] = [];
  public operateurs: Operateur[] = [];
  defaultTypeForfait = 'Aucun';

  public typeForfait = ["Aucun", "Sans Engagement", "Avec Engagement"];
  public selectedForfait: Forfait = null;

  public image: any;
  public zoomImage: any;

  public counter            :   number = 1;

  index: number;
  bigProductImageIndex = 0;

  constructor(private route: ActivatedRoute,
              public productsService: ProductService,
              public forfaitsService: ForfaitService,
              public dialog: MatDialog,
              private router: Router,
              private operateurService: OperateurService,
              private cartService: CartService) {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.productsService.getProductById(id).subscribe(product => this.product = product)
    });
  }

  ngOnInit() {
    this.productsService.getProducts().subscribe(product => this.products = product);
    this.forfaitsService.getForfaits().subscribe(forfaits => {
      this.forfaits = forfaits;

      this.operateurService.getOperateurs().subscribe((operateurs) =>{
        this.operateurs = operateurs;
      });

    });


    this.getRelatedProducts();
  }




  ngAfterViewInit() {
    this.config = {
      observer: true,
      slidesPerView: 3,
      spaceBetween: 10,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 3,
        },


      }
    }
  }


  public openProductDialog(product, bigProductImageIndex) {
    let dialogRef = this.dialog.open(ProductZoomComponent, {
      data: {product, index: bigProductImageIndex },
      panelClass: 'product-dialog',
    });
    dialogRef.afterClosed().subscribe(product => {
      if (product) {
        this.router.navigate(['/products', product.id, product.name]);
      }
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


  public selectImage(index) {
    console.log(this.product)
    console.log(index)
    this.bigProductImageIndex = index;
  }




  public increment() {
    this.counter += 1;
  }

  public decrement() {
    if(this.counter >1){
      this.counter -= 1;
    }
  }

  getRelatedProducts() {
    this.productsService.getProducts()
      .subscribe(
        (product: Product[]) => {
          this.products = product
        });
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
    }

  }



  public onMouseMove(e){
    if(window.innerWidth >= 1280){
      var image, offsetX, offsetY, x, y, zoomer;
      image = e.currentTarget;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      x = offsetX/image.offsetWidth*100;
      y = offsetY/image.offsetHeight*100;
      zoomer = this.zoomViewer.nativeElement.children[0];
      if(zoomer){
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
        zoomer.style.display = "block";
        zoomer.style.height = image.height + 'px';
        zoomer.style.width = image.width + 'px';
      }
    }
  }

  public onMouseLeave(event){
    this.zoomViewer.nativeElement.children[0].style.display = "none";
  }

  public openZoomViewer(){
    this.dialog.open(ProductZoomComponent, {
      data: this.zoomImage,
      panelClass: 'zoom-dialog'
    });
  }

  getOperateurById(id: number){

    let operateur= this.operateurs.filter(operateur => operateur.id === id)[0];
    return operateur;

  }


}


