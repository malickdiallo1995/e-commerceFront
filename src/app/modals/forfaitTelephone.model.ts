import { Forfait } from './forfait.model';
import { Product } from './product.model';

export class ForfaitTelephone {
    id?:number;
    idForfait?:number;
    idTelephone?:number;
    forfait?: Forfait;
    product?: Product

    constructor(
    id?:number,
    idForfait?:number,
    idTelephone?:number,
    forfait?: Forfait,
    product?: Product
    ){

        this.id = id;
        this.idForfait = idForfait;
        this.idTelephone = idTelephone;
        this.forfait = forfait;
        this.product = product;
    }
}