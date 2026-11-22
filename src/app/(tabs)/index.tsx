// Pantalla de Gastos.
// TEMPORAL (paso a): solo tiene un botón de prueba para comprobar que el
// almacenamiento funciona. En el paso (b) se reemplaza por la pantalla real.

import { Pressable, StyleSheet, Text } from 'react-native';

import { Pantalla } from '@/componentes/Pantalla';
import { useDatos } from '@/datos/DatosContext';
import { colores, ALTO_TOCABLE } from '@/tema';
import { formatearPesos } from '@/utils/dinero';
import { etiquetaDia, hoy } from '@/utils/fechas';

export default function PantallaGastos() {
  const { gastos, agregarGasto } = useDatos();
  const total = gastos.reduce((suma, g) => suma + g.monto, 0);

  return (
    <Pantalla titulo="Gastos">
      <Text style={estilos.texto}>
        {etiquetaDia(hoy())} es {hoy()} (fecha local del celular).
      </Text>
      <Text style={estilos.texto}>
        Gastos guardados: {gastos.length} · Total: {formatearPesos(total)}
      </Text>
      <Pressable
        style={({ pressed }) => [estilos.boton, pressed && { opacity: 0.7 }]}
        onPress={() =>
          agregarGasto({
            descripcion: 'Prueba',
            monto: 12500,
            categoria: 'Otros',
            fecha: hoy(),
          })
        }>
        <Text style={estilos.textoBoton}>Agregar gasto de prueba ($12.500)</Text>
      </Pressable>
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  texto: { fontSize: 17, color: colores.texto },
  boton: {
    minHeight: ALTO_TOCABLE,
    backgroundColor: colores.primario,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  textoBoton: { color: '#fff', fontSize: 17, fontWeight: '600' },
});
