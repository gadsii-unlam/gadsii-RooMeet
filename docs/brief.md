# Brief

**Cambios respecto de la versión 1.** A partir del relevamiento realizado con tres usuarios reales, esta versión reemplaza el perfil hipotético del usuario primario por un perfil basado en evidencia, incorpora sus necesidades, problemas y contexto de uso, confronta los cinco supuestos del TP1 y formula una hipótesis de valor medible. El cambio principal es que la asignación de aulas no depende únicamente del personal administrativo de cada departamento: intervienen varios actores y la Secretaría Académica tiene un rol central en la decisión y validación de cambios. Por este motivo, RooMeet debe contemplar un flujo con múltiples roles, centralización de información y apoyo a la planificación y el monitoreo.



## 1\. Segmento



El segmento de la comunidad UNLaM seleccionado por el equipo es **Administración**. El mismo está compuesto por personal de mantenimiento y administrativo de la Universidad.



Se estima que está compuesto por aproximadamente 100 personas. Esta cantidad queda pendiente de validación con el grupo. Lo que diferencia a este segmento es que cubre la organización y gestión del espacio físico de la Universidad desde el inicio de la jornada hasta el final, así como su apertura y cierre; además, responde a trámites administrativos a demanda de estudiantes y docentes. Sin su labor, el acceso y tránsito de personas en la Universidad sería un caos.



La elección de este segmento se relaciona con la necesidad de solucionar diversos inconvenientes que muchas veces tenemos los estudiantes al acceder a las aulas, ya sea que no haya suficiente espacio para ubicarse en ella (disponibilidad de bancos y dimensiones del aula), que cuente con elementos en mal estado (por ejemplo, cerradura o sillas rotas), que no haya luz o electricidad, etc.



### Usuarios reales para el relevamiento



* **Alumnos y docentes:** cualquier persona que esté cursando en la UNLaM y quiera utilizar la aplicación.
* **Auxiliar Administrativo:** puede ser la persona que atiende en Mesa de Entrada/Ventanilla dentro del piso del departamento nuevo de Ingeniería.
* **Técnico de Mantenimiento:** es quien se encarga de mantener en buen estado las aulas y todos los elementos que se encuentran en ellas (sillas, cerraduras, calefacción, pizarra, escritorios, etc.).



## 2\. Producto



El nombre del producto software a desarrollar es **RooMeet**.



Este desarrollo busca resolver la asignación correcta y eficiente de las aulas de la Universidad para todas las materias que se cursan presencialmente dentro del establecimiento; así como la generación de alertas de inconvenientes técnicos dentro de las mismas.



Se busca que los estudiantes de cada materia puedan asistir a las aulas en condiciones óptimas, respetando la cantidad de alumnos asignados al curso, así como los estándares de seguridad definidos por la UNLaM.

Se trata de una solución destinada a personal administrativo y de mantenimiento asignado a cada departamento de la Universidad, con el objetivo de colaborar en la resolución de incidentes y falta de disponibilidad en las aulas.



## 3\. Funcionalidades Core



* Motor de Asignación Inteligente de Aulas:  Dispone de un algoritmo que permite asignar aulas a una materia en base a disponibilidad y cumplimiento de condiciones necesarias para su funcionamiento.
* Panel de Estado Operativo de Aulas en Tiempo Real:  Permite visualizar en un paneo rápido qué aulas están habilitadas para su uso.
* Gestión de Incidentes y Flujo de Trabajo: Se conocen los inconvenientes técnicos generados en aulas, y en base a su ocurrencia, se establece un plan de contingencia.



* Asignador de Aulas de Contingencia: Dispone de un set de aulas específicas para utilizar en situaciones de emergencia, y las asigna según disponibilidad.



* Módulo de Cumplimiento Normativo y Auditoría: Evalúa si un aula cumple con las normativas principales de Higiene y Seguridad, así como los estándares definidos por la Universidad.

&#x20;

## 4\. Integraciones Previstas



* **SIU GUARANÍ:** integración para conocer qué materias se dictan y en qué horarios en la UNLaM.
* **IntraConsulta:** integración/revisión del mecanismo actual mediante el cual se gestiona o se censa la disponibilidad y el espacio de las aulas.



## 5\. Grupos de Usuarios y Usuario Primario Elegido

### Personal administrativo de cada departamento — Usuario primario



El personal administrativo de cada departamento es aquel que tiene acceso y usa el actual sistema de asignación de aulas. Cuando un docente (o alumno) no conoce el aula asignada, acude al departamento a consultar la misma. Esto genera mucha congestión de personas en las horas previas a empezar la cursada o rendir un final, concluyendo en mucha carga de trabajo para el personal.



Tener un sistema accesible para alumnos y docentes donde puedan verificar las aulas asignadas, minimizar el posible solapamiento de horarios en aulas y maximizar el uso de toda la facultad favorece enormemente a todas las partes.



Sin duda, el personal administrativo es nuestro grupo de usuarios primario, ya que son los que cargan la responsabilidad de la asignación y exposición de esta.



**Contactos identificados para el relevamiento:**



* **Matias Rosano (Sistemas UNLaM)**



&#x20;   -->Relación previa con integrantes del equipo: No aplica.

&#x20;   -->Disponibilidad para relevamiento: Viernes 28/8 de 9hs a 18hs.

&#x20;   -->Disponibilidad para pruebas de MVP: Viernes 25/9 de 9hs a 18hs.



* **Romina Stratta (Administrativa en DIIT)**



&#x20;   -->Relación previa con integrantes del equipo: No aplica.

&#x20;   -->Disponibilidad para relevamiento: Martes 1/9 de 14hs a 21hs.

&#x20;   -->Disponibilidad para pruebas de MVP: Martes 29/9 de 14hs a 21hs.

&#x20;



* **Leonardo Scaravaglione (Administrativa en DIIT)**



&#x20;   -->Relación previa con integrantes del equipo: No aplica.

&#x20;   -->Disponibilidad para relevamiento: Martes 1/9 de 14hs a 21hs.

&#x20;   -->Disponibilidad para pruebas de MVP: Martes 29/9 de 14hs a 21hs.

&#x20;



### Personal de mantenimiento



Estos son los encargados de mantener las instalaciones en buenas condiciones, incluyendo las aulas, y registrar las tareas de mantenimiento y necesidades de la infraestructura.



Dado que la aplicación propone un sistema de alertas y monitoreo sobre las necesidades de las aulas, se beneficiarían a la hora de planificar tareas, tener mejor visualización del estado de las aulas y comprender mejor qué priorizar.



### Alumnos y docentes



Pueden ver la numeración de las aulas, qué aula pertenece a qué departamento, qué clases se dictan en determinada aula a determinado horario, o si esta se encuentra libre. Además, pueden reportar problemas de mantenimiento en el aula si los hubiera.



## 6\. Supuestos



Este proyecto parte de muchos supuestos debido a la falta de información pública del actual proceso de gestión de asignación de aulas. Los supuestos van desde quién lleva cierta responsabilidad hasta los procedimientos actuales.



### Supuesto 1 — Responsable de la asignación de aulas **\[CRÍTICO]**



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



\----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 7. Actualización del brief a partir del TP2

Esta sección contiene la revisión vigente del usuario primario y reemplaza, para la versión 2, el perfil hipotético presentado en el TP1. El contenido anterior se conserva como antecedente para que sea posible rastrear qué cambió después del relevamiento.

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
