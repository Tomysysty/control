// Utilidades para mostrar y leer números (montos y calorías).

// Pone puntos de miles: 12500 -> "12.500"
// La expresión regular busca posiciones seguidas de grupos de 3 dígitos
// hasta el final del número, y ahí inserta un punto.
export function separarMiles(n: number): string {
  const entero = Math.round(Math.abs(n)).toString();
  const conPuntos = entero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return n < 0 ? `-${conPuntos}` : conPuntos;
}

// Formato colombiano: 12500 -> "$12.500"
export function formatearPesos(n: number): string {
  const texto = separarMiles(n);
  return texto.startsWith('-') ? `-$${texto.slice(1)}` : `$${texto}`;
}

// Lee lo que la persona escribió en un campo numérico.
// Acepta "12500", "12.500" o "$12.500". Devuelve null si está vacío
// o si trae algo raro (letras, signo menos, comas decimales...).
// Así un "-5" NO se convierte en 5 por accidente: se rechaza.
export function leerEntero(texto: string): number | null {
  const limpio = texto.replace(/[$\s.]/g, '');
  if (limpio === '' || !/^\d+$/.test(limpio)) return null;
  return Number(limpio);
}
