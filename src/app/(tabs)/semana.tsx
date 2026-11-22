// Pantalla de Semana. TEMPORAL: se construye en el paso (d).

import { Text } from 'react-native';

import { Pantalla } from '@/componentes/Pantalla';
import { colores } from '@/tema';

export default function PantallaSemana() {
  return (
    <Pantalla titulo="Semana">
      <Text style={{ fontSize: 17, color: colores.textoSuave }}>Próximamente.</Text>
    </Pantalla>
  );
}
