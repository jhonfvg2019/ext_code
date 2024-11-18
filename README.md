# Code Enhancer for VS Code

Esta extensión utiliza la potencia de la IA de Google Gemini para mejorar tu código dentro de VS Code.  Proporciona las siguientes funciones:

## Características

* **Agregar Comentarios:**  Genera comentarios claros y concisos para tu código, explicando la lógica y el propósito. Puedes elegir entre español e inglés para los comentarios.
* **Mejorar Estilo de Código:** Refactoriza tus identificadores usando diferentes estilos de código (camelCase, PascalCase, snake_case, SCREAMING_SNAKE_CASE, kebab-case).  Puedes elegir el idioma de los identificadores (español o inglés) y si quieres que la IA mejore los nombres existentes o solo cambie el estilo.
* **Optimizar Código:** Optimiza tu código para mejorar el rendimiento, la legibilidad o el uso de memoria.  También puedes elegir una optimización completa que abarque los tres aspectos.
* **Explicar Código:** Genera una explicación detallada de tu código en formato Markdown, incluyendo ejemplos y secciones con encabezados. La explicación se guarda en un archivo `explanation.md` en la carpeta raíz de tu espacio de trabajo y se abre automáticamente en un nuevo editor. Puedes elegir entre español e inglés para la explicación.
* **Generar Diagrama Mermaid:** Crea diagramas Mermaid (diagramas de clases, de flujo o de secuencia) a partir de tu código. El diagrama se guarda en un archivo `.mmd` en la carpeta raíz de tu espacio de trabajo y se abre automáticamente en un nuevo editor.
* **Resetear API Key:**  Elimina la API key almacenada para que puedas ingresar una nueva.

## Requisitos Previos

* **API Key de Google Gemini:** Necesitas una API key válida de Google Gemini.
* **VS Code:**  Asegúrate de que estás utilizando una versión reciente de VS Code.
* **Conexión a Internet:** Se necesita una conexión a internet activa para comunicarse con la API de Google Gemini.


## Instalación

1. Abre VS Code.
2. Ve a la vista de extensiones (Ctrl+Shift+X o Cmd+Shift+X).
3. Busca "Code Enhancer with Gemini".
4. Haz clic en "Instalar".


## Uso

1. Abre un archivo de código en VS Code.
2. Abre la paleta de comandos (Ctrl+Shift+P o Cmd+Shift+P).
3. Escribe el nombre del comando que quieres ejecutar (ej: "Code Enhancer: Agregar Comentarios") y selecciónalo.
4. Sigue las instrucciones en pantalla (si las hay) para configurar las opciones del comando.

## Comandos Disponibles

* `codeEnhancer.addComments`: Agrega comentarios al código.
* `codeEnhancer.enhanceStyle`: Mejora el estilo del código.
* `codeEnhancer.optimizeCode`: Optimiza el código.
* `codeEnhancer.explainCode`: Explica el código y genera un archivo Markdown.
* `codeEnhancer.generateDiagram`: Genera un diagrama Mermaid del código.
* `codeEnhancer.resetApiKey`: Restablece la API key de Gemini.


## Configuración

La primera vez que ejecutes un comando, se te pedirá que ingreses tu API key de Google Gemini.  Esta se almacenará de forma segura en el almacenamiento de secretos de VS Code.  Puedes restablecer tu API key en cualquier momento usando el comando `codeEnhancer.resetApiKey`.


## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un problema o una solicitud de extracción en el repositorio de la extensión.


## Licencia

Copyright (c) 2024 Jhon Valencia

