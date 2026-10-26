# Guía de implementación del MVP de RooMeet

Fecha: 25 de octubre de 2026. Base documental del repositorio: `bd90aa3`.

Este documento es el punto de entrada para los agentes que implementen RooMeet. Define el alcance mínimo, el comportamiento esperado, las correcciones aceptadas, los contratos de datos, las pruebas y la preparación para Vercel. El resultado esperado es una aplicación funcional para un piloto con personal administrativo, respetando las cuatro pantallas del wireframe.

Los requisitos del producto provienen de las fuentes indicadas abajo. Las elecciones de stack, algoritmo, dataset ampliado, almacenamiento y medición se identifican como decisiones de implementación de esta guía: no son hallazgos de entrevistas ni reglas oficiales de la UNLaM.

## 1. Fuentes y precedencia

| Fuente | Uso en la implementación |
| --- | --- |
| [Brief versión 3](https://github.com/gadsii-unlam/gadsii-RooMeet/blob/main/docs/brief.md), secciones 7.1 a 7.7 y 8 | Usuario, hipótesis de valor, alcance incluido y excluido, flujo y prioridades de usabilidad. |
| [Informe TP2](https://github.com/gadsii-unlam/gadsii-RooMeet/blob/main/docs/TP2%20GADS2.pdf), páginas 3 a 7 | Evidencia de necesidades, problemas del proceso manual y formulación de la hipótesis. La formulación consolidada está en la página 7. |
| [Respuesta de encuesta conservada](https://github.com/gadsii-unlam/gadsii-RooMeet/blob/main/docs/evidencia/Encuesta%20de%20RooMeet%20GADS2%20-%20Formularios%20de%20Google.pdf), páginas 1 a 3 | Contexto del proceso manual, cupos e inscriptos, Guaraní como fuente oficial y validación de cambios por Secretaría Académica. No convierte las simulaciones del MVP en decisiones oficiales. |
| [Consigna del TP2](https://github.com/gadsii-unlam/gadsii-RooMeet/blob/main/docs/TP2-Analisis-de-Usuarios-e-Hipotesis_1%20%281%29.pdf) | Trazabilidad entre relevamiento e hipótesis; no agrega módulos al MVP. |
| [Decisión de diseño](https://github.com/gadsii-unlam/gadsii-RooMeet/blob/main/docs/diseno/wireframe/Dise%C3%B1o.md) | Alternativa elegida: **C, Revisión segura**. |
| [Wireframe navegable](https://github.com/gadsii-unlam/gadsii-RooMeet/blob/main/docs/diseno/wireframe/TP3-wireframe-MVP.html) | Estructura de las cuatro pantallas, navegación, mapa, listado y controles de cambio. |
| [Wireframe general](https://github.com/gadsii-unlam/gadsii-RooMeet/blob/main/docs/diseno/wireframe/Wireframe-RooMeet.jpeg) | Distribución y jerarquía visual del recorrido. |
| PDF recibido `saddsaadsadsr.pdf`, páginas 9 y 10, sección «Respuesta del equipo evaluado» | Correcciones H1, H2, H3 y H4 aceptadas para RooMeet; H9 postergada. Sus decisiones se transcriben en la sección 4 de esta guía. |

El PDF recibido tiene 10 páginas y fue leído visualmente porque es un escaneo. Ubicación al preparar esta guía: `C:/Users/fnval/Downloads/saddsaadsadsr.pdf`. SHA-256: `A3FCC2463E35DEDEA799E3C96789036252E21B75E1E6C2199C00E3358CE5ED9B`. Los agentes pueden implementar con la transcripción de esta guía aunque no dispongan de esa ruta local. No es necesario copiar al sitio público las portadas con datos personales.

**Separación de productos:** las páginas 3 a 8 del PDF y la documentación de evaluación del repositorio original describen la evaluación de **Nodo UNLaM**, del equipo TicTac. No son requisitos de RooMeet. No implementar eventos, feed, onboarding de estudiantes, carreras, inscripciones ni notificaciones push a partir de esos archivos. El registro de prompts del repositorio original es un antecedente de trabajo, no una orden de implementación.

Ante diferencias, aplicar el pedido actual del usuario y las cuatro correcciones aceptadas del PDF sobre el diseño existente; conservar el alcance recortado del brief, sección 8, y la hipótesis de 7.7. Las funcionalidades generales del README y de las secciones 2 a 4 del brief son visión de producto. Los pendientes de diseño de 8.5 se resuelven con el wireframe posterior que ya existe.

## 2. Objetivo y evidencia que debe producir el MVP

### Usuario y problema

El usuario del piloto es el personal administrativo que participa en la planificación y revisión de aulas, incluida la Secretaría Académica. El proceso actual es manual, requiere verificaciones y dificulta visualizar disponibilidad, ocupación y capacidad. Sistemas es un actor de soporte; estudiantes, docentes y mantenimiento no tienen interfaz propia en este MVP.

### Hipótesis central vigente

El sistema centraliza un conjunto pequeño de aulas, cursos, horarios y cupos, calcula propuestas de asignación y permite revisarlas y corregirlas. La hipótesis se apoya si el piloto obtiene simultáneamente:

1. Asignaciones sin superposición de horarios dentro de una misma aula.
2. Asignaciones sin cupos superiores a la capacidad del aula.
3. Al menos el **90 % de las propuestas aprobadas sin modificaciones** por los usuarios administrativos correspondientes.
4. Menor tiempo de planificación que el proceso manual comparable.

El 90 % y la comparación con el proceso manual vienen del brief. No reemplazar estos criterios por visitas, satisfacción, rapidez de carga ni éxito de tests automatizados. La reducción de tiempo no tiene un porcentaje fijado por la fuente: no inventarlo.

### Recorrido indispensable

Revisar datos preparados → generar una propuesta real → revisar y aprobar asignaciones → consultar ocupación con filtros en mapa/listado → seleccionar un curso concreto → cambiarlo de aula si es válido → comprobar el resultado o deshacerlo.

La prueba debe poder completarse sin cuentas, servicios externos ni datos reales. Se construye el comportamiento de asignación y modificación; se simulan los datos de entrada y cualquier relación con Guaraní.

## 3. Alcance cerrado

| Construir | Justificación |
| --- | --- |
| Dataset pequeño y estático, inicialmente sin asignaciones | Entrada reproducible del experimento. |
| Lectura de aulas, capacidades, materias/cursos, horarios, cupos e historial ilustrativo | Permite revisar los datos antes de calcular. |
| Motor local que calcule una propuesta a partir del dataset | Es parte central de la hipótesis; una tabla precargada no alcanza. |
| Revisión y aprobación explícita por curso | Permite medir aprobación sin cambios. |
| Monitoreo con filtro horario, mapa, detalle y listado accesible | Permite comprobar disponibilidad y ocupación. |
| Cambio local de aula, con controles de capacidad y horario | Permite evaluar correcciones por el usuario. |
| Confirmación visible, horarios completos, deshacer y selección correcta | Son las cuatro mejoras aceptadas del PDF. |
| Conservación local de la sesión y exportación mínima de evidencia | Evita perder el piloto y permite calcular los criterios de la hipótesis. |

Quedan fuera: integración real con SIU Guaraní o IntraConsulta; base de datos y API; autenticación y permisos institucionales; colaboración entre usuarios; datos de toda la Universidad; ABM de aulas, materias o cursos; importador de archivos para el usuario; parámetros configurables del motor; estimación estadística avanzada; incidentes, mantenimiento, contingencia y cumplimiento normativo; notificaciones; apps nativas; informes o dashboards de negocio; sugerencias automáticas de aulas alternativas; edición de horarios o cupos durante la prueba.

La exportación de evidencia y la aprobación son apoyos mínimos al experimento, integrados en las pantallas existentes. No convertirlos en módulos nuevos. Evitar funcionalidades que no contribuyan a los cuatro criterios de la hipótesis.

## 4. Correcciones del PDF que son obligatorias

| ID | Decisión aceptada en páginas 9 y 10 | Implementación y aceptación |
| --- | --- | --- |
| H1 | Después de modificar, el resultado debe ser visible e inmediato y resumir el cambio. | Al confirmar, regresar al monitoreo y mostrar el curso, aula de origen, aula de destino y horario completo. Actualizar detalle, mapa y listado desde el mismo estado. Mensaje accesible con `role="status"`; mantener un resumen con opción de deshacer, no depender solo de un toast fugaz. |
| H2 | Mostrar el horario completo de cada curso, con inicio y finalización y formato consistente. | Datos, propuesta, filtros, panel del mapa, listado, edición, confirmación y exportación deben usar el mismo día e intervalo completo. «Lunes 18:00» solo es insuficiente. Los horarios de fin de los fixtures son decisiones de prueba, no datos obtenidos del relevamiento. |
| H3 | Permitir deshacer o restaurar la asignación anterior e identificar qué cambio se revierte. | Acción «Deshacer cambio de [curso]» en el resumen de la última modificación. Restaurar el aula anterior tras revalidar el estado actual. Actualizar todas las vistas y mostrar confirmación. Basta deshacer la última modificación; no construir un sistema completo de versiones o de rehacer. |
| H4 | La edición debe corresponder al curso/aula elegidos y validarse antes de confirmar. | Pasar `courseId` y el aula de origen del registro seleccionado; mostrar materia, curso, día, inicio, fin, cupo, aula actual y aula destino. Revalidar contra el estado vigente al confirmar. Editar un curso debe modificar solo ese curso. |

**H9 se posterga:** cuando un aula no está disponible, explicar el conflicto y bloquear la confirmación. No buscar, sugerir, seleccionar ni recomendar automáticamente otra aula. El listado de opciones con sus estados y la elección manual del usuario ya forman parte del wireframe y se conservan.

## 5. Diseño que se debe respetar

Conservar la alternativa C, «Revisión segura», y sus cuatro pasos. Se puede mejorar la legibilidad y terminar el estilo visual, manteniendo la estructura, la jerarquía y las acciones principales. No reemplazar el flujo por una landing, un dashboard distinto o un calendario como navegación principal.

### Pantalla 1 Datos de prueba

- Encabezado RooMeet y explicación breve de que las cursadas y aulas son simuladas, sin conexión con Guaraní.
- Conservar la organización por aulas, cursos y horarios del boceto. Mostrar capacidades, materia/curso, cupo estimado, intervalo completo e historial de referencia de solo lectura.
- El estado inicial de asignaciones debe ser vacío. Tener cupos e historial no significa precargar el resultado.
- Acción principal «Generar propuesta». Debe ejecutar el motor y llevar a la pantalla 2; no limitarse a cambiar de pantalla.
- Bloquear doble ejecución durante el cálculo y mostrar progreso real o el estado «Generando propuesta». No agregar esperas artificiales.
- Si hay una prueba en curso, volver a Datos no la borra ni recalcula. Para una nueva generación, exigir una acción explícita de reinicio con confirmación.

### Pantalla 2 Revisar propuesta

- Tabla: materia/curso, horario completo, aula propuesta, cupo/capacidad, control y estado de revisión.
- Controles derivados de los datos: «Sin solapamiento · capacidad suficiente», o causa concreta de que un curso no pueda asignarse.
- Mostrar pendientes y aprobación explícita por fila. Basta «Aprobar» o «Quitar aprobación». La aprobación no cambia el aula.
- El usuario debe poder recorrer la propuesta y pasar a «Revisar aulas». Las asignaciones modificadas se vuelven pendientes de revisión y quedan identificadas como modificadas.
- Nunca mostrar aprobación institucional real: se está registrando la decisión del participante del piloto, no una autorización de un sistema externo.

### Pantalla 3 Monitoreo

- Filtro con «Todos los horarios» e intervalos completos derivados del dataset. Cada opción incluye día, inicio y fin. Para la primera versión basta este selector; no construir un buscador avanzado.
- Conservar mapa a la izquierda y detalle del aula a la derecha en escritorio; apilar en ancho reducido.
- Conservar el listado de respaldo. Todos los datos y acciones deben poder usarse sin interpretar el plano.
- Seleccionar un marcador selecciona un aula, no un curso arbitrario. Mostrar sus cursos y horarios; la acción de cambio debe indicar cuál curso se editará.
- Con «Todos», un aula con alguna asignación se rotula «Con asignaciones» y muestra sus intervalos. No afirmar que está ocupada en este momento ni que está libre durante toda la semana porque el filtro no seleccionó un curso.
- Con un intervalo seleccionado, calcular ocupación por intersección con ese intervalo. Mostrar «Disponible en este horario» u «Ocupada en este horario».
- En un aula con varios cursos, cada fila tiene su acción «Modificar Curso X». En un aula vacía, el botón de modificar no debe editar otro curso por defecto.
- Mantener filtros al volver de un cambio. Si el aula elegida no corresponde al filtro después de cambiar, conservar un resumen explícito del curso cambiado y permitir consultarlo sin contexto engañoso.
- Integrar aquí el resumen H1, la acción H3 y un área discreta para «Finalizar revisión», «Exportar prueba» y «Nueva prueba».

### Pantalla 4 Cambio local

- Acceder solo mediante un curso identificado. Mostrar sus datos completos y el aula de origen antes de elegir destino.
- Listar las aulas de la prueba con capacidad y estado para el horario fijo del curso. Mostrar causas junto a las opciones inválidas; no ocultar información necesaria para entender el rechazo.
- Comenzar sin destino seleccionado. No seleccionar automáticamente una alternativa disponible.
- La acción cambia únicamente el aula: conserva curso, cupo, día, inicio y fin. No ofrece mover horarios para resolver un conflicto.
- Mostrar el resumen origen → destino y los controles antes de «Confirmar cambio local».
- Botón deshabilitado cuando falta destino, es el aula actual, falta capacidad, hay solapamiento o el contexto quedó desactualizado.
- Repetir la validación en el momento de aplicar. Un botón deshabilitado no sustituye la validación de dominio.
- «Cancelar» vuelve al monitoreo sin mutaciones ni registro de un cambio efectivo.

### Mapa y estilo

El HTML del wireframe en `../docs/` contiene el plano como PNG embebido en un `data:` URI. Durante la implementación, extraer ese mismo recurso a `public/mapa-campus.png` y reutilizarlo; no es necesario un proveedor de mapas. Conservar las posiciones ilustrativas actuales: Aula 1 `(42 %, 62 %)`, Aula 2 `(56 %, 45 %)`, Aula 3 `(70 %, 71 %)`. Mantener la aclaración «Ubicaciones ilustrativas, no verificadas». El mapa es referencia visual y no acredita ubicaciones oficiales.

Usar coordenadas relativas para que los marcadores acompañen la imagen. Marcadores como botones con nombre accesible; estado indicado por texto/símbolo además del color. Mantener el estilo sobrio del wireframe: fondo claro, tablas legibles, controles visibles y una sola acción principal por paso. No trasladar las anotaciones académicas del wireframe al producto; sí conservar las aclaraciones de simulación relevantes para el usuario.

## 6. Reglas de dominio

### Tiempo y capacidad

Representar el día con ISO 1 a 5 y horas con minutos desde medianoche. Validar `0 <= inicio < fin <= 1440`. Los fixtures usan horarios diurnos del mismo día; no implementar recurrencias excepcionales ni cursos que crucen medianoche.

Dos cursos se solapan si están asignados a la misma aula, tienen el mismo día y cumplen:

```ts
a.startMinutes < b.endMinutes && b.startMinutes < a.endMinutes
```

Los intervalos son semiabiertos: un curso que termina a las 20:00 puede compartir aula con otro que empieza a las 20:00. Días diferentes no se solapan. La capacidad debe satisfacer `room.capacity >= course.estimatedSeats`; la igualdad es válida.

Otras restricciones institucionales, equipamiento, docentes o distancias no están especificadas para este MVP. No inventarlas como reglas obligatorias.

La encuesta menciona aulas propias de departamentos y alternancia presencial/virtual de materias semipresenciales. El informe también describe conflictos cuando el uso real se aparta de la planificación. Son condiciones del proceso real que requieren modelado posterior; no se implementan en el fixture de intervalos semanales fijos ni se afirma que este piloto las resuelva. El control de solapamientos de RooMeet tampoco implica afirmar que Guaraní carezca de controles: la respuesta de encuesta indica que sí los tiene.

### Generación de la propuesta

**Decisión técnica:** función pura y determinista de asignación restringida al dataset de prueba. Sin IA generativa, servicios externos ni respuesta hardcodeada. Debe recibir los datos como argumentos y funcionar también con fixtures distintos en los tests.

Algoritmo de referencia, suficiente para esta escala:

1. Validar datos e identificadores. Ordenar cursos por cupo descendente, con desempate por ID, y aulas por ID ascendente.
2. Recorrer candidatos que satisfagan capacidad y ausencia de solapamiento con las asignaciones parciales.
3. Usar búsqueda con retroceso para obtener la primera solución completa. Para el dataset acotado, evitar que una decisión voraz declare imposible un caso que sí tiene solución.
4. Si no hay solución completa, conservar una solución parcial con el mayor número de cursos asignados explorado; en empate, conservar la primera. Se puede podar una rama que ya no supere la mejor cobertura encontrada.
5. Devolver asignaciones y cursos sin asignar con una explicación. Nunca forzar un aula inválida para conseguir cobertura del 100 %.

No se exige optimizar globalmente uso de asientos, recorridos ni preferencias. La búsqueda aplica a los 65 cursos del fixture vigente y los pequeños casos de prueba; no desarrollar un optimizador universitario de propósito general.

Antes de aceptar el resultado, ejecutar un validador independiente del algoritmo que recalcule integridad referencial, capacidad, duplicados y solapamientos. Un resultado inválido no se publica como propuesta válida.

Los documentos no aportan una fórmula estadística validada para estimar cupos. **Decisión de recorte:** `estimatedSeats` es una entrada estática preparada para la prueba; el historial se muestra como contexto. El MVP prueba asignación frente al cupo dado, no precisión de un predictor ni conformidad con un método estadístico oficial. No presentar una fórmula inventada como resultado del TP2.

### Modificación, confirmación y deshacer

- Identificar toda asignación por `courseId`, nunca por índice de una fila filtrada o por texto visible.
- Capturar al abrir edición: curso, aula de origen y revisión de estado. Si falta el curso, el aula cambió o la revisión ya no corresponde, pedir actualizar el contexto y no confirmar el cambio viejo.
- Validar el destino contra **todas** las asignaciones vigentes, no solo las visibles por el filtro. Al validar el propio curso, excluir su asignación anterior para no compararlo contra sí mismo.
- Aplicar origen → destino como una sola transición de estado. No dejar un momento persistido con el curso duplicado o sin aula.
- Registrar la última modificación exitosa con origen, destino, curso y revisión resultante. Confirmar dos veces la misma acción no debe aplicarla dos veces.
- Deshacer verifica que ese cambio siga siendo el último y que la asignación actual coincida con el destino registrado. Revalidar el aula anterior antes de restaurarla. Si ya no es válido, explicar el motivo sin pisar otro estado.
- Una nueva modificación reemplaza la acción disponible para deshacer. Deshacer la consume; no se necesita rehacer. Reiniciar o finalizar la prueba elimina la posibilidad de modificar esa sesión.
- Si un cambio se deshace, conservar ese hecho en la evidencia y volver a dejar pendiente la aprobación del curso. No borrar el historial del experimento.

## 7. Dataset de prueba y contratos compartidos

### Dataset público inicial

El dataset vigente está en `src/data/demoDataset.ts` y sus fuentes y criterios en [docs/dataset-diit.md](docs/dataset-diit.md). Reemplaza por completo el fixture anterior de cursos A–J: contiene **65 materias de primer año** de las seis carreras de grado del DIIT. Se conserva la decisión de tres aulas ilustrativas con capacidades 40, 60 y 50. Antes de generar no hay asignaciones.

Los nombres, códigos y cargas semanales se tomaron de los planes oficiales enlazados en la documentación del dataset. Una materia presente en más de un plan conserva un curso y código por carrera; eso no afirma que la UNLaM comparta físicamente las comisiones. Horarios, cupos e historial de inscriptos son simulados. El plan de Ingeniería Civil 2025 enumera las materias de primer año sin dividirlas por cuatrimestre; esa división en el fixture es una decisión de simulación.

### Tipos mínimos de dominio

```ts
type Day = 1 | 2 | 3 | 4 | 5;

interface Room {
  id: string;
  name: string;
  capacity: number;
  mapPosition: { xPercent: number; yPercent: number };
}

interface Course {
  id: string;
  name: string;
  subject: string;
  curriculumCode: string;
  careerId: string;
  term: 1 | 2;
  weeklyHours: number;
  estimatedSeats: number;
  enrollmentHistory: number[]; // Ilustrativo, solo lectura.
  day: Day;
  startMinutes: number;
  endMinutes: number;
}

interface Assignment {
  courseId: string;
  roomId: string;
}

interface Review {
  courseId: string;
  approved: boolean;
  everModified: boolean;
}

interface LastChange {
  id: string;
  courseId: string;
  fromRoomId: string;
  toRoomId: string;
  revisionAfter: number;
}
```

Cada curso tiene un único intervalo semanal simulado en este MVP. Los conflictos se comparan dentro del mismo cuatrimestre, día e intervalo. Cada curso puede tener como máximo una asignación; un aula puede alojar varios cursos en intervalos compatibles. Los nombres son para presentación y los ID son estables.

El estado de sesión debe incluir `schemaVersion`, `datasetVersion`, `sessionId`, `revision`, estado de prueba (`not-started`, `running`, `finished`), `originalAssignments`, `currentAssignments`, cursos sin asignar, revisiones, última modificación, marcas de tiempo y eventos mínimos. La lista original queda inmutable después de la primera generación. Selecciones y filtros de la interfaz no son otra fuente de asignaciones.

Funciones compartidas mínimas:

```text
generateAssignments(rooms, courses) -> { assignments, unassigned }
validateAssignments(rooms, courses, assignments) -> violations
validateChange(rooms, courses, state, { courseId, fromRoomId, toRoomId, expectedRevision }) -> result
getRoomOccupancy(courses, assignments, roomId, selectedInterval) -> occupancy
calculatePilotMetrics(state) -> metrics
```

Definir tipos explícitos para resultados y errores. Compartir el validador entre generación, cambio y deshacer; el cálculo de disponibilidad y las etiquetas de la interfaz deben usar las mismas reglas de tiempo.

## 8. Estado y persistencia local

**Decisión técnica:** estado en React mediante un reducer y un contexto pequeño si hace falta. Persistir una instantánea JSON en `localStorage`, bajo la clave `roomeet:mvp:session:v2`. La clave v1 del fixture A–J se elimina al iniciar la aplicación.

- Restaurar la sesión al recargar. No regenerar resultados ni aprobar cursos durante el arranque.
- Validar estructura, versión de dataset, IDs, capacidad y horarios antes de restaurar. Estado inválido o incompatible requiere explicar el problema y ofrecer reinicio explícito; no migrarlo de forma silenciosa ni inventar una sesión válida.
- No bloquear la aplicación si el navegador niega almacenamiento: continuar en memoria, avisar que los cambios duran mientras siga abierta y permitir exportar.
- Una prueba activa se usa en una sola pestaña y dispositivo. No implementar sincronización ni afirmar que las decisiones se comparten con otro usuario o con Secretaría Académica.
- «Nueva prueba» pide confirmación si hay datos que se perderían y ofrece exportar. Borra solo la clave de RooMeet, no todo `localStorage` del navegador.
- Al finalizar, guardar una instantánea final y permitir consulta/exportación; para nuevas modificaciones se empieza otra prueba.
- Manejar selección faltante, lista vacía por filtro, generación sin solución, ausencia de sesiones y restauración fallida con mensajes claros y una acción de recuperación local. No agregar recomendaciones automáticas de destino.

## 9. Evidencia mínima y protocolo de piloto

### Registro dentro de la aplicación

Registrar creación de propuesta, aprobación o retiro de aprobación, cambios confirmados, deshacer, finalización y rechazos por validación. Cada evento lleva tipo, fecha, revisión y, cuando aplique, IDs y valores de origen/destino. Un rechazo no cambia la asignación ni marca el curso como modificado.

Guardar `startedAt` al ejecutar la primera generación y `finishedAt` al finalizar la revisión. La duración incluye cálculo, revisión y correcciones del participante; no es solo el tiempo que tarda el algoritmo. Una recarga/interrupción queda registrada y no produce una duración artificial de cero. Si el reloj arroja valores inválidos, marcar el dato como no medible.

«Exportar prueba» descarga un único JSON con versiones, ID anónimo de sesión, dataset utilizado, propuesta original, estado final, revisiones, eventos, fechas, duración y métricas calculadas. No requiere servidor ni importación posterior. Mostrar un resumen compacto, sin gráficos ni dashboard adicional.

### Cálculos

| Métrica | Definición |
| --- | --- |
| Cobertura | Cursos asignados / total de cursos del dataset. Informar también los no asignados; una cobertura baja no se oculta detrás de cero conflictos. |
| Solapamientos | Cantidad de pares de cursos que violan la regla temporal en la misma aula; calcular en propuesta original y resultado final. Objetivo: 0. |
| Excesos de capacidad | Cantidad de asignaciones cuyo cupo supera la capacidad; calcular en propuesta original y resultado final. Objetivo: 0. |
| Aprobación sin modificaciones | Cursos con propuesta original, aprobación explícita y `everModified === false`, divididos por el **total de cursos de la entrada**. Pendientes y no asignados no cuentan como aprobados. Objetivo: al menos 90 %. |
| Modificaciones | Cambios de aula efectivos. Deshacer no borra el cambio de la evidencia ni restablece `everModified` a falso; es una definición conservadora para no inflar la tasa. |
| Tiempo | `finishedAt - startedAt` en una sesión completa sin interrupciones que invaliden la comparación. Reportar junto a la línea de base manual externa. |

El mismo curso se cuenta una vez en el denominador, aunque se modifique varias veces. No calcular aceptación sumando clics. La aprobación de una asignación modificada sirve para cerrar la revisión, pero no pasa a ser «aprobada sin modificaciones».

«Finalizar revisión» requiere todos los cursos asignados y revisados, sin violaciones vigentes. Un caso sin solución puede exportarse como prueba incompleta con sus causas, sin presentarse como piloto exitoso.

### Protocolo externo mínimo

1. Elegir participantes reales del usuario primario e identificar su rol de forma anónima. La app no suplanta la decisión de Secretaría Académica ni exige construir cuentas para observarla.
2. Usar la misma entrada y una tarea comparable en el proceso manual y en RooMeet. Definir antes la ventana de medición: desde comenzar a asignar, con datos ya revisados, hasta terminar la revisión.
3. Registrar tiempo manual, decisiones y contexto. Alternar el orden de uso cuando sea posible y anotar el posible efecto de aprendizaje.
4. Probar generación, revisión y consulta. Medir aceptación de las propuestas espontáneamente; no obligar a modificar A para luego interpretar esa modificación forzada como rechazo del algoritmo.
5. Ejecutar los ejercicios guiados de cambio, rechazo y deshacer en una **sesión separada de usabilidad**, identificada como tal. Esos resultados prueban correcciones H1-H4 y no se mezclan con la tasa de aceptación del piloto de valor.
6. Exportar las sesiones. Registrar por fuera de la app participante anónimo, rol, dataset, orden, tiempo manual, tiempo con RooMeet, interrupciones y observaciones. No hace falta un formulario de investigación dentro del producto.
7. Contrastar los cuatro criterios. Sin usuarios reales o sin línea de base de tiempo, esa parte de la hipótesis queda pendiente de evaluación. No precargar resultados ni anunciar «hipótesis validada» en la interfaz.

La muestra y el dataset acotados permiten un piloto, no demostrar corrección para todos los casos institucionales. La prueba técnica del fixture y la aceptación humana son resultados distintos.

## 10. Arquitectura mínima lista para Vercel

**Decisión técnica:** React + TypeScript + Vite, CSS simple, aplicación estática en el navegador. Vitest para el dominio y Playwright para los recorridos críticos. Usar versiones estables compatibles al implementar y guardar `package-lock.json`.

Usar Node.js **22.12+ o 24.x** y npm. `.nvmrc` conserva Node 22 para un despliegue reproducible en Vercel, mientras que `engines.node` también admite Node 24 para desarrollo local. Comprobar la versión real al ejecutar el build. Estas son elecciones del proyecto, no requisitos del producto. Fuentes oficiales: [Vite](https://vite.dev/guide/) y [Node.js en Vercel](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).

No se necesita Next.js, backend, ORM, almacenamiento cloud, claves de API ni variables de entorno. La simulación local es suficiente para este alcance. El sitio publicado no debe incluir datos privados ni copiar `../docs/`, evidencia, clases o PDFs al directorio público.

### Estructura de la aplicación

```text
/
  package.json
  package-lock.json
  index.html
  vite.config.ts
  tsconfig.json
  tsconfig.app.json
  tsconfig.node.json
  eslint.config.js
  playwright.config.ts
  vercel.json
  .nvmrc
  public/
    mapa-campus.png
  src/
    main.tsx
    App.tsx
    styles.css
    domain/
      types.ts
      validation.ts
      allocation.ts
      metrics.ts
    data/
      demoDataset.ts
    state/
      reducer.ts
      storage.ts
    screens/
      DataScreen.tsx
      ProposalScreen.tsx
      MonitoringScreen.tsx
      ChangeScreen.tsx
    components/
      StepNavigation.tsx
      RoomMap.tsx
      AssignmentTable.tsx
      ChangeSummary.tsx
    tests/
      allocation.test.ts
      validation.test.ts
      reducer.test.ts
      metrics.test.ts
  e2e/
    main-flow.spec.ts
  docs/
    dataset-diit.md

```

Se puede ajustar el reparto de componentes sin cambiar contratos ni comportamiento. No crear un paquete por pantalla ni una arquitectura distribuida. La app vive en la raíz de este repositorio; las fuentes académicas permanecen enlazadas al repositorio original.

Navegación mediante estado o hash para los cuatro pasos (`#datos`, `#propuesta`, `#monitoreo`, `#cambio`), conservando la idea del HTML. No hace falta una biblioteca de routing. Validar el paso solicitado al restaurar: sin propuesta no se entra a monitoreo y sin curso seleccionado no se entra a cambio. Retroceso y avance del navegador no deben perder la sesión.

### Scripts mínimos

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "test": "vitest",
    "test:run": "vitest run",
    "test:e2e": "playwright test"
  },
  "engines": {
    "node": "^22.12.0 || ^24.0.0 || >=26.0.0"
  }
}
```

Configurar las dependencias y archivos de TypeScript para que estos scripts funcionen realmente. Para desarrollo, la primera instalación genera el lockfile; después la instalación reproducible usa `npm ci`.

### Configuración de Vercel a entregar

Con paquete y configuración en la raíz del repositorio:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "vite",
  "installCommand": "npm ci",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

En el proyecto Vercel, seleccionar la raíz del repositorio como *Root Directory*, preset Vite, Node 22.x, build `npm run build` y salida `dist`. No hay variables de entorno obligatorias. La aplicación debe funcionar con `/` y sus hashes; no necesita rewrites de rutas para ese esquema. Si en otra implementación se eligen rutas reales, agregar y probar el fallback de SPA antes de declarar que funcionan los enlaces directos.

Estas opciones se basan en [Vite en Vercel](https://vercel.com/docs/frameworks/frontend/vite) y la [configuración de vercel.json](https://vercel.com/docs/project-configuration/vercel-json), consultadas el 25/10/2026. Verificar compatibilidad si la implementación se realiza mucho después.

Comandos de comprobación de una entrega ya implementada, ejecutados desde la raíz del repositorio:

```sh
npm ci
npm run lint
npm run test:run
npm run build
npm run preview -- --host 127.0.0.1
```

En otra terminal, para E2E sobre el build o el `webServer` definido en Playwright:

```sh
npx playwright install chromium
npm run test:e2e
```

El README de la implementación debe explicar instalación, desarrollo, pruebas, limitaciones locales y cómo importar el repositorio en Vercel. «Listo para Vercel» exige build reproducible y configuración correcta; «desplegado» requiere una URL efectivamente comprobada. El pedido que originó esta guía es preparar el desarrollo, no publicar ya una instancia.

## 11. Pruebas y criterios de aceptación

### Dominio y datos

| Caso | Resultado exigido |
| --- | --- |
| Primera apertura | Dataset visible y cero asignaciones; no se ve una propuesta previamente fabricada. |
| Generar sobre el fixture público | Los 65 cursos quedan asignados, sin solapamientos ni excesos; el resultado se calcula, no se carga ya asignado. |
| Cambiar cupo u horarios en un fixture de test | El motor responde a la nueva entrada; no devuelve siempre el mismo resultado predefinido. |
| Dos cursos consecutivos en la misma aula | Final 20:00 e inicio 20:00 son compatibles. |
| Solapamiento parcial | 18:00–20:00 y 19:00–21:00 en la misma aula se rechazan. |
| Igual horario en días distintos | No genera conflicto. |
| Cupo igual a capacidad | Se acepta. Cupo superior se rechaza. |
| Entrada imposible | Conserva asignaciones válidas, identifica cursos sin asignar y no declara un éxito completo. |
| IDs duplicados o intervalo inválido | Error explícito de datos; no generar una propuesta silenciosamente incoherente. |
| Cobertura con retroceso | La solución completa del ejemplo siguiente debe encontrarse. |

Fixture de retroceso, solo para tests: dos aulas R1=40 y R2=60; lunes, X cupo 60 de 18:00 a 19:00, Y cupo 40 de 19:00 a 20:00 y Z cupo 40 de 18:30 a 19:30. Una asignación válida es X e Y en R2 y Z en R1. Un algoritmo que se queda con Y en R1 y abandona Z no es suficiente para este caso pequeño.

### Cambios y regresiones del wireframe

| Caso | Resultado exigido |
| --- | --- |
| Abrir edición de un curso desde el listado o detalle | Encabezado y origen corresponden al curso elegido; confirmar el cambio no altera otros cursos. Es la regresión principal de H4. |
| Mover a un aula ocupada en el mismo cuatrimestre e intervalo | Rechazado aunque el curso en conflicto no se vea en el filtro de interfaz. |
| Mover un curso de cupo 54 a un aula de capacidad 50 | Rechazado con mensaje que informa cupo y capacidad. |
| Mover un curso a un aula compatible | Cambio válido; mapa, detalle y listado coinciden; mensaje H1 con origen, destino e intervalo. |
| Cancelar edición | No altera asignaciones ni genera un cambio efectivo en las métricas. |
| Confirmación duplicada o contexto obsoleto | No duplica ni aplica la operación sobre un estado distinto al revisado. |
| Deshacer un cambio | Restaura el aula anterior, actualiza vistas, consume la acción y conserva la evidencia de modificación. |
| Deshacer con revisión/destino que ya no coinciden | Rechazo explicable, sin sobrescribir estado ajeno. |
| Recargar una sesión válida | Conserva propuesta original, estado vigente, aprobaciones y posibilidad válida de deshacer. |
| JSON local corrupto o almacenamiento denegado | Recuperación controlada; no pantalla en blanco ni falsa confirmación de persistencia. |

### Medición, navegación y entrega

- La aprobación sin cambios usa como denominador los 65 cursos de la entrada. Un pendiente, no asignado o modificado no se elimina del denominador.
- Cambiar y deshacer no hace pasar un curso por «nunca modificado». Repetir clics de aprobación no multiplica la aceptación.
- Una aprobación se invalida al modificar el curso, aunque el resultado siga siendo técnicamente válido.
- Las sesiones de ejercicios forzados no se confunden con el piloto de aceptación espontánea.
- Exportación JSON contiene suficiente información para recalcular métricas y no afirma que las valide un servidor.
- No se puede finalizar una revisión incompleta o con errores. Finalizar congela esa sesión; «Nueva prueba» conserva la posibilidad de exportar antes de reiniciar.
- Navegación directa o con atrás/adelante respeta las precondiciones de cada pantalla.
- Uso con teclado, foco visible, etiquetas de formulario, horarios legibles, feedback anunciado y errores asociados a su control. No comunicar disponibilidad solo por color.
- Verificación visual de las cuatro pantallas en escritorio y en un ancho móvil cercano a 390 px; tablas accesibles con desplazamiento si hace falta, sin controles tapados ni overflow global.
- Mapa ausente o ilegible no bloquea consulta/cambio mediante el listado.
- Build abre en preview de producción y recupera la sesión al recargar. Mapa y assets se resuelven con rutas del sitio, no rutas Windows.
- En una revisión de Vercel, comprobar carga inicial, navegación por hash, recarga, mapa, modificación, deshacer y exportación; no exigir conexión a Guaraní ni una API inexistente.

## 12. Paquetes de trabajo para los agentes

Estos paquetes definen responsabilidades y dependencias para una futura ejecución; esta guía no inicia agentes por sí misma. Si se reparten entre varios, acordar primero los tipos y mantener una única fuente de reglas de dominio.

| Paquete | Responsabilidad | Archivos principales | Dependencia y entrega |
| --- | --- | --- | --- |
| 1 Base y contratos | Setup mínimo, scripts, tipos, fixture y configuración de build. | Configuración raíz, `src/domain/types.ts`, `src/data/`. | Primero; entrega contratos usados por los demás y build vacío funcional. |
| 2 Dominio | Asignación, validación temporal/capacidad y métricas puras. | `src/domain/`, tests de dominio. | Usa contratos de 1; entrega casos positivos, imposibles y retroceso. |
| 3 Estado | Transiciones atómicas, aprobación, H3/H4, persistencia y exportación. | `src/state/`, tests de reducer/metrics. | Usa dominio de 2; no duplica las reglas de conflicto. |
| 4 Interfaz | Cuatro pantallas, mapa existente, filtros, selección y feedback H1/H2. | `src/screens/`, `src/components/`, CSS, `public/mapa-campus.png`. | Usa contratos de 1 e integra 2/3; no guarda asignaciones independientes en componentes. |
| 5 Integración y entrega | Recorrido completo, regresiones H1-H4, E2E, README y Vercel. | `e2e/`, documentación y config de despliegue. | Último; entrega instalación limpia, build y evidencia de comprobación. |

Evitar cambios simultáneos sin coordinación en `App.tsx`, tipos, reducer y `package.json`. Cada entrega debe indicar cambios, pruebas realizadas, limitaciones reales y fuente del requisito. No alterar el scope para resolver un detalle de implementación.

## 13. Definición de terminado

- [ ] Implementa RooMeet y su hipótesis de aulas; no incorpora requisitos de Nodo UNLaM.
- [ ] Respeta las cuatro pantallas, la alternativa C, el mapa de referencia y el listado de respaldo.
- [ ] Calcula asignaciones reales sobre entrada estática, partiendo sin asignaciones.
- [ ] Revisa capacidad, intervalos completos y solapamientos con reglas compartidas.
- [ ] Permite aprobación explícita y conserva la propuesta original para medir aceptación.
- [ ] Cumple H1, H2, H3 y H4 con sus regresiones probadas.
- [ ] Mantiene H9 y el resto de los módulos excluidos fuera del MVP.
- [ ] Restaura la sesión local o explica una recuperación fallida; exporta evidencia reproducible.
- [ ] No presenta datos ficticios, ubicaciones o resultados técnicos como evidencia de validación institucional.
- [ ] Pasa lint, tipos, tests de dominio, recorridos E2E y revisión visual de las cuatro pantallas.
- [ ] `npm ci` y `npm run build` funcionan desde un checkout limpio con Node compatible.
- [ ] Incluye configuración Vercel, lockfile y README de ejecución; no necesita secretos ni servicios adicionales.
- [ ] Conserva los documentos originales y los archivos del usuario. Esta guía no cambia el brief ni el wireframe histórico.

## 14. Prompt de arranque para implementación

> Implementá el MVP de RooMeet siguiendo `MVP-AGENTES.md`. Leé primero las fuentes de producto y el wireframe indicados en la sección 1. Conservá sus cuatro pantallas y la alternativa C. Construí la generación real de asignaciones, revisión, monitoreo y cambio local sobre el dataset de primer año del DIIT descrito en `docs/dataset-diit.md`. Incorporá H1-H4 de las páginas 9 y 10 del PDF recibido; mantené H9 postergada. Seguí las decisiones técnicas y contratos de esta guía, preservá la documentación existente y no agregues módulos del producto completo. Entregá una app funcional, comprobada con los criterios de aceptación, con README y configuración listos para Vercel. Separá la verificación técnica de cualquier afirmación de validación con usuarios reales.
