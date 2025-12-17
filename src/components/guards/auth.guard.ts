// src/app/guards/auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core'; // Importar 'inject'
import { AuthService } from '../auth/login/services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
    
    // Inyectar los servicios dentro de la función de Guard
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isLoggedIn()) {
        // Si hay token, permite el acceso a la ruta
        return true; 
    } else {
        // Si no hay token, redirige al login y bloquea el acceso
        router.navigate(['/login']);
        return false;
    }
};