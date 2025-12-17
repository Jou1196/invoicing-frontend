// src/app/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/login/services/auth.service';


const TOKEN_HEADER_KEY = 'Authorization'; // Encabezado de la petición

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    // 1. Obtener el token del AuthService
    const token = this.authService.getToken(); 
    let authRequest = request;

    // 2. Si el token existe, clonar la petición y añadir el encabezado 'Authorization'
    if (token != null) {
      authRequest = request.clone({ 
        // Añadir el encabezado Bearer [token]
        headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) 
      });
    }

    // 3. Continuar la petición modificada
    return next.handle(authRequest);
  }
}
