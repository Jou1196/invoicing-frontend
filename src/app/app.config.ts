// src/app/app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
// 1. IMPORTACIÓN CRÍTICA: Añadir withInterceptorsFromDi y HTTP_INTERCEPTORS
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

// Importación de tu Interceptor de Clase


// Importación de PrimeNG (esto está correcto)
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { AuthInterceptor } from '../components/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    
    // 2. MODIFICACIÓN CRÍTICA: Habilitar DI para Interceptores de Clase
    provideHttpClient(withInterceptorsFromDi()), 
    
    // 3. REGISTRO CRÍTICO: Registrar el Interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    
    provideAnimations(),
    
    // Configuración de PrimeNG (está correcto)
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ]
};