const scoreDisplay = document.querySelector('[data-score]');
const gameStatus = {
  footprint: false,
  activities: false,
  reputation: false,
  auth: false,
  password: false,
  phishing: false,
  risks: false,
  matching: false,
};

function updateScoreboard() {
  const total = Object.keys(gameStatus).length;
  const completed = Object.values(gameStatus).filter(Boolean).length;
  scoreDisplay.textContent = `${completed} / ${total}`;
}

function setFeedback(el, message, positive = false) {
  el.textContent = message;
  el.style.color = positive ? 'var(--success)' : 'var(--muted)';
}

function markGameComplete(id, isPerfect) {
  if (isPerfect && !gameStatus[id]) {
    gameStatus[id] = true;
    updateScoreboard();
  }
}

updateScoreboard();

// ----------------- Misión 1 -----------------
const footprintData = [
  {
    text: 'Compartir en redes una foto etiquetando tu instituto y ubicación en tiempo real.',
    answer: 'activa',
    note: 'Es huella activa porque tú decides publicarla y añade metadatos visibles para terceros.',
  },
  {
    text: 'Aceptar todas las cookies publicitarias sin revisar su finalidad.',
    answer: 'pasiva',
    note: 'Cookies y rastreadores recopilan datos en segundo plano, creando huella pasiva.',
  },
  {
    text: 'Permitir que una app acceda a tu lista de contactos solo para probar un filtro.',
    answer: 'activa',
    note: 'Cedes permisos voluntariamente, así que generas rastro consciente.',
  },
  {
    text: 'Buscar “becas de ciberseguridad 2024” en tu navegador.',
    answer: 'pasiva',
    note: 'Los motores de búsqueda guardan consultas y perfilan intereses sin publicar nada visible.',
  },
  {
    text: 'Sincronizar tu smart watch para que registre pulsaciones y sueño.',
    answer: 'pasiva',
    note: 'Los sensores crean datos biométricos automáticos que forman parte de la huella pasiva.',
  },
  {
    text: 'Responder una cadena de correos reenviando direcciones de otras personas.',
    answer: 'activa',
    note: 'Al reenviar manualmente información ajena añades huella activa y posible riesgo.',
  },
];

const footprintContainer = document.getElementById('footprint-items');
footprintData.forEach((item, idx) => {
  const card = document.createElement('article');
  card.className = 'mini-card';
  card.dataset.index = idx;
  card.innerHTML = `
    <p>${item.text}</p>
    <div class="options">
      <label><input type="radio" name="footprint-${idx}" value="activa"> Activa</label>
      <label><input type="radio" name="footprint-${idx}" value="pasiva"> Pasiva</label>
    </div>
    <p class="hint"></p>
  `;
  footprintContainer.appendChild(card);
});

document.getElementById('check-footprint').addEventListener('click', () => {
  let correct = 0;
  footprintContainer.querySelectorAll('.mini-card').forEach((card) => {
    const idx = Number(card.dataset.index);
    const selected = card.querySelector('input:checked');
    const hint = card.querySelector('.hint');
    if (!selected) {
      card.classList.remove('correct', 'incorrect');
      hint.textContent = 'Selecciona una opción para esta acción.';
      return;
    }
    if (selected.value === footprintData[idx].answer) {
      correct += 1;
      card.classList.add('correct');
      card.classList.remove('incorrect');
      hint.textContent = footprintData[idx].note;
    } else {
      card.classList.add('incorrect');
      card.classList.remove('correct');
      hint.textContent = 'Revisa los apuntes: ¿quién generó el dato y con qué intención?';
    }
  });
  const success = correct === footprintData.length;
  setFeedback(
    document.getElementById('footprint-feedback'),
    success
      ? '¡Perfecto! Has diferenciado cada tipo de rastro digital.'
      : 'Sigue investigando qué datos decides publicar y cuáles se recogen en silencio.',
    success
  );
  markGameComplete('footprint', success);
});

// ----------------- Misión 2 -----------------
const activityCategories = [
  { value: 'comunicacion', label: 'Comunicación' },
  { value: 'entretenimiento', label: 'Entretenimiento' },
  { value: 'educacion', label: 'Educación' },
  { value: 'comercio', label: 'Comercio' },
  { value: 'colaboracion', label: 'Colaboración' },
];

const activityData = [
  {
    text: 'Tutoría síncrona en Microsoft Teams para reforzar matemáticas.',
    answer: 'educacion',
    clue: 'Las aulas virtuales y tutorías entran en educación online.',
  },
  {
    text: 'Ver una maratón de documentales en streaming en Netﬂix.',
    answer: 'entretenimiento',
    clue: 'La transmisión de vídeo es ocio digital.',
  },
  {
    text: 'Gestionar tareas y archivos del equipo en Google Workspace.',
    answer: 'colaboracion',
    clue: 'Compartir documentos y coordinarse es colaboración en línea.',
  },
  {
    text: 'Comprar material escolar en una tienda online con tarjeta digital.',
    answer: 'comercio',
    clue: 'Es comercio electrónico y banca online.',
  },
  {
    text: 'Seguir un hilo de voz en Telegram con actualización instantánea.',
    answer: 'comunicacion',
    clue: 'Mensajería y voz en apps = comunicación digital.',
  },
];

const activityContainer = document.getElementById('activity-items');
activityData.forEach((item, idx) => {
  const card = document.createElement('article');
  card.className = 'mini-card';
  card.dataset.index = idx;
  const options = activityCategories
    .map((cat) => `<option value="${cat.value}">${cat.label}</option>`)
    .join('');
  card.innerHTML = `
    <p>${item.text}</p>
    <select name="activity-${idx}">
      <option value="" disabled selected>Selecciona categoría</option>
      ${options}
    </select>
    <p class="hint"></p>
  `;
  activityContainer.appendChild(card);
});

document.getElementById('check-activities').addEventListener('click', () => {
  let correct = 0;
  activityContainer.querySelectorAll('.mini-card').forEach((card) => {
    const idx = Number(card.dataset.index);
    const select = card.querySelector('select');
    const hint = card.querySelector('.hint');
    if (!select.value) {
      card.classList.remove('correct', 'incorrect');
      hint.textContent = 'Selecciona una categoría.';
      return;
    }
    if (select.value === activityData[idx].answer) {
      correct += 1;
      card.classList.add('correct');
      card.classList.remove('incorrect');
      hint.textContent = activityData[idx].clue;
    } else {
      card.classList.add('incorrect');
      card.classList.remove('correct');
      hint.textContent = 'Pista: repasa las cinco familias descritas en la unidad.';
    }
  });
  const success = correct === activityData.length;
  setFeedback(
    document.getElementById('activities-feedback'),
    success
      ? '¡Mapa completado! Dominas los entornos funcionales de Internet.'
      : 'Ajusta las categorías: cada actividad tiene un propósito muy definido.',
    success
  );
  markGameComplete('activities', success);
});

// ----------------- Misión 3 -----------------
const reputationSteps = [
  {
    id: 'auditar',
    title: 'Auditar la huella',
    text: 'Busca tu nombre, revisa menciones y guarda capturas de lo que daña tu imagen.',
  },
  {
    id: 'priorizar',
    title: 'Priorizar riesgos',
    text: 'Decide qué perfiles, redes o foros hay que atender primero según impacto.',
  },
  {
    id: 'contactar',
    title: 'Contactar y documentar',
    text: 'Envía solicitudes formales, ejerce derecho al olvido y documenta cada paso.',
  },
  {
    id: 'reconstruir',
    title: 'Reconstruir presencia',
    text: 'Publica logros, participa en foros expertos y comparte contenido útil.',
  },
];

let reputationOrder = shuffle([...reputationSteps]);
const reputationList = document.getElementById('reputation-list');

function shuffle(arr) {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function renderReputation() {
  reputationList.innerHTML = '';
  reputationOrder.forEach((step, idx) => {
    const li = document.createElement('li');
    li.dataset.id = step.id;
    li.innerHTML = `
      <span class="step-index">${idx + 1}</span>
      <div>
        <strong>${step.title}</strong>
        <p>${step.text}</p>
      </div>
      <div class="order-actions">
        <button data-dir="-1" aria-label="Subir">▲</button>
        <button data-dir="1" aria-label="Bajar">▼</button>
      </div>
    `;
    reputationList.appendChild(li);
  });
}

renderReputation();

reputationList.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-dir]');
  if (!button) return;
  const dir = Number(button.dataset.dir);
  const li = button.closest('li');
  const id = li.dataset.id;
  const index = reputationOrder.findIndex((step) => step.id === id);
  const targetIndex = index + dir;
  if (targetIndex < 0 || targetIndex >= reputationOrder.length) return;
  const temp = reputationOrder[index];
  reputationOrder[index] = reputationOrder[targetIndex];
  reputationOrder[targetIndex] = temp;
  renderReputation();
});

document.getElementById('check-reputation').addEventListener('click', () => {
  const success = reputationOrder.every((step, idx) => step.id === reputationSteps[idx].id);
  setFeedback(
    document.getElementById('reputation-feedback'),
    success
      ? '¡Plan maestro listo! Sigues el ciclo recomendado: auditar → priorizar → contactar → reconstruir.'
      : 'Falta orden: identifica, prioriza, actúa y reconstruye según los apuntes.',
    success
  );
  markGameComplete('reputation', success);
});

// ----------------- Misión 4 -----------------
const authData = [
  {
    id: 'banking',
    title: 'Banca en línea con transferencias internacionales',
    description: 'Quieres validar pagos de alto importe y evitar fraudes.',
    options: [
      {
        label: 'Solo contraseña robusta con símbolos',
        correct: false,
        reason: 'Necesitas algo más que un factor: añade OTP o token.',
      },
      {
        label: 'Contraseña + token OTP o app bancaria (2FA)',
        correct: true,
        reason: 'Combina algo que sabes y algo que tienes, recomendado para banca.',
      },
      {
        label: 'Pregunta secreta sobre tu mascota',
        correct: false,
        reason: 'Las preguntas estáticas son fáciles de adivinar.',
      },
    ],
  },
  {
    id: 'border',
    title: 'Control fronterizo automatizado',
    description: 'Necesitas validar identidades rápidamente en aeropuertos.',
    options: [
      {
        label: 'Reconocimiento facial 3D + verificación contra chip del pasaporte',
        correct: true,
        reason: 'Combina biometría y credenciales criptográficas.',
      },
      {
        label: 'Escaneo de código QR impreso en casa',
        correct: false,
        reason: 'El QR sin validación oficial es falsificable.',
      },
      {
        label: 'Usuario/contraseña en un kiosko público',
        correct: false,
        reason: 'No usa factores biométricos ni certificados.',
      },
    ],
  },
  {
    id: 'classroom',
    title: 'Acceso a aula virtual y entrega de evidencias',
    description: 'Necesitas verificar estudiantes y mantener continuidad de identidad.',
    options: [
      {
        label: 'Ingreso con cuenta federada + aprobación push en móvil institucional',
        correct: true,
        reason: 'Las identidades federadas + MFA garantizan continuidad.',
      },
      {
        label: 'Link abierto enviado por correo sin autenticación',
        correct: false,
        reason: 'Cualquiera con el enlace podría entrar.',
      },
      {
        label: 'Contraseña compartida entre los miembros de clase',
        correct: false,
        reason: 'Viola control de accesos y auditoría.',
      },
    ],
  },
  {
    id: 'mobile',
    title: 'Desbloqueo de un móvil corporativo',
    description: 'Buscas equilibrio entre comodidad y seguridad.',
    options: [
      {
        label: 'Patrón en pantalla de 4 puntos',
        correct: false,
        reason: 'Patrones cortos se pueden observar fácilmente.',
      },
      {
        label: 'Huella dactilar + PIN de respaldo',
        correct: true,
        reason: 'La biometría con PIN cumple lo descrito en la unidad.',
      },
      {
        label: 'Solo PIN de 4 dígitos',
        correct: false,
        reason: 'Demasiado corto para un dispositivo profesional.',
      },
    ],
  },
];

const authContainer = document.getElementById('auth-items');
authData.forEach((scenario) => {
  const card = document.createElement('article');
  card.className = 'mini-card';
  card.dataset.id = scenario.id;
  card.innerHTML = `
    <h3>${scenario.title}</h3>
    <p>${scenario.description}</p>
    <div class="auth-options">
      ${scenario.options
        .map(
          (opt, idx) => `
            <button type="button" data-scenario="${scenario.id}" data-option="${idx}">${opt.label}</button>
          `
        )
        .join('')}
    </div>
    <p class="hint"></p>
  `;
  authContainer.appendChild(card);
});

authContainer.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-scenario]');
  if (!button) return;
  const scenarioId = button.dataset.scenario;
  const optionIndex = Number(button.dataset.option);
  const scenarioCard = authContainer.querySelector(`.mini-card[data-id="${scenarioId}"]`);
  scenarioCard.dataset.selected = optionIndex;
  scenarioCard.querySelectorAll('button').forEach((btn) => btn.classList.remove('selected'));
  button.classList.add('selected');
});

document.getElementById('check-auth').addEventListener('click', () => {
  let correct = 0;
  authContainer.querySelectorAll('.mini-card').forEach((card) => {
    const scenarioId = card.dataset.id;
    const selected = card.dataset.selected;
    const hint = card.querySelector('.hint');
    if (selected === undefined) {
      card.classList.remove('correct', 'incorrect');
      hint.textContent = 'Toca una opción.';
      return;
    }
    const option = authData
      .find((scn) => scn.id === scenarioId)
      .options[Number(selected)];
    if (option.correct) {
      correct += 1;
      card.classList.add('correct');
      card.classList.remove('incorrect');
      hint.textContent = option.reason;
    } else {
      card.classList.add('incorrect');
      card.classList.remove('correct');
      hint.textContent = option.reason;
    }
  });
  const success = correct === authData.length;
  setFeedback(
    document.getElementById('auth-feedback'),
    success
      ? '¡Excelente! Dominas la autenticación fuerte, biometría y continuidad de identidad.'
      : 'Asegúrate de combinar factores (algo que sabes, tienes o eres) según el riesgo.',
    success
  );
  markGameComplete('auth', success);
});

// ----------------- Misión 5 -----------------
const passwordInput = document.getElementById('password-input');
const twoFaCheckbox = document.getElementById('twofa-check');
const passwordFeedback = document.getElementById('password-feedback');
const barLength = document.querySelector('[data-gauge="length"]');
const barVariety = document.querySelector('[data-gauge="variety"]');
const bar2FA = document.querySelector('[data-gauge="2fa"]');

function updateBar(bar, value) {
  bar.style.setProperty('--fill', `${Math.min(value, 1) * 100}%`);
  bar.classList.toggle('ready', value >= 1);
}

function evaluatePassword() {
  const pwd = passwordInput.value;
  const lengthScore = Math.min(pwd.length / 12, 1);
  const upper = /[A-Z]/.test(pwd);
  const lower = /[a-z]/.test(pwd);
  const digits = /\d/.test(pwd);
  const special = /[^A-Za-z0-9]/.test(pwd);
  const varietyCount = [upper, lower, digits, special].filter(Boolean).length;
  const varietyScore = Math.min(varietyCount / 3, 1);
  const twoFaScore = twoFaCheckbox.checked ? 1 : 0;

  updateBar(barLength, lengthScore);
  updateBar(barVariety, varietyScore);
  updateBar(bar2FA, twoFaScore);

  const hasPersonalHint = /(202[0-9]|20\d{2}|\b(nombre|name|dni|1234)\b)/i.test(pwd);
  const ready = lengthScore === 1 && varietyCount >= 3 && twoFaCheckbox.checked && pwd.length > 0 && !hasPersonalHint;

  if (hasPersonalHint) {
    setFeedback(passwordFeedback, 'Evita fechas, DNI o nombres: son fáciles de deducir.');
    markGameComplete('password', false);
    return;
  }

  if (ready) {
    setFeedback(passwordFeedback, '¡Nivel épico! Añade gestor de contraseñas y 2FA como indica la unidad.', true);
    markGameComplete('password', true);
  } else {
    setFeedback(
      passwordFeedback,
      'Necesitas 12 caracteres, variedad (mayúsculas, minúsculas, números y símbolos) y confirmar 2FA.',
      false
    );
  }
}

passwordInput.addEventListener('input', evaluatePassword);
twoFaCheckbox.addEventListener('change', evaluatePassword);

// ----------------- Misión 6 -----------------
const phishingData = [
  {
    text: 'Banco Ágil: “Detectamos un intento de acceso. Valida aquí en 5 minutos: http://banco-agil.secure-login.cc”',
    answer: 'sospechoso',
    note: 'Enlace sin https oficial y genera urgencia extrema.',
  },
  {
    text: 'Oficina de empleo: “Adjuntamos PDF con tu cita. No compartas contraseñas y revisa que el remitente acabe en .gob.es”',
    answer: 'legitimo',
    note: 'Refuerza buenas prácticas y no pide datos sensibles.',
  },
  {
    text: 'Soporte streaming: “Tu cuenta será cancelada. Introduce tarjeta y CVV aquí para seguir viendo la serie.”',
    answer: 'sospechoso',
    note: 'No se debe pedir CVV por correo; es phishing financiero típico.',
  },
  {
    text: 'Compañera del módulo: “Te comparto el enlace privado de la videoconferencia protegida con PIN del campus virtual.”',
    answer: 'legitimo',
    note: 'Describe medidas reales (PIN, campus), no solicita credenciales externas.',
  },
];

const phishingContainer = document.getElementById('phishing-items');
phishingData.forEach((item, idx) => {
  const card = document.createElement('article');
  card.className = 'mini-card phishing-card';
  card.dataset.index = idx;
  card.innerHTML = `
    <p>${item.text}</p>
    <div class="phishing-choice">
      <button type="button" data-choice="sospechoso">Sospechoso</button>
      <button type="button" data-choice="legitimo">Legítimo</button>
    </div>
    <p class="hint"></p>
  `;
  phishingContainer.appendChild(card);
});

phishingContainer.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-choice]');
  if (!button) return;
  const card = button.closest('.mini-card');
  card.dataset.selection = button.dataset.choice;
  card.querySelectorAll('button').forEach((btn) => btn.classList.remove('selected'));
  button.classList.add('selected');
});

document.getElementById('check-phishing').addEventListener('click', () => {
  let correct = 0;
  phishingContainer.querySelectorAll('.mini-card').forEach((card) => {
    const idx = Number(card.dataset.index);
    const selection = card.dataset.selection;
    const hint = card.querySelector('.hint');
    if (!selection) {
      card.classList.remove('correct', 'incorrect');
      hint.textContent = 'Elige una clasificación.';
      return;
    }
    if (selection === phishingData[idx].answer) {
      correct += 1;
      card.classList.add('correct');
      card.classList.remove('incorrect');
      hint.textContent = phishingData[idx].note;
    } else {
      card.classList.add('incorrect');
      card.classList.remove('correct');
      hint.textContent = 'Detecta URL raras, urgencia o peticiones imposibles.';
    }
  });
  const success = correct === phishingData.length;
  setFeedback(
    document.getElementById('phishing-feedback'),
    success
      ? '¡Buen ojo! Identificas las señales de phishing descritas en la unidad.'
      : 'Repasa los indicadores: dominios oficiales, https, tono y petición de datos.',
    success
  );
  markGameComplete('phishing', success);
});

// ----------------- Misión 7 -----------------
const riskData = [
  {
    risk: 'Malware y virus',
    answer: 'Actualizaciones y antivirus + cortafuegos',
  },
  {
    risk: 'Ransomware',
    answer: 'Copias de seguridad cifradas y aislamiento de redes',
  },
  {
    risk: 'Robo de identidad',
    answer: 'Contraseñas robustas + monitorizar cuentas + 2FA',
  },
  {
    risk: 'Sexting y exposición no deseada',
    answer: 'Configurar privacidad, consentir y evitar compartir contenido sensible',
  },
  {
    risk: 'Brechas de datos en servicios en la nube',
    answer: 'Cifrado extremo a extremo y control de accesos',
  },
];

const riskOptions = [
  'Actualizaciones y antivirus + cortafuegos',
  'Copias de seguridad cifradas y aislamiento de redes',
  'Contraseñas robustas + monitorizar cuentas + 2FA',
  'Configurar privacidad, consentir y evitar compartir contenido sensible',
  'Cifrado extremo a extremo y control de accesos',
];

const riskContainer = document.getElementById('risk-items');
riskData.forEach((item, idx) => {
  const row = document.createElement('div');
  row.className = 'risk-row';
  row.dataset.index = idx;
  const options = ['<option value="" disabled selected>Defensa</option>']
    .concat(riskOptions.map((opt) => `<option value="${opt}">${opt}</option>`))
    .join('');
  row.innerHTML = `
    <div>
      <strong>${item.risk}</strong>
    </div>
    <select>${options}</select>
  `;
  riskContainer.appendChild(row);
});

document.getElementById('check-risks').addEventListener('click', () => {
  let correct = 0;
  riskContainer.querySelectorAll('.risk-row').forEach((row) => {
    const idx = Number(row.dataset.index);
    const select = row.querySelector('select');
    if (select.value === riskData[idx].answer) {
      correct += 1;
      row.classList.add('correct');
      row.classList.remove('incorrect');
    } else if (!select.value) {
      row.classList.remove('correct', 'incorrect');
    } else {
      row.classList.add('incorrect');
      row.classList.remove('correct');
    }
  });
  const success = correct === riskData.length;
  setFeedback(
    document.getElementById('risks-feedback'),
    success
      ? '¡Escudo total activado! Sabes cómo responder a cada amenaza mencionada en la unidad.'
      : 'Vuelve a las recomendaciones de seguridad y privacidad del temario para afinar.',
    success
  );
  markGameComplete('risks', success);
});

// ----------------- Misión 8 -----------------
const leftConcepts = [
  {
    id: 'left-2fa',
    text: 'Autenticación de doble factor',
  },
  {
    id: 'left-huellapasiva',
    text: 'Huella digital pasiva',
  },
  {
    id: 'left-olvido',
    text: 'Derecho al olvido',
  },
  {
    id: 'left-firewall',
    text: 'Firewall / Cortafuegos',
  },
  {
    id: 'left-biometria',
    text: 'Biometría facial',
  },
];

const rightConcepts = [
  {
    id: 'right-2fa',
    text: 'Combina algo que sabes y algo que tienes para autorizar.',
  },
  {
    id: 'right-huellapasiva',
    text: 'Rastro que se recopila automáticamente: cookies, logs, sensores.',
  },
  {
    id: 'right-olvido',
    text: 'Facultad de exigir que eliminen tus datos cuando ya no son necesarios.',
  },
  {
    id: 'right-firewall',
    text: 'Muro que filtra y bloquea tráfico no autorizado entre redes.',
  },
  {
    id: 'right-biometria',
    text: 'Identificación a través de rasgos únicos del rostro.',
  },
];

const matchPairs = {
  'left-2fa': 'right-2fa',
  'left-huellapasiva': 'right-huellapasiva',
  'left-olvido': 'right-olvido',
  'left-firewall': 'right-firewall',
  'left-biometria': 'right-biometria',
};

const leftColumn = document.getElementById('match-left');
const rightColumn = document.getElementById('match-right');
const linesSvg = document.getElementById('match-lines');
const matchingFeedback = document.getElementById('matching-feedback');

const activeLines = [];
const matchedLeft = new Set();
const matchedRight = new Set();

let selectedLeft = null;
let selectedRight = null;

function createMatchCard(item, side) {
  const button = document.createElement('button');
  button.className = 'match-card';
  button.type = 'button';
  button.textContent = item.text;
  button.dataset.id = item.id;
  button.dataset.side = side;
  return button;
}

function resetSelections() {
  document.querySelectorAll('.match-card.selected').forEach((card) => card.classList.remove('selected'));
  selectedLeft = null;
  selectedRight = null;
}

function getConnectorPoints(fromEl, toEl) {
  const svgRect = linesSvg.getBoundingClientRect();
  const fromRect = fromEl.getBoundingClientRect();
  const toRect = toEl.getBoundingClientRect();

  const startX = fromRect.right - svgRect.left;
  const startY = fromRect.top + fromRect.height / 2 - svgRect.top;
  const endX = toRect.left - svgRect.left;
  const endY = toRect.top + toRect.height / 2 - svgRect.top;

  return { startX, startY, endX, endY };
}

function updateLinePosition(line, fromEl, toEl) {
  const { startX, startY, endX, endY } = getConnectorPoints(fromEl, toEl);
  line.setAttribute('x1', startX);
  line.setAttribute('y1', startY);
  line.setAttribute('x2', endX);
  line.setAttribute('y2', endY);
}

function drawLine(fromEl, toEl, isCorrect) {
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.classList.add('match-line');
  updateLinePosition(line, fromEl, toEl);
  if (isCorrect) {
    line.classList.add('correct');
    linesSvg.appendChild(line);
    activeLines.push({ line, fromEl, toEl });
  } else {
    line.classList.add('wrong');
    linesSvg.appendChild(line);
    setTimeout(() => line.remove(), 600);
  }
}

function checkMissionComplete() {
  const success = matchedLeft.size === leftConcepts.length;
  setFeedback(
    matchingFeedback,
    success
      ? '¡Sincronización perfecta! Todas las conexiones son correctas.'
      : 'Selecciona un concepto de cada columna para lanzar una flecha.',
    success
  );
  markGameComplete('matching', success);
}

function handleSelection(card) {
  const side = card.dataset.side;
  if (card.classList.contains('matched')) return;

  if (side === 'left') {
    if (selectedLeft === card) {
      card.classList.remove('selected');
      selectedLeft = null;
    } else {
      document.querySelectorAll('.match-card[data-side=\"left\"].selected').forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedLeft = card;
    }
  } else {
    if (selectedRight === card) {
      card.classList.remove('selected');
      selectedRight = null;
    } else {
      document.querySelectorAll('.match-card[data-side=\"right\"].selected').forEach((c) =>
        c.classList.remove('selected')
      );
      card.classList.add('selected');
      selectedRight = card;
    }
  }

  if (selectedLeft && selectedRight) {
    const leftId = selectedLeft.dataset.id;
    const rightId = selectedRight.dataset.id;
    const isCorrect = matchPairs[leftId] === rightId;
    drawLine(selectedLeft, selectedRight, isCorrect);
    if (isCorrect) {
      matchedLeft.add(leftId);
      matchedRight.add(rightId);
      selectedLeft.classList.add('matched');
      selectedRight.classList.add('matched');
    }
    resetSelections();
    checkMissionComplete();
  }
}

if (leftColumn && rightColumn) {
  leftConcepts.forEach((item) => {
    const card = createMatchCard(item, 'left');
    leftColumn.appendChild(card);
  });

  shuffle([...rightConcepts]).forEach((item) => {
    const card = createMatchCard(item, 'right');
    rightColumn.appendChild(card);
  });

  document.querySelectorAll('.match-card').forEach((card) => {
    card.addEventListener('click', () => handleSelection(card));
  });

  window.addEventListener('resize', () => {
    activeLines.forEach(({ line, fromEl, toEl }) => updateLinePosition(line, fromEl, toEl));
  });

  checkMissionComplete();
}

// No se requiere lógica adicional para la playlist: los controles nativos gestionan el audio.
