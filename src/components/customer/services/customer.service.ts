import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { Observable } from 'rxjs';


export interface Customer {
  id: number | null; 
  name: string;
  docNumber: string;
  email: string;
  address: string;
}


export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; 
  size: number; 
  
}


@Injectable({ providedIn: 'root' })
export class CustomerService {

  private apiUrl = 'http://localhost:8080/api/customers'; 

  constructor(private http: HttpClient) { } 


  findAllPaged(page: number, size: number, keyword: string): Observable<PageResponse<Customer>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (keyword) {
      params = params.set('keyword', keyword);
    }
    
    return this.http.get<PageResponse<Customer>>(this.apiUrl, { params });
  }

  
  findById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

 
  save(customer: Customer): Observable<Customer> {
    
    if (customer.id) {
      return this.http.put<Customer>(this.apiUrl, customer);
    } else {
      return this.http.post<Customer>(this.apiUrl, customer);
    }
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}