# API - CLASH APP 2020

Este proyecto contiene la definición de la API REST de la aplicación web Clash App 2020, el desarrollo de esta API esta basada en AWS Lambdas con motor NodeJS 12.x y el servicio de API Gateway de Amazon Cloud, integra un almacenamiento de caché en ElastiCache con motor REDIS  y un almecenamiento principal utilizando la tecnología de DynamoDB.

# PRE-REQUISITOS

Para levantar el ambiente de desarrollo correctamente es indispensable:
- Tener la instalación del framework Serverless (https://www.serverless.com/)
- Configuración de AWS-CLI

# INSTALACIÓN
Inicialmente en la carpeta raíz del proyecto, ejecutar el siguiente comando:
```javascript
> npm install
```
Luego dentro de la carpeta **/Source** ejecutar el siguiente comando:
```javascript
> npm install
```
# TESTING
Se realizo la implementación de unit testing haciendo uso del framework ***Jest***, para cada una de las funciones lambda utilizadas para el API REST, para la ejecución de las pruebas unitarias, es necesario colocarse en la carpeta raíz del proyecto y ejecutar el siguiente comando:
```javascript
> npm test
```
# DOCUMENTACIÓN
La documentación de la API REST puede ser consultada en el siguiente enlace: 

[Swagger]( https://app.swaggerhub.com/apis-docs/BMac9715/CLASH-API/v1.0.0#/)

# ARQUITECTURA GENERAL

Se presenta la arquitectura general de la aplicación web Clash 2020, incluyendo componentes de backend y frontend, arquitectura cloud en Amazon:
! [Arquitectura Cloud - Clash App 2020][architecture]

[architecture]: https://i.ibb.co/YyzX5vk/Architecture-Clash-App.png "Arquitectura Cloud Clash App"

# CREDITOS

Proyecto del curso de Programación Web de la carrera de Ingenieria en Informatica y Sistemas de la Universidad Rafael Landívar, Guatemala.

**Autor:**
Bryan Estuardo Macario Coronado - 1283816
Estudiante