# Resumen para el parcial de GADSII

Este resumen sigue el temario indicado y utiliza únicamente los PDF de la carpeta `clases`. Las referencias entre corchetes remiten a la lista de fuentes al final; los números son las páginas del PDF, contando la portada.

## 1. Interacción Humano Computadora

La **Interacción Humano Computadora (IHC o HCI)** es un campo interdisciplinario dedicado al diseño, evaluación e implementación de sistemas informáticos interactivos para uso humano. Estudia cómo las personas se relacionan con esos sistemas y cómo lograr una interacción más eficaz, eficiente y satisfactoria. El diseño centrado en el usuario y la usabilidad son parte de este enfoque: el resultado se juzga en el contexto real de uso, no solo por la capacidad técnica del sistema. [P1, pp. 2–6]

Los materiales distinguen tres tipos de interacción: [P1, pp. 7–24]

| Tipo | En qué consiste | Ejemplos mencionados |
| --- | --- | --- |
| **Social** | Las personas se comunican, colaboran o comparten información entre sí mediante sistemas digitales. | Mensajería, correo, foros, redes sociales, videoconferencias y juegos en línea. |
| **Natural** | La persona interactúa de un modo semejante a sus acciones en el mundo físico o a la comunicación humana. Busca reducir la carga cognitiva y la fricción. | Toques y deslizamientos, voz y seguimiento de movimientos. |
| **Inmersiva** | La persona experimenta presencia y participación en un entorno digital envolvente. | Realidad virtual, aumentada y mixta; simulaciones y entrenamiento. |

La interacción inmersiva requiere atender desafíos propios de diseño, como orientar al usuario en entornos complejos y evitar fatiga o mareo. [P1, p. 24]

## 2. Usabilidad y sus atributos

La **usabilidad** es el grado en que usuarios específicos pueden lograr objetivos específicos con **efectividad, eficiencia y satisfacción** en un contexto de uso determinado. Depende de las personas, sus tareas y su entorno; no es una propiedad aislada del software. [P1, pp. 25–27; P2, pp. 2–4]

Para hacerla medible, las diapositivas descomponen la usabilidad en cinco atributos: [P1, pp. 28–34; P2, pp. 5–11]

| Atributo | Qué se observa o mide |
| --- | --- |
| **Facilidad de aprendizaje** | Tiempo que necesita una persona hasta poder realizar las tareas dentro de un tiempo definido. |
| **Eficiencia** | Cantidad de transacciones o tareas que puede realizar por unidad de tiempo. |
| **Recuerdo en el tiempo** | Capacidad de retomar el uso después de un período sin utilizar el sistema, especialmente para usuarios intermitentes. |
| **Tasa de errores** | Número de errores cometidos durante el uso; se busca que sea bajo. |
| **Satisfacción** | Valoración subjetiva del usuario, relevada mediante cuestionarios o pruebas de satisfacción. |

La ingeniería de usabilidad se integra durante el desarrollo y se centra en usuarios reales. La interfaz gráfica, la lógica y funcionalidad del sistema, y la interacción entre usuario y sistema contribuyen a la usabilidad. [P1, pp. 35–40; P2, pp. 12–17]

## 3. Análisis de usuarios: actividades y técnicas

El análisis comienza identificando **quiénes son los usuarios directos**, qué objetivos persiguen y qué tareas realizan. Se describen los grupos y sus características, el contexto de uso, las actividades, los dispositivos, la frecuencia de uso y los patrones de comportamiento. También se hacen explícitas las ideas preconcebidas sobre los usuarios para contrastarlas con lo relevado. [P2, pp. 19–24]

Las actividades de análisis de usuarios se vinculan con la comprensión del problema, el desarrollo del concepto del producto, la especificación del contexto de uso, la definición de requisitos y su validación. Las diapositivas agrupan las técnicas en dos momentos: [P2, pp. 20, 25–30]

1. **Especificar el contexto de uso.** La observación contextual estudia rutinas en el entorno real; el análisis de tareas descompone objetivos en tareas, pasos y decisiones; las entrevistas recogen experiencias y opiniones; las encuestas recopilan respuestas de un grupo; la observación no participante examina la actividad sin intervenir; y el grupo focal reúne a usuarios para debatir con un moderador. [P2, pp. 26–28]
2. **Especificar requisitos del usuario.** Se identifican perfiles de usuarios finales basados en datos reales; se elaboran **personas**, perfiles ficticios pero representativos construidos a partir de esos datos; y **escenarios**, relatos de uso vinculados al contexto y a las tareas. También se mencionan el análisis del sistema original y el de la competencia. [P2, pp. 26, 29–30]

El análisis de tareas aparece además entre los métodos de evaluación: observar y entrevistar permite identificar objetivos, ordenar tareas por importancia y frecuencia, descomponerlas en pasos y proponer formas más eficaces de realizarlas desde la perspectiva del usuario. [P4, pp. 23–24]

## 4. Proceso de Diseño Centrado en el Usuario

El **Diseño Centrado en el Usuario (DCU)** sitúa las necesidades, deseos y limitaciones de usuarios reales en el centro del diseño. Parte de conocer a esas personas y sus contextos, y utiliza lo aprendido para crear soluciones intuitivas, accesibles y útiles. Es un proceso cíclico: los resultados de la evaluación y del seguimiento alimentan nuevas decisiones de diseño. [P3, pp. 3–4; DCU, pp. 2–3]

| Etapa | Actividad principal |
| --- | --- |
| **Investigación y análisis** | Identificar usuarios directos, objetivos, tareas y necesidades. |
| **Diseño y prototipo** | Buscar soluciones factibles y organizar la información, los contenidos y la interfaz. |
| **Evaluación** | Probar con usuarios reales y detectar procesos que no funcionan o resultan difíciles de comprender. |
| **Implementación** | Publicar o poner en uso la solución aprobada; puede ser una primera versión funcional. |
| **Monitorización** | Seguir la usabilidad del producto, introducir mejoras y volver al diseño o al prototipo. |

[P3, pp. 5–12; DCU, pp. 3–4, 10–11]

La relación entre etapas es importante: el diseño responde a las características obtenidas en el análisis; la evaluación contrasta ese diseño con el uso; y la monitorización permite iniciar otra iteración. [P3, pp. 6–12, 14; DCU, pp. 15–16]

## 5. Diseño de la interacción

Las actividades de diseño de la interacción pueden desarrollarse en paralelo con otras actividades del diseño de software. Se distinguen tres componentes: [P3, pp. 8, 14–18; DCU, pp. 5–8]

| Componente | Pregunta que resuelve | Contenido de las clases |
| --- | --- | --- |
| **Diseño conceptual** | ¿Cómo se organiza la información y cómo se navega? | Define la arquitectura de información para el usuario, las secciones, sus relaciones y los caminos entre pantallas. Es el «esqueleto» de la aplicación. |
| **Diseño de contenidos** | ¿Cómo se presenta la información para leerla y utilizarla en pantalla? | Considera brevedad, lectura en diagonal, lenguaje estructurado, fragmentación, títulos de página y legibilidad. |
| **Diseño visual** | ¿Cómo se ve la interfaz? | Define libro de estilo o determinantes gráficos, documentación, retícula, gama cromática, tipografía y elementos principales y secundarios. |

En las clases, el diseño conceptual se vincula con la interacción y la experiencia de usuario (**UX**); el visual, con las interfaces (**UI**). Se mencionan prototipos de baja fidelidad, de alta fidelidad y pruebas piloto para avanzar y validar el diseño. [P3, p. 18; DCU, p. 8]

## 6. Principios del diseño de la interacción

Los diez principios de usabilidad de Nielsen sirven para revisar una interfaz o un prototipo. Las diapositivas los presentan así: [P3, pp. 19–29; DCU, pp. 13–14; P4, pp. 34–38]

1. **Visibilidad del estado del sistema:** informar qué ocurre y dar respuesta en un tiempo razonable.
2. **Correspondencia con el mundo real:** utilizar lenguaje familiar y un orden lógico para el usuario.
3. **Libertad y control del usuario:** permitir cancelar, salir, deshacer o rehacer acciones.
4. **Consistencia y estándares:** mantener coherentes términos, colores y elementos de la interfaz.
5. **Prevención de errores:** evitar que ocurran antes de depender de un mensaje posterior.
6. **Reconocimiento antes que recuerdo:** mostrar objetos, acciones, opciones e instrucciones para reducir lo que hay que memorizar.
7. **Flexibilidad y eficiencia de uso:** atender tanto a usuarios nuevos como experimentados; ofrecer aceleradores o atajos a estos últimos.
8. **Diseño estético y minimalista:** mostrar la información necesaria sin elementos irrelevantes que distraigan.
9. **Reconocer, diagnosticar y recuperarse de errores:** explicar el problema con claridad e indicar cómo resolverlo.
10. **Ayuda y documentación:** ofrecer ayuda fácil de encontrar, centrada en la tarea y breve.

Estos principios conectan **diseño y evaluación**: orientan las decisiones al construir la interfaz y luego funcionan como criterios de una evaluación heurística realizada por expertos. [P4, pp. 33–39]

## 7. Evaluación de la interacción

La **evaluación de usabilidad** recopila y analiza datos sobre la experiencia de usuarios actuales o potenciales al interactuar con bocetos, maquetas, prototipos, aplicaciones o componentes. Considera la facilidad de aprendizaje y uso, además de la satisfacción durante la interacción. Puede realizarse en distintas fases; hacerlo temprano ayuda a detectar y corregir problemas antes de etapas posteriores. [P4, pp. 9–12]

Las pruebas pueden ser **formativas**, durante el diseño para ajustar prototipos, o **sumativas**, al final del desarrollo para medir la usabilidad antes del lanzamiento. También pueden ser presenciales o remotas, moderadas o no moderadas. Las pruebas «de pasillo» buscan comentarios rápidos a bajo costo. [P4, pp. 15–16]

Para organizar una prueba, el material indica: definir objetivos, seleccionar usuarios representativos, diseñar tareas realistas, ejecutar la prueba —por ejemplo, con la técnica de pensar en voz alta—, analizar patrones de error e implementar mejoras. Se pueden registrar comentarios y frustraciones junto con medidas como el tiempo de tarea y la tasa de éxito. [P4, pp. 14, 17]

Los métodos se distinguen entre evaluaciones **con usuarios reales** y **sin usuarios reales**. La elección depende del presupuesto, el tipo de proyecto y el calendario. [P4, pp. 18–19]

| Método | Qué hace según las diapositivas |
| --- | --- |
| **Paseo cognitivo** | Evaluadores recorren tareas y pasos desde los objetivos del usuario para identificar dificultades al elegir acciones o comprender las respuestas del sistema. Es adecuado para usuarios con poca experiencia. |
| **Test con usuarios** | Se observa a usuarios mientras realizan tareas representativas; repetirlo con varias personas permite encontrar aspectos a mejorar. |
| **Análisis de tareas** | Estudia cómo se logran objetivos, prioriza tareas y las descompone para detectar formas más eficaces de realizarlas. |
| **Grupo focal** | Reúne opiniones y reacciones iniciales a un diseño; un moderador registra impresiones y posibles mejoras. |
| **Eye tracking** | Sigue movimientos oculares para conocer dónde mira el usuario y durante cuánto tiempo. |
| **Mouse tracking** | Registra movimientos, desplazamientos y clics; puede producir mapas de calor, desplazamiento y cliqueo. |
| **Inspección de usabilidad y evaluación heurística** | Expertos examinan la interfaz mediante guías o principios de usabilidad, identifican problemas y proponen alternativas. |

[P4, pp. 20–39]

El paseo cognitivo y la inspección heurística se describen como revisiones efectuadas por evaluadores o expertos; el test con usuarios observa a personas realizando tareas. Las diapositivas también distinguen evaluación por expertos, test con usuarios y seguimiento de sistemas ya instalados. [P3, p. 10; DCU, p. 10; P4, pp. 20–22, 33–39]

## 8. Proceso de Lean Startup

**Lean Startup** es un modo de gestionar la creación de productos y servicios bajo incertidumbre extrema. Sus cinco principios en la clase son: los emprendedores están en todas partes; el emprendimiento requiere una forma de management; el aprendizaje debe validarse con datos; se trabaja con el circuito **Crear–Medir–Aprender**; y el progreso se sigue mediante **contabilidad de la innovación**. [LS, pp. 3–4]

El circuito es iterativo: **crear** convierte ideas en hipótesis comprobables y construye lo mínimo necesario para obtener datos; **medir** observa a usuarios reales y utiliza métricas; **aprender** permite decidir si conviene perseverar o pivotar. Se busca reducir el tiempo del ciclo completo para aprender más rápido. Una hipótesis necesita evidencia empírica y un experimento diseñado para confirmarla o refutarla; la mera opinión positiva o el esfuerzo invertido no equivalen a aprendizaje validado. [LS, pp. 7–8]

La clase distingue dos «actos de fe»: la **hipótesis de valor** pregunta si el producto crea valor real al usarse; la **hipótesis de crecimiento** pregunta cómo llegarán nuevos usuarios y si ese crecimiento puede sostenerse. Para medir el avance, la contabilidad de la innovación propone establecer un punto de partida con datos reales, experimentar para mover las métricas hacia un objetivo y decidir si pivotar o perseverar. Las métricas accionables ayudan a tomar decisiones; las vanidosas pueden crecer sin demostrar valor. [LS, pp. 9, 18–21]

**Pivotar** significa cambiar de forma estructurada una hipótesis sobre producto, estrategia o crecimiento manteniendo la visión; **perseverar** significa seguir el rumbo cuando los experimentos y métricas lo respaldan. [LS, pp. 21–22]

## 9. Relación entre Lean Startup y DCU

Ambos procesos trabajan con usuarios y aprendizaje iterativo. El **DCU** comienza por comprender personas, tareas y contexto; diseña una solución; la evalúa con usuarios; la implementa y sigue su uso para mejorarla. **Lean Startup** formula hipótesis, construye un producto mínimo para probarlas, mide datos reales y decide qué hacer con lo aprendido. [DCU, pp. 2–4, 10–11, 15; LS, pp. 2, 7, 27]

Las diapositivas relacionan las etapas del DCU con los trabajos prácticos: investigación y análisis en TP1 y TP2; diseño y prototipo en TP3; evaluación en TP4; implementación y monitorización en TP5. La clase de Lean Startup añade una distinción al evaluar el MVP: la **capa de usabilidad** pregunta si el flujo funciona y con qué fricción; la **capa de valor** pregunta si la solución resuelve el problema prometido y cumple el criterio de éxito definido. [DCU, pp. 11, 15; LS, p. 27]

## 10. MVP e hipótesis de valor

El **Producto Mínimo Viable (MVP o PMV)** es la versión que permite empezar a aprender lo antes posible con el menor esfuerzo. Su alcance se determina por la hipótesis central que se quiere probar: debe contener lo necesario para obtener evidencia, sin esperar a completar toda la visión del producto. El material aclara que «mínimo» no significa baja calidad; significa la calidad necesaria para aprender. [MVP, pp. 2–5; LS, pp. 14–16]

Los ejemplos de tipos de MVP incluidos en las clases son: video para observar interés antes de construir, servicio de **conserje** realizado manualmente y conocido por el usuario, **Mago de Oz** con trabajo manual detrás de una aparente automatización, y producto de una sola funcionalidad central. El tipo elegido depende de qué hipótesis se quiere poner a prueba. [MVP, p. 6; LS, p. 17]

La **hipótesis de valor** expresa la suposición de que el producto resolverá un problema y creará valor real para quien lo use. La clase propone identificar el supuesto central, diseñar el experimento mínimo, definir **antes de lanzar** las métricas o resultados que lo confirmarían o refutarían, y después iterar según lo aprendido. Así, el MVP proporciona evidencia para la hipótesis, mientras que la medición y el aprendizaje orientan la siguiente versión o un pivote. [LS, pp. 9, 14–18; MVP, pp. 2, 5]

## Hilo integrador para repasar

**IHC** estudia la interacción entre personas y sistemas. La **usabilidad** permite describir y medir parte de su calidad en un contexto concreto. El **análisis de usuarios** aporta datos sobre personas, objetivos y tareas. Con esos datos, el **DCU** organiza un ciclo de diseño; el **diseño de la interacción** define estructura, contenidos y aspecto visual; y los **principios de usabilidad** orientan y permiten revisar esas decisiones. La **evaluación** observa el uso o inspecciona la interfaz para detectar problemas. **Lean Startup** utiliza la hipótesis de valor y el **MVP** para comprobar, con datos reales, si el producto genera el valor esperado y decidir cómo continuar. [P1, pp. 2–6, 25–34; P2, pp. 19–30; P3, pp. 3–18; P4, pp. 9–39; DCU, pp. 2–4, 15; LS, pp. 7–9, 27; MVP, pp. 2–6]

## Fuentes de la carpeta `clases`

- **P1:** [Topicos de IS - Gestión de Proyectos.pdf](<Topicos de IS - Gestión de Proyectos.pdf>).
- **P2:** [Topicos de IS - Gestión de Proyectos2.pdf](<Topicos de IS - Gestión de Proyectos2.pdf>).
- **P3:** [Topicos de IS - Gestión de Proyectos3.pdf](<Topicos de IS - Gestión de Proyectos3.pdf>).
- **P4:** [Topicos de IS - Gestión de Proyectos4.pdf](<Topicos de IS - Gestión de Proyectos4.pdf>).
- **DCU:** [Diseño Centrado en el Usuario — Clase · GADSII UNLaM.pdf](<Diseño Centrado en el Usuario — Clase · GADSII UNLaM.pdf>).
- **LS:** [Lean Startup — Clase 5 · GADSII UNLaM.pdf](<Lean Startup — Clase 5 · GADSII UNLaM.pdf>).
- **MVP:** [Creación de MVP — Clase · GADSII UNLaM.pdf](<Creación de MVP — Clase · GADSII UNLaM.pdf>).

Los archivos `250322.pdf`, `280215.pdf` y `251727.pdf` son listados de lecturas recomendadas. No contienen los capítulos o artículos completos, por lo que el resumen no atribuye contenido a esas lecturas.
