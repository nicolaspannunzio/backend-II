# Proyecto Backend II: Gestión de Usuarios y Autenticación en un E-commerce

### Primera Pre-entrega

Este proyecto es la continuación del **Proyecto Backend I**, que se centra en la gestión de productos y carritos de compra en un e-commerce, implementando un CRUD de usuarios junto con un sistema de autorización y autenticación.

## Contenidos

-   [Resumen del Proyecto Anterior](#resumen-del-proyecto-anterior)
-   [Nuevas Funcionalidades](#nuevas-funcionalidades)
-   [Modelo de Usuario](#modelo-de-usuario)
-   [Sistema de Autenticación](#sistema-de-autenticaci%C3%B3n)
-   [Rutas de Usuario](#rutas-de-usuario)
-   [Instalación](#instalaci%C3%B3n)
-   [Información Adicional](#informaci%C3%B3n-adicional)

## Resumen del Proyecto Anterior

El **Proyecto Backend I** fue desarrollado con Node.js y Express, permitiendo la gestión de productos y carritos de compra con persistencia de datos en archivos JSON. Incluía las siguientes características:

-   **Tecnologías utilizadas**: Node.js, Express, Multer, Nodemon.
-   **Clases principales**: `ProductManager` y `CartManager` para manejar productos y carritos respectivamente.
-   **Rutas API**: Endpoints para gestionar productos y carritos, incluyendo métodos CRUD.
-   **Persistencia de datos**: Archivos JSON para almacenar productos y carritos.
-   **Pruebas**: Utilización de Insomnia para pruebas de los endpoints.

## Nuevas Funcionalidades

En esta etapa, se implementarán las siguientes funcionalidades:

1.  **CRUD de Usuarios**: Gestión completa de usuarios, permitiendo crear, leer, actualizar y eliminar usuarios.
2.  **Autenticación y Autorización**: Sistema de login utilizando JWT y estrategias de Passport para manejar la seguridad del acceso.
3.  **Modelo de Usuario**: Definición de un modelo de usuario que incluye campos específicos y encriptación de contraseñas.

## Modelo de Usuario

Se creará un modelo `User` con los siguientes campos:

-   `first_name`: String
-   `last_name`: String
-   `email`: String (único)
-   `age`: Number
-   `password`: String (Hash)
-   `cart`: Id (referencia a Carts)
-   `role`: String (default: ‘user’)

La contraseña del usuario será encriptada utilizando el paquete `bcrypt` con el método `hashSync`.

## Sistema de Autenticación

Se desarrollarán estrategias de Passport para que funcionen con el modelo de usuarios. El sistema de login del usuario se implementará utilizando JWT.

### Estrategia "current"

Se implementará una estrategia "current" para extraer la cookie que contiene el token y obtener el usuario asociado. Si el token es válido, se devolverán los datos del usuario asociado; de lo contrario, se devolverá un error de Passport utilizando un extractor de cookie.

### Rutas de Usuario

 Se agregará al router `/api/sessions/` la ruta `/current`, que
 validará al usuario logueado y devolverá en la respuesta sus datos
 asociados al JWT.
 
 ## Información Adicional

-   El repositorio de GitHub del proyecto completo estará disponible sin la carpeta `node_modules`.
-   Se espera que las nuevas funcionalidades mejoren la experiencia de gestión de usuarios y seguridad en la aplicación e-commerce.

---
***Desarrollador***

Nicolás A. Pannunzio - Desarrollador, creador y responsable de este proyecto.

*contacto: nicolas.a.pannunzio@gmail.com*