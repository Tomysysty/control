# Control

App para el celular que lleva en un solo lugar lo que gasto y lo que como en la semana: cuánto llevo del presupuesto y cuántas calorías van del día.

**Estado: en desarrollo.** Ya está la base: las cuatro pestañas, los tipos de datos y el guardado en el celular. Las pantallas se van llenando por pasos.

**Expo SDK 58 · React Native · Expo Router · TypeScript · AsyncStorage**

## Cómo va a funcionar

| Pestaña | Qué tiene |
|---|---|
| **Gastos** | Lo que gasto, por categoría: mercado, transporte, universidad, salidas y otros |
| **Comidas** | Desayuno, almuerzo, cena y snacks, con calorías y costo |
| **Semana** | Resumen de la semana contra el presupuesto y la meta de calorías |
| **Ajustes** | Presupuesto semanal (por defecto $300.000) y meta diaria de calorías |

Todo se guarda en el celular, sin cuenta ni internet.

## Avance

- [x] Proyecto base con Expo Router y TypeScript, sin las pantallas de ejemplo de la plantilla
- [x] Barra de cuatro pestañas
- [x] Tipos de datos, fechas en hora local y formato de pesos colombianos
- [x] Guardado con AsyncStorage y manejo de errores de almacenamiento
- [ ] Formularios para agregar gastos y comidas
- [ ] Resumen semanal
- [ ] Pantalla de ajustes

## Cómo está hecho

- `src/app/` — las pantallas; cada archivo es una ruta de Expo Router
- `src/datos/DatosContext.tsx` — todo el estado de la app y su guardado, en un contexto de React
- `src/tipos.ts` — la forma de cada dato; si cambia algo aquí, TypeScript señala qué más hay que actualizar
- `src/utils/` — fechas como texto `AAAA-MM-DD` en hora local y formato de pesos

## Correrlo

```bash
npm install
npx expo start
```

Escanea el código QR con Expo Go en el celular, o presiona `w` para abrirla en el navegador.
