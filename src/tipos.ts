// Tipos de datos de la app. Si cambias la forma de un dato, cámbiala aquí
// y TypeScript te señalará todos los lugares que hay que actualizar.

// Las categorías se declaran "as const" para que TypeScript sepa
// exactamente qué textos son válidos (y no cualquier string).
export const CATEGORIAS_GASTO = ['Mercado', 'Transporte', 'Universidad', 'Salidas', 'Otros'] as const;
export type CategoriaGasto = (typeof CATEGORIAS_GASTO)[number];

export const TIPOS_COMIDA = ['Desayuno', 'Almuerzo', 'Cena', 'Snack'] as const;
export type TipoComida = (typeof TIPOS_COMIDA)[number];

// Las fechas se guardan como texto "AAAA-MM-DD" en hora LOCAL del celular.
// Así comparar si dos cosas son del mismo día es comparar dos textos.
export type FechaTexto = string;

export type Gasto = {
  id: string;
  descripcion: string;
  monto: number; // en pesos colombianos, sin decimales
  categoria: CategoriaGasto;
  fecha: FechaTexto;
  creadoEn: number; // milisegundos, sirve para ordenar
};

export type Comida = {
  id: string;
  nombre: string;
  tipo: TipoComida;
  calorias: number;
  costo: number; // en pesos colombianos
  fecha: FechaTexto;
  creadoEn: number;
};

export type Ajustes = {
  presupuestoSemanal: number;
  metaCalorias: number; // meta diaria
};

export const AJUSTES_POR_DEFECTO: Ajustes = {
  presupuestoSemanal: 300000,
  metaCalorias: 2000,
};
