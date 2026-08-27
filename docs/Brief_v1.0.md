# Brief-v1.0

## 1. Segmento

El segmento de la comunidad UNLaM seleccionado por el equipo es **Administración**. El mismo está compuesto por personal de mantenimiento y administrativo de la Universidad.

Se estima que está compuesto por aproximadamente 100 personas. Esta cantidad queda pendiente de validación con el grupo. Lo que diferencia a este segmento es que cubre la organización y gestión del espacio físico de la Universidad desde el inicio de la jornada hasta el final, así como su apertura y cierre; además, responde a trámites administrativos a demanda de estudiantes y docentes. Sin su labor, el acceso y tránsito de personas en la Universidad sería un caos.

La elección de este segmento se relaciona con la necesidad de solucionar diversos inconvenientes que muchas veces tenemos los estudiantes al acceder a las aulas, ya sea que no haya suficiente espacio para ubicarse en ella (disponibilidad de bancos y dimensiones del aula), que cuente con elementos en mal estado (por ejemplo, cerradura o sillas rotas), que no haya luz o electricidad, etc.

### Usuarios reales para el relevamiento

- **Alumnos y docentes:** cualquier persona que esté cursando en la UNLaM y quiera utilizar la aplicación.
- **Auxiliar Administrativo:** puede ser la persona que atiende en Mesa de Entrada/Ventanilla dentro del piso del departamento nuevo de Ingeniería.
- **Técnico de Mantenimiento:** es quien se encarga de mantener en buen estado las aulas y todos los elementos que se encuentran en ellas (sillas, cerraduras, calefacción, pizarra, escritorios, etc.).

## 2. Producto

El nombre del producto software a desarrollar es **RooMeet**.

Este desarrollo busca resolver la asignación correcta y eficiente de las aulas de la Universidad para todas las materias que se cursan presencialmente dentro del establecimiento; así como la generación de alertas de inconvenientes técnicos dentro de las mismas.

Se busca que los estudiantes de cada materia puedan asistir a las aulas en condiciones óptimas, respetando la cantidad de alumnos asignados al curso, así como los estándares de seguridad definidos por la UNLaM.

Se trata de una solución destinada a personal administrativo y de mantenimiento asignado a cada departamento de la Universidad, con el objetivo de colaborar en la resolución de incidentes y falta de disponibilidad en las aulas.

## 3. Funcionalidades Core

- Motor de Asignación Inteligente de Aulas.
- Panel de Estado Operativo de Aulas en Tiempo Real.
- Gestión de Incidentes y Flujo de Trabajo.
- Asignador de Aulas de Contingencia.
- Módulo de Cumplimiento Normativo y Auditoría.

## 4. Integraciones Previstas

- **SIU GUARANÍ:** integración para conocer qué materias se dictan y en qué horarios en la UNLaM.
- **IntraConsulta:** integración/revisión del mecanismo actual mediante el cual se gestiona o se censa la disponibilidad y el espacio de las aulas.

## 5. Grupos de Usuarios y Usuario Primario Elegido

### Personal administrativo de cada departamento — Usuario primario

El personal administrativo de cada departamento es aquel que tiene acceso y usa el actual sistema de asignación de aulas. Cuando un docente (o alumno) no conoce el aula asignada, acude al departamento a consultar la misma. Esto genera mucha congestión de personas en las horas previas a empezar la cursada o rendir un final, concluyendo en mucha carga de trabajo para el personal.

Tener un sistema accesible para alumnos y docentes donde puedan verificar las aulas asignadas, minimizar el posible solapamiento de horarios en aulas y maximizar el uso de toda la facultad favorece enormemente a todas las partes.

Sin duda, el personal administrativo es nuestro grupo de usuarios primario, ya que son los que cargan la responsabilidad de la asignación y exposición de esta.

**Contactos identificados para el relevamiento:**

- **Matias Rosano (Sistemas UNLaM)**
  - Referido por: Juan Manuel Ojeda (Profesor de la materia)
  - Disponibilidad: desconocida
- **Romina Stratta (Administrativa en DIIT)**
  - Referida por: Juan Manuel Ojeda (Profesor de la materia)
  - Disponibilidad: lunes a jueves de 14 a 21.

### Personal de mantenimiento

Estos son los encargados de mantener las instalaciones en buenas condiciones, incluyendo las aulas, y registrar las tareas de mantenimiento y necesidades de la infraestructura.

Dado que la aplicación propone un sistema de alertas y monitoreo sobre las necesidades de las aulas, se beneficiarían a la hora de planificar tareas, tener mejor visualización del estado de las aulas y comprender mejor qué priorizar.

### Alumnos y docentes

Pueden ver la numeración de las aulas, qué aula pertenece a qué departamento, qué clases se dictan en determinada aula a determinado horario, o si esta se encuentra libre. Además, pueden reportar problemas de mantenimiento en el aula si los hubiera.

## 6. Supuestos

Este proyecto parte de muchos supuestos debido a la falta de información pública del actual proceso de gestión de asignación de aulas. Los supuestos van desde quién lleva cierta responsabilidad hasta los procedimientos actuales.

### Supuesto 1 — Responsable de la asignación de aulas **[CRÍTICO]**

- **Asumimos que** la responsabilidad de asignar las aulas corresponde al personal administrativo de cada departamento de la Universidad.
- **Evidencia que lo confirmaría:** entrevistas con personal administrativo de los distintos departamentos que indiquen que son ellos quienes reciben, gestionan y realizan la asignación de aulas. También podría confirmarse mediante la observación del proceso actual de asignación.
- **Evidencia que lo refutaría:** identificar que la asignación de aulas es realizada por otro sector, área o sistema centralizado de la Universidad, sin intervención directa del personal administrativo de cada departamento.
- **Impacto:** este es el supuesto crítico del proyecto, ya que define quién sería el principal usuario responsable de la gestión de las aulas y, por lo tanto, condiciona el diseño de los permisos, funcionalidades y flujo de trabajo de RooMeet.

### Supuesto 2 — Existencia de un sistema actual de gestión

- **Asumimos que** el personal administrativo mencionado gestiona activamente la relación entre las aulas y las materias mediante un sistema de software ya establecido.
- **Evidencia que lo confirmaría:** entrevistas con el personal administrativo y demostraciones del sistema actualmente utilizado para consultar, registrar o modificar la asignación de aulas.
- **Evidencia que lo refutaría:** comprobar que la asignación se realiza exclusivamente mediante planillas, documentos físicos, comunicaciones informales u otros mecanismos que no involucren un sistema de software específico.

### Supuesto 3 — Acceso restringido al sistema actual

- **Asumimos que** ningún personal, excepto los administrativos, tiene acceso al sistema de gestión de asignación de aulas actualmente utilizado.
- **Evidencia que lo confirmaría:** verificar mediante entrevistas y relevamiento de permisos del sistema que únicamente el personal administrativo posee credenciales y permisos para consultar o modificar la información de asignación.
- **Evidencia que lo refutaría:** comprobar que docentes, alumnos, personal de mantenimiento u otros sectores de la Universidad poseen acceso directo al sistema actual.

### Supuesto 4 — Relación entre el sistema de asignación e IntraConsulta

- **Asumimos que** sistemas como IntraConsulta reciben información proveniente del sistema actual de asignación de aulas, y no que el proceso funcione en sentido inverso. Esto explicaría por qué el personal administrativo puede conocer el aula correspondiente a una determinada materia sin que dicha información se encuentre necesariamente reflejada en IntraConsulta.
- **Evidencia que lo confirmaría:** relevar las integraciones y el flujo de información entre ambos sistemas, además de consultar al personal responsable de su utilización y administración.
- **Evidencia que lo refutaría:** comprobar que IntraConsulta es la fuente original de la información de asignación de aulas, que ambos sistemas funcionan de manera independiente o que la información se carga desde IntraConsulta hacia el sistema utilizado por los administrativos.

### Supuesto 5 — Registro de mantenimiento

- **Asumimos que** el personal de mantenimiento mantiene un registro activo de las tareas realizadas y de las necesidades relacionadas con la infraestructura de las aulas.
- **Evidencia que lo confirmaría:** solicitar ejemplos de registros de mantenimiento, planillas, sistemas o procedimientos utilizados actualmente para registrar incidentes, reparaciones y necesidades de infraestructura.
- **Evidencia que lo refutaría:** comprobar que no existe un registro sistemático de estas actividades y que las solicitudes de mantenimiento se gestionan únicamente mediante comunicaciones informales o de manera verbal.
