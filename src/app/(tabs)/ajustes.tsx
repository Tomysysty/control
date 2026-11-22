// Pantalla de Ajustes. TEMPORAL: se construye en el paso (e).

import { Text } from 'react-native';

import { Pantalla } from '@/componentes/Pantalla';
import { colores } from '@/tema';

export default function PantallaAjustes() {
  return (
    <Pantalla titulo="Ajustes">
      <Text style={{ fontSize: 17, color: colores.textoSuave }}>Próximamente.</Text>
    </Pantalla>
  );
}
