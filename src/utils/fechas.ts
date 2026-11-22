// Utilidades de fechas. Todo trabaja con la fecha LOCAL del celular.
//
// ¿Por qué no usar toISOString()? Porque devuelve la fecha en UTC.
// En Colombia (UTC-5), a las 8 p. m. del lunes ya es martes en UTC,
// así que un gasto de la noche quedaría guardado en el día equivocado.

import type { FechaTexto } from '@/tipos';

const DIAS_CORTOS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const DIAS_LARGOS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MESES_CORTOS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

// Agrega un cero a la izquierda: 5 -> "05"
function dosDigitos(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

// Convierte un Date a "AAAA-MM-DD" usando la hora local.
export function aTexto(fecha: Date): FechaTexto {
  return `${fecha.getFullYear()}-${dosDigitos(fecha.getMonth() + 1)}-${dosDigitos(fecha.getDate())}`;
}

// Convierte "AAAA-MM-DD" a un Date local (a la medianoche de ese día).
// Ojo: new Date("2026-10-30") lo interpretaría como UTC, por eso lo armamos a mano.
export function aFecha(texto: FechaTexto): Date {
  const [anio, mes, dia] = texto.split('-').map(Number);
  return new Date(anio, mes - 1, dia);
}

// La fecha de hoy en el celular.
export function hoy(): FechaTexto {
  return aTexto(new Date());
}

// Suma (o resta, si n es negativo) días a una fecha.
// setDate se encarga de los cambios de mes y año.
export function sumarDias(texto: FechaTexto, n: number): FechaTexto {
  const fecha = aFecha(texto);
  fecha.setDate(fecha.getDate() + n);
  return aTexto(fecha);
}

// Devuelve el lunes de la semana a la que pertenece la fecha.
// getDay() da 0 = domingo, 1 = lunes... 6 = sábado.
// (dia + 6) % 7 dice cuántos días han pasado desde el lunes.
export function inicioDeSemana(texto: FechaTexto): FechaTexto {
  const dia = aFecha(texto).getDay();
  return sumarDias(texto, -((dia + 6) % 7));
}

// Los 7 días (lunes a domingo) de la semana que empieza en `lunes`.
export function diasDeSemana(lunes: FechaTexto): FechaTexto[] {
  return Array.from({ length: 7 }, (_, i) => sumarDias(lunes, i));
}

// "lun", "mar"... para los gráficos de la semana.
export function diaCorto(texto: FechaTexto): string {
  return DIAS_CORTOS[aFecha(texto).getDay()];
}

// "30 oct"
export function diaYMes(texto: FechaTexto): string {
  const fecha = aFecha(texto);
  return `${fecha.getDate()} ${MESES_CORTOS[fecha.getMonth()]}`;
}

// Texto amigable para el selector de fecha: "Hoy", "Ayer" o "jueves 30 oct".
export function etiquetaDia(texto: FechaTexto): string {
  const actual = hoy();
  if (texto === actual) return 'Hoy';
  if (texto === sumarDias(actual, -1)) return 'Ayer';
  if (texto === sumarDias(actual, 1)) return 'Mañana';
  return `${DIAS_LARGOS[aFecha(texto).getDay()]} ${diaYMes(texto)}`;
}
