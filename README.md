<div style="display: flex; align-items: center; justify-content: center;">
  <img src="client/public/logo.svg" alt="Logo" width="80" height="80" style="order: -1;">
  <h1 style="margin-right: 10px;">FullTask</h1>
</div>

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub issues](https://img.shields.io/github/issues/LautaroFullone/full-task)](https://github.com/LautaroFullone/full-task/issues)
[![GitHub forks](https://img.shields.io/github/forks/LautaroFullone/full-task)](https://github.com/LautaroFullone/fullt-ask/network)
[![GitHub stars](https://img.shields.io/github/stars/LautaroFullone/full-task)](https://github.com/LautaroFullone/full-task/stargazers)

¡Bienvenido a FullTask! Una aplicación inspirada en Trello, pero con un toque único. Gestiona proyectos, colaboradores, tareas y notas de una manera fácil y eficiente.

## Características

- Gestión de proyectos con roles de colaboradores y un manager.
- Creación de tareas y notas dentro de los proyectos.
- Cambio de estado de las tareas (pending, onhold, inprogress, underreview, completed).
- Historial de cambios de las tareas.
- Autenticación con login y registro.
- Envío de correo electrónico para regenerar contraseñas olvidadas.
- Uso de JWT para la autenticación.
- Gestión de permisos.
- Uso de drag-and-drop para cambiar el estado de las tareas.

## Instalación

1. Clona el repositorio: `git clone https://github.com/LautaroFullone/fulltask.git`
2. Instala las dependencias: `npm install` en la carpeta `client` y en la carpeta `server`.
3. Configura las variables de entorno en un archivo `.env` siguiendo el formato de `.env.example`.
4. Inicia el servidor de desarrollo en client `npm run start:dev` y en server tambien como `npm run start:dev`.

## Uso

1. Regístrate como nuevo usuario o inicia sesión si ya tienes una cuenta.
2. Crea un nuevo proyecto o únete a uno existente.
3. Gestiona tus tareas y notas dentro del proyecto.
4. Utiliza drag-and-drop para cambiar el estado de las tareas.
5. Disfruta de una experiencia de gestión de proyectos fácil y eficiente.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para más detalles.
