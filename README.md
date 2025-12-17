# Invoicing Frontend (Angular)

Este es el frontend del sistema de facturación (**Invoicing**), construido con **Angular 17**. La aplicación permite gestionar clientes, productos y facturas de manera integrada con el backend de Spring Boot.

---

## 🛠️ Tecnologías Usadas

- **Angular 17** (Componentes Standalone o Módulos según prefieras).  
- **Bootstrap 5** para estilos y diseño.  
- **RxJS** para manejo de flujos de datos asíncronos.  
- **HttpClientModule** para consumo de servicios REST.  

---

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (Versión 18 o superior recomendada).
- **Angular CLI**:  
  ```bash
  npm install -g @angular/cli
  ```

---

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/Jou1196/invoicing-frontend.git
cd invoicing-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar el entorno

Asegúrate de que la URL del backend apunte a tu servidor local de Spring Boot. Edita el archivo `src/environments/environment.ts` con la siguiente configuración:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

---

## 🚀 Ejecución de la Aplicación

### Iniciar servidor de desarrollo

Ejecuta el siguiente comando para levantar la aplicación:

```bash
ng serve -o
```

La aplicación se abrirá automáticamente en: `http://localhost:4200`.

---

## 🏗️ Estructura del Proyecto

### **Módulos principales:**

- **Models**: Interfaces de TypeScript (`Invoice`, `Customer`, `Product`) que reflejan las entidades del backend.  
- **Services**: Contiene la lógica de comunicación HTTP. Ejemplo: `InvoiceService` con soporte para paginación.  
- **Components**:
  - **InvoiceList**: Tabla paginada con filtros de búsqueda.  
  - **InvoiceForm**: Formulario dinámico (ReactiveForms) para crear facturas.  
- **Guards/Interceptors**: Manejo de seguridad JWT para proteger rutas y adjuntar el token automáticamente en cada petición.  

---

## 📦 Despliegue (Build)

Para generar los archivos de producción ejecuta:

```bash
ng build --configuration production
```

Los archivos se generarán en la carpeta `dist/`.

---

## 🤝 Conexión con el Backend

Para que el frontend funcione correctamente:

1. **El Backend de Spring Boot debe estar corriendo en el puerto `8080`.**  
2. El archivo `docker-compose.yml` del backend debe tener activos los servicios de **PostgreSQL** y **RabbitMQ**.  
