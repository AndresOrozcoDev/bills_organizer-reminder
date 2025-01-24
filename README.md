# Organizador de Facturas

## Descripción

Aplicación web diseñada para ayudar a los usuarios a gestionar sus facturas y pagos mensuales de manera eficiente. Los usuarios pueden registrar, ver, editar y eliminar facturas y pagos realizados, así como recibir recordatorios para facturas próximas a vencer y almacenar comprobantes de pago.

## Características Principales

1. **Autenticación de Usuarios**

   - Registro e inicio de sesión mediante email y contraseña utilizando Firebase Authentication.

2. **Gestión de Facturas (CRUD)**

   - **Crear**: Registrar nuevas facturas con nombre del servicio, monto, fecha límite, url del comprobante y estado (pendiente o pagada).
   - **Leer**: Ver un listado de facturas organizadas.
   - **Actualizar**: Marcar facturas como pagadas y/o agregar la url del comprobante en sus detalles.
   - **Eliminar**: Eliminar facturas antiguas o incorrectas.

3. **Almacenamiento de Comprobantes**

   - Subir imágenes o PDFs de los comprobantes de pago utilizando Firebase Storage.
   - Asociar cada comprobante con su factura correspondiente.

## Arquitectura del Proyecto

### Frontend (React)

- **React**: Framework utilizado para construir una interfaz intuitiva y responsiva.
- **Modulos**: Por medio de la arquitectura modular se divide en dos grandes modulos:
  - `Auth`: Para la autenticación.
  - `Bills`: Para la gestion de facturas.

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

## Demo
Desplegado de forma gratuita en **Netlify**, para abrir el [Demo Bills](https://aesthetic-kleicha-9bf9d8.netlify.app/)

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

## Libreria de iconos
Se usa `lucid-react` por su ligero peso y compatibilidad con React JS, para la [docuemntación](https://lucide.dev/guide/packages/lucide-react) y visualizar los [Iconos](https://lucide.dev/icons/)

---

## Autor

**Andrés Orozco**
- [GitHub](https://github.com/AndresOrozcoDev)
- [LinkedIn](https://www.linkedin.com/in/andresorozcodev/)

---