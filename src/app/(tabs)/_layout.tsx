// Barra de pestañas de abajo. Cada Tabs.Screen corresponde a un archivo
// de esta carpeta: "index" -> index.tsx, "comidas" -> comidas.tsx, etc.
// Los paréntesis en "(tabs)" hacen que el nombre de la carpeta no aparezca en la URL.

import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';

import { colores } from '@/tema';

type NombreIcono = ComponentProps<typeof Ionicons>['name'];

// Función auxiliar para no repetir el mismo código de ícono en cada pestaña.
// "focused" es true cuando la pestaña está seleccionada.
function icono(nombre: NombreIcono) {
  return function IconoPestana({ focused, size }: { focused: boolean; size: number }) {
    return (
      <Ionicons name={nombre} color={focused ? colores.primario : colores.textoSuave} size={size} />
    );
  };
}

export default function LayoutPestanas() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // cada pantalla dibuja su propio título
        tabBarActiveTintColor: colores.primario,
        tabBarInactiveTintColor: colores.textoSuave,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      }}>
      <Tabs.Screen name="index" options={{ title: 'Gastos', tabBarIcon: icono('wallet-outline') }} />
      <Tabs.Screen
        name="comidas"
        options={{ title: 'Comidas', tabBarIcon: icono('restaurant-outline') }}
      />
      <Tabs.Screen
        name="semana"
        options={{ title: 'Semana', tabBarIcon: icono('calendar-outline') }}
      />
      <Tabs.Screen
        name="ajustes"
        options={{ title: 'Ajustes', tabBarIcon: icono('settings-outline') }}
      />
    </Tabs>
  );
}
