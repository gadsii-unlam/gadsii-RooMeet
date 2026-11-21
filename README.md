# RooMeet

> Propuesta automática y revisión de la asignación de aulas para el personal administrativo de la UNLaM.

Trabajo integrador de **Gestión Aplicada al Desarrollo de Software II (3665)** — Ingeniería Informática, DIIT, Universidad Nacional de La Matanza. Ciclo lectivo 2026.

| | |
| --- | --- |
| **Producto desplegado** | https://roomeet-asignacion-aulas.vercel.app |
| **Repositorio** | https://github.com/gadsii-unlam/gadsii-RooMeet |
| **Brief vigente** | [`docs/brief.md`](docs/brief.md) |
| **Registro de trabajo con IA** | [`docs/prompts.md`](docs/prompts.md) |
| **Evidencia (TP2 y TP5)** | [`docs/evidencia/`](docs/evidencia/README.md) |

Este README es el punto de entrada para quien tome el proyecto. Explica qué es el producto, qué hay construido, cómo se ejecuta y por dónde seguir. El detalle técnico del MVP está en [`mvp/README.md`](mvp/README.md).

---

## 1. Qué es y para quién

**Problema.** En la UNLaM la asignación de aulas a cursos se hace a mano, con la información dispersa y dependiendo de SIU Guaraní. Eso produce solapamientos, aulas superpobladas y cambios que la Secretaría Académica tiene que validar uno por uno. El problema surgió del relevamiento del TP2: una encuesta respondida por tres personas, una del área de Sistemas y dos administrativas del DIIT.

**Usuario primario.** El personal administrativo que planifica, asigna y monitorea aulas, con la **Secretaría Académica** como actor que aprueba o modifica asignaciones. El área de Sistemas cumple un rol de soporte técnico. El usuario primario cambió entre agosto y septiembre: en la versión 1 del brief era "el administrativo de cada departamento" (brief, sección 7.1).

**Hipótesis de valor** (brief, sección 7.7). El sistema genera asignaciones sin solapamientos ni excesos de capacidad. Al menos el 90 % de sus propuestas se aprueban sin modificaciones, y planificar lleva menos tiempo que con el proceso manual.

## 2. Estado del producto al cierre (noviembre 2026)

| | Qué incluye |
| --- | --- |
| **Construido y funcionando** | Aplicación web (React + TypeScript + Vite) con cuatro pantallas (Datos, Propuesta, Monitoreo y Cambio) y una pantalla de cierre. Un motor de asignación determinista (búsqueda con retroceso) valida capacidad, duplicados y superposición horaria. Permite cambiar el aula de un curso y deshacer el cambio. La sesión se guarda en `localStorage` y se puede exportar en JSON. Una API (`mvp/api/evaluations.js`) guarda en Neon Postgres métricas anónimas del piloto, y la página `/resumen-estadisticas`, protegida con clave, las muestra. |
| **Simulado** | Los datos: 65 materias reales de primer año de las seis carreras del DIIT, con nombres, códigos y horas tomados de los planes. Los horarios, cupos, historial, las seis aulas y el mapa son inventados. El guardado y el envío a SIU Guaraní de la pantalla final son un *mock* y están identificados como tal. |
| **Diferido** (visión, fuera del MVP) | Integración real con SIU Guaraní e IntraConsulta, autenticación y roles, base compartida de asignaciones, flujo de aprobación de la Secretaría Académica, notificaciones a docentes y alumnos, gestión de incidentes, aulas de contingencia, cumplimiento normativo, estimación estadística de cupos y filtros en la primera pantalla. |

**Resultado de la prueba del TP5** (brief, sección 10). Se registró **una sesión** anónima el 6/11/2026: terminó en 01:28, sin cambios de aula y con valoración 5/5. El comentario pide filtros de materias y de aulas en la primera pantalla. Esa sesión **no valida la hipótesis**: es una sola persona, con datos simulados y sin una línea de base del proceso manual. La decisión registrada es **perseverar provisionalmente**. La prueba con los usuarios del segmento quedó limitada porque no se obtuvo el aval de las autoridades de la facultad para usar el software ni datos institucionales.

**Arquitectura.** Hay dos diagramas: [MVP](docs/arquitectura/arquitectura-mvp.html) y [gran visión](docs/arquitectura/arquitectura-vision.html). El análisis completo está en el brief, sección 9, y en el [informe del TP6](docs/tp6/TP6-RooMeet.pdf).

## 3. Cómo se ejecuta

Requisitos: **Node.js 22.12+ o 24.x** y npm. `mvp/.nvmrc` fija Node 22, que es la versión de Vercel.

```bash
cd mvp
npm ci
npm run dev          # abre la app en la URL que muestra Vite
```

Verificación:

```bash
npm run test:run     # pruebas unitarias (Vitest)
npm run build        # chequeo de tipos + build de producción
npm run lint
npx playwright install chromium && npm run test:e2e   # recorrido completo en navegador
```

> Verificado el 21/11/2026 sobre el commit `5b19ef2` con Node 22: `npm ci`, 20/20 pruebas unitarias y `npm run build` sin errores.

En local no hace falta ninguna variable de entorno: las métricas se guardan en el `localStorage` del navegador. Las variables solo son necesarias para registrar pruebas reales en Neon desde Vercel (`DATABASE_URL`, `METRICS_ADMIN_KEY`). El despliegue en Vercel (*Root Directory* = `mvp`) y la configuración de Neon están en [`mvp/README.md`](mvp/README.md).

## 4. Estructura del repositorio

```text
README.md                  ← este archivo
docs/
  brief.md                 ← brief del producto, última versión (ver sección 5)
  prompts.md               ← registro de trabajo con IA
  evidencia/               ← relevamiento del TP2 y resultado de la prueba del TP5 (ver su README)
  TP2 GADS2.pdf            ← informe del TP2 (análisis de usuarios e hipótesis de valor)
  TP2-Analisis-...pdf      ← consigna del TP2
  diseno/wireframe/        ← wireframe del TP3
  evaluacion/              ← evaluación heurística que el equipo hizo de otro producto (TP4)
  arquitectura/            ← diagramas del MVP y de la gran visión (TP6)
  tp6/                     ← informe del TP6
mvp/                       ← aplicación (código, pruebas, API de métricas, configuración de Vercel)
  MVP-AGENTES.md           ← guía de alcance, contratos y criterios con la que se construyó el MVP
  docs/dataset-diit.md     ← origen y criterios del dataset de prueba
  src/domain/              ← motor de asignación, validación, métricas y monitoreo
  src/data/demoDataset.ts  ← dataset simulado (compilado en el bundle)
clases/                    ← material de la cátedra (no forma parte del producto)
output/, WhatsApp Image *  ← plantilla en blanco de evaluación heurística (TP4)
```

## 5. Historia del brief

El brief vive en un solo archivo, `docs/brief.md`, y cada versión abre con un párrafo que explica qué cambió y por qué. Las versiones se recuperan desde el historial de Git:

| Versión | Commit | Fecha | Qué incorporó |
| --- | --- | --- | --- |
| 1 | `51504c6` (`docs/Brief_v1.0.md`) → `a0a32ed` | 25/08 – 01/09 | Segmento, producto, funcionalidades y cinco supuestos (TP1) |
| 2 | `982e91a` | 15/09 | Usuario real, necesidades y confrontación de supuestos a partir de la encuesta del TP2. Hipótesis de valor |
| 3 | `e1094fe` | 20/09 | Alcance del MVP, qué se construye y qué se simula, atributos de usabilidad (TP3) |
| 4 | — | — | No se registró en Git |
| 5 | `54b1209` | 04/11 | Arquitectura del sistema (TP6) |
| 6 | `e9dd80c` | 10/11 | Resultado del TP5 y estado de la hipótesis. **Última versión** |

```bash
git show e1094fe:docs/brief.md      # ejemplo: leer el brief tal como quedó en la versión 3
git log --follow -p -- docs/brief.md
```

> La versión rotulada **6** es la quinta registrada y la última. El brief explica por qué no se renumeró la historia hacia atrás.

## 6. Líneas base

Cada entrega se marca con un tag `Entrega-TPn` sobre el commit entregado:

| Tag | Commit | Contenido |
| --- | --- | --- |
| `Entrega-TP1` | `65f2453` | Brief versión 1 y README del equipo |
| `Entrega-TP2` | `fa36a0f` | Brief versión 2 y evidencia de la encuesta |
| `Entrega-TP3` | `43893d0` | Brief versión 3 y wireframe |
| `Entrega-TP4` | `bd90aa3` | Evaluación heurística |
| `Entrega-TP5` | `1c92ef9` | MVP construido |
| `Entrega-TP6` | `3af2f9a` | Arquitectura y brief versión 6 |
| `Entrega-TP7` | `[COMPLETAR]` | |
| `Entrega-TPI` | `[COMPLETAR]` | Este estado del repositorio |

```bash
git tag -l "Entrega-*"
git checkout Entrega-TP3     # ver el proyecto tal como se entregó en el TP3
```

## 7. Cómo continuar

Los pendientes están ordenados por prioridad. Salen del brief (secciones 9.7 y 10.3):

1. **Conseguir evidencia antes de construir más.** Hacer al menos dos sesiones más con personal administrativo y de la Secretaría Académica, y medir el tiempo del proceso manual como referencia. Sin eso, la hipótesis de 7.7 sigue abierta.
2. **Corregir el motor de asignación** para el caso en que un curso no entra en ninguna aula (la prueba de saturación del TP6 devolvió asignaciones inválidas), y validar la propuesta antes de mostrarla.
3. **Poner los datos detrás de una interfaz.** Hoy `App.tsx` y las pantallas importan el dataset directamente, y eso tiene que cambiar antes de conectar cualquier fuente real.
4. **Agregar filtros de materias y aulas en la primera pantalla**, que es el único pedido concreto que surgió de la prueba.
5. **Confirmar con Sistemas de la UNLaM** qué servicios del SIU están habilitados, si pueden operar PostgreSQL y un servicio en Node.js, y dónde se alojaría el producto. Las afirmaciones del brief sobre el SIU están marcadas como *a confirmar*.

**Quién lo mantendría.** Según el relevamiento, Sistemas de la UNLaM proveería la infraestructura y mantendría la disponibilidad (brief, sección 9.5). Hoy el piloto corre fuera de la UNLaM. Para entregarlo hace falta transferir:

- el proyecto de Vercel: `[COMPLETAR: titular de la cuenta]`
- el proyecto de Neon y su `DATABASE_URL`: `[COMPLETAR: titular]`
- la clave `METRICS_ADMIN_KEY`, por un canal privado y nunca en el repositorio

**Deuda técnica conocida:**

- El dataset está compilado en el bundle y no hay un adaptador de datos (punto 3).
- El motor no está probado con saturación (punto 2).
- `mvp/package.json` declara casi todas las dependencias como `latest`. El build es reproducible solo gracias a `package-lock.json` y `npm ci`: no usar `npm install` sin revisar el lock.
- La sesión de asignación vive en el navegador. Esto es deliberado para el piloto, pero no sirve para un uso institucional compartido.

## 8. Límites declarados

- La hipótesis de valor **no está validada**: hay una sola sesión de prueba, con datos simulados.
- La prueba con usuarios del segmento y el uso de datos institucionales requieren un aval que no se obtuvo.
- Cualquier dato del MVP que no sea nombre, código u horas de una materia es simulado y no debe leerse como información oficial de la UNLaM.
- Lo que el brief afirma sobre los servicios del SIU no pudo verificarse con Sistemas.

## Equipo

- BOSCH, MAXIMO AUGUSTO
- BURNOWICZ, ALEJO
- LÓPEZ FERME, NAHUEL EZEQUIEL
- RODRIGUEZ, MARIANO LIONEL
- ROSALES, GUSTAVO MAURICIO
- VALLEJOS, FRANCO NICOLAS
