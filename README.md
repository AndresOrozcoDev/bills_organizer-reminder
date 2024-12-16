# Organizador de Facturas

## Descripción

Organizador de Facturas es una aplicación web diseñada para ayudar a los usuarios a gestionar sus facturas mensuales de manera eficiente. Los usuarios pueden registrar, ver, editar y eliminar facturas, así como recibir recordatorios para facturas próximas a vencer y almacenar comprobantes de pago.

## Características Principales

1. **Autenticación de Usuarios**

   - Registro e inicio de sesión mediante email y contraseña utilizando Firebase Authentication.

2. **Gestión de Facturas (CRUD)**

   - **Crear**: Registrar nuevas facturas con nombre del servicio, monto, fecha límite y estado (pendiente o pagada).
   - **Leer**: Ver un listado de facturas organizadas.
   - **Actualizar**: Marcar facturas como pagadas o editar sus detalles.
   - **Eliminar**: Eliminar facturas antiguas o incorrectas.

3. **Almacenamiento de Comprobantes**

   - Subir imágenes o PDFs de los comprobantes de pago utilizando Firebase Storage.
   - Asociar cada comprobante con su factura correspondiente.

## Arquitectura del Proyecto

### Frontend (React)

- **React**: Framework utilizado para construir una interfaz intuitiva y responsiva.
- **Componentes sugeridos**:
  - `Login / Register`: Para la autenticación.
  - `Dashboard`: Muestra un resumen de facturas (pendientes, pagadas, próximas a vencer).
  - `FacturaForm`: Formulario para agregar o editar facturas.
  - `FacturaList`: Lista de facturas con opciones para gestionar cada una.

### Backend (Firebase)

- **Firebase Authentication**: Para el manejo de inicio de sesión y registro.
- **Firebase Firestore**:
  - Colección: `facturas`.
  - Campos: `nombre`, `monto`, `fechaLimite`, `estado`, `comprobanteURL`, `usuarioID`.
- **Firebase Storage**:
  - Carpeta: `/comprobantes` para almacenar los comprobantes de pago.
  - Asocia cada archivo con el ID de la factura en Firestore.

## Diseño de la Interfaz
Basado en el template **UKO** donde tiene una vista previa [UKO template](https://uko-react-free.netlify.app/dashboard)

## Requisitos

- **Node.js** y **npm** para ejecutar el proyecto localmente.
- Cuenta de Firebase para usar Firebase Authentication, Firestore y Firebase Storage.

## Instalación

1. Clonar este repositorio:
```bash
    git clone https://github.com/AndresOrozcoDev/bills_organizer-reminder.git
```

2. Instalacion de dependencias:
```bash
    npm i
```

3. Ejecución del servidor:
```bash
    npm run dev
```

## Ejecucion de pruebas

```bash
   ...
```

## Despliegues

```bash
   npm run build
```


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
