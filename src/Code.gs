function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('📊 Dashboard')
    .addItem('Abrir Panel', 'mostrarTableroLateral')
    .addToUi();
}

function mostrarTableroLateral() {
  var html = HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Reporte de Administración')
    .setWidth(1100)
    .setHeight(750)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  SpreadsheetApp.getUi().showModalDialog(html, 'Reporte de Administración');
}

function obtenerDatos() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    const sVentas   = ss.getSheetByName("Ventas");
    const sGastos   = ss.getSheetByName("Gastos");
    const sProd     = ss.getSheetByName("Productos");

    if (!sVentas || !sGastos || !sProd) {
      return { error: "Faltan pestañas. Deben llamarse exactamente: Ventas, Gastos, Productos" };
    }

    // getValues() devuelve tipos nativos: Number, Date, String, Boolean
    // NO convertir a string — pasar los valores crudos directamente
    // Las fechas se serializan automáticamente como ISO string al pasar por JSON
    const toClean = (grid) => grid.map(row =>
      row.map(cell => {
        if (cell === null || cell === undefined) return "";
        if (cell instanceof Date) return Utilities.formatDate(cell, Session.getScriptTimeZone(), "dd/MM/yyyy");
        return cell; // números y strings se pasan tal cual
      })
    );

    return {
      ventas:    toClean(sVentas.getDataRange().getValues()),
      gastos:    toClean(sGastos.getDataRange().getValues()),
      productos: toClean(sProd.getDataRange().getValues())
    };

  } catch (e) {
    return { error: "Error en servidor: " + e.toString() };
  }
}
