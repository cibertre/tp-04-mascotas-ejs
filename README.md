# Trabajo Practico N° 4 - Mimosos

## Descripcion

**Mimosos** es una aplicación web desarrollada como parte del Trabajo Práctico N° 4. 
La aplicacion funciona para la gestión y visualización de mascotas que se encuentran en diferentes estados dentro de un proceso de adopción (En adopcion, reservada y Adoptado).

Fue desarrollada utilizando tecnologias tales como "Node.js", "Express" y "EJS" como motor de vistas. Los datos de las mascotas se obtienen desde un archivo "mascotas.json", ubicado dentro de la carpeta "datos".

La aplicación cuenta con una landing page de inicio, un listado de mascotas, una vista de detalle para cada mascota y un formulario para incorporar una nueva mascota. 

Para los estilos del proyecto se utilizo una hoja de estilos CSS propia, con una combinación de colores: celeste, azul y verde lima, junto con un efecto visual parecido al glass, buscando mantener una interfaz clara, moderna y agradable.

## Instalacion

Para instalar y ejecutar el proyecto localmente, se deben seguir los siguientes pasos.

### 1. Clonacion del repositorio

El proyecto se encuentra alojado en la nube de GitHub. Para obtener una copia local, abrir una terminal y ejecutar:

Consola bash
git clone https://github.com/cibertre/tp-04-mascotas-ejs.git


Luego ingresar a la carpeta del proyecto:

Consola bash
cd tp-04-mascotas-ejs


### 2. Instalacion de las dependencias

Una vez dentro de la carpeta del proyecto, abrir una terminal e instalar las dependencias, para ello:

Consola bash
npm install


Este comando instala los paquetes necesarios definidos para que la aplicación pueda ejecutarse correctamente, entre ellos Express, EJS y express-ejs-layouts.

## Estructura general del proyecto


tp-04-mascotas-ejs/
├── datos/
│   └── mascotas.json
├── public/
│   ├── css/
│   └── img/
├── src/
│   ├── archivos.js
│   └── index.js
├── views/
│   ├── layouts/
│   │   └── main.ejs
│   ├── partials/
│   │   ├── encabezado.ejs
│   │   └── pie.ejs
│   ├── mascotas/
│   │   ├── lista.ejs
│   │   ├── detalle.ejs
│   │   └── nueva.ejs
│   ├── inicio.ejs
│   └── no-encontrado.ejs
├── .gitignore
└── README.md

## Ejecucion

Para iniciar la aplicación se debe abrir un terminal y ejecutar:

Consola bash
node src/index.js


Si el servidor se inicia correctamente, se mostrará en la consola el mensaje:


Aplicación disponible en http://localhost:3000


Luego se puede acceder desde el navegador tipeando y ejecutando la siguiente url:

http://localhost:3000

La aplicación utiliza el puerto 3000, definido en "src/index.js".

## Paginas y rutas

Las principales rutas de la aplicación son las siguientes:

| Metodo |      Ruta      |                     Descripción                           |
|--------|----------------|-----------------------------------------------------------|
|  GET   |       /        |        Muestra la página de inicio o landing page.        |
|  GET   |    /mascotas   |             Muestra el listado de mascotas.               |
|  GET   |/mascotas/nueva |      Muestra el formulario para agregar una nueva mascota |
|  GET   | /mascotas/:id  |   Muestra el detalle de una mascota según su identificador|
|  POST  |  /mascotas     |   Recibe y procesa los datos enviados desde el formulario |
|  GET   |  /api/mascotas |      Devuelve el listado de mascotas en formato JSON      |

La ruta "/mascotas/:id" utiliza el parámetro "id" para buscar la mascota correspondiente dentro del arreglo cargado desde el archivo JSON. Si no se encuentra una mascota con ese identificador, la aplicación responde con estado "404" y muestra la vista "no-encontrado".

## Estructura de las vistas

Las vistas se encuentran organizadas dentro de la carpeta "views" de acuerdo con su función:


views/
├── layouts/
│   └── main.ejs
├── partials/
│   ├── encabezado.ejs
│   └── pie.ejs
├── mascotas/
│   ├── lista.ejs
│   ├── detalle.ejs
│   └── nueva.ejs
├── inicio.ejs
└── no-encontrado.ejs


- "layouts/main.ejs": contiene la estructura general utilizada por las diferentes páginas.
- "partials/encabezado.ejs": contiene el encabezado reutilizable de la aplicación.
- "partials/pie.ejs": contiene el pie de página reutilizable.
- "inicio.ejs": corresponde a la landing page o página principal.
- "mascotas/lista.ejs": muestra las tarjetas de las mascotas.
- "mascotas/detalle.ejs": muestra la información particular de una mascota.
- "mascotas/nueva.ejs": contiene el formulario para ingresar una nueva mascota.
- "no-encontrado.ejs": se muestra cuando se solicita una mascota que no existe.

## Recursos Estaticos

Los recursos estáticos de la aplicación se encuentran dentro de la carpeta "public":


public/
├── css/
└── img/


La carpeta "css" contiene la hoja de estilos utilizada para definir la apariencia de la aplicación, mientras que "img" contiene las imágenes utilizadas por las mascotas y otros elementos visuales.
Aqui hemos utilizado 2 imágenes con el formato svg, una como favicon y otra como icono de la aplicación.

Los recursos de esta carpeta son servidos mediante el middleware de Express "express.static".

En "index.js" se configura de la siguiente manera:


app.use(express.static(path.join(__dirname, "..", "public")));


## Formulario

La ruta "GET /mascotas/nueva" permite acceder al formulario para registrar una nueva mascota.

El formulario solicita los siguientes datos:

- Nombre.
- Especie.
- Raza.
- Edad.
- Estado.
- Descripción.

Al enviar el formulario, los datos son recibidos mediante la ruta "POST /mascotas". Para poder procesar los datos enviados desde formularios HTML se utiliza el middleware:


app.use(express.urlencoded({ extended: false }));

Antes de agregar una nueva mascota, se realizan validaciones básicas. Se verifica que los campos obligatorios tengan contenido, que la edad sea un número válido y mayor que cero, y que exista una descripción.

Si los datos no son válidos, se devuelve el formulario con estado "400", mostrando un mensaje de error y conservando los valores enviados.

Si los datos son válidos, se genera un nuevo identificador tomando como referencia el mayor "id" existente y sumándole uno. La nueva mascota se agrega al arreglo y luego se redirige al listado mediante:


res.redirect("/mascotas");


Para las nuevas mascotas se utiliza inicialmente la imagen "sin-foto.png" alojada como mencionamos precedentemente en la carpeta public/img.

## Persistencia y manejo de datos

Los datos iniciales de la aplicación se encuentran en:


datos/mascotas.json


El archivo contiene un arreglo de objetos, donde cada objeto representa una mascota y posee propiedades como "id", "nombre", "especie", "raza", "edad", "descripcion", "estado" e "imagen".

Al iniciar la aplicación, el archivo JSON es leído mediante la función "leerJson", definida en "src/archivos.js":


const mascotas = await leerJson(rutaDatos);


De esta manera, la información queda disponible para ser utilizada por las diferentes rutas y vistas.

En esta versión del proyecto, el archivo "mascotas.json" funciona como fuente de datos inicial. Las nuevas mascotas que se agregan desde el formulario se incorporan al arreglo en memoria mediante "mascotas.push()", pero NO se escriben nuevamente en el archivo JSON.

Por este motivo, las nuevas mascotas permanecen disponibles mientras el servidor continúa ejecutándose, pero no existe una persistencia permanente de esas altas en el archivo "mascotas.json". Al reiniciar el servidor, se vuelven a cargar los datos originales almacenados en el archivo.

Por lo tanto, se puede diferenciar entre:

- Datos iniciales: se mantienen en "mascotas.json" y se recuperan cada vez que se inicia la aplicación.
- Datos agregados mediante el formulario: se mantienen temporalmente en memoria durante la ejecución del servidor.
- Persistencia permanente: en esta versión no se implementa la escritura de las nuevas mascotas en el archivo JSON.

## Pruebas y estados de las solicitudes

Para realizar pruebas durante la navegación se incorporó en "index.js" un middleware denominado "monitor de solicitudes". LLegue a este middleware a traves de una web donde lo exponian a fin de escuchar la finalización de cada respuesta y muestra en la consola el método HTTP, la URL solicitada y el código de estado correspondiente, como me re servia a fin de visualizar lo requerido lo adicione. 

La lógica utilizada es:


app.use((req, res, next) => {
    res.on("finish", () => {
        console.log(
            ${req.method} ${req.originalUrl} → ${res.statusCode}
        );
    });

    next();
});


De esta manera, al navegar por las diferentes rutas se pueden observar en la consola resultados como:


GET / → 200
GET /mascotas → 200
GET /mascotas/2 → 200
GET /mascotas/99 → 404


El estado 200 indica que la solicitud fue procesada correctamente.

Aqui una observación, note de inmediato la aparicion del estado 304 como asi también puede aparecer un estado "304 Not Modified". Esto no significa que exista un error en la aplicación.

El código 304 se relaciona con el mecanismo de caché del navegador. Cuando el navegador ya tiene una versión del recurso y realiza una nueva solicitud, puede comprobar si ese recurso cambió. Si no hubo modificaciones, el servidor puede responder indicando que el navegador puede utilizar la versión que ya tiene almacenada.

Por este motivo, durante la navegación es normal encontrar respuestas como:


GET /mascotas → 304

En este caso, la solicitud se procesó correctamente y el navegador reutiliza una versión que considera vigente.

Consultando con asistentes de inteligecia artificial me indicaban maneras de bloquear la utilizacion de este estado en el navegador, intente aplicarlas y con exito las depuré pero no me mostraba el estado 200 y como ya estaba con los tiempos cortos para la presentacion del trabajo práctico, es que desisti de ello.

### Prueba de mascota inexistente

También se puede comprobar el funcionamiento de la ruta dinámica ingresando un identificador que no exista, por ejemplo:


http://localhost:3000/mascotas/99


La aplicación busca el id recibido y, al no encontrar coincidencia, responde con estado "404" y muestra la vista "no-encontrado".


** Prueba con el arreglo vacío **

La ruta "/mascotas" esta configurada para el caso en que no existan datos para mostrar. En "index.js" se utiliza "mascotas || []` como valor al enviar los datos a la vista:


res.render("mascotas/lista", {
    titulo: "Mascotas en adopción",
    mascotas: mascotas || []
});


De esta manera, la vista recibe un arreglo cuando "mascotas" no tiene un valor válido. Si el arreglo existe pero no contiene elementos (arreglo vacio), la vista puede comprobar que su longitud es cero y mostrar el mensaje correspondiente para indicar que no hay mascotas para listar.



