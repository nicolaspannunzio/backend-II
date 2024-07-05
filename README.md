# Proyecto Backend I: Gestión de Productos y Carritos de compra en un e-commerce

Este proyecto es una aplicación backend construida con Node.js y Express que permite gestionar productos y carritos de compra, con la persistencia de datos realizada mediante archivos JSON.

## Contenidos

-   [Entorno de Trabajo](#entorno-de-trabajo)
-   [Instalación](#instalaci%C3%B3n)
-   [Descripción del Proyecto](#descripci%C3%B3n-del-proyecto)
-   [Estructura del Proyecto](#estructura-del-proyecto)
-   [Métodos y Rutas](#m%C3%A9todos-y-rutas)
-   [Persistencia de Datos](#persistencia-de-datos)
-   [Pruebas](#pruebas)
-   [Información Adicional](#informaci%C3%B3n-adicional)

## Entorno de Trabajo

El proyecto utiliza las siguientes tecnologías:

-   Node.js
-   Express
-   Multer (para gestión de archivos)
-   Nodemon (para desarrollo)


## Instalación

Sigue estos pasos para instalar y configurar el entorno de desarrollo:

1.  Clonar el repositorio.

3.  Instalación las dependencias:
	  ***npm install***
4.   Iniciar el servidor:
	  ***npm run dev***
	  
## Descripción del Proyecto

El proyecto se comenzó a construir con un archivo `app.js`, que es el punto de entrada principal de la aplicación. También cuenta con un archivo `utils.js` para utilidades comunes. Las dos clases principales del proyecto son `productManager.js` y `cartManager.js`, cada una con su respectivo router para manejar las solicitudes HTTP.

### app.js

El archivo `app.js` configura el servidor Express, define los middlewares y establece las rutas principales.

### utils.js

Este archivo contiene utilidades comunes para el proyecto. Como la implementación de `__dirname`  y `fileURLToPath` para asegurar rutas absolutas en el proyecto.

### productManager.js

Esta clase maneja la lógica relacionada con los productos. En su constructor, inicializa la lista de productos y carga los productos desde un archivo JSON. Las funciones principales de esta clase son:

-   `loadProducts()`: Carga los productos desde el archivo JSON.
-   `saveProducts()`: Guarda los productos en el archivo JSON.
-   `getProductList()`: Obtiene la lista de productos.
-   `getProductById(id)`: Obtiene un producto por su ID.
-   `addProduct(product)`: Agrega un nuevo producto.
-   `updateProduct(id, updatedProduct)`: Actualiza un producto existente.
-   `deleteProduct(id)`: Elimina un producto por su ID.

### cartManager.js

Esta clase maneja la lógica relacionada con los carritos. En su constructor, inicializa la lista de carritos y carga los carritos desde un archivo JSON. Las funciones principales de esta clase son:

-   `loadCarts()`: Carga los carritos desde el archivo JSON.
-   `saveCarts()`: Guarda los carritos en el archivo JSON.
-   `createCart()`: Crea un nuevo carrito.
-   `getCarts()`: Muestra el/ o los carrito/s.
-   `getCartById(id)`: Obtiene un carrito por su ID, junto a los productos contenidos       dentro de él.
-   `addProductToCart(cartId, productId)`: Agrega un producto al carrito.

## Estructura del Proyecto

La estructura del proyecto es la siguiente. Haz clic en el siguiente enlace
[Link-aLaImagenDeLaEstructuraDelProyecto](https://postimg.cc/c69nMDd1)

## Métodos y Rutas

### Rutas para Productos

-   `GET /api/products` - Obtiene la lista de productos.
-   `GET /api/products/:pid` - Obtiene un producto por ID.
-   `POST /api/products` - Crea un nuevo producto.
-   `PUT /api/products/:pid` - Actualiza un producto existente.
-   `DELETE /api/products/:pid` - Elimina un producto por ID.

### Rutas para Carritos

-   `POST /api/carts` - Crea un nuevo carrito.
-   `GET /api/carts/:cid` - Lista los productos en un carrito.
-   `POST /api/carts/:cid/product/:pid` - Agrega un producto al carrito.

## Persistencia de Datos

La persistencia de datos se realiza a través de archivos JSON ubicados en la carpeta `data`. Los archivos `products.json` y `carts.json` almacenan los datos de productos y carritos, respectivamente.

## Pruebas

Todos los métodos fueron testeados utilizando Insomnia. Insomnia es una herramienta de testing de API que facilita la creación y ejecución de solicitudes HTTP para probar los endpoints de la aplicación.

## Información Adicional

-   El proyecto está configurado para recargar automáticamente durante el desarrollo utilizando Nodemon.
-   Multer se puede integrar para manejar la subida de archivos, aunque en este proyecto específico no se detallaron rutas que lo utilicen.

----------

Este README proporciona una visión general del proyecto, detalles sobre la configuración del entorno de trabajo, la estructura del proyecto, las rutas y métodos disponibles. 

---
***Desarrollador***

Nicolás A. Pannunzio - Desarrollador, creador y responsable de este proyecto.

*contacto: nicolas.a.pannunzio@gmail.com*
