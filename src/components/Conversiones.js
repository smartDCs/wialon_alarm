function parsearFecha(fechaStr) {
    // Quita espacio unicode (narrow no-break space) y asegúrate de que "p. m." y "a. m." estén bien formateados
    const limpia = fechaStr.replace(/\u202f/g, '').trim();
  
    // Separar fecha y hora
    const [fechaParte, horaParte] = limpia.split(',');
  
    if (!fechaParte || !horaParte) return null;
  
    const [dia, mes, anio] = fechaParte.split('/').map(Number);
  
  
    return new Date(anio, mes - 1, dia);
  }
export function agruparEventos(eventos) {
  const resumen = {};

  eventos.forEach(({ estacion, fecha }) => {
    const fechaObj = parsearFecha(fecha);
    if (!(fechaObj instanceof Date) || isNaN(fechaObj)) {
      console.warn('Fecha inválida:', fecha);
      return;
    }

    const mesNombre = fechaObj.toLocaleString('default', { month: 'short' });
    const año = fechaObj.getFullYear();
    const claveMes = `${mesNombre} ${año}`;

    if (!resumen[estacion]) resumen[estacion] = {};
    if (!resumen[estacion][claveMes]) resumen[estacion][claveMes] = 0;

    resumen[estacion][claveMes]++;
 
  });

  return resumen;
}
 
/**
 * Convierte el resumen de eventos agrupados en un formato adecuado para BarChart.
 */
  
 export function transformarParaBarChart(resumen) {
    const mesesSet = new Set();
    const estaciones = Object.keys(resumen);
 
    // Recopilar todos los meses existentes
    estaciones.forEach(estacion => {
      Object.keys(resumen[estacion]).forEach(mes => mesesSet.add(mes));
    });
  
    const meses = Array.from(mesesSet).sort((a, b) => {
        // Parsear los meses con formato "abr 2025"
        const parseMes = str => {
          const [mesStr, año] = str.split(' ');
          const meses = {
            ene: 0, feb: 1, mar: 2, abr: 3, may: 4, jun: 5,
            jul: 6, ago: 7, sep: 8, oct: 9, nov: 10, dic: 11
          };
          return new Date(Number(año), meses[mesStr]);
        };
      
        return parseMes(a) - parseMes(b);
      });

  
    // Inicializar estructura de datos para el BarChart
    const data = meses.map(mes => {
      const fila = { mes }; // "mes" es la clave que usará el eje X
      estaciones.forEach(estacion => {
        fila[estacion] = resumen[estacion][mes] || 0;
      });
      return fila;
    });
  
    return data;
  }
  