import {Component, OnInit} from '@angular/core';
import { ProductService } from 'src/app/components/shared/services/product.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Product, ColorFilter } from 'src/app/modals/product.model';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-product-left-sidebar',
  templateUrl: './product-left-sidebar.component.html',
  styleUrls: ['./product-left-sidebar.component.sass']
})
export class ProductLeftSidebarComponent implements OnInit {
  public sidenavOpen:boolean = true;
  public animation    :   any;   // Animation
  public sortByOrder  :   string = '';   // sorting
  public page:any;
  public tagsFilters  :   any[] = [];
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public searchedElement = '';
  public brand: String = 'Tout';
  public searching = false;
  public afterInit = false;
  public colorFilters :   ColorFilter[] = [];

  public items        :   Product[] = [];
  public allItems: Product[] = [];
  public products: Product[] = [];
  public price: any = {
    priceFrom: 0,
    priceTo:0
  };
  public tags         :   any[] = [];
  public colors       :   any[] = [];
  public productHighestPrice=1;
  public productLowestPrice=1;



  constructor(private spinner: NgxSpinnerService,private productService: ProductService, private route: ActivatedRoute, private router: Router) {

    this.spinner.show();
    this.route.params.subscribe(
      (params: Params) => {
        let category = params['category'];
        if(category === undefined){
          category = 'all';
        }
        this.productService.getProductByCategory(category).subscribe(products => {
       this.allItems = products;
       this.products = products.slice(0.8);
       this.searching = false;
       this.productHighestPrice = this.products.reduce((val, prod) => val = val < prod.salePrice ? prod.salePrice : val, 0);
       this.productLowestPrice = (this.products.reduce((prev, curr) => prev.salePrice < curr.salePrice ? prev : curr)).salePrice;
       this.price.priceFrom=this.productLowestPrice;
       this.price.priceTo = this.productHighestPrice;
       this.getTags(products);
       this.getColors(products);
       this.afterInit = true;
       this.spinner.hide();
        });

      }
    );

  }


  ngOnInit() {

    //to search item from header search
    this.route.queryParams.subscribe((params : Params) => {

      const searchedValue = params.searchedItem;
      if(searchedValue !== undefined){
        this.searchInputFilter(searchedValue);
      }
 
     });
    

  }

     // Get current product tags
     public getTags(products) {
      var uniqueBrands = []
      var itemBrand = Array();
      products.map((product, index) => {
         if(product.tags) {
            product.tags.map((tag) => {
            const index = uniqueBrands.indexOf(tag);
            if(index === -1)  uniqueBrands.push(tag);
         })
        }
      });
      for (var i = 0; i < uniqueBrands.length; i++) {
           itemBrand.push({brand:uniqueBrands[i]})
      }
      this.tags = itemBrand
   }

     // Get current product colors
     public getColors(products) {
      var uniqueColors = []
      var itemColor = Array();
      products.map((product, index) => {
        if(product.colors) {
        product.colors.map((color) => {
            const index = uniqueColors.indexOf(color);
            if(index === -1)  uniqueColors.push(color);
        })
       }
      });
      for (var i = 0; i < uniqueColors.length; i++) {
           itemColor.push({color:uniqueColors[i]})
      }
      this.colors = itemColor
   }





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

     // Initialize filter Items
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

  searchInputFilter(value){
    
    this.searchedElement = value;
    this.matchSearchingItems();
    // this.searching = true;
    // this.allItems = this.products.filter((item: Product) => {
    //   return (item.name.toLowerCase().includes(value) || item.brand.toLowerCase().includes(value) || item.category.toLowerCase().includes(value)|| item.description.toLowerCase().includes(value) || item.shortDetails.toLowerCase().includes(value))
    // });
  }

  // Update price filter
  public updatePriceFilters(price: any) {
    this.price = price;
    this.matchSearchingItems();
  //  this.allItems = this.products.filter((item: Product) => {
  //    return item.salePrice >= price.priceFrom && item.salePrice <= price.priceTo
  //   });
  //    console.log(this.products);

}

onBrendsChanged(newBrend) {
  this.brand = newBrend;
  this.matchSearchingItems();
  // this.allItems = newBrend === 'Tout' ? this.products : this.products.filter(

  //   item => item.brand === newBrend
  // )
  // console.log(this.allItems);

}


matchSearchingItems(){
  this.searching = false;
  let matchSearch = this.products.filter((item: Product) => {
    return (item.name.toLowerCase().includes(this.searchedElement) || item.brand.toLowerCase().includes(this.searchedElement) || item.category.toLowerCase().includes(this.searchedElement)|| item.description.toLowerCase().includes(this.searchedElement) || item.shortDetails.toLowerCase().includes(this.searchedElement))
  });
  
  matchSearch = this.brand === 'Tout' ? matchSearch : matchSearch.filter(
     marque => marque.brand === this.brand
  );
  
  matchSearch = matchSearch.filter((item: Product) => {
    return item.salePrice >= this.price.priceFrom && item.salePrice <= this.price.priceTo
   });

  this.allItems = matchSearch;
  this.searching = true;
}


}
