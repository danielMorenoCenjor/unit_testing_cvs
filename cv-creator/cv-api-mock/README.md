# CV Creator

## Generar el app

   Para generar la aplicacion se utiliza osprey. 
   En este caso se utilizó Cloud9, siguiendo los pasos a continuación:
   
   1. instalar cliente osprey
   > npm install -g osprey-cli
   2. crear la aplicacion osprey a partir del fichero raml
   > osprey new raml/api.raml --name apitest --target api
   3. instalar las dependencias de la nueva aplicacion osprey
   > cd api
   > npm install
   4. En este punto sepueden borrar las carpetas 
     * /node_modules
     * /raml
   
   Para ejecutar la aplicación: 
   > api/src/app.js
   
### Fix para la consola osprey

  Para que la consola se vea, hay que editar el elemento con clase (eliminar la clase): 
  
  > resource expanded ng-scope
   
### Ejemplos de llamada al api
   
  * [heroku - /cvs](http://)
  * [cloud9 - /cvs](https://)
   
## Documentación con raml2html

  >1ª Instalar:  npm intall -g raml2html
  
  >2ª Ir a la ruta donde esta main.raml
   Y ejecutar:  raml2html main.raml > main.html
   
  >3ª Editar el HTML:
  Para aumentar el tamaño de los modales en la documentacion, añadir al final de los estilos:
   
  > .modal-dialog {
  >		width: 90%;
  >	}