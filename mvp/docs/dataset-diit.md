# Datos de prueba: primer año del DIIT

El fixture vigente de RooMeet está en [`src/data/demoDataset.ts`](../src/data/demoDataset.ts). Reemplaza los cursos ficticios A–J por **65 materias de primer año** de las seis carreras de grado que enumera el [DIIT de la UNLaM](https://ingenieria.unlam.edu.ar/index.php?idArticulo=9&seccion=3).

| Carrera | Plan consultado | Materias de primer año |
| --- | --- | ---: |
| [Ingeniería Informática](https://ingenieria.unlam.edu.ar/index.php?idArticulo=565&seccion=3) | 2023 | 12 |
| [Ingeniería Electrónica](https://ingenieria.unlam.edu.ar/index.php?idArticulo=566&seccion=3) | 2023 | 12 |
| [Ingeniería Industrial](https://ingenieria.unlam.edu.ar/index.php?idArticulo=700&seccion=3) | 2024 | 12 |
| [Ingeniería Civil](https://ingenieria.unlam.edu.ar/index.php?idArticulo=702&seccion=3) | 2025 | 11 |
| [Ingeniería Mecánica](https://ingenieria.unlam.edu.ar/index.php?idArticulo=488&seccion=3) | 2015 | 8 |
| [Arquitectura](https://ingenieria.unlam.edu.ar/index.php?idArticulo=441&seccion=3) | 2015 | 10 |

Los **nombres, códigos y horas semanales** proceden de esos planes. Los códigos son propios de cada plan: por ejemplo, *Análisis Matemático I* aparece en varias carreras con códigos diferentes. El fixture mantiene un curso por materia y carrera y muestra cuándo el nombre está presente en varios planes. Esto **no afirma** que las comisiones, docentes o inscripciones reales se compartan entre carreras.

Los **horarios, cupos estimados, historial de inscriptos, aulas y posiciones del mapa** son simulados para ejercitar el algoritmo y la interfaz. Cada materia se representa con una sola reunión semanal continua de la duración indicada por sus horas semanales. No son comisiones ni disponibilidades oficiales. La ubicación de una materia dentro del plan de estudios se usa solamente como fuente académica: no determina el alcance temporal de la propuesta.

Los 65 cursos de la muestra forman una única propuesta correspondiente a la asignación completa de aulas del **cuatrimestre vigente**. La ocupación y los conflictos se comparan por día e intervalo horario, sin separar las materias según el cuatrimestre en que aparecen en su plan. La muestra completa suma 286 horas semanales; por eso el fixture usa cuatro aulas ilustrativas y horarios simulados de lunes a viernes. La versión del dataset cambió y la sesión local anterior se elimina al abrir la aplicación, para evitar mezclar estados incompatibles.
