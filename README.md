# dashboard

## Configuración de MySQL con Docker Compose

Este repositorio incluye una configuración base para ejecutar un contenedor MySQL utilizando Docker Compose.

### Requisitos previos

- [Docker](https://docs.docker.com/get-docker/) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado

### Levantar el servicio

Para iniciar el contenedor MySQL, ejecuta el siguiente comando en la raíz del proyecto:

```bash
docker-compose up -d
```

El flag `-d` ejecuta el contenedor en segundo plano (modo detached).

### Conectarse al servicio

Una vez que el servicio esté en ejecución, puedes conectarte a MySQL usando:

**Desde la línea de comandos:**
```bash
mysql -h 127.0.0.1 -P 3306 -u root -p
```
Cuando se solicite, ingresa la contraseña: `examplepassword`

**Desde tu aplicación:**
- Host: `localhost` o `127.0.0.1`
- Puerto: `3306`
- Usuario: `root`
- Contraseña: `examplepassword`

### Cambiar la contraseña

Para cambiar la contraseña por defecto, modifica la variable de entorno `MYSQL_ROOT_PASSWORD` en el archivo `docker-compose.yml`:

```yaml
environment:
  MYSQL_ROOT_PASSWORD: tu_nueva_contraseña
```

### Apagar el servicio

Para detener y eliminar el contenedor:

```bash
docker-compose down
```

Si deseas eliminar también el volumen de datos (esto borrará toda la información de la base de datos):

```bash
docker-compose down -v
```

### Ver logs del servicio

Para ver los logs del contenedor MySQL:

```bash
docker-compose logs -f mysql
```