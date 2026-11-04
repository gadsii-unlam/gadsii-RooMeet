# Propuesta de rediseño del monitoreo

El prototipo navegable está en [TP3-wireframe-MVP.html](TP3-wireframe-MVP.html#monitoreo). La [versión anterior](TP3-wireframe-MVP-anterior.html#monitoreo) se conserva para comparar. Esta propuesta modifica únicamente los archivos del wireframe dentro de `docs/`.

## Listado de respaldo

Una fila por aula con capacidad, cantidad de cursos en el filtro y acción **Ver agenda**. Se elimina la enumeración de materias dentro de la tabla. La selección se refleja en el mapa y en el panel del aula. En móvil, cada fila se presenta como una tarjeta para mantener visible su acción.

## Panel del aula

Agenda ordenada por día y hora, con tres cursos por página. Cada entrada muestra horario, materia, código y carrera abreviada; estos últimos distinguen materias que tienen el mismo nombre en distintos planes. Al desplegar una entrada aparecen la carrera completa, el cupo y **Cambiar aula**. La búsqueda por materia, código o carrera afecta solo la agenda seleccionada.

## Contexto y navegación

Los filtros de cuatrimestre, día y franja se comparten entre mapa, listado y agenda. Se muestra el alcance del filtro y el número de resultados. Una búsqueda sin coincidencias no cambia la ocupación del aula. La disponibilidad en una franja concreta solo se indica cuando hay un día y una franja seleccionados; en una vista general se informa la cantidad de cursos.

Se usan 18 cursos ilustrativos para visualizar páginas, búsquedas y estados vacíos. El cambio local y deshacer funcionan dentro del wireframe para revisar la continuidad del recorrido; al recargar se restablece la muestra.

## Recorrido sugerido para evaluar

1. Ubicar un aula desde el listado sin usar el mapa y abrir su agenda.
2. Pasar de página y buscar una materia dentro del aula.
3. Filtrar por día y franja, comprobar cómo cambia la ocupación y restablecer los filtros.
4. Desplegar una materia compartida y distinguirla por carrera y código.

La decisión de trasladar este diseño al producto queda pendiente de revisión.
