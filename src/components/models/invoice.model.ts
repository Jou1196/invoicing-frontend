import { Customer } from "./customer.model";
import { Product } from "./product.model";
import { Provider } from "./provider.model";





export interface InvoiceItem {
  id?: number;
  product: Product;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  lineTotal: number;
}


export interface Invoice {
  id?: number;
  customer: Customer;
  provider: Provider;
  issueDate?: Date | string; 
  subtotal: number;
  taxTotal: number;
  total: number;
  status: string;
  items: InvoiceItem[];
}