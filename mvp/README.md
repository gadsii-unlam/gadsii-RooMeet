# RooMeet MVP

Aplicación web para probar la hipótesis central de RooMeet: generar y revisar propuestas de asignación de aulas sin superposiciones ni excesos de capacidad, y medir cuántas propuestas son aceptadas sin modificaciones y cuánto demora el recorrido.

El dataset incluye el primer año de las seis carreras de grado del DIIT de la UNLaM: 65 materias, con nombres, códigos y horas semanales tomados de sus planes de estudio. Cada prueba elige y planifica **un solo cuatrimestre**; no genera una asignación anual. Los horarios, cupos, historiales, aulas y posiciones del mapa son simulados. Funciona completamente en el navegador, sin conexión con SIU Guaraní, backend, credenciales ni variables de entorno. [Fuentes y criterios del dataset](docs/dataset-diit.md).

## Alcance implementado

- Elección del cuatrimestre antes de generar la propuesta y revisión por carrera de sus materias, aulas, capacidades, cupos, horarios completos e historial ilustrativo. Las materias presentes en varios planes se señalan en la tabla.
- Generación real y determinista de asignaciones mediante búsqueda con retroceso.
- Validación independiente de capacidad, duplicados y superposición horaria.
- Revisión de la propuesta y modificación opcional de las asignaciones.
- Consulta de ocupación mediante mapa ilustrativo y listado accesible.
- Cambio de aula asociado al curso seleccionado, con validación al confirmar.
- Confirmación visible del cambio y posibilidad de deshacer la última modificación.
- Persistencia local de una sesión y exportación JSON de evidencia.
- Finalización cuando todos los cursos están asignados y no existen conflictos.

La guía completa de alcance, criterios y decisiones está en [MVP-AGENTES.md](MVP-AGENTES.md).

## Requisitos

- Node.js 22.12+ o Node.js 24 (la versión 24.20 usada actualmente es compatible)
- npm

## Desarrollo local

```bash
cd C:\Users\fnval\Desktop\git\MVP-GADS2
npm ci
npm run dev
```

Si ya estás dentro de `MVP-GADS2/`, omití el `cd`. Todos los demás comandos de esta guía se ejecutan desde esa carpeta.

Vite muestra la URL local en la terminal. La navegación utiliza hashes (`#datos`, `#propuesta`, `#monitoreo`, `#cambio`), por lo que recargar una vista no requiere reglas de servidor adicionales.

## Verificación

```bash
npm run lint
npm run test:run
npm run build
npm run preview -- --host 127.0.0.1
```

Para ejecutar los recorridos en navegador por primera vez:

```bash
npx playwright install chromium
npm run test:e2e
```

## Despliegue en Vercel

1. Importar este repositorio en Vercel.
2. Usar la raíz del repositorio como *Root Directory* del proyecto.
3. Seleccionar el preset **Vite** y Node.js **22.x**.
4. Vercel tomará de `vercel.json` la instalación `npm ci`, el build `npm run build` y la salida `dist`.
5. No configurar variables de entorno.

El almacenamiento es `localStorage`: cada navegador y dispositivo mantiene su propia prueba. No hay sincronización multiusuario ni almacenamiento institucional.

## Protocolo de prueba

La aplicación exporta la propuesta original, el resultado final, las modificaciones realizadas, eventos, duración y métricas técnicas. La comparación con el tiempo del proceso manual y la participación de usuarios administrativos reales deben registrarse externamente. Un build exitoso o una prueba técnica no equivalen a validar la hipótesis con usuarios.

## Límites deliberados

Quedan fuera del MVP la integración real con Guaraní, autenticación, base de datos, ABM de datos, colaboración, notificaciones, incidentes, reglas departamentales, alternancia semipresencial, estimación estadística de cupos y recomendaciones automáticas de aulas.

## Equipo

- BOSCH, MAXIMO AUGUSTO
- BURNOWICZ, ALEJO
- LÓPEZ FERME, NAHUEL EZEQUIEL
- RODRIGUEZ, MARIANO LIONEL
- ROSALES, GUSTAVO MAURICIO
- VALLEJOS, FRANCO NICOLAS

