export interface JwtResponse {
  token: string;
  type: string; // Debería ser "Bearer"
  username: string;
  roles: string[];
}