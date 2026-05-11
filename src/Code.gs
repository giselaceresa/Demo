function doGet() {
  return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle('P&L Dashboard')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('📊 Dashboard P&L')
      .addItem('Abrir Dashboard', 'abrirDashboard')
      .addToUi();
}

function abrirDashboard() {
  const html = HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle('Dashboard de Administración')
      .setWidth(1200)
      .setHeight(800);
  SpreadsheetApp.getUi().showModalDialog(html, 'Dashboard de Administración');
}

/**
 * Filtra filas vacías para evitar procesar celdas con formato pero sin contenido.
 */
function limpiarDatos(values) {
  if (!values || values.length === 0) return [];
  const headers = values[0];
  const rows = values.slice(1).filter(row => {
    return row.slice(0, 5).some(cell => cell !== '' && cell !== null && cell !== undefined);
  });
  return [headers, ...rows];
}

function obtenerDatos() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    const sheetProductos = ss.getSheetByName('Productos');
    const sheetVentas = ss.getSheetByName('Ventas');
    const sheetGastos = ss.getSheetByName('Gastos');
    
    if (!sheetProductos || !sheetVentas || !sheetGastos) {
      let missing = [];
      if (!sheetProductos) missing.push('Productos');
      if (!sheetVentas) missing.push('Ventas');
      if (!sheetGastos) missing.push('Gastos');
      return { error: 'Faltan las siguientes hojas: ' + missing.join(', ') };
    }
    
    const productos = limpiarDatos(sheetProductos.getDataRange().getValues());
    const ventas = limpiarDatos(sheetVentas.getDataRange().getValues());
    const gastos = limpiarDatos(sheetGastos.getDataRange().getValues());
    
    return {
      productos: productos,
      ventas: ventas,
      gastos: gastos,
      timestamp: new Date().getTime()
    };
  } catch (e) {
    return { error: 'Error en el servidor: ' + e.message };
  }
}