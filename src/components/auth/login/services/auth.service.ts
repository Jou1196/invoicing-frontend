// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginRequest } from '../../../models/login-request.model';
import { JwtResponse } from '../../../models/jwt-response.model';

const AUTH_API = 'http://localhost:8080/api/auth/';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const ROLES_KEY = 'auth-roles'; // ¡Nueva llave para roles!

@Injectable({
 providedIn: 'root'
})
export class AuthService {

 constructor(private http: HttpClient) { }

 login(credentials: LoginRequest): Observable<JwtResponse> {
return this.http.post<JwtResponse>(AUTH_API + 'login', credentials).pipe(
tap(response => {
this.saveToken(response.token);
 this.saveUser(response.username);
 this.saveRoles(response.roles); // <-- 1. ¡Guardar los roles después del login!
 })
 );
 }
 
 logout(): void {
 window.sessionStorage.clear();
 }

 // --- HELPERS DE ALMACENAMIENTO (Tokens y Usuario) ---
 public saveToken(token: string): void {
 window.sessionStorage.removeItem(TOKEN_KEY);
 window.sessionStorage.setItem(TOKEN_KEY, token);
 }

 public getToken(): string | null {
 return window.sessionStorage.getItem(TOKEN_KEY);
 }

 public saveUser(username: string): void {
 window.sessionStorage.removeItem(USER_KEY);
 window.sessionStorage.setItem(USER_KEY, username);
 }

 public isLoggedIn(): boolean {
 return !!this.getToken();
 }
    
  // --- MÉTODOS DE ROL (Para solucionar el error de compilación) ---

  // 2. Guardar los roles en sessionStorage
  public saveRoles(roles: string[]): void {
    window.sessionStorage.removeItem(ROLES_KEY);
    // Convertir el array de strings a un string JSON para guardarlo
    window.sessionStorage.setItem(ROLES_KEY, JSON.stringify(roles)); 
  }

  // 3. Obtener los roles del usuario
  public getRoles(): string[] {
    const roles = window.sessionStorage.getItem(ROLES_KEY);
    // Parsear el JSON de vuelta a un array de strings, si existe
    return roles ? JSON.parse(roles) : []; 
  }

  // 4. Método que comprueba si el usuario tiene ALGUNO de los roles requeridos
  public hasRole(requiredRoles: string[]): boolean {
    const userRoles = this.getRoles();
    
    // Si requiredRoles está vacío, siempre devuelve true.
    if (!requiredRoles || requiredRoles.length === 0) {
        return true;
    }
      
    // Comprueba si AL MENOS uno de los roles del usuario está incluido en la lista de requiredRoles
    return userRoles.some(userRole => requiredRoles.includes(userRole));
  }
}