import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Forfait } from './forfait.model';
import { Image } from './image.model';

// Product Tag
export type ProductTags = 'nike' | 'puma' | 'lifestyle' | 'caprese';

// Product Colors
export type ProductColor = 'white' | 'black' | 'red' | 'green' | 'purple' | 'yellow' | 'blue' | 'gray' | 'orange' | 'pink';



export class Product {
  id?: number;
    name?: string;
    price?: number;
    salePrice?: number;
    discount?: number;
    images?: Image[];
    shortDetails?: string;
    description?: string;
    stock?: number;
    featured?: boolean;
    brand?: string;
    sale?: boolean;
    category?: string;
    tags?: ProductTags[];
    colors?: ProductColor[];
    size?:String 
    rom?:String
    ram?:String
    systemExp?:String
    idTypeTelephone?:number
    bestSeller?:Boolean
    showInHomePage?:Boolean;
    idMarque?:number;
    etat?:String;


  

  constructor(
    id?: number,
    name?: string,
    price?: number,
    salePrice?: number,
    discount?: number,
    images?: Image[],
    shortDetails?: string,
    description?: string,
    stock?: number,
    featured?: boolean,
    brand?: string,
    sale?: boolean,
    category?: string,
    tags?: ProductTags[],
    colors?: ProductColor[],
    size?:String, 
    rom?:String,
    ram?:String,
    systemExp?:String,
    idTypeTelephone?:number,
    bestSeller?:Boolean,
    showInHomePage?:Boolean,
    idMarque?:number,
    etat?:String
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.salePrice = salePrice;
    this.discount = discount;
    this.images = images;
    this.shortDetails = shortDetails;
    this.description = description;
    this.stock = stock;
    this.featured = featured;
    this.brand = brand;
    this.sale = sale;
    this.category = category;
    this.tags = tags;
    this.colors = colors;
    this.size = size;
    this.rom = rom;
    this.ram = ram;
    this.systemExp = systemExp;
    this.idTypeTelephone = idTypeTelephone;
    this.bestSeller = bestSeller;
    this.showInHomePage = showInHomePage;
    this.idMarque = idMarque;
    this.etat = etat;
  }

 }
  // Color Filter
  export interface ColorFilter {
    color?: ProductColor;
  }
