# Registro de trabajo con IA

| Fecha | Herramienta y versión | Prompt (resumen) | TP |
| --- | --- | --- | --- |
| 27/08/26 | OpenAI ChatGPT (Free) | Actualiza el brief que tenemos con la nueva información de la entrega formal que está en el archivo PDF. | 1 |
| 27/08/26 | OpenAI ChatGPT (Free) | Formatea mejor el README introductorio del grupo. | 0 |
| 25/10/26 | OpenAI Codex (GPT-5) | Analizar los requisitos, el wireframe y las correcciones propuestas para preparar la guía de implementación del MVP y su despliegue en Vercel. | 5 |
| 25/10/26 | OpenAI Codex (GPT-5) | Implementar como desarrollador senior el MVP de RooMeet a partir de la guía preparada. | 5 |
| 04/11/26 | Claude (Cowork, Opus 5.5) | Continuar el TP6 a partir de la consigna: diagrama de la gran visión, redacción de las decisiones heredadas con evidencia del repositorio, tecnologías de la visión, componente más riesgoso, brief v5 y PDF de entrega. | 6 |


## Analisis del wireframe del equipo TicTac

Actuá como un especialista en UX/UI y evaluación de usabilidad. Tu tarea es analizar el wireframe adjunto tomando como referencia el brief.md de la aplicación, y evaluar su cumplimiento de las **10 heurísticas de usabilidad de Jakob Nielsen**.

El objetivo es identificar problemas de usabilidad presentes en el diseño, determinar su severidad y proponer mejoras concretas que puedan implementarse en el wireframe.

### Instrucciones para el análisis

1. Analizá las 10 heurísticas de Nielsen, sin omitir ninguna:

   * Visibilidad del estado del sistema.
   * Correspondencia entre el sistema y el mundo real.
   * Control y libertad del usuario.
   * Consistencia y estándares.
   * Prevención de errores.
   * Reconocimiento antes que recuerdo.
   * Flexibilidad y eficiencia de uso.
   * Diseño estético y minimalista.
   * Ayudar a los usuarios a reconocer, diagnosticar y recuperarse de errores.
   * Ayuda y documentación.

2. Utilizá el brief.md como fuente de contexto para comprender el propósito de la aplicación, sus usuarios objetivo, funcionalidades y alcance. No evalúes funcionalidades que no formen parte del alcance definido, salvo que su ausencia represente un problema de usabilidad relevante.

3. Evaluá exclusivamente los problemas que puedan justificarse a partir de los elementos visibles o de los flujos representados en el wireframe. No inventes funcionalidades, comportamientos ni problemas que no estén respaldados por el material proporcionado.

4. Una misma deficiencia puede relacionarse con más de una heurística, pero evitá duplicar observaciones innecesariamente. Identificá la heurística que mejor represente cada problema.

5. No fuerces el hallazgo de incumplimientos. Si una heurística se cumple o no hay evidencia suficiente para determinarlo, indicá que no se identificaron problemas relevantes en lugar de inventar observaciones.

### Criterios de severidad

Asigná a cada problema un valor del 1 al 4, siguiendo esta escala:

* **1 — Cosmético:** Problema menor que no afecta significativamente la experiencia. Su corrección puede postergarse si no hay tiempo disponible.
* **2 — Menor:** Problema que genera cierta dificultad o incomodidad, pero que no impide completar las tareas principales.
* **3 — Grave:** Problema que dificulta considerablemente la interacción o puede provocar errores frecuentes. Debería corregirse con prioridad.
* **4 — Severo:** Problema crítico que impide completar tareas importantes, genera errores graves o compromete significativamente el uso de la aplicación. Requiere atención inmediata.

La severidad debe justificarse considerando el impacto sobre los usuarios y las tareas contempladas en el brief, no únicamente la presencia o ausencia de un elemento visual.

### Formato de respuesta

Presentá los resultados en una tabla con las siguientes columnas:

| Heurística incumplida | Descripción del problema | Severidad (1-4) | Mejora sugerida |
| --------------------- | ------------------------ | --------------- | --------------- |

Para cada observación:

* Indicá el nombre y número de la heurística correspondiente.
* Describí el problema de manera clara, concreta y objetiva.
* Explicá brevemente por qué afecta la usabilidad.
* Asigná una severidad acorde con los criterios establecidos.
* Proponé una mejora específica y viable, preferentemente aplicable al wireframe actual.

Al finalizar, incluí una breve conclusión que resuma los principales aspectos de usabilidad detectados, sin agregar problemas nuevos que no hayan sido desarrollados en la tabla.

Debe quedar en claro que evalues el wireframe y no la aplicación hipotética en su totalidad.
Como bien dije, adjunto el wireframe html y el brief.md en este mensaje.

## Preparación de la guía para implementar el MVP

### Prompt

> tenemos que armar el mvp del producto, lee todos los requisitos y el wirefriem diseñado que debemos respetar, agregando los cambios propuestos en este documento
>
> recorda que el mvp debe tener solo lo minimo e indispensable para probar la hipotesis central del prodcuto
>
> prepara un md con todo lo necesario para los agentes, para desarrollar este producto y dejarlo listo para correr en vercel

### Respuesta

Se preparó la guía [MVP-AGENTES.md](../mvp/MVP-AGENTES.md), utilizando como fuentes el brief vigente, el informe y la consigna del TP2, la evidencia de usuarios, la decisión de diseño, el wireframe navegable y el documento con las correcciones propuestas.

La respuesta delimitó el objetivo del experimento y separó el MVP de la visión completa del producto. Especificó:

- La hipótesis central y la evidencia que debía producir el piloto.
- El alcance incluido y excluido, evitando agregar funcionalidades que no contribuyeran a validar la hipótesis.
- El recorrido de cuatro pantallas definido por el wireframe.
- La incorporación de las mejoras aceptadas sobre feedback, horarios completos, posibilidad de deshacer y correspondencia correcta entre el curso seleccionado y la modificación.
- El modelo de datos, las reglas de capacidad y superposición horaria, el algoritmo de asignación y las transiciones de estado.
- La persistencia local, la exportación de evidencia y las métricas del piloto.
- Los criterios de accesibilidad, las pruebas unitarias y de recorrido, y la definición de terminado.
- Una propuesta técnica con React, TypeScript y Vite, junto con los archivos y comandos necesarios para ejecutar y desplegar el producto en Vercel.

La guía también aclaró qué datos y comportamientos eran simulados, que no existía conexión real con SIU Guaraní y que una verificación técnica no equivalía a validar la hipótesis con usuarios reales.

## Desarrollo del MVP a partir de la guía

### Prompt

> genial, ahora actua como desarrollador senior y arma el producto mvp en base al md que armaste

### Respuesta

Se implementó una aplicación web funcional de RooMeet basada en la guía anterior, preparada para ejecutarse localmente y desplegarse en Vercel. La entrega incluyó:

- Una aplicación React con TypeScript y Vite organizada en las cuatro pantallas del wireframe: revisión de datos, propuesta, monitoreo y modificación de aula.
- Un motor local y determinista que calcula asignaciones en lugar de mostrar una tabla precargada.
- Validaciones de capacidad, cursos duplicados y superposición de horarios.
- Un mapa ilustrativo y un listado alternativo para consultar la ocupación de las aulas.
- La modificación de una asignación concreta, validación previa, confirmación visible y opción para deshacer el último cambio.
- Persistencia de la sesión en `localStorage` y exportación de la evidencia en formato JSON.
- Manejo de estados vacíos, errores y recuperación de sesión sin utilizar servicios externos.
- Pruebas unitarias y de recorrido, configuración de ESLint y Playwright, documentación de ejecución y archivos de despliegue para Vercel.

La respuesta entregó además el [README del MVP](../mvp/README.md) con los requisitos, comandos de desarrollo, verificación y despliegue. El producto quedó limitado al experimento de asignación y revisión de aulas; no se implementaron autenticación, backend, base de datos, colaboración, notificaciones ni integración real con Guaraní.

## TP6: arquitectura del sistema (consignas 2 a 7)

### Prompt

> Necesito continuar un trabajo práctico, la consigna 1 ya está hecha. [Se adjuntó la consigna completa del TP6.]

Aclaraciones dadas durante la sesión: la prueba con usuarios reales del TP5 está pendiente; la dificultad fue que no se consiguió el aval de las autoridades administrativas de la facultad y el usuario real no tiene ni va a tener acceso al software por la burocracia de la Universidad.

### Respuesta

Claude (Cowork, Opus 5.5) trabajó sobre el repositorio y produjo:

- El diagrama de la arquitectura de la gran visión con el alcance del MVP marcado (`docs/arquitectura/arquitectura-vision.html`).
- El informe del TP6 en PDF (`docs/tp6/TP6-RooMeet.pdf`), que integra los diagramas del punto 1 y la redacción de los puntos 2 a 7.
- La versión 5 del brief (`docs/brief.md`), con el párrafo de cambios y la nueva sección 9.
- Una exploración de tecnologías para la visión (PostgreSQL, servicios de integración del SIU, servidor en Node.js con TypeScript). La búsqueda web no estaba disponible en la sesión, por lo que las afirmaciones sobre el SIU quedan marcadas como «a confirmar con Sistemas».
- Una medición del motor de asignación con datasets más grandes y con franjas saturadas, que mostró que el motor devuelve asignaciones duplicadas cuando algún curso no entra en ningún aula.

Para la consigna 2, la IA reunió evidencia del historial (commits de `mvp/`, `MVP-AGENTES.md` y este registro) y propuso una clasificación; la decisión final sobre quién tomó cada decisión corresponde al equipo y no se delega.
