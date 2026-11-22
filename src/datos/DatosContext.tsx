// Aquí vive TODA la información de la app y la lógica para guardarla.
//
// Un "contexto" de React permite que cualquier pantalla lea y cambie estos
// datos sin pasarlos de componente en componente. Las pantallas solo hacen:
//   const { gastos, agregarGasto } = useDatos();
//
// Los datos se guardan en AsyncStorage: un almacenamiento de texto
// (clave -> valor) que queda en el celular aunque cierres la app.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import {
  AJUSTES_POR_DEFECTO,
  type Ajustes,
  type Comida,
  type Gasto,
} from '@/tipos';

// Nombres de las "cajas" donde se guarda cada cosa.
const CLAVE_GASTOS = 'control:gastos';
const CLAVE_COMIDAS = 'control:comidas';
const CLAVE_AJUSTES = 'control:ajustes';

// Lo que la app puede hacer con los datos.
type ContextoDatos = {
  cargando: boolean;
  errorAlmacenamiento: boolean;
  gastos: Gasto[];
  comidas: Comida[];
  ajustes: Ajustes;
  agregarGasto: (gasto: Omit<Gasto, 'id' | 'creadoEn'>) => void;
  eliminarGasto: (id: string) => void;
  agregarComida: (comida: Omit<Comida, 'id' | 'creadoEn'>) => void;
  eliminarComida: (id: string) => void;
  guardarAjustes: (ajustes: Ajustes) => void;
  borrarTodo: () => void;
};

const Contexto = createContext<ContextoDatos | null>(null);

// Un id único sencillo: la hora actual + algo aleatorio, en base 36.
function nuevoId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// Lee una clave y la convierte de texto JSON a objeto.
// Si no existe o el texto está dañado, devuelve null (no lanza error).
async function leerJson(clave: string): Promise<unknown> {
  const texto = await AsyncStorage.getItem(clave);
  if (texto === null) return null;
  try {
    return JSON.parse(texto);
  } catch {
    console.warn(`Datos dañados en ${clave}, se ignoran`);
    return null;
  }
}

// Convierte el valor a texto JSON y lo guarda. Si falla, avisa con `alFallar`
// en vez de lanzar un error que podría cerrar la app.
async function guardarJson(clave: string, valor: unknown, alFallar: () => void) {
  try {
    await AsyncStorage.setItem(clave, JSON.stringify(valor));
  } catch (error) {
    console.warn(`No se pudo guardar ${clave}`, error);
    alFallar();
  }
}

// Une lo guardado con los valores por defecto, por si falta algún campo
// o tiene un valor inválido (por ejemplo, de una versión vieja de la app).
function ajustesValidos(guardado: unknown): Ajustes {
  const a = (guardado ?? {}) as Partial<Ajustes>;
  const numeroValido = (n: unknown) => typeof n === 'number' && n > 0;
  return {
    presupuestoSemanal: numeroValido(a.presupuestoSemanal)
      ? a.presupuestoSemanal!
      : AJUSTES_POR_DEFECTO.presupuestoSemanal,
    metaCalorias: numeroValido(a.metaCalorias) ? a.metaCalorias! : AJUSTES_POR_DEFECTO.metaCalorias,
  };
}

export function DatosProvider({ children }: { children: ReactNode }) {
  const [cargando, setCargando] = useState(true);
  const [errorAlmacenamiento, setErrorAlmacenamiento] = useState(false);
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [comidas, setComidas] = useState<Comida[]>([]);
  const [ajustes, setAjustes] = useState<Ajustes>(AJUSTES_POR_DEFECTO);

  // 1) Al abrir la app: cargar todo lo guardado (una sola vez).
  useEffect(() => {
    async function cargar() {
      try {
        const [g, c, a] = await Promise.all([
          leerJson(CLAVE_GASTOS),
          leerJson(CLAVE_COMIDAS),
          leerJson(CLAVE_AJUSTES),
        ]);
        if (Array.isArray(g)) setGastos(g);
        if (Array.isArray(c)) setComidas(c);
        setAjustes(ajustesValidos(a));
      } catch (error) {
        // Si el almacenamiento falla, la app sigue funcionando con datos vacíos.
        console.warn('No se pudieron cargar los datos', error);
        setErrorAlmacenamiento(true);
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);

  // 2) Cada vez que algo cambia, se guarda en el celular.
  // No guardamos mientras "cargando" es true; si no, escribiríamos
  // listas vacías encima de los datos reales antes de leerlos.
  useEffect(() => {
    if (!cargando) guardarJson(CLAVE_GASTOS, gastos, () => setErrorAlmacenamiento(true));
  }, [gastos, cargando]);

  useEffect(() => {
    if (!cargando) guardarJson(CLAVE_COMIDAS, comidas, () => setErrorAlmacenamiento(true));
  }, [comidas, cargando]);

  useEffect(() => {
    if (!cargando) guardarJson(CLAVE_AJUSTES, ajustes, () => setErrorAlmacenamiento(true));
  }, [ajustes, cargando]);

  // 3) Acciones. Nunca modificamos el arreglo original: creamos uno nuevo
  // (con [...] o filter). Así React detecta el cambio y vuelve a dibujar.
  const valor: ContextoDatos = {
    cargando,
    errorAlmacenamiento,
    gastos,
    comidas,
    ajustes,
    agregarGasto: (gasto) =>
      setGastos((actuales) => [...actuales, { ...gasto, id: nuevoId(), creadoEn: Date.now() }]),
    eliminarGasto: (id) => setGastos((actuales) => actuales.filter((g) => g.id !== id)),
    agregarComida: (comida) =>
      setComidas((actuales) => [...actuales, { ...comida, id: nuevoId(), creadoEn: Date.now() }]),
    eliminarComida: (id) => setComidas((actuales) => actuales.filter((c) => c.id !== id)),
    guardarAjustes: (nuevos) => setAjustes(nuevos),
    borrarTodo: () => {
      // Al vaciar el estado, los efectos de arriba guardan las listas vacías.
      setGastos([]);
      setComidas([]);
      setAjustes(AJUSTES_POR_DEFECTO);
    },
  };

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

// Hook que usan las pantallas para acceder a los datos.
export function useDatos(): ContextoDatos {
  const contexto = useContext(Contexto);
  if (!contexto) {
    throw new Error('useDatos debe usarse dentro de <DatosProvider>');
  }
  return contexto;
}
