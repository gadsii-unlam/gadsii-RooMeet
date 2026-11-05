# RooMeet MVP

Aplicación web para probar la hipótesis central de RooMeet: generar y revisar propuestas de asignación de aulas sin superposiciones ni excesos de capacidad, y medir cuántas propuestas son aceptadas sin modificaciones y cuánto demora el recorrido.

El dataset incluye el primer año de las seis carreras de grado del DIIT de la UNLaM: 65 materias, con nombres, códigos y horas semanales tomados de sus planes de estudio. La propuesta representa la **asignación completa de aulas del cuatrimestre vigente**; la ubicación de cada materia dentro de su plan no divide la propuesta. Los horarios, cupos, historiales, seis aulas y posiciones del mapa son simulados. Funciona completamente en el navegador, sin conexión con SIU Guaraní, backend, credenciales ni variables de entorno. [Fuentes y criterios del dataset](docs/dataset-diit.md).

## Alcance implementado

- Revisión por carrera de todas las materias incluidas, aulas, capacidades, cupos, horarios completos e historial ilustrativo. Las materias presentes en varios planes se señalan en la tabla.
- Generación real y determinista de asignaciones mediante búsqueda con retroceso.
- Validación independiente de capacidad, duplicados y superposición horaria.
- Revisión de la propuesta y modificación opcional de las asignaciones.
- Consulta de ocupación mediante mapa ilustrativo y listado accesible.
- Pantalla final que simula el guardado y el envío al SIU Guaraní, identificada expresamente como mock y con opción para reiniciar la prueba.
- Cambio de aula asociado al curso seleccionado, con aviso previo y resaltado en verde de las aulas libres que cumplen horario y capacidad.
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
5. Para recopilar pruebas, conectar Neon Postgres y configurar `DATABASE_URL` y `METRICS_ADMIN_KEY` en las variables de entorno del proyecto.

La asignación continúa en `localStorage` para permitir recargar la página. Los datos anónimos de evaluación se envían además a Neon. Antes de desplegar, ejecutar [evaluation-schema.sql](docs/evaluation-schema.sql) en la consola SQL de la base. `DATABASE_URL` debe ser la conexión de Neon; `METRICS_ADMIN_KEY` debe ser una clave larga y aleatoria, distinta de las credenciales de la base. Configurar ambas para Production y Preview según el entorno que se quiera medir. No ponerlas en variables `VITE_`, porque esas se exponen al navegador. Volver a desplegar después de guardar las variables.

La consulta está en `/resumen-estadisticas` y no aparece enlazada en el MVP. Muestra pruebas iniciadas/completadas, tiempo mediano, valoración media y detalle exportable a CSV. En Vercel pide la clave, que se mantiene solo en memoria de esa página; conocer la ruta no reemplaza esta protección. Las sesiones iniciadas sin finalizar figuran como incompletas, lo que puede incluir pestañas que todavía están abiertas. Con `npm run dev`, las métricas se guardan únicamente en el `localStorage` del navegador y la consulta local no pide clave; esto permite ensayar el flujo sin base de datos. El modo local no reúne pruebas de otras personas. Cuando cambia la versión del dataset de demostración, una sesión anterior se descarta automáticamente para evitar mezclar aulas o asignaciones incompatibles.

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

