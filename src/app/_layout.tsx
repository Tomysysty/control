// Layout raíz: envuelve TODA la app.
// - SafeAreaProvider calcula el espacio del notch para los SafeAreaView.
// - DatosProvider carga y guarda los datos para todas las pantallas.
// - Stack es el navegador principal; adentro está el grupo de pestañas "(tabs)".

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DatosProvider } from '@/datos/DatosContext';

export default function LayoutRaiz() {
  return (
    <SafeAreaProvider>
      <DatosProvider>
        {/* Texto oscuro en la barra de estado (hora, batería) porque el fondo es claro */}
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }} />
      </DatosProvider>
    </SafeAreaProvider>
  );
}
