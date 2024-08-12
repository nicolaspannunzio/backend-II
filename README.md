# Proyecto Backend I: Gestión de Productos y Carritos de compra en un e-commerce

### Primera pre-entrega

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
### Segunda pre-entrega
## Websockets

Como parte de este desafío se agregaron rutas para mejorar la interacción en tiempo real con la lista de productos, se ha integrado el motor de plantillas Handlebars y Socket.IO en el proyecto. A continuación,  detallo la configuración y las nuevas vistas añadidas.

**Configuración del Servidor**

-   **Handlebars**: Se ha configurado Handlebars como el motor de plantillas para renderizar vistas dinámicas en el servidor.
-   **Socket.IO**: Se ha instalado y configurado Socket.IO para manejar la comunicación en tiempo real entre el cliente y el servidor.

**Vistas**

-   **home.handlebars**: Esta vista muestra una lista de todos los productos agregados hasta el momento. Está diseñada para ofrecer una visualización básica de los productos en el sistema.
-   **realTimeProducts.handlebars**: Accesible a través del endpoint `/realtimeproducts`, esta vista muestra la lista de productos utilizando WebSockets. Gracias a la integración con Socket.IO, cualquier cambio en la lista de productos (como la adición o eliminación de productos) se actualiza automáticamente en esta vista en tiempo real.

**Implementación de WebSockets**

-   Cuando se agrega o elimina un producto, el servidor emite eventos a través de WebSocket para notificar a los clientes sobre los cambios.
-   Los clientes conectados a la vista `realTimeProducts.handlebars` reciben estas actualizaciones y actualizan automáticamente la lista de productos mostrada.

-----------
## Entrega Final Backend 1

### Objetivos Generales

Para esta etapa final, el proyecto se ha actualizado para cumplir con los siguientes objetivos:

1.  **Persistencia en MongoDB**: Se ha integrado MongoDB como sistema principal de persistencia de datos, reemplazando el uso de archivos JSON. Esto proporciona una gestión de datos más robusta y flexible.
2.  **Endpoints Completos**: Se han definido todos los endpoints necesarios para gestionar productos y carritos, cubriendo las funcionalidades requeridas para la aplicación del e-commerce.

### Objetivos Específicos

1.  **Consultas de Productos**: Se ha mejorado el endpoint `GET /api/products` para soportar filtros avanzados, paginación y ordenamiento de productos. Los cambios incluyen:
    
    -   **Query Params**: Se permite la recepción de parámetros opcionales `limit`, `page`, `sort`, y `query`.
        
        -   `limit`: Define la cantidad de productos a devolver (por defecto es 10).
        -   `page`: Especifica la página de resultados (por defecto es 1).
        -   `query`: Permite buscar productos por categoría o disponibilidad.
        -   `sort`: Permite ordenar los productos por precio de manera ascendente o descendente.
    -   **Formato de Respuesta**:
    El endpoint `GET /api/products` devuelve un objeto con la siguiente estructura:

-   **status**: Indica el estado de la respuesta, que puede ser "success" o "error".
-   **payload**: Contiene el resultado de los productos solicitados según los parámetros de búsqueda y filtrado.
-   **totalPages**: El número total de páginas de resultados disponibles.
-   **prevPage**: El número de la página anterior, si existe.
-   **nextPage**: El número de la página siguiente, si existe.
-   **page**: El número de la página actual.
-   **hasPrevPage**: Un indicador booleano que señala si existe una página previa.
-   **hasNextPage**: Un indicador booleano que señala si existe una página siguiente.
-   **prevLink**: Un enlace directo a la página previa, o `null` si no existe.
-   **nextLink**: Un enlace directo a la página siguiente, o `null` si no existe.

2.  **Gestión de Carritos**: Se han añadido y mejorado los siguientes endpoints en el router de `carts`:
    
    -   `DELETE /api/carts/:cid/products/:pid`: Elimina un producto específico del carrito.
    -   `PUT /api/carts/:cid`: Actualiza el carrito con un arreglo de productos.
    -   `PUT /api/carts/:cid/products/:pid`: Actualiza únicamente la cantidad de un producto específico en el carrito.
    -   `DELETE /api/carts/:cid`: Elimina todos los productos del carrito.
    
    Además, el modelo de `Carts` ha sido actualizado para que el id de cada producto en la propiedad `products` haga referencia al modelo de `Products`. La ruta `GET /api/carts/:cid` ha sido modificada para incluir un `populate`, permitiendo que al traer todos los productos del carrito se obtengan los detalles completos de los productos.
    
2.  **Actualización de Vistas**:
    
    -   **`index.handlebars`**: Se ha modificado para mostrar todos los productos con paginación. Además, cada producto puede ser visualizado en detalle en una nueva vista `/products/:pid`, la cual muestra la descripción completa, precio, categoría, etc., y un botón para agregar el producto al carrito. También se ha añadido la funcionalidad de agregar un producto al carrito directamente desde la vista de productos.
    -   **`/carts/:cid`**: Se ha añadido una vista para visualizar un carrito específico, mostrando solo los productos que pertenecen a ese carrito.
    

Estas modificaciones aseguran que la aplicación no solo cumpla con los requisitos iniciales, sino que también ofrezca una experiencia más profesional y funcional para la gestión de productos y carritos de compra.
 
 
------------

***Desarrollador***

Nicolás A. Pannunzio - Desarrollador, creador y responsable de este proyecto.

*contacto: nicolas.a.pannunzio@gmail.com*