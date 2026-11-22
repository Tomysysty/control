// Pantalla de Comidas. TEMPORAL: se construye en el paso (c).

import { Text } from 'react-native';

import { Pantalla } from '@/componentes/Pantalla';
import { colores } from '@/tema';

export default function PantallaComidas() {
  return (
    <Pantalla titulo="Comidas">
      <Text style={{ fontSize: 17, color: colores.textoSuave }}>Próximamente.</Text>
    </Pantalla>
  );
}
