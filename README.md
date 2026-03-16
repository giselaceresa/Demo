# Reporte de Administración - Demo Dashboard

Este proyecto es una demostración de un Dashboard desarrollado en **Google Apps Script (GAS)**. Se conecta directamente a un archivo de Google Sheets y provee un panel de administración visual y dinámico para el análisis de ventas, gastos y productos.

## Características

- 📊 **Panel Interactivo:** Visualización en un cuadro de diálogo dentro de Google Sheets usando `HtmlService`.
- ⚡ **Rápido y Dinámico:** Uso de `google.script.run` para traer información de manera asíncrona mediante llamadas al servidor de GAS, sin bloquear la UI.
- 🎨 **Diseño Moderno:** Interfaz creada con **Bootstrap 5**, garantizando una experiencia visual limpia y responsiva.
- 📦 **Múltiples Fuentes de Datos:** Lectura e integración cruzada de múltiples hojas (Ventas, Gastos, Productos).

## Estructura del Proyecto

```text
📁 src/
 ├── Code.gs      # Código de servidor (funciones onOpen, mostrarTableroLateral, obtenerDatos).
 └── index.html   # Código de cliente (Estructura HTML, estilos CSS y lógica JavaScript).
```

## Requisitos
Para probar o implementar este código:
1. Una hoja de cálculo (Google Sheet) que contenga estrictamente las pestañas llamadas:
   - `Ventas`
   - `Gastos`
   - `Productos`
2. Google Apps Script asociado a dicha hoja de cálculo (Extensiones > Apps Script).

## Instalación

1. Clona o descarga el repositorio:
   ```bash
   git clone https://github.com/giselaceresa/Demo.git
   ```
2. Puedes desplegar este código utilizando herramientas como [clasp](https://github.com/google/clasp). Si usas `clasp`:
   ```bash
   # Inicia el proyecto en el directorio raíz o copialos en el directorio local a enviar al id del script:
   clasp push
   ```
3. Alternativamente, copia y pega manualmente el contenido de `src/Code.gs` y `src/index.html` en el editor de Apps Script de tu Google Sheet.
4. Recarga tu hoja de cálculo, y aparecerá el nuevo menú **📊 Dashboard > Abrir Panel**.

## Notas Técnicas
- El proyecto utiliza manejo de errores en lado del cliente y del servidor (en caso de que falten pestañas o falle el tipeo de un dato).
- Las fechas en la hoja de cálculo son convertidas utilizando `Utilities.formatDate` para evitar inconsistencias de zonas horarias al serializar objetos Date en el paso hacia el cliente.

---
*Desarrollado para fines de demostración dentro del entorno de automatizaciones de Google Workspace.*
