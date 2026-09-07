# Code-Insight-AI

Este es el repositorio frontend de Code Insight AI, proporciona una interfaz de usuario para interactuar con el backend del sistema. Permite analizar repositorios de código (mediante una URL de GitHub o un archivo ZIP) y visualizar el resultado del análisis generado con IA. Aplicando diferentes conceptos como:

- Consumo de API REST mediante HttpClient
- Procesamiento asíncrono con jobs y sondeo (polling) de estado
- Programación reactiva con RxJS (defer, switchMap, filter, take, timer)
- Manejo de estado con Signals de Angular
- Componentes standalone y arquitectura orientada a features
- Configuración por entornos (desarrollo y producción)
- Visualización de datos del análisis (arquitectura, tecnologías, componentes, hallazgos y recomendaciones)
- Formularios con FormsModule
- Pruebas unitarias con Vitest en formato given / when / then

## Requisitos Previos

Asegúrate de tener instalado lo siguiente:

- **Node.js**: [Descargar Node.js](https://nodejs.org/)
- **npm** (administrador de paquetes de Node.js): Viene incluido con Node.js
- **Angular CLI**: Instálalo globalmente con `npm install -g @angular/cli`
- **Lenguajes utilizados**: TypeScript
- **Frameworks, herramientas o librerias utilizados**: Angular, RxJS, Vitest, ESLint, Prettier

## Scripts Disponibles

- **Instalar Dependencias**: `npm install`
- **Iniciar la Aplicación**: `npm start`
- **Construir la Aplicación**: `npm run build`
- **Construir en modo observador**: `npm run watch`
- **Ejecutar Pruebas Unitarias (con cobertura)**: `npm test`
- **Linteo del Código**: `npm run lint`

## Paso a paso para ejecutar el repositorio

Para poder utilizar este repositorio debes seguir estas instrucciones y luego dirigirte al Repositorio Backend Code Insight AI y seguir las instrucciones para levantar el complemento de la aplicacion

1. Clonar el repositorio en el entorno local utilizando el comando

   ```bash
   git clone https://github.com/juparefe/code-insight-ai-frontend.git
   ```

2. Abrir la carpeta clonada utilizando algun editor de codigo

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Verifica la configuración del entorno en `src/environments/environment.ts` y ajusta `apiBaseUrl` para que apunte al backend (por defecto `http://localhost:3000/api/v1`)

5. Ejecuta el siguiente comando para iniciar el servidor:

   ```bash
   npm start
   ```

6. Por defecto la aplicacion se levanta en el puerto 4200
