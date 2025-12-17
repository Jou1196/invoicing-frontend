export interface Product {
  id?: number;
  code: string;
  name: string;
  price: number;
  taxRate: number; // tax_rate en SQL
  stock: number;
}