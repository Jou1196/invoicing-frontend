import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';

// PrimeNG Imports (Usando componentes directos para Standalone)
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

// === CAMBIO CLAVE: Cambiamos SidebarModule por DialogModule ===
import { DialogModule } from 'primeng/dialog'; 
// import { SidebarModule } from 'primeng/sidebar'; // Esta línea ha sido reemplazada

import { InputTextarea } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';

import { Customer, CustomerService, PageResponse } from '../../services/customer.service';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule, 
    // PrimeNG Components/Modules
    TableModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    DialogModule, // <--- MODIFICADO
    InputTextarea
  ],
  // Proveer MessageService localmente para el Toast
  providers: [MessageService], 
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit {

  // ... (El resto del código de la clase permanece igual) ...

  customers: Customer[] = [];
  loading: boolean = true;
  error: boolean = false;
  
  totalRecords: number = 0; 
  rowsPerPage: number = 10;
  currentPage: number = 0; 
  searchKeyword: string = ''; 

  // La lógica de control es la misma para Dialog o Sidebar
  displayDialog: boolean = false; 
  selectedCustomer: Customer | null = null;
  customerDialogHeader: string = '';

  // ... (Resto de métodos: constructor, ngOnInit, loadCustomers, etc.) ...
  
  constructor(
    private customerService: CustomerService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.error = false;
    
    this.customerService.findAllPaged(this.currentPage, this.rowsPerPage, this.searchKeyword)
      .subscribe({
        next: (response: PageResponse<Customer>) => {
          this.customers = response.content;
          this.totalRecords = response.totalElements;
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error al cargar clientes:', err);
          this.error = true;
          this.loading = false;
          this.customers = [];
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar la lista de clientes.' });
        }
      });
  }

  onPageChange(event: any): void {
    this.currentPage = event.first / event.rows; 
    this.rowsPerPage = event.rows;
    this.loadCustomers();
  }

  onSearch(): void {
    this.currentPage = 0; 
    this.loadCustomers();
  }

  openNew() {
    this.selectedCustomer = { id: null, name: '', docNumber: '', email: '', address: '' };
    this.customerDialogHeader = 'Crear Nuevo Cliente';
    this.displayDialog = true; 
  }

  editCustomer(customer: Customer) {
    this.selectedCustomer = { ...customer }; 
    this.customerDialogHeader = 'Editar Cliente';
    this.displayDialog = true; 
  }

  saveCustomer() {
    if (!this.selectedCustomer) return; 

    this.customerService.save(this.selectedCustomer).subscribe({
      next: (savedCustomer: any) => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente guardado correctamente.' });
        this.displayDialog = false;
        this.loadCustomers(); 
      },
      error: (err: any) => {
        console.error('Error al guardar cliente:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar el cliente.' });
      }
    });
  }

  deleteCustomer(id: number) {
    this.customerService.delete(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'warn', summary: 'Eliminado', detail: `Cliente con ID ${id} eliminado.` });
        this.loadCustomers(); 
      },
      error: (err: any) => {
        console.error('Error al eliminar cliente:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el cliente.' });
      }
    });
  }
}