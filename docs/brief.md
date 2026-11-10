# Brief

**Versión 6**

**Cambios respecto de la versión 3 solicitados en el punto 7 del TP5.** El MVP pasó del alcance definido en TP3 a una aplicación construida con las correcciones aceptadas del TP4. Se obtuvo un primer registro de uso y se formuló una decisión provisional de perseverar, pero faltan las otras sesiones y la comparación manual para cerrar el aprendizaje y validar la hipótesis de valor. La versión 4 prevista por la consigna no se registró en Git; por eso estos hechos se incorporan a la versión 6 sin renumerar retroactivamente el historial.

**Actualización respecto de la versión 5.** El informe final del TP5 registra una sesión anónima completada en 01:28, sin cambios de aula, con valoración 5/5 y un pedido de filtros de materias y aulas en la primera pantalla. Según el informe, la respuesta proviene de una persona relevada en el TP2; la captura por sí sola no permite identificarla. El resultado apoya una lectura preliminar de usabilidad, pero no demuestra que el 90 % de las propuestas sea aprobado, que las asignaciones funcionen con datos institucionales ni que el proceso sea más rápido que el manual. Del TP6 se conservan la arquitectura de la gran visión y el riesgo del adaptador con SIU Guaraní. Se actualiza la descripción del MVP porque, después de la versión analizada en ese informe, se agregó una API con Neon para guardar métricas anónimas de evaluación; la asignación continúa siendo local y simulada.

*Registro histórico de la versión 5, antes del resultado del TP5.* La versión 4 no llegó a registrarse en el repositorio. La versión 5 documentó la construcción del MVP y agregó la sección 9 a partir del TP6. En ese momento aún no se había incorporado al brief una sesión de prueba. La sección 9 de esta versión 6 conserva las decisiones arquitectónicas del TP6 y distingue la arquitectura de asignación de la API de métricas agregada después.

*Nota de trazabilidad — cambio de la versión 2 a la versión 3 (se conserva como antecedente).* Esta versión no modifica el segmento, el producto ni la hipótesis de valor establecidos en la versión 2: los conserva como marco vigente. Lo que cambia es el **nivel de definición del alcance**. Hasta la versión 2 el brief describía el producto completo (motor de asignación, panel de estado, gestión de incidentes, aulas de contingencia, cumplimiento normativo) sin distinguir qué parte de ese producto se llevaría a una prueba real. A partir del trabajo realizado en el TP3 (puntos 1 a 4), el equipo delimitó el **scope del MVP**: qué se incluye y qué se excluye, qué se construye efectivamente y qué se simula o se resuelve a mano, el flujo principal que recorrerá el usuario y los atributos de usabilidad priorizados. El fundamento de estos cambios es que el MVP existe únicamente para poner a prueba la hipótesis de valor formulada en la versión 2: por eso se recorta el alcance a lo mínimo que permite observar si el sistema produce asignaciones sin solapamientos ni excesos de capacidad y si el personal administrativo las aprueba o las modifica. Todo aquello que no aporta evidencia sobre esa hipótesis —el set completo de datos, los parámetros configurables, la carga de datos (dataEntry), el soporte a alumnos y docentes y la conexión real con SIU Guaraní— queda fuera del MVP sin dejar de formar parte de la visión de producto. La priorización de **tasa de errores** y **recuerdo en el tiempo** como atributos de usabilidad se apoya en dos hechos ya documentados: la criticidad del proceso (una asignación errónea afecta la planificación de todo el cuatrimestre, en línea con los reclamos por superpoblación y los solapamientos relevados en el TP2) y su frecuencia (se ejecuta una sola vez por cuatrimestre).

*Nota de trazabilidad — cambio de la versión 1 a la versión 2 (se conserva como antecedente).* A partir del relevamiento realizado con tres usuarios reales, la versión 2 reemplazó el perfil hipotético del usuario primario por un perfil basado en evidencia, incorporó sus necesidades, problemas y contexto de uso, confrontó los cinco supuestos del TP1 y formuló una hipótesis de valor medible. El cambio principal fue que la asignación de aulas no depende únicamente del personal administrativo de cada departamento: intervienen varios actores y la Secretaría Académica tiene un rol central en la decisión y validación de cambios. Por este motivo, RooMeet debe contemplar un flujo con múltiples roles, centralización de información y apoyo a la planificación y el monitoreo.

---

## 1. Segmento

El segmento de la comunidad UNLaM seleccionado por el equipo es **Administración**. El mismo está compuesto por personal de mantenimiento y administrativo de la Universidad.

Se estima que está compuesto por aproximadamente 100 personas. Esta cantidad queda pendiente de validación con el grupo. Lo que diferencia a este segmento es que cubre la organización y gestión del espacio físico de la Universidad desde el inicio de la jornada hasta el final, así como su apertura y cierre; además, responde a trámites administrativos a demanda de estudiantes y docentes. Sin su labor, el acceso y tránsito de personas en la Universidad sería un caos.

La elección de este segmento se relaciona con la necesidad de solucionar diversos inconvenientes que muchas veces tenemos los estudiantes al acceder a las aulas, ya sea que no haya suficiente espacio para ubicarse en ella (disponibilidad de bancos y dimensiones del aula), que cuente con elementos en mal estado (por ejemplo, cerradura o sillas rotas), que no haya luz o electricidad, etc.

### Usuarios reales para el relevamiento

* **Alumnos y docentes:** cualquier persona que esté cursando en la UNLaM y quiera utilizar la aplicación.
* **Auxiliar Administrativo:** puede ser la persona que atiende en Mesa de Entrada/Ventanilla dentro del piso del departamento nuevo de Ingeniería.
* **Técnico de Mantenimiento:** es quien se encarga de mantener en buen estado las aulas y todos los elementos que se encuentran en ellas (sillas, cerraduras, calefacción, pizarra, escritorios, etc.).

## 2. Producto

El nombre del producto software a desarrollar es **RooMeet**.

Este desarrollo busca resolver la asignación correcta y eficiente de las aulas de la Universidad para todas las materias que se cursan presencialmente dentro del establecimiento; así como la generación de alertas de inconvenientes técnicos dentro de las mismas.

Se busca que los estudiantes de cada materia puedan asistir a las aulas en condiciones óptimas, respetando la cantidad de alumnos asignados al curso, así como los estándares de seguridad definidos por la UNLaM.

Se trata de una solución destinada a personal administrativo y de mantenimiento asignado a cada departamento de la Universidad, con el objetivo de colaborar en la resolución de incidentes y falta de disponibilidad en las aulas.

## 3. Funcionalidades Core

Las siguientes funcionalidades describen el **producto completo** (visión). El subconjunto que efectivamente forma parte del MVP se define en la sección 8.

* **Motor de Asignación Inteligente de Aulas:** dispone de un algoritmo que permite asignar aulas a una materia en base a disponibilidad y cumplimiento de condiciones necesarias para su funcionamiento.
* **Panel de Estado Operativo de Aulas en Tiempo Real:** permite visualizar en un paneo rápido qué aulas están habilitadas para su uso.
* **Gestión de Incidentes y Flujo de Trabajo:** se conocen los inconvenientes técnicos generados en aulas, y en base a su ocurrencia, se establece un plan de contingencia.
* **Asignador de Aulas de Contingencia:** dispone de un set de aulas específicas para utilizar en situaciones de emergencia, y las asigna según disponibilidad.
* **Módulo de Cumplimiento Normativo y Auditoría:** evalúa si un aula cumple con las normativas principales de Higiene y Seguridad, así como los estándares definidos por la Universidad.

## 4. Integraciones Previstas

* **SIU GUARANÍ:** integración para conocer qué materias se dictan y en qué horarios en la UNLaM.
* **IntraConsulta:** integración/revisión del mecanismo actual mediante el cual se gestiona o se censa la disponibilidad y el espacio de las aulas.

> **Actualización TP3:** estas integraciones se mantienen como previstas para el producto, pero **no se implementan en el MVP**. La conexión con SIU Guaraní se simula con archivos (ver sección 8.2).

## 5. Grupos de Usuarios y Usuario Primario Elegido

### Personal administrativo de cada departamento — Usuario primario

El personal administrativo de cada departamento es aquel que tiene acceso y usa el actual sistema de asignación de aulas. Cuando un docente (o alumno) no conoce el aula asignada, acude al departamento a consultar la misma. Esto genera mucha congestión de personas en las horas previas a empezar la cursada o rendir un final, concluyendo en mucha carga de trabajo para el personal.

Tener un sistema accesible para alumnos y docentes donde puedan verificar las aulas asignadas, minimizar el posible solapamiento de horarios en aulas y maximizar el uso de toda la facultad favorece enormemente a todas las partes.

Sin duda, el personal administrativo es nuestro grupo de usuarios primario, ya que son los que cargan la responsabilidad de la asignación y exposición de esta.

**Contactos identificados para el relevamiento:**

* **Matias Rosano (Sistemas UNLaM)**
  * Relación previa con integrantes del equipo: No aplica.
  * Disponibilidad para relevamiento: Viernes 28/8 de 9hs a 18hs.
  * Disponibilidad para pruebas de MVP: Viernes 25/9 de 9hs a 18hs.
* **Romina Stratta (Administrativa en DIIT)**
  * Relación previa con integrantes del equipo: No aplica.
  * Disponibilidad para relevamiento: Martes 1/9 de 14hs a 21hs.
  * Disponibilidad para pruebas de MVP: Martes 29/9 de 14hs a 21hs.
* **Leonardo Scaravaglione (Administrativo en DIIT)**
  * Relación previa con integrantes del equipo: No aplica.
  * Disponibilidad para relevamiento: Martes 1/9 de 14hs a 21hs.
  * Disponibilidad para pruebas de MVP: Martes 29/9 de 14hs a 21hs.

### Personal de mantenimiento

Estos son los encargados de mantener las instalaciones en buenas condiciones, incluyendo las aulas, y registrar las tareas de mantenimiento y necesidades de la infraestructura.

Dado que la aplicación propone un sistema de alertas y monitoreo sobre las necesidades de las aulas, se beneficiarían a la hora de planificar tareas, tener mejor visualización del estado de las aulas y comprender mejor qué priorizar.

### Alumnos y docentes

Pueden ver la numeración de las aulas, qué aula pertenece a qué departamento, qué clases se dictan en determinada aula a determinado horario, o si esta se encuentra libre. Además, pueden reportar problemas de mantenimiento en el aula si los hubiera.

> **Actualización TP3:** el MVP se prueba únicamente con los **usuarios primarios** (personal administrativo). El soporte para alumnos y docentes queda explícitamente excluido del MVP (ver sección 8.1).

## 6. Supuestos

Este proyecto parte de muchos supuestos debido a la falta de información pública del actual proceso de gestión de asignación de aulas. Los supuestos van desde quién lleva cierta responsabilidad hasta los procedimientos actuales.

### Supuesto 1 — Responsable de la asignación de aulas **[CRÍTICO]**

* **Asumimos que** la responsabilidad de asignar las aulas corresponde al personal administrativo de cada departamento de la Universidad.
* **Evidencia que lo confirmaría:** entrevistas con personal administrativo de los distintos departamentos que indiquen que son ellos quienes reciben, gestionan y realizan la asignación de aulas. También podría confirmarse mediante la observación del proceso actual de asignación.
* **Evidencia que lo refutaría:** identificar que la asignación de aulas es realizada por otro sector, área o sistema centralizado de la Universidad, sin intervención directa del personal administrativo de cada departamento.
* **Impacto:** este es el supuesto crítico del proyecto, ya que define quién sería el principal usuario responsable de la gestión de las aulas y, por lo tanto, condiciona el diseño de los permisos, funcionalidades y flujo de trabajo de RooMeet.

### Supuesto 2 — Existencia de un sistema actual de gestión

* **Asumimos que** el personal administrativo mencionado gestiona activamente la relación entre las aulas y las materias mediante un sistema de software ya establecido.
* **Evidencia que lo confirmaría:** entrevistas con el personal administrativo y demostraciones del sistema actualmente utilizado para consultar, registrar o modificar la asignación de aulas.
* **Evidencia que lo refutaría:** comprobar que la asignación se realiza exclusivamente mediante planillas, documentos físicos, comunicaciones informales u otros mecanismos que no involucren un sistema de software específico.

### Supuesto 3 — Acceso restringido al sistema actual

* **Asumimos que** ningún personal, excepto los administrativos, tiene acceso al sistema de gestión de asignación de aulas actualmente utilizado.
* **Evidencia que lo confirmaría:** verificar mediante entrevistas y relevamiento de permisos del sistema que únicamente el personal administrativo posee credenciales y permisos para consultar o modificar la información de asignación.
* **Evidencia que lo refutaría:** comprobar que docentes, alumnos, personal de mantenimiento u otros sectores de la Universidad poseen acceso directo al sistema actual.

### Supuesto 4 — Relación entre el sistema de asignación e IntraConsulta

* **Asumimos que** sistemas como IntraConsulta reciben información proveniente del sistema actual de asignación de aulas, y no que el proceso funcione en sentido inverso. Esto explicaría por qué el personal administrativo puede conocer el aula correspondiente a una determinada materia sin que dicha información se encuentre necesariamente reflejada en IntraConsulta.
* **Evidencia que lo confirmaría:** relevar las integraciones y el flujo de información entre ambos sistemas, además de consultar al personal responsable de su utilización y administración.
* **Evidencia que lo refutaría:** comprobar que IntraConsulta es la fuente original de la información de asignación de aulas, que ambos sistemas funcionan de manera independiente o que la información se carga desde IntraConsulta hacia el sistema utilizado por los administrativos.

### Supuesto 5 — Registro de mantenimiento

* **Asumimos que** el personal de mantenimiento mantiene un registro activo de las tareas realizadas y de las necesidades relacionadas con la infraestructura de las aulas.
* **Evidencia que lo confirmaría:** solicitar ejemplos de registros de mantenimiento, planillas, sistemas o procedimientos utilizados actualmente para registrar incidentes, reparaciones y necesidades de infraestructura.
* **Evidencia que lo refutaría:** comprobar que no existe un registro sistemático de estas actividades y que las solicitudes de mantenimiento se gestionan únicamente mediante comunicaciones informales o de manera verbal.

---

## 7. Actualización del brief a partir del TP2

Esta sección contiene la revisión vigente del usuario primario y reemplaza, desde la versión 2, el perfil hipotético presentado en el TP1. El contenido anterior se conserva como antecedente para que sea posible rastrear qué cambió después del relevamiento. **En la versión 3 esta sección se mantiene sin modificaciones: sigue siendo válida en su totalidad.**

### 7.1 Perfil del usuario real

El relevamiento incluyó a tres personas vinculadas de manera concreta con el proceso de asignación y gestión de aulas:

* **U1 - Desarrollador de software del área de Sistemas:** conoce la infraestructura tecnológica y el proceso actual. Su participación en RooMeet se relaciona con la configuración de bajo nivel, el mantenimiento técnico y la disponibilidad del sistema.
* **U2 - Personal administrativo del DIIT:** planifica y monitorea la disponibilidad de aulas del departamento. Su trabajo se ve afectado por los cambios decididos por la Secretaría Académica, los solapamientos y los reclamos por capacidad.
* **U3 - Personal administrativo del DIIT:** participa en la planificación y el seguimiento de aulas y materias. Identificó como problemas centrales la asignación manual, la falta de información centralizada y la superpoblación de aulas.

El usuario primario se redefine como el **personal administrativo que interviene en la planificación, asignación, validación y monitoreo de aulas**, con la **Secretaría Académica** como actor central para aprobar o modificar asignaciones. El personal de cada departamento continúa siendo usuario directo para consultar, planificar y gestionar la disponibilidad, mientras que el área de Sistemas cumple un rol de soporte técnico.

### 7.2 Necesidades reales

* Centralizar la información de aulas y laboratorios, incluyendo capacidad, disponibilidad, horarios y materias asignadas.
* Disponer de un histórico de aulas utilizadas y cantidad de inscriptos para mejorar la planificación.
* Automatizar los análisis estadísticos utilizados para estimar cupos y reducir el trabajo manual.
* Generar propuestas automáticas de asignación que contemplen capacidad y ausencia de superposiciones.
* Monitorear la disponibilidad planificada y actual de las aulas por departamento.
* Comunicar con rapidez los cambios de aula a docentes y estudiantes.

### 7.3 Problemas y frustraciones concretas

* La carga de datos y el análisis para definir cupos se realizan manualmente, lo que produce errores, verificaciones cruzadas, mayor carga laboral y alto consumo de tiempo y recursos.
* Los cambios de aula decididos por la Secretaría Académica pueden alterar la planificación de los departamentos durante el cuatrimestre.
* Las materias semipresenciales pueden utilizar un aula fuera de la planificación y generar solapamientos con otras materias.
* Se producen situaciones de aulas superpobladas y reclamos asociados a asignaciones que no contemplan adecuadamente la cantidad de estudiantes.
* La información no está centralizada ni se presenta de forma visual para consultar disponibilidad, ocupación y capacidad de cada aula.

### 7.4 Contexto de uso

El personal administrativo utilizaría RooMeet durante la planificación del cuatrimestre y en el seguimiento cotidiano de las aulas. Necesita consultar el estado planificado y actual, resolver con agilidad solapamientos o cambios y coordinar la comunicación a docentes y estudiantes. La Secretaría Académica intervendría en la validación y modificación de asignaciones, y el área de Sistemas administraría la infraestructura, las configuraciones de bajo nivel y la disponibilidad técnica del producto.

El relevamiento no aportó evidencia suficiente sobre los dispositivos utilizados, las condiciones de conectividad ni si estas tareas se realizan siempre de manera individual o junto con otros actores. Estos aspectos quedan pendientes de validación y no se incorporan como hechos confirmados.

### 7.5 Confrontación de los supuestos del TP1

| Supuesto del TP1 | Estado | Evidencia e implicancia |
| --- | --- | --- |
| La responsabilidad de asignar aulas corresponde al personal administrativo de cada departamento. | **Refutado** | U2 indicó que el proceso es manual e intervienen coordinadores de carrera, el sistema SIU Guaraní y la Secretaría Académica. Al caer el supuesto crítico, RooMeet no puede diseñarse para un único rol departamental: debe contemplar responsabilidades y validaciones de varios actores. |
| El personal administrativo gestiona la relación entre aulas y materias mediante un sistema de software ya establecido. | **Refutado** | U1 señaló que la asignación y los análisis estadísticos se realizan de manera manual. SIU Guaraní se utiliza en el proceso, pero no automatiza la decisión de asignación descripta por los usuarios. |
| Solo el personal administrativo tiene acceso o intervención sobre el sistema de asignación de aulas. | **Refutado** | U1 explicó que, una vez iniciado el cuatrimestre, las modificaciones se solicitan a la Secretaría Académica, que revisa, valida y decide si cambia la asignación. |
| IntraConsulta recibe la información del sistema actual de asignación y el flujo no funciona en sentido inverso. | **Refutado** | U1 indicó que la información de IntraConsulta puede variar según se consuma desde Guaraní o requiera una migración. La relación unidireccional asumida en el TP1 no quedó sostenida. |
| El personal de mantenimiento conserva un registro activo de tareas y necesidades de infraestructura. | **Sin evidencia** | Las personas relevadas no contaban con información sobre este proceso. Debe validarse con personal de mantenimiento antes de incorporarlo al alcance como hecho. |

**Supuestos confirmados:** ninguno de los cinco supuestos del TP1 quedó confirmado por el relevamiento realizado.

### 7.6 Hallazgos no previstos y nuevos supuestos

El relevamiento mostró que el proceso involucra más actores de los previstos, que la decisión de asignación continúa siendo manual aun cuando se utiliza SIU Guaraní y que los cambios durante el cuatrimestre afectan la planificación departamental. También aparecieron como problemas específicos los solapamientos vinculados con materias semipresenciales, la superpoblación de aulas y la necesidad de notificar cambios.

A partir de estos hallazgos surgen nuevos supuestos que deberán validarse en las próximas etapas:

* La Universidad puede disponibilizar datos confiables de aulas, horarios, capacidades, inscriptos e historial de uso para alimentar el sistema.
* El personal administrativo y la Secretaría Académica aceptarían propuestas automáticas si conservan la posibilidad de revisarlas y modificarlas.
* Una notificación emitida desde RooMeet llegaría a docentes y estudiantes por un canal oportuno y utilizado por ellos.
* Es posible establecer una línea de base del tiempo que demanda el proceso manual para medir la reducción lograda por el producto.

### 7.7 Hipótesis de valor

**Creemos que** el personal administrativo de la Secretaría Académica de la UNLaM **tiene el problema de** asignar y consultar aulas mediante un proceso manual, tedioso y poco visual, dependiente de Guaraní, que dificulta conocer la disponibilidad, ocupación y capacidad real de cada aula.

**Nuestra solución es** un sistema que centraliza la información de aulas, laboratorios, horarios, capacidades e inscriptos, y genera propuestas automáticas de asignación para cada curso, con herramientas visuales para monitorear el estado planificado y actual.

**Sabremos que estamos en lo correcto cuando**, en una prueba piloto, el sistema genere asignaciones sin superposición de horarios ni excedentes de capacidad, al menos el 90 % de las propuestas sean aprobadas sin modificaciones por el personal administrativo y la Secretaría Académica, y el tiempo necesario para planificar las aulas se reduzca respecto del proceso manual actual.

---

## 8. Actualización del brief a partir del TP3: alcance del MVP

Esta sección se incorporó en la versión 3 para definir el alcance del MVP destinado a poner a prueba la hipótesis de valor de 7.7. La lista de incluidos y excluidos conserva esa decisión de scope; las tablas y el flujo siguientes reflejan el MVP construido en el TP5. Todo lo que no aparece como incluido **no forma parte del MVP**, aunque siga siendo parte de la visión de producto de las secciones 2 a 4.

### 8.1 Scope del MVP

**Incluido en el MVP**

| Incluido | Para qué parte de la hipótesis sirve |
| --- | --- |
| Dataset de prueba pequeño con aulas y capacidad, materias, cursos, horarios e historial de los cursos. No se pre-cargan asignaciones efectuadas: las aulas parten vacías como estado inicial. | Conjunto de datos de entrada para el proceso de asignación automática de aulas para cada materia. |
| Visualización de los datos cargados con el dataset (aulas, capacidad, materias, etc.). | Para clarificar el proceso de asignación: el usuario debe poder conocer los datos precargados para la prueba. |
| Aulas con cursos y horarios asignados, con una navegabilidad clara y ágil con filtros. | Para monitorear la disponibilidad y ocupación de las aulas. |
| Modificación de aulas asignadas. | Para que el usuario pueda probar modificar las disponibilidades de las aulas y se sienta cómodo con su uso. |

**Excluido del MVP**

| Excluido | Por qué se excluye |
| --- | --- |
| Set completo de aulas y capacidad, materias, cursos, horarios e historial de los cursos. | Para testear la hipótesis no es necesario hacer un proceso completo de punta a punta de la asignación de aulas. Es costoso y tendría el mismo efecto que probarlo con un set pequeño. |
| Parámetros configurables para la asignación. | Fuera del alcance de la hipótesis. Para la prueba se usará tal cual el proceso estadístico para estimar cupos y definir aulas. |
| Espacio de dataEntry para agregar aulas, materias, cursos, etc. | Fuera del alcance de la hipótesis. |
| Soporte para alumnos y docentes. | La hipótesis se probará con los usuarios primarios. |
| Conexión con el sistema SIU Guaraní. | No es necesaria para hacer pruebas. Se simulará con archivos. |

**Relación con las funcionalidades core de la versión 2.** De las cinco funcionalidades listadas en la sección 3, el MVP cubre parcialmente el **Motor de Asignación Inteligente de Aulas** (generación de una propuesta de aula por curso sobre un dataset reducido) y el **Panel de Estado Operativo de Aulas** (monitoreo de disponibilidad y ocupación con filtros). La **Gestión de Incidentes y Flujo de Trabajo**, el **Asignador de Aulas de Contingencia** y el **Módulo de Cumplimiento Normativo y Auditoría** no se incluyen en el alcance del MVP definido en el TP3; se conservan como parte de la visión de producto. La comunicación de cambios a docentes y estudiantes (necesidad 7.2) tampoco forma parte del alcance definido: queda pendiente de definir en etapas posteriores.

### 8.2 Qué se construye y qué se simula

| Elemento | Se construye | Se simula / se resuelve a mano | Por qué |
| --- | --- | --- | --- |
| Dataset de prueba pequeño | No | Se resuelve a mano | Hay 65 cursos de primer año y seis aulas ilustrativas. Materias, códigos y horas se basan en planes; horarios, cupos, historial y aulas son simulados. |
| Visualización de los datos cargados | Sí | El origen de los datos es estático y simulado | La interfaz muestra aulas, capacidades y cursos precargados para revisar la entrada de la prueba. |
| Motor de propuesta automática | Sí | No | Genera asignaciones sobre el dataset de demostración; no consulta datos institucionales. |
| Aulas con cursos y horarios asignados, con navegación y filtros | Sí | El plano del campus es ilustrativo | El monitoreo construido permite consultar ocupación y disponibilidad. |
| Modificación de aulas asignadas | Sí, en la sesión local | Se simula el guardado y el envío a Guaraní | Se puede cambiar y deshacer una asignación compatible; no se modifica ningún registro institucional. |

### 8.3 Flujo principal del MVP

1. Abre la aplicación y revisa los datos precargados de aulas y cursos.
2. Genera la propuesta de asignación completa del cuatrimestre vigente y la revisa.
3. Consulta la ocupación en el mapa ilustrativo, la agenda y el listado, con filtros de día y franja.
4. Si lo considera necesario, selecciona un curso, consulta las aulas compatibles, modifica su aula y puede deshacer el último cambio.
5. Finaliza la revisión. La pantalla final simula el guardado y el envío a SIU Guaraní, ofrece una valoración y permite reiniciar la prueba.

### 8.4 Atributos de usabilidad priorizados

* **Tasa de errores.** Es clave por la criticidad del proceso. Una asignación de aulas con errores perjudica a todos los actores involucrados y afecta directamente a la planificación del cuatrimestre. El proceso de asignación debe ser preciso y fiable.
* **Recuerdo en el tiempo.** Tiene relevancia porque el proceso de asignación de aulas se hace una sola vez por cuatrimestre: no es una tarea repetitiva y el usuario no debería tener que esforzarse por recordar cómo hacerla cada cuatro meses.

Los demás atributos quedan en segundo plano: la **facilidad de aprendizaje** no es esencial porque el personal que lo usa es especializado; la **eficiencia** resulta poco relevante porque es un proceso que se realiza una vez por cuatrimestre; y la **satisfacción** pasa a segundo plano por la falta de competencia, dado que hasta este momento el proceso es manual.

Esta priorización corresponde al TP3. El TP5 mide el tiempo y recoge una valoración para explorar eficiencia y satisfacción en el piloto; una sesión no permite revisar todavía la prioridad de esos atributos para el producto institucional.

### 8.5 Cuestiones del TP3 y estado actual

Las cuestiones que quedaron abiertas en la versión 3 se revisan a la luz de TP4, TP5 y TP6:

* El diseño de la interacción y las pantallas del MVP ya se concretó en el wireframe, TP4 y la aplicación construida.
* La comunicación de cambios a docentes y estudiantes sigue sin definirse dentro del MVP.
* Los aspectos del contexto de uso señalados en 7.4 (dispositivos, conectividad y trabajo individual o conjunto) siguen sin evidencia suficiente.
* La suficiencia del alcance para el personal administrativo sigue pendiente de una prueba más amplia. TP5 registra una respuesta favorable con una sugerencia de filtros, no la validación del segmento completo.

---

## 9. Arquitectura del sistema (TP6)

Esta sección se incorporó en la versión 5 a partir del TP6. Los diagramas de `docs/arquitectura/` y el informe de `docs/tp6/` representan la arquitectura del MVP en el momento de ese trabajo. La presente versión conserva su análisis de la gran visión y actualiza la descripción del MVP con la API de métricas agregada después.

### 9.1 Arquitectura real del MVP

El núcleo de asignación del MVP es una aplicación web React + TypeScript + Vite servida por Vercel. La propuesta, los cambios y el cierre se procesan en el navegador y la sesión se conserva en `localStorage`. No hay autenticación, datos institucionales ni conexión real con SIU Guaraní. A diferencia de la instantánea documentada en el TP6, el código actual incluye `mvp/api/evaluations.js`, una función de Vercel que guarda inicio, finalización, cantidad de cambios y valoración en Neon Postgres. Esa base almacena métricas anónimas del piloto, **no** asignaciones compartidas ni aprobaciones institucionales.

| Capa | Componentes | Estado según 8.2 |
| --- | --- | --- |
| Presentación y orquestación | `App.tsx` (orquestador), pantallas Datos, Propuesta, Monitoreo, Cambio y Finalización | Construido; la pantalla de Datos muestra datos estáticos |
| Estado de sesión | `reducer.ts` (fuente de verdad en memoria), `storage.ts` (copia en `localStorage`) | Construido |
| Dominio | `allocation.ts` (motor por búsqueda con retroceso), `validation.ts`, `metrics.ts`, `monitoring.ts` | Construido |
| Datos | `demoDataset.ts`: 65 materias de primer año del DIIT y 6 aulas, compiladas en el bundle | Hardcodeado: nombres, códigos y horas reales; horarios, cupos, historial y aulas simulados |
| Evaluación del piloto | `api/evaluations.js`, `evaluationApi.ts` y Neon Postgres | Construido después de la instantánea del TP6; guarda métricas anónimas, no la sesión de asignación |
| Externos | SIU Guaraní | Simulado: no hay adaptador; el dataset ocupa su lugar y la pantalla final simula el envío |

### 9.2 Decisiones heredadas

| Decisión | ¿Quién la tomó? | ¿La sostendríamos? | Dato que la sostiene o contradice |
| --- | --- | --- | --- |
| La sesión de asignación vive sólo en el navegador (memoria + `localStorage`); la API y Neon guardan únicamente métricas del piloto | La herramienta (`MVP-AGENTES.md` §8) definió la sesión local; la medición central se agregó después | Sí para el piloto; no para el producto institucional | TP2: Secretaría Académica y departamentos necesitan operar sobre el mismo dato. El único registro del TP5 informa uso del prototipo, pero no valida colaboración ni aprobación compartida |
| `App.tsx` concentra la orquestación y las pantallas importan el dataset directamente | Nadie, salió así | No: no hay una interfaz de datos donde conectar la fuente real | Ningún dato del TP2 ni del TP5: se tomó por comodidad |
| Publicar en Vercel, fuera de la infraestructura de la UNLaM | El equipo | Sí para el piloto con datos simulados; no para la visión | TP2: Sistemas proveerá infraestructura y mantenimiento. TP5 registra una prueba remota, pero no un aval para datos o sistemas institucionales |

### 9.3 Arquitectura de la gran visión

La visión agrega, dentro de la infraestructura de la UNLaM operada por Sistemas: una web de gestión con sesión por rol y un portal de consulta y reportes para docentes, alumnos y mantenimiento; una API con autenticación y roles, solicitudes de cambio aprobadas por la Secretaría Académica, notificaciones, estimación de cupos, motor y validador de reglas completo, panel de estado planificado y actual, gestión de incidentes, aulas de contingencia, cumplimiento y auditoría; una base de datos central; y un adaptador con SIU Guaraní que importa comisiones e inscriptos y devuelve el aula aprobada.

**Qué cubre el MVP:** el núcleo de cálculo para un solo usuario —la web de gestión, el motor, dos reglas del validador (capacidad y solapamiento) y el monitoreo planificado—, más una API separada para registrar métricas anónimas de las pruebas. No cubre las fronteras institucionales: Guaraní, identidad, otros actores ni asignaciones compartidas.

**Salto arquitectónico más grande:** pasar de una aplicación aislada en un navegador, con datos inventados y un usuario anónimo, a un sistema dentro de la UNLaM que lee y escribe sobre SIU Guaraní, la fuente oficial. De ese cambio se derivan el servidor y la base compartida, la identidad y los roles, y el flujo de aprobación que reemplaza al «deshacer» local.

### 9.4 Tecnologías que agregaría la visión

* **PostgreSQL** como base central: datos relacionales que varios roles leen y modifican, y la regla de no solapamiento reforzable en la propia base. Es el motor sobre el que funciona SIU-Guaraní, por lo que Sistemas ya lo opera (a confirmar con Sistemas).
* **Servicios de integración del SIU** (API de SIU-Guaraní y SIU-Araí para la identidad): Guaraní es la fuente oficial e IntraConsulta y MIeL consumen de él; conectarse por los canales del SIU es lo único que una política de acceso a datos puede aprobar. Mientras no haya aval, el adaptador acepta archivos exportados. Qué servicios están habilitados en la UNLaM debe confirmarse con Sistemas.
* **Servidor en Node.js con TypeScript**, elegido por familiaridad del equipo: el dominio del MVP ya está escrito en TypeScript como funciones puras. Debe acordarse con Sistemas si pueden mantener un servicio en Node.

### 9.5 Restricciones técnicas del contexto

* SIU Guaraní es la fuente oficial y legal de comisiones, inscriptos, cupos y aulas: «si una comisión no está en Guaraní, legalmente no existe» (U1). RooMeet propone; Guaraní registra.
* IntraConsulta y MIeL consumen de Guaraní, y la información de IntraConsulta puede desfasarse si requiere migraciones (U1).
* Sistemas de la UNLaM proveerá la infraestructura, administrará la configuración de bajo nivel y mantendrá la disponibilidad (TP2), por lo que la visión debe ejecutarse dentro de la infraestructura institucional y con tecnologías que Sistemas pueda operar.
* El acceso a datos y sistemas institucionales requiere un aval que no se obtuvo durante el TP5. El informe final del TP5 registra una prueba remota del prototipo con datos simulados por una persona relevada en el TP2; eso no equivale a acceso institucional ni autoriza una integración real.
* Una vez iniciado el cuatrimestre, las modificaciones sólo se hacen por solicitud a la Secretaría Académica (U1).
* El proceso real tiene casos que el MVP no modela: materias semipresenciales que comparten aula alternando días, aulas propias de cada departamento y cupos que cambian por reclamos (encuesta de U1).

### 9.6 Componente más riesgoso

El **adaptador con SIU Guaraní** sigue siendo la frontera más riesgosa según el TP6 final: no existe ni como interfaz (el dataset está compilado y lo leen directamente `App` y las pantallas), requiere permisos institucionales aún no obtenidos y un error de escritura alteraría la asignación oficial. La API de métricas agregada al MVP no reduce ese riesgo porque no consulta ni modifica Guaraní. Segundo candidato: el **motor de asignación**, que con el dataset del MVP funciona, pero cuando algún curso no entra en ningún aula puede devolver asignaciones inválidas, como mostró la prueba de saturación documentada en el TP6. La propuesta debe validarse antes de publicarse.

### 9.7 Pendientes que se suman a 8.5

* Completar la prueba del MVP con al menos tres usuarios reales del segmento y obtener el aval necesario para cualquier uso de datos o sistemas institucionales. El único registro actual no permite cerrar la hipótesis de valor.
* Confirmar con Sistemas qué servicios del SIU están habilitados, si es posible usar PostgreSQL y un servidor en Node.js, y dónde se alojaría el producto.
* Corregir el motor de asignación para el caso de cursos sin aula compatible y validar la propuesta antes de publicarla.
* Separar el acceso a datos detrás de una interfaz, para poder reemplazar el dataset por el adaptador de Guaraní sin modificar las pantallas.

---

## 10. Aprendizaje del TP5 y estado de la hipótesis

Esta sección incorpora al brief el resultado del informe final del TP5. La hipótesis de valor de 7.7 y el alcance de 8 siguen vigentes como planteo, pero su estado de validación cambia: ya existe un primer registro de uso del MVP y aún falta evidencia para concluir sobre el proceso institucional.

### 10.1 Métricas y primer resultado

El TP5 final propone como métricas accionables la **cantidad de cambios de aula** que hace quien revisa la propuesta y el **tiempo de la tarea terminada**, con un criterio de mediana inferior a cinco minutos. La valoración de 1 a 5 y el comentario libre son datos complementarios. La cantidad de visitas al enlace se identifica como métrica vanidosa porque puede aumentar aunque nadie complete la tarea. Estos criterios se documentaron después de construir el MVP, por lo que el brief no los presenta como definidos antes de la implementación.

El informe registra una sesión anónima del 6/11/2026 que terminó en **01:28**, con **cero cambios de aula** y una valoración de **5/5**. Según el equipo, participó una persona relevada en el TP2. Su comentario pide filtros de materias y de aulas en la primera pantalla, y valora favorablemente la distribución, el control y la ubicación de las aulas en el mapa. La captura de métricas muestra el resultado final, pero no permite observar dónde dudó, qué intentó hacer ni si hubiera aprobado la asignación para uso real.

### 10.2 Qué se aprendió y qué queda sin validar

**Usabilidad.** Una persona pudo finalizar el flujo y dejó una valoración alta. La cantidad de elementos de la primera pantalla apareció como fricción concreta en su comentario. No se puede inferir que el resto del recorrido haya estado libre de dificultades, porque la prueba fue asincrónica y el registro no contiene observación paso a paso.

**Hipótesis de valor.** Cero cambios en una sesión con datos simulados no confirma la condición de que al menos el 90 % de las propuestas sean aprobadas por el personal administrativo y la Secretaría Académica. El tiempo de 01:28 cumple el criterio de cinco minutos propuesto en el TP5, pero no demuestra una reducción frente al proceso manual porque no se midió una referencia comparable. Tampoco hubo una prueba de aceptación institucional con datos reales. Por lo tanto, la hipótesis de 7.7 **permanece sin validar en conjunto**. El resultado es favorable para continuar evaluando el MVP, no para declarar resuelto el problema.

### 10.3 Decisión y siguiente iteración

Se decide **perseverar provisionalmente con el MVP**, como plantea el TP5 final, para obtener más evidencia antes de cambiar la hipótesis o elegir un tipo de pivote. La siguiente mejora a evaluar son filtros de materias y aulas en la primera pantalla, por el pedido explícito de la persona que probó el producto. El TP5 también propone considerar características y tipos de aulas para materias con necesidades específicas. Eso queda como propuesta de una iteración posterior, no como funcionalidad ya validada ni incluida en el MVP actual. Para una decisión definitiva faltan al menos dos sesiones más de usuarios reales del segmento, la verificación de las asignaciones en un contexto representativo y una línea de base del tiempo manual.
