# API_rest_Trianafy
PROYECTO DE DESARROLLO DE UNA API REST CON NODE, EXPRESS, MONGO Y MONGOOSE

Pasos para ejecutar el proyecto:

-Clonar el repositorio

-Ejecutar npm start en consola (Hay que tener la previa instalación realizada)

-Crear un fichero .env en la raiz del repositorio.

### **Archivo .env**
    PORT=3000
    DB_URI=mongodb://localhost/API_trianafy
    JWT_SECRET=esteEsElSecretoDeCayetanoEsMolon
    BCRYPT_ROUNDS=12
    JWT_LIFETIME=1d
    JWT_ALGORITHM=HS256


-Tener mongoDB en el equipo y configurar la URL de la database en el archivo .env

-Ejecutamos en consola npm start y el proyecto deberia de ejecutar sin problema 

-Previamente se recomienda si se va a realizar en local usar postman para realizar peticiones (es un programa sencillo)

### **Rutas de la API**

#### **/auth**

    post /login autenticarse
    post /register registrarse

#### **/songs**

    get: / obtiene todas las canciones
    post / agrega una nueva canción
    get: /:id obtiene una canción buscada por id 
    delete: /:id borra una canción buscada por id 
    put: /:id modifica una canción 

#### **/lists**

    get / obtiene todas las playlist
    get /:id obtiene una playlist buscada por id
    post / crea una nueva playlist 
    put /:id edita una playlist buscada por id
    delete /:id elimina una playlist buscada por id



#### **/lists/:id/songs**

    get /:id busca una canción de la playlist por id
    get / busca las canciones de una playlist
    post /:id agrega una canción a una playlist
    delete /:id elimina una canción de una playlist



