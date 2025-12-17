import { Routes } from '@angular/router';
import { LoginComponent } from '../components/auth/login/login.component';
import { authGuard } from '../components/guards/auth.guard';
import { roleGuard } from '../components/guards/role.guard';
import { AccessDeniedComponent } from '../components/components/access-denied/access-denied.component';
import { CustomerListComponent } from '../components/customer/list/customer-list/customer-list.component';




export const routes: Routes = [
    
    // 1. RUTA RAÍZ: Redirige directamente a la ruta de clientes.
    // Si el usuario no está logueado, authGuard lo enviará a /login.
    { 
        path: '', 
        redirectTo: '/clientes', 
        pathMatch: 'full' 
    }, 

    // 2. RUTA PÚBLICA: Permite la entrada al sistema.
    { 
        path: 'login', 
        component: LoginComponent 
    },

    // 3. RUTA DE CLIENTES PROTEGIDA: El destino principal.
    { 
        path: 'clientes', 
        component: CustomerListComponent, 
        canActivate: [authGuard, roleGuard], // Se ejecuta authGuard, luego roleGuard
        data: {
            // Ejemplo: Solo permite acceso a usuarios con estos roles
            roles: ['ROLE_ADMIN', 'ROLE_USER'] 
        }
    },
    
    // 4. RUTA DE ERROR DE PERMISOS:
    { 
        path: 'access-denied', 
        component: AccessDeniedComponent 
    },

    // 5. RUTA CATCH-ALL (Opcional)
    { 
        path: '**', 
        redirectTo: '/clientes' 
    }
];