# Brief



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



### Recopilación de respuestas-TP2



##### 1.Perfil de Usuario Real



A partir de la información recopilada, el perfil del usuario, en términos generales, es aquel que día a día se encarga de administrar las diferentes operaciones y trámites que pueden realizar docentes y estudiantes, dentro de su rutina universitaria.

En los tres usuarios entrevistados, detectamos lo siguiente:



###### Necesidades Reales



* No cuentan con un sistema de asignación automática de aulas para cada curso, todo el proceso es manual. Requieren un sistema que centralice toda la capacidad de infraestructura que tiene las instalaciones de la Unlam (aulas, laboratorios, disponibilidad), un histórico de aulas usada y cantidad de inscriptos, algoritmos estadísticos automáticos para la inferencia de cupos de cada materia, y que tenga la capacidad, en base a toda esta información mencionada, de asignar de forma automática las aulas a cada curso.



* Requieren de un sistema para gestionar las aulas con materias asignadas para administrar y monitorear las disponibilidades de las aulas para cada departamento.



* No cuentan con un sistema de asignación automática de aulas para cada curso, todo el proceso es manual. Requieren de un sistema para gestionar las aulas con materias asignadas para administrar y monitorear las disponibilidades de las aulas para cada departamento. 



###### Problemas



* Debido a la carga manual de datos, existen muchos errores humanos. Los análisis estadísticos para definir el cupo de cada materia también son manuales y conducen a errores. Trabajos manuales conducen a más carga laboral, verificaciones cruzadas entre otros compañeros, consumo alto de recursos. 



* Los cambios de aulas, hechos por la secretaria académica, perjudica la planificación del cuatrimestre a cada departamento. Tienen conflictos con materias semipresenciales que comparten aulas, ya que se planifica de antemano la disponibilidad del aula para cada materia, pero a veces los docentes salen de la planificación y requieren usar el aula, solapando dos materias en un mismo horario. Aulas superpobladas por reclamos.



* Aulas superpobladas y las asignaciones de aulas de forma manual sin un sistema que centralice la información.  



###### Contexto de Uso



* Proporcionarán la infraestructura y mantenimiento necesario para el sistema que proponemos. Administrarán configuraciones de bajo nivel y serán responsables de mantener la disponibilidad del sistema.



* Monitorean y planifican la disponibilidad de las aulas con el sistema propuesto, solucionando ágilmente los solapamientos y notificando activamente por la aplicación a docentes y alumnos los cambios de aula. 



##### 2\. Hipótesis de Valor



**Creemos que** El personal de administración de cada departamento **tiene el problema de** participar de un proceso tedioso y manual de volcar información al sistema Guaraní. Luego tener que depender de este sistema para consultar la relación curso-aula y no poder visualizar de una forma interactiva el estado actual de las disponibilidades, ocupaciones y capacidades de cada aula. 



**Nuestra solución es** un sistema que centralice toda la capacidad de infraestructura que tiene las instalaciones de la Unlam (aulas, laboratorios, disponibilidad), un histórico de aulas usada y cantidad de inscriptos, algoritmos estadísticos automáticos para la inferencia de cupos de cada materia, y que tenga la capacidad, en base a toda esta información mencionada, de asignar de forma automática las aulas a cada curso, brindando herramientas para monitoreo y visualización de los estados de cada aula en tiempo real y planificado. 



**Sabremos que estamos en lo correcto cuando** en base a toda la información requerida, el sistema haga una asignación de aulas correctas ajustando el valor estimado de cupo con las capacidades de cada aula, sin ningún solapamiento de horarios entre materias. Los que definen que la asignación fue correcta deben el personal administrativo de los departamentos y la secretaria académica. A su vez, el personal administrativo de los departamentos debe mostrar satisfacción a la hora de monitorear la disponibilidad de cada aula. 





##### 3\. Estado de los Supuestos



###### Supuestos confirmados



Muchos supuestos que definimos anteriormente se vieron refutados con la nueva información. No habíamos previsto la cantidad de actores que intervienen en el proceso de asignación de aulas, la complejidad de este, y falta de un sistema que agilice las tareas, teniendo que hacer todo el proceso manual. 



###### Supuestos rechazados



* "Asumimos que la responsabilidad de asignar las aulas corresponde al personal administrativo de cada departamento de la Universidad."



* "Asumimos que el personal administrativo mencionado gestiona activamente la relación entre las aulas y las materias mediante un sistema de software ya establecido."



* "Asumimos que ningún personal, excepto los administrativos, tiene acceso al sistema de gestión de asignación de aulas actualmente utilizado."



* "Asumimos que sistemas como IntraConsulta reciben información proveniente del sistema actual de asignación de aulas, y no que el proceso funcione en sentido inverso. Esto explicaría por qué el personal administrativo puede conocer el aula correspondiente a una determinada materia sin que dicha información se encuentre necesariamente reflejada en IntraConsulta."





###### Supuestos sin evidencia



* "Asumimos que el personal de mantenimiento mantiene un registro activo de las tareas realizadas y de las necesidades relacionadas con la infraestructura de las aulas."



















































