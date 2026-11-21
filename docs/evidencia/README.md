# Evidencia

Esta carpeta guarda lo que entró al proyecto desde personas reales: el relevamiento del TP2 y la prueba del MVP del TP5. El resto del repositorio (brief, diseño, MVP, arquitectura) se apoya en esto. Si una decisión cita "U1", "TP2" o "TP5", la fuente está acá.

## TP2 — Relevamiento con usuarios

**Técnica:** encuesta con preguntas abiertas en Google Forms, enviada por WhatsApp y correo a los contactos que dio la cátedra. El análisis está en el [informe del TP2](../TP2%20GADS2.pdf), páginas 2 a 7.

| Archivo | Qué muestra |
| --- | --- |
| [`Encuesta de RooMeet GADS2 - Formularios de Google.pdf`](Encuesta%20de%20RooMeet%20GADS2%20-%20Formularios%20de%20Google.pdf) | Respuesta completa de **U1** (desarrollador de software, Sistemas), del 28/8/2026. Es la fuente de la mayoría de las citas del brief: Guaraní como fuente oficial, aulas propias de cada departamento, cupos dinámicos por reclamo y cambios por solicitud a la Secretaría Académica. |
| [`Chat.png`](Chat.png) | Conversación de WhatsApp con U1: envío del formulario y aclaraciones sobre cómo se modifica una asignación (solicitud a la SAC) y sobre Guaraní. |
| [`email.png`](email.png) | Envío de la encuesta por correo a una administrativa del DIIT (U2), el 1/9/2026. |

**No hay respaldo en el repositorio:** las respuestas de **U2 y U3** (administrativas del DIIT). Sus perfiles figuran resumidos en el informe del TP2 (página 3), pero las respuestas originales no se conservaron acá.

## TP5 — Prueba del MVP

| Archivo | Qué muestra |
| --- | --- |
| [`resultados_pruebas.png`](resultados_pruebas.png) | Captura de `/resumen-estadisticas` del MVP desplegado. Registra **una** sesión anónima, del 6/11/2026, completada en 01:28, con 0 cambios de aula y valoración 5/5. El comentario dice: *"Pondría un filtro de materias y otro de aulas en la primer pantalla ya que son muchísimas y a veces se quieren asignar aulas específicas por tema de algunas carreras, la distribución y control estaban bien realizados y me gusta la ubicación en el mapa."* |

**Límites de esta evidencia:**

- Es una sola sesión, asincrónica y sin observación paso a paso.
- Según el equipo, participó una persona relevada en el TP2, pero la captura no permite identificarla.
- No hay una medición del tiempo del proceso manual para comparar.

Por eso la hipótesis de valor queda **sin validar** (brief, sección 10.2). Los datos originales están en la base Neon del piloto y se pueden exportar a CSV desde `/resumen-estadisticas` con la clave de consulta.
