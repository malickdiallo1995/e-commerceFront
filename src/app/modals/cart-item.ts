import { ForfaitTelephone } from './forfaitTelephone.model';
import { Product } from './product.model';

// cart items
export interface CartItem {
  forfaitTelephone: ForfaitTelephone;
  quantity: number;
}
