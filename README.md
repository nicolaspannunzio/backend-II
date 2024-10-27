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

# Entrega Final - Backend II

Este proyecto es la continuación del **Proyecto Backend I**, que se centra en la gestión de productos y carritos de compra en un e-commerce, implementando un CRUD de usuarios junto con un sistema de autorización y autenticación.

## Contenidos

-   Nuevas Funcionalidades
-   Modelo de Usuario
-   Sistema de Autenticación
-   Rutas de Usuario
-   Modelo de Ticket
-   Middleware de Autorización
-   Instalación
-   Información Adicional

## Nuevas Funcionalidades

En esta etapa, se implementarán las siguientes funcionalidades:

1.  **CRUD de Usuarios**: Gestión completa de usuarios, permitiendo crear, leer, actualizar y eliminar usuarios.
2.  **Autenticación y Autorización**: Sistema de login utilizando JWT y estrategias de Passport para manejar la seguridad del acceso.
3.  **Modelo de Usuario**: Definición de un modelo de usuario que incluye campos específicos y encriptación de contraseñas.
4.  **Aplicación de DAO y DTO**: Se modificará la capa de persistencia para aplicar estos conceptos.
5.  **Patrón Repository**: Implementación de este patrón para trabajar con el DAO en la lógica de negocio.
6.  **Middleware de Autorización**: Control de acceso a endpoints según roles de usuario.
7.  **Modelo Ticket**: Creación de un modelo para formalizar compras.

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

Se implementará una estrategia "current" para extraer la cookie que contiene el token y obtener el usuario asociado. Se modificará esta ruta para evitar enviar información sensible, devolviendo un DTO del usuario con solo la información necesaria.

### Rutas de Usuario

Se agregará al router `/api/sessions/` la ruta `/current`, que validará al usuario logueado y devolverá en la respuesta un DTO del usuario.

## Middleware de Autorización

Se implementará un middleware para controlar el acceso a ciertos endpoints:

-   **Administradores**: Solo pueden crear, actualizar y eliminar productos.
-   **Usuarios**: Solo pueden agregar productos a su carrito.

## Modelo de Ticket

Se creará un modelo `Ticket` que contará con las siguientes características:

-   `id`: Autogenerado por Mongo.
-   `code`: String, autogenerado y único.
-   `purchase_datetime`: Fecha y hora exacta en la que se formalizó la compra.
-   `amount`: Total de la compra.
-   `purchaser`: Contendrá el correo del usuario asociado al carrito.

## Implementación de Compra

Se implementará en el router de carritos la ruta `/:cid/purchase`, que permitirá finalizar el proceso de compra del carrito:

-   Se corroborará el stock del producto al finalizar la compra.
-   Si hay suficiente stock, se restará del inventario.
-   Si no hay suficiente stock, no se agregará el producto al proceso de compra.
-   Al finalizar la compra, se generará un ticket con los datos de la compra y se devolverá un arreglo con los IDs de los productos que no pudieron procesarse. El carrito del usuario solo contendrá los productos que no pudieron comprarse.

## Información Adicional

-   El repositorio de GitHub del proyecto completo estará disponible sin la carpeta `node_modules`.
-   Se espera que las nuevas funcionalidades mejoren la experiencia de gestión de usuarios y seguridad en la aplicación e-commerce, además de profesionalizar la arquitectura del servidor.

------

***Desarrollador***

Nicolás A. Pannunzio - Desarrollador, creador y responsable de este proyecto.

*contacto: nicolas.a.pannunzio@gmail.com*