(() => {
  const { rooms, careers, courses: sourceCourses } = window.ROOMEET_WIREFRAME;
  const courses = sourceCourses.map(course => ({ ...course }));
  const days = ['Todos los días', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  const pageSize = 3;
  const state = { day: 0, slot: 'all', roomId: rooms[0].id, query: '', page: 0, editId: null, lastChange: null };
  const $ = id => document.getElementById(id);
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const time = minutes => `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
  const range = course => `${time(course.startMinutes)}–${time(course.endMinutes)}`;
  const career = course => careers.find(item => item.id === course.careerId)?.name || '';
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const byTime = (left, right) => left.day - right.day || left.startMinutes - right.startMinutes || left.subject.localeCompare(right.subject);
  const overlaps = (left, right) => left.day === right.day && left.startMinutes < right.endMinutes && right.startMinutes < left.endMinutes;

  function inFilter(course) {
    if (state.day && course.day !== state.day) return false;
    if (state.slot === 'all') return true;
    const [start, end] = state.slot.split('-').map(Number);
    return course.startMinutes < end && start < course.endMinutes;
  }

  function scope() {
    const slot = state.slot === 'all' ? 'día completo' : state.slot.split('-').map(Number).map(time).join('–');
    return `Cuatrimestre vigente · ${days[state.day]} · ${slot}`;
  }

  function roomCourses(id) {
    return courses.filter(course => course.roomId === id && inFilter(course)).sort(byTime);
  }

  function agendaCourses() {
    const query = normalize(state.query.trim());
    return roomCourses(state.roomId).filter(course => !query || normalize(`${course.subject} ${course.curriculumCode} ${career(course)}`).includes(query));
  }

  function renderAgenda() {
    const room = rooms.find(item => item.id === state.roomId);
    const all = roomCourses(room.id);
    const matches = agendaCourses();
    const pages = Math.max(1, Math.ceil(matches.length / pageSize));
    state.page = Math.min(state.page, pages - 1);
    const offset = state.page * pageSize;
    const visible = matches.slice(offset, offset + pageSize);
    $('room-title').textContent = room.name;
    $('room-capacity').textContent = `${room.capacity} lugares`;
    $('agenda-scope').textContent = scope();
    $('room-course-count').textContent = state.query.trim() ? `${matches.length} de ${all.length} cursos coinciden` : `${all.length} ${all.length === 1 ? 'curso' : 'cursos'} en el filtro`;
    $('agenda-range').textContent = matches.length ? `${offset + 1}–${offset + visible.length} de ${matches.length}` : '';
    $('room-agenda').innerHTML = visible.length ? visible.map(course => `<details class="agenda-course"><summary><span class="course-slot"><span>${days[course.day]}</span><strong>${range(course)}</strong></span><span class="course-title">${escape(course.subject)}<small>${escape(course.curriculumCode)} · ${escape(career(course).replace(/^Ingeniería /, ''))}</small></span></summary><div class="course-extra"><dl><dt>Código</dt><dd>${escape(course.curriculumCode)}</dd><dt>Carrera</dt><dd>${escape(career(course))}</dd><dt>Cupo</dt><dd>${course.estimatedSeats} de ${room.capacity} lugares</dd></dl><button type="button" data-edit="${escape(course.id)}">Cambiar aula <span class="sr">de ${escape(course.subject)}</span>→</button></div></details>`).join('') : `<p class="agenda-empty">${state.query.trim() ? 'No hay coincidencias en esta agenda. Probá con otra materia, código o carrera.' : 'No hay cursos asignados a esta aula para los filtros elegidos.'}</p>`;
    const pagination = document.querySelector('.agenda-pagination');
    pagination.hidden = matches.length <= pageSize;
    $('agenda-prev').disabled = state.page === 0;
    $('agenda-next').disabled = state.page === pages - 1;
    $('agenda-page').textContent = `${state.page + 1} de ${pages}`;
    $('room-agenda').querySelectorAll('[data-edit]').forEach(button => button.addEventListener('click', () => {
      state.editId = button.dataset.edit;
      renderChange();
      go('cambio');
    }));
  }

  function occupancy(items) {
    if (state.day && state.slot !== 'all') return items.length ? 'Ocupada en la franja' : 'Libre en la franja';
    return items.length ? `${items.length} ${items.length === 1 ? 'curso' : 'cursos'}` : 'Sin cursos';
  }

  function renderRooms() {
    $('filter-context').textContent = `${scope()} · ${courses.filter(inFilter).length} cursos en la muestra`;
    $('backup-count').textContent = `${rooms.length} aulas`;
    $('map-key-occupied').textContent = state.day && state.slot !== 'all' ? 'Ocupada en la franja' : 'Con cursos en el filtro';
    $('map-key-free').textContent = state.day && state.slot !== 'all' ? 'Libre en la franja' : 'Sin cursos en el filtro';
    $('backup-rows').innerHTML = rooms.map(room => {
      const items = roomCourses(room.id);
      const selected = state.roomId === room.id;
      return `<tr class="${selected ? 'selected-row' : ''}"><th scope="row">${room.name}${selected ? '<span class="selected-tag">Seleccionada</span>' : ''}</th><td>${room.capacity} lugares</td><td><span class="occupancy-label ${items.length ? '' : 'empty'}">${occupancy(items)}</span>${state.day && state.slot !== 'all' && items.length ? `<small>${items.length} ${items.length === 1 ? 'curso' : 'cursos'} en esta franja</small>` : ''}</td><td><button type="button" data-agenda="${room.id}">Ver agenda <span class="sr">de ${room.name}</span>↗</button></td></tr>`;
    }).join('');
    document.querySelectorAll('.map-marker').forEach(marker => {
      const id = `room-${marker.dataset.room}`;
      const room = rooms.find(item => item.id === id);
      const items = roomCourses(id);
      marker.classList.toggle('occupied', items.length > 0);
      marker.classList.toggle('selected', id === state.roomId);
      marker.setAttribute('aria-label', `Ver ${room.name}: ${occupancy(items)}`);
      marker.setAttribute('aria-pressed', String(id === state.roomId));
    });
    $('backup-rows').querySelectorAll('[data-agenda]').forEach(button => button.addEventListener('click', () => selectRoom(button.dataset.agenda, true)));
    renderAgenda();
  }

  function selectRoom(id, focus = false) {
    state.roomId = id;
    state.query = '';
    state.page = 0;
    $('agenda-search').value = '';
    renderRooms();
    if (focus) {
      $('room-title').scrollIntoView({ block: 'center', behavior: 'smooth' });
      $('room-title').focus({ preventScroll: true });
    }
  }

  function validateDestination(id) {
    const course = courses.find(item => item.id === state.editId);
    const room = rooms.find(item => item.id === id);
    if (!course || !room) return { valid: false, message: 'Seleccioná un aula para comprobar capacidad y horario.' };
    if (room.id === course.roomId) return { valid: false, message: 'Es el aula actual. Elegí otra aula.' };
    if (course.estimatedSeats > room.capacity) return { valid: false, message: `Capacidad insuficiente: el curso necesita ${course.estimatedSeats} lugares y ${room.name} tiene ${room.capacity}.` };
    const conflict = courses.find(item => item.id !== course.id && item.roomId === room.id && overlaps(item, course));
    if (conflict) return { valid: false, message: `Conflicto de horario con ${conflict.subject}, ${days[conflict.day]} ${range(conflict)}. No se puede confirmar.` };
    return { valid: true, message: `Capacidad suficiente (${course.estimatedSeats} de ${room.capacity} lugares) y sin conflicto de horario. Se puede confirmar el cambio local.` };
  }

  function renderChange() {
    const course = courses.find(item => item.id === state.editId);
    if (!course) return;
    const room = rooms.find(item => item.id === course.roomId);
    $('change-context').innerHTML = `<h3>${escape(course.subject)}</h3><p>${escape(career(course))} · Código ${escape(course.curriculumCode)}</p><p>${days[course.day]} ${range(course)}</p><p>Cupo ${course.estimatedSeats} · Aula actual: <strong>${room.name}</strong></p>`;
    $('aula').innerHTML = '<option value="">Seleccionar</option>' + rooms.filter(item => item.id !== course.roomId).map(item => `<option value="${item.id}">${item.name} · capacidad ${item.capacity}</option>`).join('');
    $('control').textContent = 'Seleccioná un aula para comprobar capacidad y horario.';
    $('confirmar').disabled = true;
  }

  function renderProposal() {
    $('planning-course-count').textContent = `${courses.length} cursos ilustrativos del cuatrimestre vigente.`;
    $('proposal-preview').innerHTML = courses.slice(0, 6).map(course => {
      const room = rooms.find(item => item.id === course.roomId);
      return `<tr><td>${escape(course.subject)}</td><td>${days[course.day]} ${range(course)}</td><td>${room.name}</td><td>${course.estimatedSeats} / ${room.capacity}</td></tr>`;
    }).join('');
  }

  function go(id) {
    if (!['datos', 'propuesta', 'monitoreo', 'cambio'].includes(id)) id = 'monitoreo';
    if (id === 'cambio' && !state.editId) {
      const course = agendaCourses()[0];
      if (!course) id = 'monitoreo';
      else { state.editId = course.id; renderChange(); }
    }
    document.querySelectorAll('.screen').forEach(section => section.classList.toggle('active', section.id === id));
    document.querySelectorAll('[data-go]').forEach(button => button.setAttribute('aria-current', button.dataset.go === id ? 'page' : 'false'));
    if (location.hash !== `#${id}`) history.replaceState(null, '', `#${id}`);
    window.scrollTo(0, 0);
  }

  document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => go(button.dataset.go)));
  document.querySelectorAll('.map-marker').forEach(button => button.addEventListener('click', () => selectRoom(`room-${button.dataset.room}`)));
  for (const [id, key] of [['mon-day', 'day'], ['mon-slot', 'slot']]) {
    $(id).addEventListener('change', event => {
      state[key] = key === 'slot' ? event.target.value : Number(event.target.value);
      state.page = 0;
      state.query = '';
      $('agenda-search').value = '';
      renderRooms();
    });
  }
  $('reset-filters').addEventListener('click', () => {
    Object.assign(state, { day: 0, slot: 'all', page: 0, query: '' });
    $('mon-day').value = '0'; $('mon-slot').value = 'all'; $('agenda-search').value = '';
    renderRooms();
  });
  $('agenda-search').addEventListener('input', event => { state.query = event.target.value; state.page = 0; renderAgenda(); });
  $('agenda-prev').addEventListener('click', () => { state.page -= 1; renderAgenda(); });
  $('agenda-next').addEventListener('click', () => { state.page += 1; renderAgenda(); });
  $('aula').addEventListener('change', event => {
    const result = validateDestination(event.target.value);
    $('control').textContent = result.message;
    $('confirmar').disabled = !result.valid;
  });
  $('confirmar').addEventListener('click', () => {
    const id = $('aula').value;
    if (!validateDestination(id).valid) return;
    const course = courses.find(item => item.id === state.editId);
    const previous = rooms.find(item => item.id === course.roomId);
    const destination = rooms.find(item => item.id === id);
    state.lastChange = { courseId: course.id, roomId: course.roomId };
    course.roomId = id;
    state.editId = null;
    selectRoom(id);
    renderProposal();
    $('change-feedback').hidden = false;
    $('change-feedback').innerHTML = `<span>${escape(course.subject)}: ${previous.name} → ${destination.name} · ${days[course.day]} ${range(course)}</span><button id="undo-change" type="button">Deshacer cambio</button>`;
    $('undo-change').addEventListener('click', () => {
      const change = state.lastChange;
      if (!change) return;
      courses.find(item => item.id === change.courseId).roomId = change.roomId;
      state.lastChange = null;
      selectRoom(change.roomId);
      renderProposal();
      $('change-feedback').textContent = `Se restauró ${previous.name} para ${course.subject}.`;
    });
    go('monitoreo');
  });
  window.addEventListener('hashchange', () => go(location.hash.slice(1)));
  renderProposal();
  renderRooms();
  go(location.hash.slice(1) || 'monitoreo');
})();
