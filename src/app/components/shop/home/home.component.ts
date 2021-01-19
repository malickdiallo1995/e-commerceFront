import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { ColorFilter, Product } from 'src/app/modals/product.model';
import { CartItem } from 'src/app/modals/cart-item';
import { FormGroup } from '@angular/forms';
import { Marque } from 'src/app/modals/marque.model';
import { CartService } from '../../shared/services/cart.service';
import { MarqueService } from '../../shared/services/marque.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public banners = [];
  public currencies = ['USD', 'EUR'];
  public currency:any;
  public flags = [
    { name:'English', image: 'assets/images/flags/gb.svg' },
    { name:'German', image: 'assets/images/flags/de.svg' },
    { name:'French', image: 'assets/images/flags/fr.svg' },
    { name:'Russian', image: 'assets/images/flags/ru.svg' },
    { name:'Turkish', image: 'assets/images/flags/tr.svg' }
  ]
  public flag:any;

  public sidenavOpen:boolean = true;
  public animation    :   any;   // Animation
  public sortByOrder  :   string = '';   // sorting
  public page:any;
  public tagsFilters  :   any[] = [];
  public viewType: string = 'grid';
  public viewCol: number = 20;
  public filterForm: FormGroup;
  public colorFilters :   ColorFilter[] = [];

  public items        :   Product[] = [];
  public allItems: Product[] = [];
  public tags         :   any[] = [];
  public colors       :   any[] = [];



  products: Product[];

  productsFeatured : Product[];
  lastestProducts : Product[];

  load : boolean = false;

  indexProduct: number;
  shoppingCartItems: CartItem[] = [];
  marques: Marque[] = [];
  wishlistItems  :   Product[] = [];


  public slides = [
    // { title: 'IMAGE 1', subtitle: 'Magick Promo', image: 'assets/images/carousel/bg3.png' ,imagePromo:'assets/images/carousel/B2.png',style :'color:white;'},
    // { title: 'Image 2', subtitle: 'Mega Promo', image: 'assets/images/carousel/B1.png',imagePromo: 'assets/images/carousel/B2.png',style :'color:white;' }
    { title: 'Image 1', subtitle: 'Mega Promo', image: 'assets/images/carousel/banner1.jpg',style :'color:white;' },
    { title: 'Image 2', subtitle: 'Boulko Rate', image: 'assets/images/carousel/banner2.jpg',style :'color:white;' },
    { title: 'Image 2', subtitle: 'AYTHIA WAY', image: 'assets/images/carousel/banner3.jpg',style :'color:white;' }
  ];

  constructor(private spinner: NgxSpinnerService ,private productService: ProductService,  private cartService: CartService,private marqueService: MarqueService, private route: ActivatedRoute) {
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     const category = params['category'];
    //     this.productService.getProductByCategory(category).subscribe(products => {
    //       products = products.filter(prod => {
    //         return prod.showInHomePage === true;
    //       });
    //       this.allItems = products;
    //       this.products = products.slice(0.8);
    //       this.getTags(products)
    //       this.getColors(products)
    //     });
    //   }
    // )
  }

  ngOnInit() {
  
    this.spinner.show();
    this.productService.getBanners().subscribe(
      data => this.banners = data
    );

 this.productService.getProducts().subscribe(
   (product: Product[]) => {
     this.products = product.filter(prod => {
       return prod.showInHomePage === true;
     });
     console.log('********* All products',this.products);


     this.productsFeatured = product.filter(prod => {
       return prod.featured === true;
     });
     // sort list bi decreasing id to get latest products
     this.lastestProducts= this.products.sort((a,b)=> b.id-a.id);
     console.log('Latest products ',this.lastestProducts);
     console.log('******** product filter',this.products);
     this.load = true;
    this.spinner.hide();

   }
 )
 this.currency = this.currencies[0];
  this.flag = this.flags[0];
}





public changeCurrency(currency){
  this.currency = currency;
}
public changeLang(flag){
  this.flag = flag;
}





  /*****
   ***************************  Imported FOnction
   */

  public changeViewType(viewType, viewCol){
    this.viewType = viewType;
    this.viewCol = viewCol;
  }
  // Animation Effect fadeIn
  public fadeIn() {
    this.animation = 'fadeIn';
  }

  // Animation Effect fadeOut
  public fadeOut() {
    this.animation = 'fadeOut';
  }

  // Update tags filter
  public updateTagFilters(tags: any[]) {
    this.tagsFilters = tags;
    this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }



  // sorting type ASC / DESC / A-Z / Z-A etc.
  public onChangeSorting(val) {
    this.sortByOrder = val;
    this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }

  // Initialize filetr Items
  public filterItems(): Product[] {
    return this.items.filter((item: Product) => {
      const Colors: boolean = this.colorFilters.reduce((prev, curr) => { // Match Color
        if(item.colors){
          if (item.colors.includes(curr.color)) {
            return prev && true;
          }
        }
      }, true);
      const Tags: boolean = this.tagsFilters.reduce((prev, curr) => { // Match Tags
        if(item.tags) {
          if (item.tags.includes(curr)) {
            return prev && true;
          }
        }
      }, true);
      return Colors && Tags; // return true
    });

  }

  public onPageChanged(event){
    this.page = event;
    this.allItems;
    window.scrollTo(0,0);
  }


  // Update price filter
//   public updatePriceFilters(price: any) {
//     let items: any[] = [];
//     this.products.filter((item: Product) => {
//         if (item.price >= price[0] && item.price <= price[1] )  {
//            items.push(item); // push in array
//         }
//     });
//     this.items = items;
// }


  // Update price filter
  public updatePriceFilters(price: any) {
    console.log(price);
    console.log(this.products);


    this.allItems = this.products.filter((item: Product) => {
      return item.salePrice >= price.priceFrom && item.salePrice <= price.priceTo
    });
    console.log(this.products);

  }

  onBrendsChanged(newBrend) {
    console.log(newBrend);
    this.allItems = newBrend === 'all' ? this.products : this.products.filter(

      item => item.brand === newBrend
    )
    console.log(this.allItems);
  }



  // Get current product tags
  // public getTags(products) {
  //   var uniqueBrands = []
  //   var itemBrand = Array();
  //   products.map((product, index) => {
  //     if(product.tags) {
  //       product.tags.map((tag) => {
  //         const index = uniqueBrands.indexOf(tag);
  //         if(index === -1)  uniqueBrands.push(tag);
  //       })
  //     }
  //   });
  //   for (var i = 0; i < uniqueBrands.length; i++) {
  //     itemBrand.push({brand:uniqueBrands[i]})
  //   }
  //   this.tags = itemBrand
  // }

  // Get current product colors
  // public getColors(products) {
  //   var uniqueColors = []
  //   var itemColor = Array();
  //   products.map((product, index) => {
  //     if(product.colors) {
  //       product.colors.map((color) => {
  //         const index = uniqueColors.indexOf(color);
  //         if(index === -1)  uniqueColors.push(color);
  //       })
  //     }
  //   });
  //   for (var i = 0; i < uniqueColors.length; i++) {
  //     itemColor.push({color:uniqueColors[i]})
  //   }
  //   this.colors = itemColor
  // }

}
