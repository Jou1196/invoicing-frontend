import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
// Opcional, pero recomendado: import { FormsModule } from '@angular/forms'; 

import { AuthService } from './services/auth.service'; 
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [CommonModule , FormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] 
})
export class LoginComponent implements OnInit {
  // Nota: Aquí se declara una referencia directa a los elementos HTML
  // Esto solo se hace cuando el binding normal falla (como ahora).
  // Es una forma de emergencia para obtener los valores.
  
  errorMessage: string = ''; 

  constructor(
    private authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    // ...
  }

  // 🚨 EL MÉTODO NO RECIBE ARGUMENTOS AHORA 🚨
  login() {
    this.errorMessage = ''; 
    
    // Obtenemos los valores directamente del DOM (es un truco de emergencia)
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;

    const username = usernameInput ? usernameInput.value : '';
    const password_raw = passwordInput ? passwordInput.value : '';
    
    // ESTE LOG DEBE APARECER AHORA
    console.log('1. Intentando iniciar sesión (Versión Simple):', username); 

    if (!username || !password_raw) {
      this.errorMessage = 'Debe ingresar usuario y contraseña.';
      return;
    }

    const credentials = {
        username: username,
        password: password_raw 
    };

    this.authService.login(credentials).subscribe({
      next: (response: any) => {
        console.log('2. Login 200 OK. Redirigiendo a /clientes.'); 
        setTimeout(() => {
             this.router.navigate(['/clientes']); 
        }, 50); 
      },
      error: (err: HttpErrorResponse) => {
        console.error('2. Error capturado en el frontend:', err.status);
        if (err.status === 401) {
          this.errorMessage = 'Usuario o contraseña inválidos.';
        } else {
          this.errorMessage = 'Error de conexión (API no disponible).';
        }
      }
    });
  }
}