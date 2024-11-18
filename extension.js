// // The module 'vscode' contains the VS Code extensibility API
// // Import the module and reference it with the alias vscode in your code below
// const vscode = require('vscode');

// // This method is called when your extension is activated
// // Your extension is activated the very first time the command is executed
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// /**
//  * @param {vscode.ExtensionContext} context
//  */
// function activate(context) {

// 	// Use the console to output diagnostic information (console.log) and errors (console.error)
// 	// This line of code will only be executed once when your extension is activated
// 	console.log('Congratulations, your extension "jfex1" is now active!');
// 	const genAI = new GoogleGenerativeAI('AIzaSyAtIo5kB1AKoIM0F3TrIorqp6YyWreXjGQ');
// 	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

// 	// The command has been defined in the package.json file
// 	// Now provide the implementation of the command with  registerCommand
// 	// The commandId parameter must match the command field in package.json
// 	const disposable = vscode.commands.registerCommand('jfex1.helloWorld', async function () {
// 		// The code you place here will be executed every time your command is executed
// 		const prompt = "Hola"

// 		const result = await model.generateContent(prompt);
// 		const response = await result.response;
// 		const text = response.text();
// 		console.log(text);

// 		// Display a message box to the user
// 		vscode.window.showInformationMessage(text);
// 	});

// 	context.subscriptions.push(disposable);
// }

// // This method is called when your extension is deactivated
// function deactivate() {}

// module.exports = {
// 	activate,
// 	deactivate
// }


// const vscode = require('vscode');
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// /**
//  * @param {vscode.ExtensionContext} context
//  */
// function activate(context) {
//     console.log('Extension "Code Commenter with Gemini" is now active');

//     // Initialize Gemini AI
//     const genAI = new GoogleGenerativeAI('AIzaSyAtIo5kB1AKoIM0F3TrIorqp6YyWreXjGQ');
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     // Register the command to add comments
//     const disposable = vscode.commands.registerCommand('codeCommenter.addComments', async () => {
//         try {
//             // Get the active text editor
//             const editor = vscode.window.activeTextEditor;
//             if (!editor) {
//                 vscode.window.showWarningMessage('No hay un archivo abierto');
//                 return;
//             }

//             // Get the document text
//             const document = editor.document;
//             const code = document.getText();

//             // Show progress indicator
//             await vscode.window.withProgress({
//                 location: vscode.ProgressLocation.Notification,
//                 title: "Generando comentarios...",
//                 cancellable: false
//             }, async () => {
//                 // Create prompt for Gemini
//                 const prompt = `Analiza el siguiente código y genera comentarios explicativos. 
//                 Los comentarios deben ser concisos y útiles. Devuelve SOLO el código con los comentarios agregados.
//                 No incluyas explicaciones adicionales. Código:\n\n${code}`;

//                 // Get response from Gemini
//                 const result = await model.generateContent(prompt);
//                 const response = await result.response;
//                 const commentedCode = response.text();

//                 // Replace the entire document text with the commented version
//                 const fullRange = new vscode.Range(
//                     document.positionAt(0),
//                     document.positionAt(code.length)
//                 );

//                 // Apply the edit
//                 editor.edit(editBuilder => {
//                     editBuilder.replace(fullRange, commentedCode);
//                 });

//                 vscode.window.showInformationMessage('Comentarios agregados exitosamente');
//             });

//         } catch (error) {
//             console.error('Error:', error);
//             vscode.window.showErrorMessage('Error al generar comentarios: ' + error.message);
//         }
//     });

//     context.subscriptions.push(disposable);
// }

// function deactivate() {}

// module.exports = {
//     activate,
//     deactivate
// }


// const vscode = require('vscode');
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// /**
//  * @param {vscode.ExtensionContext} context
//  */
// function activate(context) {
//     console.log('Extension "Code Commenter with Gemini" is now active');

//     // Función para obtener la API key del almacenamiento seguro
//     async function getApiKey() {
//         const apiKey = await context.secrets.get('geminiApiKey');
//         if (!apiKey) {
//             const key = await vscode.window.showInputBox({
//                 prompt: 'Ingresa tu API key de Gemini',
//                 password: true,
//                 ignoreFocusOut: true,
//                 placeHolder: 'Ingresa tu API key aquí...'
//             });

//             if (!key) {
//                 throw new Error('Se requiere una API key para usar esta extensión');
//             }

//             await context.secrets.store('geminiApiKey', key);
//             return key;
//         }
//         return apiKey;
//     }

//     // Función para limpiar el formato de la respuesta
//     function cleanResponse(response) {
//         // Eliminar bloques de código markdown y espacios extras
//         return response
//             .replace(/```[\s\S]*?```/g, '')  // Elimina bloques de código
//             .replace(/`/g, '')               // Elimina backticks sueltos
//             .trim();                         // Elimina espacios extra
//     }

//     // Función para resetear la API key
//     const resetApiKey = vscode.commands.registerCommand('codeCommenter.resetApiKey', async () => {
//         await context.secrets.delete('geminiApiKey');
//         vscode.window.showInformationMessage('API key eliminada. Se solicitará una nueva en el próximo uso.');
//     });

//     // Registro del comando principal
//     const addComments = vscode.commands.registerCommand('codeCommenter.addComments', async () => {
//         try {
//             const editor = vscode.window.activeTextEditor;
//             if (!editor) {
//                 vscode.window.showWarningMessage('No hay un archivo abierto');
//                 return;
//             }

//             // Obtener API key de forma segura
//             const apiKey = await getApiKey();

//             // Inicializar Gemini
//             const genAI = new GoogleGenerativeAI(apiKey);
//             const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//             const document = editor.document;
//             const code = document.getText();

//             await vscode.window.withProgress({
//                 location: vscode.ProgressLocation.Notification,
//                 title: "Generando comentarios...",
//                 cancellable: false
//             }, async () => {
//                 const prompt = `Actúa como un experto desarrollador. Analiza el siguiente código y agrega comentarios explicativos.
//                 Los comentarios deben ser concisos y útiles, explicando la lógica y propósito del código.
//                 Devuelve SOLO el código con los comentarios agregados, la respuesta debe ser texto plano , no markdown.
//                 No incluyas explicaciones adicionales. Elimina todo los cometarios existentes.

//                 Código a comentar:
//                 ${code}`;

//                 const result = await model.generateContent(prompt);
//                 const response = await result.response;
//                 let commentedCode = response.text();

//                 // Limpiar formato de la respuesta
//                 // commentedCode = cleanResponse(commentedCode);

//                 // Aplicar cambios
//                 const fullRange = new vscode.Range(
//                     document.positionAt(0),
//                     document.positionAt(code.length)
//                 );

//                 await editor.edit(editBuilder => {
//                     editBuilder.replace(fullRange, commentedCode);
//                 });

//                 vscode.window.showInformationMessage('Comentarios agregados exitosamente');
//             });

//         } catch (error) {
//             console.error('Error:', error);
//             if (error.message.includes('API key')) {
//                 await context.secrets.delete('geminiApiKey');
//                 vscode.window.showErrorMessage('Error con la API key. Por favor, intenta nuevamente con una API key válida.');
//             } else {
//                 vscode.window.showErrorMessage('Error al generar comentarios: ' + error.message);
//             }
//         }
//     });

//     context.subscriptions.push(addComments, resetApiKey);
// }

// function deactivate() {}

// module.exports = {
//     activate,
//     deactivate
// }

// const vscode = require('vscode');
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// /**
//  * Gestiona la interacción con la API de Gemini
//  */
// class GeminiService {
//     constructor(context) {
//         this.context = context;
//     }

//     async getApiKey() {
//         const apiKey = await this.context.secrets.get('geminiApiKey');
//         if (!apiKey) {
//             const key = await vscode.window.showInputBox({
//                 prompt: 'Ingresa tu API key de Gemini',
//                 password: true,
//                 ignoreFocusOut: true,
//                 placeHolder: 'Ingresa tu API key aquí...'
//             });

//             if (!key) {
//                 throw new Error('Se requiere una API key para usar esta extensión');
//             }

//             await this.context.secrets.store('geminiApiKey', key);
//             return key;
//         }
//         return apiKey;
//     }

//     async getModel() {
//         const apiKey = await this.getApiKey();
//         const genAI = new GoogleGenerativeAI(apiKey);
//         return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     }
// }

// /**
//  * Gestiona las operaciones de código
//  */
// class CodeProcessor {
//     static cleanResponse(response) {
//         return response
//             .replace(/```[\s\S]*?```/g, '')
//             .replace(/`/g, '')
//             .trim();
//     }

//     static async detectCodeStyle(code) {
//         const patterns = {
//             camelCase: /^[a-z][a-zA-Z0-9]*$/,
//             PascalCase: /^[A-Z][a-zA-Z0-9]*$/,
//             snake_case: /^[a-z][a-z0-9_]*$/,
//             SCREAMING_SNAKE_CASE: /^[A-Z][A-Z0-9_]*$/,
//             'kebab-case': /^[a-z][a-z0-9-]*$/
//         };

//         const identifiers = code.match(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g) || [];
//         const styleCount = {};

//         identifiers.forEach(identifier => {
//             for (const [style, pattern] of Object.entries(patterns)) {
//                 if (pattern.test(identifier)) {
//                     styleCount[style] = (styleCount[style] || 0) + 1;
//                 }
//             }
//         });

//         const dominantStyle = Object.entries(styleCount)
//             .sort((a, b) => b[1] - a[1])[0]?.[0] || 'mixed';

//         return dominantStyle;
//     }
// }

// function activate(context) {
//     console.log('Extension "Code Enhancer" is now active');

//     const geminiService = new GeminiService(context);

//     // Comando para agregar comentarios
//     const addComments = vscode.commands.registerCommand('codeEnhancer.addComments', async () => {
//         try {
//             const editor = vscode.window.activeTextEditor;
//             if (!editor) {
//                 vscode.window.showWarningMessage('No hay un archivo abierto');
//                 return;
//             }

//             const model = await geminiService.getModel();
//             const document = editor.document;
//             const code = document.getText();

//             await vscode.window.withProgress({
//                 location: vscode.ProgressLocation.Notification,
//                 title: "Generando comentarios...",
//                 cancellable: false
//             }, async () => {
//                 const prompt = `Actúa como un experto desarrollador. Analiza el siguiente código y agrega comentarios explicativos.
//                 Los comentarios deben ser concisos y útiles, explicando la lógica y propósito del código.
//                 Devuelve SOLO el código con los comentarios agregados, la respuesta debe ser texto plano, no markdown.
//                 No incluyas explicaciones adicionales. Elimina todo los cometarios existentes.

//                 Código a comentar:
//                 ${code}`;

//                 const result = await model.generateContent(prompt);
//                 const response = await result.response;
//                 const commentedCode = CodeProcessor.cleanResponse(response.text());

//                 const fullRange = new vscode.Range(
//                     document.positionAt(0),
//                     document.positionAt(code.length)
//                 );

//                 await editor.edit(editBuilder => {
//                     editBuilder.replace(fullRange, commentedCode);
//                 });

//                 vscode.window.showInformationMessage('Comentarios agregados exitosamente');
//             });
//         } catch (error) {
//             handleError(error, context);
//         }
//     });

//     // Comando para mejorar el estilo de código
//     const enhanceCodeStyle = vscode.commands.registerCommand('codeEnhancer.enhanceStyle', async () => {
//         try {
//             const editor = vscode.window.activeTextEditor;
//             if (!editor) {
//                 vscode.window.showWarningMessage('No hay un archivo abierto');
//                 return;
//             }

//             const model = await geminiService.getModel();
//             const document = editor.document;
//             const code = document.getText();
//             const currentStyle = await CodeProcessor.detectCodeStyle(code);

//             const targetStyle = await vscode.window.showQuickPick([
//                 { label: 'camelCase', description: 'myVariable' },
//                 { label: 'PascalCase', description: 'MyVariable' },
//                 { label: 'snake_case', description: 'my_variable' },
//                 { label: 'SCREAMING_SNAKE_CASE', description: 'MY_VARIABLE' },
//                 { label: 'kebab-case', description: 'my-variable' }
//             ], {
//                 placeHolder: `Estilo actual detectado: ${currentStyle}. Selecciona el estilo objetivo:`
//             });

//             if (!targetStyle) return;

//             await vscode.window.withProgress({
//                 location: vscode.ProgressLocation.Notification,
//                 title: "Mejorando estilo de código...",
//                 cancellable: false
//             }, async () => {
//                 const prompt = `Actúa como un experto desarrollador. Analiza el siguiente código y:
//                 1. Refactoriza los identificadores usando el estilo ${targetStyle.label}
//                 2. Mejora los nombres de variables y funciones para que sean más descriptivos y significativos
//                 3. Mantén la misma lógica y estructura del código
//                 4. Conserva los comentarios existentes

//                 Devuelve SOLO el código refactorizado, sin usar bloques de código markdown ni explicaciones adicionales.

//                 Código a refactorizar:
//                 ${code}`;

//                 const result = await model.generateContent(prompt);
//                 const response = await result.response;
//                 const enhancedCode = CodeProcessor.cleanResponse(response.text());

//                 const fullRange = new vscode.Range(
//                     document.positionAt(0),
//                     document.positionAt(code.length)
//                 );

//                 await editor.edit(editBuilder => {
//                     editBuilder.replace(fullRange, enhancedCode);
//                 });

//                 vscode.window.showInformationMessage(`Código refactorizado a ${targetStyle.label}`);
//             });

//         } catch (error) {
//             handleError(error, context);
//         }
//     });

//     // Comando para resetear API key
//     const resetApiKey = vscode.commands.registerCommand('codeEnhancer.resetApiKey', async () => {
//         await context.secrets.delete('geminiApiKey');
//         vscode.window.showInformationMessage('API key eliminada. Se solicitará una nueva en el próximo uso.');
//     });

//     context.subscriptions.push(addComments, enhanceCodeStyle, resetApiKey);
// }

// function handleError(error, context) {
//     console.error('Error:', error);
//     if (error.message.includes('API key')) {
//         context.secrets.delete('geminiApiKey');
//         vscode.window.showErrorMessage('Error con la API key. Por favor, intenta nuevamente con una API key válida.');
//     } else {
//         vscode.window.showErrorMessage('Error en la operación: ' + error.message);
//     }
// }

// function deactivate() { }

// module.exports = {
//     activate,
//     deactivate
// }


// const vscode = require('vscode');
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// /**
//  * Gestiona la interacción con la API de Gemini
//  */
// class GeminiService {
//     constructor(context) {
//         this.context = context;
//     }

//     async getApiKey() {
//         const apiKey = await this.context.secrets.get('geminiApiKey');
//         if (!apiKey) {
//             const key = await vscode.window.showInputBox({
//                 prompt: 'Ingresa tu API key de Gemini',
//                 password: true,
//                 ignoreFocusOut: true,
//                 placeHolder: 'Ingresa tu API key aquí...'
//             });

//             if (!key) {
//                 throw new Error('Se requiere una API key para usar esta extensión');
//             }

//             await this.context.secrets.store('geminiApiKey', key);
//             return key;
//         }
//         return apiKey;
//     }

//     async getModel() {
//         const apiKey = await this.getApiKey();
//         const genAI = new GoogleGenerativeAI(apiKey);
//         return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     }
// }

// /**
//  * Gestiona las operaciones de código
//  */
// class CodeProcessor {
//     static cleanResponse(response) {
//         return response
//             .replace(/```[\s\S]*?```/g, '')
//             .replace(/`/g, '')
//             .trim();
//     }

//     static async detectCodeStyle(code) {
//         const patterns = {
//             camelCase: /^[a-z][a-zA-Z0-9]*$/,
//             PascalCase: /^[A-Z][a-zA-Z0-9]*$/,
//             snake_case: /^[a-z][a-z0-9_]*$/,
//             SCREAMING_SNAKE_CASE: /^[A-Z][A-Z0-9_]*$/,
//             'kebab-case': /^[a-z][a-z0-9-]*$/
//         };

//         const identifiers = code.match(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g) || [];
//         const styleCount = {};

//         identifiers.forEach(identifier => {
//             for (const [style, pattern] of Object.entries(patterns)) {
//                 if (pattern.test(identifier)) {
//                     styleCount[style] = (styleCount[style] || 0) + 1;
//                 }
//             }
//         });

//         const dominantStyle = Object.entries(styleCount)
//             .sort((a, b) => b[1] - a[1])[0]?.[0] || 'mixed';

//         return dominantStyle;
//     }
// }

// function activate(context) {
//     console.log('Extension "Code Enhancer" is now active');

//     const geminiService = new GeminiService(context);

//     // Comando para agregar comentarios
//     const addComments = vscode.commands.registerCommand('codeEnhancer.addComments', async () => {
//         try {
//             const editor = vscode.window.activeTextEditor;
//             if (!editor) {
//                 vscode.window.showWarningMessage('No hay un archivo abierto');
//                 return;
//             }

//             const model = await geminiService.getModel();
//             const document = editor.document;
//             const code = document.getText();

//             await vscode.window.withProgress({
//                 location: vscode.ProgressLocation.Notification,
//                 title: "Generando comentarios...",
//                 cancellable: false
//             }, async () => {
//                 const prompt = `Actúa como un experto desarrollador. Analiza el siguiente código y agrega comentarios explicativos.
//                 Los comentarios deben ser concisos y útiles, explicando la lógica y propósito del código.
//                 Devuelve SOLO el código con los comentarios agregados, la respuesta debe ser texto plano, no markdown.
//                 No incluyas explicaciones adicionales. Elimina todo los cometarios existentes.

//                 Código a comentar:
//                 ${code}`;

//                 const result = await model.generateContent(prompt);
//                 const response = await result.response;
//                 const commentedCode = CodeProcessor.cleanResponse(response.text());

//                 const fullRange = new vscode.Range(
//                     document.positionAt(0),
//                     document.positionAt(code.length)
//                 );

//                 await editor.edit(editBuilder => {
//                     editBuilder.replace(fullRange, commentedCode);
//                 });

//                 vscode.window.showInformationMessage('Comentarios agregados exitosamente');
//             });
//         } catch (error) {
//             handleError(error, context);
//         }
//     });

//     // Comando para mejorar el estilo de código
//     const enhanceCodeStyle = vscode.commands.registerCommand('codeEnhancer.enhanceStyle', async () => {
//         try {
//             const editor = vscode.window.activeTextEditor;
//             if (!editor) {
//                 vscode.window.showWarningMessage('No hay un archivo abierto');
//                 return;
//             }

//             const model = await geminiService.getModel();
//             const document = editor.document;
//             const code = document.getText();
//             const currentStyle = await CodeProcessor.detectCodeStyle(code);

//             // Selección del idioma
//             const selectedLanguage = await vscode.window.showQuickPick(
//                 [
//                     { label: 'Español', value: 'es' },
//                     { label: 'Inglés', value: 'en' }
//                 ],
//                 {
//                     placeHolder: 'Selecciona el idioma para los identificadores:'
//                 }
//             );

//             if (!selectedLanguage) return;

//             // Selección de mejora de identificadores
//             const improveIdentifiers = await vscode.window.showQuickPick(
//                 [
//                     { label: 'Sí', value: true, description: 'Mejorar nombres de identificadores' },
//                     { label: 'No', value: false, description: 'Mantener nombres originales' }
//                 ],
//                 {
//                     placeHolder: '¿Deseas mejorar los nombres de los identificadores?'
//                 }
//             );

//             if (!improveIdentifiers) return;

//             const targetStyle = await vscode.window.showQuickPick([
//                 { label: 'camelCase', description: 'myVariable' },
//                 { label: 'PascalCase', description: 'MyVariable' },
//                 { label: 'snake_case', description: 'my_variable' },
//                 { label: 'SCREAMING_SNAKE_CASE', description: 'MY_VARIABLE' },
//                 { label: 'kebab-case', description: 'my-variable' }
//             ], {
//                 placeHolder: `Estilo actual detectado: ${currentStyle}. Selecciona el estilo objetivo:`
//             });

//             if (!targetStyle) return;

//             await vscode.window.withProgress({
//                 location: vscode.ProgressLocation.Notification,
//                 title: "Mejorando estilo de código...",
//                 cancellable: false
//             }, async () => {
//                 const languageInstruction = selectedLanguage.value === 'es' 
//                     ? 'Usa identificadores en español' 
//                     : 'Use English identifiers';

//                 const improveInstruction = improveIdentifiers.value
//                     ? 'Mejora los nombres de variables y funciones para que sean más descriptivos y significativos'
//                     : 'Mantén los nombres originales de las variables y funciones, solo cambia el estilo';

//                 const prompt = `Actúa como un experto desarrollador. Analiza el siguiente código y:
//                 1. Refactoriza los identificadores usando el estilo ${targetStyle.label}
//                 2. ${languageInstruction}
//                 3. ${improveInstruction}
//                 4. Mantén la misma lógica y estructura del código
//                 5. Conserva los comentarios existentes

//                 Devuelve SOLO el código refactorizado, sin usar bloques de código markdown ni explicaciones adicionales.

//                 Código a refactorizar:
//                 ${code}`;

//                 const result = await model.generateContent(prompt);
//                 const response = await result.response;
//                 const enhancedCode = CodeProcessor.cleanResponse(response.text());

//                 const fullRange = new vscode.Range(
//                     document.positionAt(0),
//                     document.positionAt(code.length)
//                 );

//                 await editor.edit(editBuilder => {
//                     editBuilder.replace(fullRange, enhancedCode);
//                 });

//                 vscode.window.showInformationMessage(
//                     `Código refactorizado a ${targetStyle.label} en ${selectedLanguage.label}` +
//                     `${improveIdentifiers.value ? ' con nombres mejorados' : ''}`
//                 );
//             });

//         } catch (error) {
//             handleError(error, context);
//         }
//     });

//     // Comando para resetear API key
//     const resetApiKey = vscode.commands.registerCommand('codeEnhancer.resetApiKey', async () => {
//         await context.secrets.delete('geminiApiKey');
//         vscode.window.showInformationMessage('API key eliminada. Se solicitará una nueva en el próximo uso.');
//     });

//     context.subscriptions.push(addComments, enhanceCodeStyle, resetApiKey);
// }

// function handleError(error, context) {
//     console.error('Error:', error);
//     if (error.message.includes('API key')) {
//         context.secrets.delete('geminiApiKey');
//         vscode.window.showErrorMessage('Error con la API key. Por favor, intenta nuevamente con una API key válida.');
//     } else {
//         vscode.window.showErrorMessage('Error en la operación: ' + error.message);
//     }
// }

// function deactivate() { }

// module.exports = {
//     activate,
//     deactivate
// }


const vscode = require('vscode');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require('path');
const fs = require('fs');

/**
 * Gestiona la interacción con la API de Gemini
 */
class GeminiService {
    constructor(context) {
        this.context = context;
    }

    async getApiKey() {
        const apiKey = await this.context.secrets.get('geminiApiKey');
        if (!apiKey) {
            const key = await vscode.window.showInputBox({
                prompt: 'Ingresa tu API key de Gemini',
                password: true,
                ignoreFocusOut: true,
                placeHolder: 'Ingresa tu API key aquí...'
            });

            if (!key) {
                throw new Error('Se requiere una API key para usar esta extensión');
            }

            await this.context.secrets.store('geminiApiKey', key);
            return key;
        }
        return apiKey;
    }

    async getModel() {
        const apiKey = await this.getApiKey();
        const genAI = new GoogleGenerativeAI(apiKey);
        return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }
}

/**
 * Gestiona las operaciones de código y backup
 */
class CodeProcessor {
    static cleanResponse(response) {
        return response
            .replace(/```[\s\S]*?```/g, '')
            .replace(/`/g, '')
            .trim();
    }

    static async detectCodeStyle(code) {
        const patterns = {
            camelCase: /^[a-z][a-zA-Z0-9]*$/,
            PascalCase: /^[A-Z][a-zA-Z0-9]*$/,
            snake_case: /^[a-z][a-z0-9_]*$/,
            SCREAMING_SNAKE_CASE: /^[A-Z][A-Z0-9_]*$/,
            'kebab-case': /^[a-z][a-z0-9-]*$/
        };

        const identifiers = code.match(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g) || [];
        const styleCount = {};

        identifiers.forEach(identifier => {
            for (const [style, pattern] of Object.entries(patterns)) {
                if (pattern.test(identifier)) {
                    styleCount[style] = (styleCount[style] || 0) + 1;
                }
            }
        });

        const dominantStyle = Object.entries(styleCount)
            .sort((a, b) => b[1] - a[1])[0]?.[0] || 'mixed';

        return dominantStyle;
    }

    static async createBackup(document) {
        try {
            const originalPath = document.fileName;
            const extension = path.extname(originalPath);
            const basename = path.basename(originalPath, extension);
            const timestamp = new Date().toISOString().replace(/[:]/g, '-').split('.')[0];
            const backupPath = path.join(
                path.dirname(originalPath),
                `${basename}.backup.${timestamp}${extension}`
            );

            await fs.promises.writeFile(backupPath, document.getText());
            vscode.window.showInformationMessage(`Backup creado en: ${path.basename(backupPath)}`);
            return backupPath;
        } catch (error) {
            throw new Error(`Error al crear backup: ${error.message}`);
        }
    }
}

function activate(context) {
    console.log('Extension "Code Enhancer" is now active');

    const geminiService = new GeminiService(context);

    // Comando para agregar comentarios
    const addComments = vscode.commands.registerCommand('codeEnhancer.addComments', async () => {
        try {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showWarningMessage('No hay un archivo abierto');
                return;
            }

            const document = editor.document;
            await CodeProcessor.createBackup(document);

            const model = await geminiService.getModel();
            const code = document.getText();

            // Selección del idioma
            const selectedLanguage = await vscode.window.showQuickPick(
                [
                    { label: 'Español', value: 'es' },
                    { label: 'Inglés', value: 'en' }
                ],
                {
                    placeHolder: 'Selecciona el idioma para los comentarios:'
                }
            );

            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Generando comentarios...",
                cancellable: false
            }, async () => {
                const prompt = `Actúa como un experto desarrollador. Analiza el siguiente código y agrega comentarios en ${selectedLanguage.label} explicativos.
                Los comentarios deben ser concisos y útiles, explicando la lógica y propósito del código.
                Devuelve SOLO el código con los comentarios agregados, la respuesta debe ser texto plano, no markdown.
                No incluyas explicaciones adicionales. Elimina todo los cometarios existentes.
                
                Código a comentar:
                ${code}`;

                const result = await model.generateContent(prompt);
                const response = await result.response;
                const commentedCode = CodeProcessor.cleanResponse(response.text());

                const fullRange = new vscode.Range(
                    document.positionAt(0),
                    document.positionAt(code.length)
                );

                await editor.edit(editBuilder => {
                    editBuilder.replace(fullRange, commentedCode);
                });

                vscode.window.showInformationMessage('Comentarios agregados exitosamente');
            });
        } catch (error) {
            handleError(error, context);
        }
    });

    // Comando para mejorar el estilo de código
    const enhanceCodeStyle = vscode.commands.registerCommand('codeEnhancer.enhanceStyle', async () => {
        try {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showWarningMessage('No hay un archivo abierto');
                return;
            }

            const document = editor.document;
            await CodeProcessor.createBackup(document);

            const model = await geminiService.getModel();
            const code = document.getText();
            const currentStyle = await CodeProcessor.detectCodeStyle(code);

            // Selección del idioma
            const selectedLanguage = await vscode.window.showQuickPick(
                [
                    { label: 'Español', value: 'es' },
                    { label: 'Inglés', value: 'en' }
                ],
                {
                    placeHolder: 'Selecciona el idioma para los identificadores:'
                }
            );

            if (!selectedLanguage) return;

            // Selección de mejora de identificadores
            const improveIdentifiers = await vscode.window.showQuickPick(
                [
                    { label: 'Sí', value: true, description: 'Mejorar nombres de identificadores' },
                    { label: 'No', value: false, description: 'Mantener nombres originales' }
                ],
                {
                    placeHolder: '¿Deseas mejorar los nombres de los identificadores?'
                }
            );

            if (!improveIdentifiers) return;

            const targetStyle = await vscode.window.showQuickPick([
                { label: 'camelCase', description: 'myVariable' },
                { label: 'PascalCase', description: 'MyVariable' },
                { label: 'snake_case', description: 'my_variable' },
                { label: 'SCREAMING_SNAKE_CASE', description: 'MY_VARIABLE' },
                { label: 'kebab-case', description: 'my-variable' }
            ], {
                placeHolder: `Estilo actual detectado: ${currentStyle}. Selecciona el estilo objetivo:`
            });

            if (!targetStyle) return;

            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Mejorando estilo de código...",
                cancellable: false
            }, async () => {
                const languageInstruction = selectedLanguage.value === 'es'
                    ? 'Usa identificadores en español'
                    : 'Use English identifiers';

                const improveInstruction = improveIdentifiers.value
                    ? 'Mejora los nombres de variables y funciones para que sean más descriptivos y significativos'
                    : 'Mantén los nombres originales de las variables y funciones, solo cambia el estilo';

                const prompt = `Actúa como un experto desarrollador. Analiza el siguiente código y:
                1. Refactoriza los identificadores usando el estilo ${targetStyle.label}
                2. ${languageInstruction}
                3. ${improveInstruction}
                4. Mantén la misma lógica y estructura del código
                5. Conserva los comentarios existentes
                
                Devuelve SOLO el código refactorizado, la respuesta debe ser texto plano, no markdown.
                no incluyas explicaciones adicionales.
                
                Código a refactorizar:
                ${code}`;

                const result = await model.generateContent(prompt);
                const response = await result.response;
                const enhancedCode = CodeProcessor.cleanResponse(response.text());

                const fullRange = new vscode.Range(
                    document.positionAt(0),
                    document.positionAt(code.length)
                );

                await editor.edit(editBuilder => {
                    editBuilder.replace(fullRange, enhancedCode);
                });

                vscode.window.showInformationMessage(
                    `Código refactorizado a ${targetStyle.label} en ${selectedLanguage.label}` +
                    `${improveIdentifiers.value ? ' con nombres mejorados' : ''}`
                );
            });

        } catch (error) {
            handleError(error, context);
        }
    });

    // Comando para optimizar código
    const optimizeCode = vscode.commands.registerCommand('codeEnhancer.optimizeCode', async () => {
        try {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showWarningMessage('No hay un archivo abierto');
                return;
            }

            const document = editor.document;
            await CodeProcessor.createBackup(document);

            // Selección del tipo de optimización
            const optimizationType = await vscode.window.showQuickPick([
                {
                    label: 'Rendimiento',
                    description: 'Optimiza el código para mejor rendimiento',
                    value: 'performance'
                },
                {
                    label: 'Legibilidad',
                    description: 'Mejora la estructura y legibilidad del código',
                    value: 'readability'
                },
                {
                    label: 'Memoria',
                    description: 'Optimiza el uso de memoria',
                    value: 'memory'
                },
                {
                    label: 'Completa',
                    description: 'Aplica todas las optimizaciones posibles',
                    value: 'complete'
                }
            ], {
                placeHolder: 'Selecciona el tipo de optimización:'
            });

            if (!optimizationType) return;

            const model = await geminiService.getModel();
            const code = document.getText();

            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Optimizando código...",
                cancellable: false
            }, async () => {
                const optimizationPrompts = {
                    performance: 'Optimiza el código para mejorar el rendimiento, reduciendo complejidad y mejorando algoritmos',
                    readability: 'Mejora la estructura y legibilidad del código, reorganizando y simplificando sin cambiar la funcionalidad',
                    memory: 'Optimiza el uso de memoria, mejorando la gestión de recursos y estructuras de datos',
                    complete: 'Aplica todas las optimizaciones posibles: rendimiento, legibilidad y memoria'
                };

                const prompt = `Actúa como un experto desarrollador. ${optimizationPrompts[optimizationType.value]}
                
                Reglas:
                1. Mantén la misma funcionalidad exacta
                2. Conserva los comentarios existentes pero mejóralos si es necesario
                3. No agregues explicaciones adicionales
                4. Aplica las mejores prácticas de programación
                5. Devuelve SOLO el código optimizado
                6. la respuesta debe ser texto plano, no markdown. No incluyas explicaciones adicionales.
                
                Código a optimizar:
                ${code}`;

                const result = await model.generateContent(prompt);
                const response = await result.response;
                const optimizedCode = CodeProcessor.cleanResponse(response.text());

                const fullRange = new vscode.Range(
                    document.positionAt(0),
                    document.positionAt(code.length)
                );

                await editor.edit(editBuilder => {
                    editBuilder.replace(fullRange, optimizedCode);
                });

                vscode.window.showInformationMessage(
                    `Código optimizado exitosamente (${optimizationType.label})`
                );
            });

        } catch (error) {
            handleError(error, context);
        }
    });

    const explainCode = vscode.commands.registerCommand('codeEnhancer.explainCode', async () => {
        try {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showWarningMessage('No hay un archivo abierto');
                return;
            }

            const document = editor.document;
            const code = document.getText();
            const language = document.languageId; // Obtener el lenguaje del documento
            const model = await geminiService.getModel();

            // Selección del idioma para la explicación
            const selectedLanguage = await vscode.window.showQuickPick(
                [
                    { label: 'Español', value: 'es' },
                    { label: 'Inglés', value: 'en' }
                ],
                {
                    placeHolder: 'Selecciona el idioma para la explicación:'
                }
            );

            if (!selectedLanguage) return; // Si no se selecciona un idioma, salir

            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Generando explicación...",
                cancellable: false
            }, async () => {
                const prompt = `Explica el siguiente código ${language} en ${selectedLanguage.label} y genera un archivo Markdown con la explicación.
                Divide la explicación en secciones con encabezados que describen las diferentes partes del código.
                Incluye ejemplos y cualquier información relevante para comprender completamente el código.

                \`\`\`${language}
                ${code}
                \`\`\`
                `;

                const result = await model.generateContent(prompt);
                const explanation = result.response.text();


                // Guardar la explicación en un archivo Markdown
                const workspaceFolders = vscode.workspace.workspaceFolders;
                if (workspaceFolders) {
                    const workspacePath = workspaceFolders[0].uri.fsPath;
                    const explanationPath = path.join(workspacePath, 'explanation.md');
                    fs.writeFileSync(explanationPath, explanation);
                    vscode.window.showInformationMessage(`Explicación generada en: ${explanationPath}`);

                    // Abrir el archivo generado en un nuevo editor
                    const newDocument = await vscode.workspace.openTextDocument(explanationPath);
                    await vscode.window.showTextDocument(newDocument);
                } else {
                    vscode.window.showErrorMessage('No se pudo guardar la explicación. No hay carpetas de espacio de trabajo abiertas.');
                }

            });
        } catch (error) {
            handleError(error, context);
        }
    });

    // Comando para generar diagrama Mermaid
    const generateDiagram = vscode.commands.registerCommand('codeEnhancer.generateDiagram', async () => {
        try {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showWarningMessage('No hay un archivo abierto');
                return;
            }

            const document = editor.document;
            const code = document.getText();
            const model = await geminiService.getModel();

            // Selección del tipo de diagrama
            const diagramType = await vscode.window.showQuickPick([
                {
                    label: 'Clases',
                    description: 'Diagrama de clases y sus relaciones',
                    value: 'classDiagram'
                },
                {
                    label: 'Flujo',
                    description: 'Diagrama de flujo del código',
                    value: 'flowchart'
                },
                {
                    label: 'Secuencia',
                    description: 'Diagrama de secuencia de operaciones',
                    value: 'sequenceDiagram'
                }
            ], {
                placeHolder: 'Selecciona el tipo de diagrama:'
            });

            if (!diagramType) return;

            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Generando diagrama...",
                cancellable: false
            }, async () => {
                const diagramPrompts = {
                    classDiagram: 'Genera un diagrama de clases Mermaid que muestre las clases, métodos, propiedades y sus relaciones',
                    flowchart: 'Genera un diagrama de flujo Mermaid que muestre el flujo de ejecución del código',
                    sequenceDiagram: 'Genera un diagrama de secuencia Mermaid que muestre la interacción entre los componentes'
                };

                const prompt = `Analiza el siguiente código y ${diagramPrompts[diagramType.value]}.
                El diagrama debe seguir la sintaxis de Mermaid.
                Incluye solo la sintaxis del diagrama, sin explicaciones adicionales ni markdown.
                
                Código a analizar:
                ${code}`;

                const result = await model.generateContent(prompt);
                const diagram = result.response.text().trim();

                // Guardar el diagrama en un archivo .mmd
                const workspaceFolders = vscode.workspace.workspaceFolders;
                if (workspaceFolders) {
                    const workspacePath = workspaceFolders[0].uri.fsPath;
                    const timestamp = new Date().toISOString().replace(/[:]/g, '-').split('.')[0];
                    const diagramPath = path.join(
                        workspacePath,
                        `diagram-${diagramType.value}-${timestamp}.mmd`
                    );

                    // Crear el contenido del archivo
                    const fileContent = diagram;

                    await fs.promises.writeFile(diagramPath, fileContent);
                    vscode.window.showInformationMessage(`Diagrama generado en: ${path.basename(diagramPath)}`);

                    // Abrir el archivo generado en un nuevo editor
                    const newDocument = await vscode.workspace.openTextDocument(diagramPath);
                    await vscode.window.showTextDocument(newDocument);
                } else {
                    vscode.window.showErrorMessage('No se pudo guardar el diagrama. No hay carpetas de espacio de trabajo abiertas.');
                }
            });

        } catch (error) {
            handleError(error, context);
        }
    });


    // Comando para resetear API key
    const resetApiKey = vscode.commands.registerCommand('codeEnhancer.resetApiKey', async () => {
        await context.secrets.delete('geminiApiKey');
        vscode.window.showInformationMessage('API key eliminada. Se solicitará una nueva en el próximo uso.');
    });

    context.subscriptions.push(addComments, enhanceCodeStyle, optimizeCode, explainCode, generateDiagram, resetApiKey);
}

function handleError(error, context) {
    console.error('Error:', error);
    if (error.message.includes('API key')) {
        context.secrets.delete('geminiApiKey');
        vscode.window.showErrorMessage('Error con la API key. Por favor, intenta nuevamente con una API key válida.');
    } else {
        vscode.window.showErrorMessage('Error en la operación: ' + error.message);
    }
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
}