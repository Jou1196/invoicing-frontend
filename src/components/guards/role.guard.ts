// src/app/guards/role.guard.ts
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core'; 
import { AuthService } from '../auth/login/services/auth.service';


export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
    
    const authService = inject(AuthService);
    const router = inject(Router);

    // 1. Obtener los roles requeridos definidos en la ruta (data: { roles: ['ROLE_ADMIN'] })
    const requiredRoles = route.data['roles'] as Array<string>;

    // Si no se define ningún rol, el acceso es permitido (si ya pasaste el authGuard)
    if (!requiredRoles || requiredRoles.length === 0) {
        return true;
    }

    // 2. Verificar si el usuario tiene AL MENOS uno de los roles requeridos
    if (authService.hasRole(requiredRoles)) {
        return true; // Acceso permitido
    } else {
        // Redirigir a una página de "Acceso Denegado"
        console.warn('Acceso denegado: El usuario no tiene los roles requeridos.');
        router.navigate(['/access-denied']); 
        return false;
    }
};