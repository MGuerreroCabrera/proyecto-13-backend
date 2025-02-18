// Función que formatea una fecha
function formatDate(date) {
    // Divide la fecha por guiones
    var parts = date.split('-');
    
    // Intercambia los componentes de fecha
    var formattedDate = parts[2] + '-' + parts[1] + '-' + parts[0];
    
    return formattedDate;
  }

  module.exports = { formatDate }