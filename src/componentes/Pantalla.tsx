// Contenedor común de todas las pantallas:
// - SafeAreaView deja espacio para el notch y la barra de estado del iPhone.
// - KeyboardAvoidingView empuja el contenido hacia arriba cuando sale el teclado.
// - ScrollView permite desplazarse si el contenido no cabe.
// También muestra un aviso si el almacenamiento falló y un indicador mientras carga.

import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDatos } from '@/datos/DatosContext';
import { colores, espacio } from '@/tema';

type Props = {
  titulo: string;
  children: ReactNode;
};

export function Pantalla({ titulo, children }: Props) {
  const { cargando, errorAlmacenamiento } = useDatos();

  return (
    // Solo protegemos arriba y a los lados: abajo ya está la barra de pestañas.
    <SafeAreaView style={estilos.contenedor} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={estilos.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={estilos.contenido}
          // Permite tocar botones aunque el teclado esté abierto.
          keyboardShouldPersistTaps="handled">
          <Text style={estilos.titulo}>{titulo}</Text>

          {errorAlmacenamiento && (
            <View style={estilos.aviso}>
              <Text style={estilos.textoAviso}>
                No se pudo leer o guardar en el celular. Puedes seguir usando la app, pero lo
                que registres podría perderse al cerrarla.
              </Text>
            </View>
          )}

          {cargando ? <ActivityIndicator size="large" color={colores.primario} /> : children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colores.fondo },
  flex: { flex: 1 },
  contenido: {
    padding: espacio.medio,
    gap: espacio.medio,
    paddingBottom: espacio.grande * 2,
  },
  titulo: { fontSize: 32, fontWeight: '700', color: colores.texto },
  aviso: {
    backgroundColor: colores.peligroSuave,
    borderRadius: 12,
    padding: espacio.medio,
  },
  textoAviso: { color: colores.peligro, fontSize: 15 },
});
