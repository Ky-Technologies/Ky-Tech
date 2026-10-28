(() => {
  'use strict';

  const SHEET_ID = '1_UZD-92FbZ8YIC2VHOZ3kgV__kPXjI-v3gFJBOPyj1s';
  const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;
  const STORAGE_KEY = 'kytech.project-builder.active-estimate.v1';
  const CATEGORY_BY_NEED = {
    presence: ['Web', 'SEO y analítica'],
    organization: ['Productividad'],
    data: ['Datos'],
    'artificial-intelligence': ['IA'],
    support: ['Soporte']
  };
  const NEED_LABELS = {
    presence: 'Presencia digital',
    organization: 'Productividad',
    data: 'Datos y reportes',
    'artificial-intelligence': 'Inteligencia artificial',
    support: 'Soporte',
    guidance: 'Diagnóstico guiado'
  };
  const PRODUCTIVITY_PLATFORMS = [
    ['microsoft', 'Microsoft 365'],
    ['google', 'Google Workspace'],
    ['unsure', 'No estoy seguro']
  ];
  const COMBO_COMPONENTS = {
    'COM-01': ['WEB-02', 'WEB-06', 'WEB-08'],
    'COM-02': ['PROD-01', 'PROD-04', 'PROD-07'],
    'COM-03': ['PROD-03', 'PROD-05', 'PROD-06'],
    'COM-04': ['DATA-01', 'DATA-02'],
    'COM-05': ['WEB-02', 'WEB-06', 'WEB-08', 'PROD-01']
  };
  const MONTHLY_SERVICE_IDS = new Set(['WEB-11', 'WEB-12', 'SUP-05']);
  const SERVICE_PRESENTATION = {
    "WEB-01": { group: "web-levels", icon: "🚀", badge: "Ideal para empezar", summary: "Una página para lanzar una idea, campaña o servicio puntual.", features: ["1 página", "Hasta 3 secciones"], level: "express" },
    "WEB-02": { group: "web-levels", icon: "🌐", badge: "Más elegida", summary: "Una presencia profesional para presentar tu negocio y generar consultas.", features: ["Hasta 5 secciones", "Formulario y WhatsApp"], level: "essential" },
    "WEB-03": { group: "web-levels", icon: "▦", badge: "Mayor estructura", summary: "Un sitio multipágina para empresas con contenidos más amplios.", features: ["Hasta 5 páginas", "SEO y medición inicial"], level: "professional" },
    "WEB-04": { group: "web-levels", icon: "◆", badge: "A medida", summary: "Para funciones o integraciones que requieren evaluar el alcance.", features: ["Funciones especiales", "Desde USD 900"], level: "advanced" },
    "WEB-05": { group: "web-enhance", icon: "＋", badge: "Complemento", summary: "Sumá una página estándar manteniendo la identidad visual." },
    "WEB-06": { group: "web-enhance", icon: "◔", badge: "Medición", summary: "Conocé visitas y acciones principales del sitio." },
    "WEB-07": { group: "web-enhance", icon: "◎", badge: "Medición avanzada", summary: "Configurá eventos y conversiones relevantes." },
    "WEB-08": { group: "web-enhance", icon: "⌕", badge: "Visibilidad", summary: "Preparación técnica para buscadores y Search Console." },
    "WEB-09": { group: "web-diagnosis", icon: "◫", badge: "Diagnóstico", summary: "Detectamos problemas técnicos y de SEO por prioridad." },
    "WEB-10": { group: "web-diagnosis", icon: "▥", badge: "Diagnóstico", summary: "Convertimos métricas en hallazgos y próximos pasos." },
    "WEB-11": { group: "web-ongoing", icon: "↻", badge: "Mensual", summary: "Revisión técnica y pequeños ajustes del sitio." },
    "WEB-12": { group: "web-ongoing", icon: "⌁", badge: "Mensual", summary: "Seguimiento técnico y pequeños ajustes SEO." },
    "PROD-01": { group: "prod-start", icon: "◈", badge: "Puesta en marcha", summary: "Correo, archivos y colaboración con una base ordenada." },
    "PROD-02": { group: "prod-tools", icon: "＋", badge: "Adicional", summary: "Sumá una persona al entorno existente." },
    "PROD-03": { group: "prod-organize", icon: "▦", badge: "Equipo", summary: "Organizá espacios compartidos y colaboración." },
    "PROD-04": { group: "prod-organize", icon: "▤", badge: "Archivos", summary: "Estructurá carpetas y accesos compartidos." },
    "PROD-05": { group: "prod-tools", icon: "☑", badge: "Herramienta", summary: "Formulario para registros o solicitudes." },
    "PROD-06": { group: "prod-tools", icon: "◷", badge: "Herramienta", summary: "Agenda para reservar horarios disponibles." },
    "PROD-07": { group: "prod-tools", icon: "▣", badge: "Herramienta", summary: "Calendario compartido para coordinar al equipo." },
    "PROD-08": { group: "prod-learning", icon: "◇", badge: "Capacitación", summary: "Sesión práctica sobre Microsoft 365 o Google Workspace." },
    "DATA-01": { group: "data-order", icon: "▦", badge: "Ordenar", summary: "Mejorá estructura, fórmulas y validaciones." },
    "DATA-02": { group: "data-visualize", icon: "▥", badge: "Visualizar", summary: "Convertí datos en indicadores y gráficos claros." },
    "DATA-03": { group: "data-visualize", icon: "◫", badge: "Evaluación", summary: "Dashboard con mayor alcance o varias fuentes." },
    "AI-01": { group: "ai-implement", icon: "✦", badge: "Implementación inicial", summary: "Puesta en marcha de Copilot o Gemini." },
    "AI-02": { group: "ai-diagnosis", icon: "⌕", badge: "Diagnóstico", summary: "Identificá dónde la IA puede aportar valor." },
    "AI-03": { group: "ai-learning", icon: "◇", badge: "Capacitación", summary: "Casos de uso prácticos de Copilot o Gemini." },
    "SUP-01": { group: "support-point", icon: "⚡", badge: "Puntual", summary: "Resolvé una necesidad en bloques de 30 minutos." },
    "SUP-02": { group: "support-bags", icon: "◴", badge: "Bolsa 5 h", summary: "Capacidad prepaga para varias intervenciones." },
    "SUP-03": { group: "support-bags", icon: "◴", badge: "Bolsa 10 h", summary: "Más capacidad y mejor valor por hora." },
    "SUP-04": { group: "support-bags", icon: "◴", badge: "Bolsa 20 h", summary: "Capacidad amplia, sujeta a disponibilidad." },
    "SUP-05": { group: "support-monthly", icon: "↻", badge: "Mensual", summary: "Acompañamiento continuo para el equipo." },
  };
  const SERVICE_GROUPS = {
    "presence": [
      [
        "web-levels",
        "1 · Elegí tu web",
        "Compará niveles según el alcance del proyecto."
      ],
      [
        "web-enhance",
        "2 · Potenciá tu web",
        "Sumá contenido, visibilidad y medición."
      ],
      [
        "web-diagnosis",
        "3 · Analizá y mejorá",
        "Entendé qué conviene corregir."
      ],
      [
        "web-ongoing",
        "4 · Acompañamiento continuo",
        "Mantené la web en el tiempo."
      ]
    ],
    "organization": [
      [
        "prod-start",
        "1 · Poné en marcha tu entorno",
        "Configuración base para empezar."
      ],
      [
        "prod-organize",
        "2 · Organizá el equipo y los archivos",
        "Estructurá el trabajo compartido."
      ],
      [
        "prod-tools",
        "3 · Sumá herramientas puntuales",
        "Formularios, reservas y calendarios."
      ],
      [
        "prod-learning",
        "4 · Capacitación",
        "Usá mejor la plataforma."
      ]
    ],
    "data": [
      [
        "data-order",
        "1 · Ordená tus datos",
        "Mejorá la base."
      ],
      [
        "data-visualize",
        "2 · Visualizá y entendé",
        "Convertí información en indicadores."
      ]
    ],
    "artificial-intelligence": [
      [
        "ai-diagnosis",
        "1 · Descubrí oportunidades",
        "Identificá dónde usar IA."
      ],
      [
        "ai-implement",
        "2 · Empezá a usar IA",
        "Poné en marcha Copilot o Gemini."
      ],
      [
        "ai-learning",
        "3 · Aprendé a aprovecharla",
        "Incorporá casos de uso prácticos."
      ]
    ],
    "support": [
      [
        "support-point",
        "1 · Resolvé algo puntual",
        "Para una necesidad concreta."
      ],
      [
        "support-bags",
        "2 · Reservá horas",
        "Para varias intervenciones."
      ],
      [
        "support-monthly",
        "3 · Acompañamiento continuo",
        "Soporte recurrente."
      ]
    ]
  };
  const DIAGNOSTIC_QUESTIONS = [
    {
      key: 'improve',
      prompt: '¿Qué querés mejorar primero?',
      options: [
        ['presence', 'Mi presencia digital'],
        ['organization', 'La organización del trabajo'],
        ['data', 'Mis datos y reportes'],
        ['ai', 'Mis procesos con inteligencia artificial'],
        ['support', 'Necesito ayuda con tecnología']
      ]
    },
    {
      key: 'website',
      prompt: '¿Ya tenés un sitio web?',
      options: [['yes', 'Sí'], ['no', 'No'], ['unsure', 'No estoy seguro/a']]
    },
    {
      key: 'platform',
      prompt: '¿Qué plataforma usa tu empresa?',
      options: [
        ['microsoft', 'Microsoft 365'],
        ['google', 'Google Workspace'],
        ['both', 'Ambas'],
        ['unsure', 'No sé']
      ]
    },
    {
      key: 'people',
      prompt: '¿Cuántas personas trabajan en tu empresa?',
      options: [
        ['1-3', '1–3'],
        ['4-5', '4–5'],
        ['6-10', '6–10'],
        ['more-than-10', 'Más de 10']
      ]
    },
    {
      key: 'help',
      prompt: '¿Qué tipo de ayuda buscás?',
      options: [
        ['punctual', 'Una ayuda puntual'],
        ['implementation', 'Una implementación'],
        ['ongoing', 'Soporte continuo'],
        ['recommendation', 'Una recomendación']
      ]
    }
  ];

  const elements = {
    currencyButtons: [...document.querySelectorAll('[data-currency]')],
    stepLabel: document.querySelector('[data-step-label]'),
    progress: document.querySelector('[data-step-progress]'),
    form: document.querySelector('[data-project-builder-form]'),
    initialChoices: document.querySelector('.project-builder-choices'),
    dynamicSteps: document.querySelector('[data-dynamic-steps]'),
    previous: document.querySelector('[data-previous]'),
    next: document.querySelector('[data-continue]'),
    validation: document.querySelector('[data-validation-message]'),
    workspace: document.querySelector('.project-builder-layout'),
    finalScreen: document.querySelector('[data-estimation-screen]'),
    estimateReference: document.querySelector('[data-estimation-reference]'),
    finalSummary: document.querySelector('[data-estimation-summary]'),
    finalOneTime: document.querySelector('[data-estimation-one-time]'),
    finalMonthly: document.querySelector('[data-estimation-monthly]'),
    finalAvailability: document.querySelector('[data-estimation-availability]'),
    finalEvaluation: document.querySelector('[data-estimation-evaluation]'),
    solutionOneTime: document.querySelector('[data-one-time-services]'),
    solutionMonthly: document.querySelector('[data-monthly-services]'),
    solutionAvailability: document.querySelector('[data-availability-services]'),
    solutionEvaluation: document.querySelector('[data-evaluation-services]'),
    recommendations: document.querySelector('[data-combos]'),
    subtotal: document.querySelector('[data-subtotal]'),
    savings: document.querySelector('[data-savings]'),
    totalArs: document.querySelector('[data-total-ars]'),
    totalUsd: document.querySelector('[data-total-usd]'),
    priceLoading: document.querySelector('[data-prices-loading]'),
    priceError: document.querySelector('[data-prices-error]'),
    priceUnavailable: document.querySelector('[data-prices-unavailable]'),
    announcements: document.querySelector('[data-assistant-announcements]')
  };

  const categoryPrompts = {
    presence: '¿Qué querés resolver de tu presencia digital?',
    organization: '¿Qué querés organizar en tu empresa?',
    data: '¿Qué necesitás mejorar de tus datos y reportes?',
    'artificial-intelligence': '¿Cómo querés incorporar inteligencia artificial?',
    support: '¿Qué tipo de soporte necesitás?'
  };
  const categoryOrder = ['presence', 'organization', 'data', 'artificial-intelligence', 'support'];
  let catalog = [];
  let catalogLoaded = false;
  let estimate = createEstimate();
  let steps = [];
  let stepIndex = 0;
  let currentCurrency = 'ARS';

  function createEstimate() {
    return {
      id: createEstimateId(),
      currency: 'ARS',
      needs: [],
      selectedServices: [],
      appliedCombos: [],
      answers: {},
      completed: false
    };
  }

  function createEstimateId() {
    const now = new Date();
    const date = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0')
    ].join('');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const bytes = new Uint8Array(4);
    crypto.getRandomValues(bytes);
    const random = [...bytes].map((byte) => chars[byte % chars.length]).join('');
    return `KY-${date}-${random}`;
  }

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let value = '';
    let quoted = false;

    for (let index = 0; index < text.length; index += 1) {
      const character = text[index];

      if (character === '"') {
        if (quoted && text[index + 1] === '"') {
          value += '"';
          index += 1;
        } else {
          quoted = !quoted;
        }
      } else if (character === ',' && !quoted) {
        row.push(value);
        value = '';
      } else if ((character === '\n' || character === '\r') && !quoted) {
        if (character === '\r' && text[index + 1] === '\n') index += 1;
        row.push(value);
        if (row.some((cell) => cell.trim())) rows.push(row);
        row = [];
        value = '';
      } else {
        value += character;
      }
    }

    if (value || row.length) {
      row.push(value);
      if (row.some((cell) => cell.trim())) rows.push(row);
    }

    if (rows.length < 2) throw new Error('La hoja pública no contiene filas de servicios.');
    const headers = rows[0].map((header) => header.trim().toLocaleLowerCase('es'));
    const column = (header) => headers.indexOf(header.toLocaleLowerCase('es'));
    const requiredHeaders = [
      'id', 'servicio público', 'precio usd', 'precio ars calculado', 'precio ars público',
      'publicar', 'estado público', 'mostrar como', 'orden',
      'categoría pública', 'plataforma', 'texto breve'
    ];
    const missingHeader = requiredHeaders.find((header) => column(header) < 0);
    if (missingHeader) throw new Error(`Falta la columna pública "${missingHeader}".`);

    return rows.slice(1).map((cells) => {
      const get = (header) => (cells[column(header)] || '').trim();
      const published = get('publicar').toLocaleLowerCase('es');
      if (!['sí', 'si', 'yes', 'true'].includes(published)) return null;

      const usd = parseUsdAmount(get('precio usd'));
      let ars = parseArsAmount(get('precio ars público'));
      const arsCalculated = parseArsAmount(get('precio ars calculado'));
      if (ars !== null && usd !== null && ars < usd * 100 && arsCalculated !== null) {
        ars = Math.round(arsCalculated / 1000) * 1000;
      }

      return {
        id: get('id'),
        name: get('servicio público'),
        usd,
        ars,
        status: get('estado público'),
        display: get('mostrar como'),
        order: Number.parseInt(get('orden'), 10) || 0,
        category: get('categoría pública'),
        platform: get('plataforma'),
        description: get('texto breve')
      };
    }).filter((service) => service && service.id && service.name)
      .sort((first, second) => first.order - second.order);
  }

  function parseUsdAmount(rawValue) {
    const cleaned = rawValue.replace(/[^\d,.-]/g, '').trim();
    if (!cleaned) return null;
    const lastComma = cleaned.lastIndexOf(',');
    const lastDot = cleaned.lastIndexOf('.');
    let normalized = cleaned;
    if (lastComma > lastDot) {
      const decimals = cleaned.length - lastComma - 1;
      normalized = decimals <= 2
        ? cleaned.replace(/\./g, '').replace(',', '.')
        : cleaned.replace(/,/g, '');
    } else if (lastDot > lastComma) {
      normalized = cleaned.replace(/,/g, '');
    } else {
      normalized = cleaned.replace(/,/g, '');
    }
    const amount = Number.parseFloat(normalized);
    return Number.isFinite(amount) ? amount : null;
  }

  function parseArsAmount(rawValue) {
    const cleaned = rawValue.replace(/[^\d,.-]/g, '').trim();
    if (!cleaned) return null;
    const negative = cleaned.startsWith('-');
    const unsigned = cleaned.replace('-', '');
    const groups = unsigned.split(/[.,]/).filter(Boolean);
    let normalized;
    if (groups.length > 1 && groups.slice(1).every((group) => group.length === 3)) {
      normalized = groups.join('');
    } else if (unsigned.includes(',') && !unsigned.includes('.')) {
      const comma = unsigned.lastIndexOf(',');
      const decimals = unsigned.length - comma - 1;
      normalized = decimals <= 2 ? unsigned.replace(',', '.') : unsigned.replace(/,/g, '');
    } else {
      normalized = unsigned.replace(/,/g, '');
    }
    const amount = Number.parseFloat(`${negative ? '-' : ''}${normalized}`);
    return Number.isFinite(amount) ? amount : null;
  }

  async function loadCatalog() {
    elements.priceLoading.hidden = false;
    elements.priceError.hidden = true;
    elements.priceUnavailable.hidden = true;
    try {
      const response = await fetch(SHEET_URL, { cache: 'no-store' });
      if (!response.ok) throw new Error(`Google Sheets respondió con HTTP ${response.status}.`);
      const text = await response.text();
      catalog = parseCsv(text);
      catalogLoaded = true;
      elements.priceLoading.hidden = true;
      const hasAnyPrice = catalog.some((service) => service.ars !== null || service.usd !== null);
      elements.priceUnavailable.hidden = hasAnyPrice;
      elements.priceUnavailable.setAttribute('role', 'status');
    } catch (error) {
      catalog = [];
      catalogLoaded = false;
      elements.priceLoading.hidden = true;
      elements.priceError.hidden = false;
      elements.priceUnavailable.hidden = false;
      console.error('No se pudo cargar el catálogo público de precios de KyTech.', error);
    }

    reconcileEstimate();
    renderStep();
    renderSolution();
    if (estimate.completed) renderFinalEstimate();
    persistEstimate();
  }

  function restoreEstimate() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored);
      if (!parsed || typeof parsed.id !== 'string' || !Array.isArray(parsed.needs) ||
          !Array.isArray(parsed.selectedServices) || !Array.isArray(parsed.appliedCombos) ||
          typeof parsed.answers !== 'object' || parsed.answers === null) {
        throw new Error('La estimación guardada tiene un formato inválido.');
      }
      estimate = {
        id: parsed.id,
        currency: parsed.currency === 'USD' ? 'USD' : 'ARS',
        needs: parsed.needs.filter((need) => Object.hasOwn(NEED_LABELS, need)),
        selectedServices: [...new Set(parsed.selectedServices.filter((id) => typeof id === 'string'))],
        appliedCombos: [...new Set(parsed.appliedCombos.filter((id) => typeof id === 'string'))],
        answers: parsed.answers,
        completed: parsed.completed === true
      };
      currentCurrency = estimate.currency;
    } catch (error) {
      console.error('No se pudo recuperar la estimación guardada de KyTech.', error);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (storageError) {
        console.error('No se pudo limpiar la estimación local inválida.', storageError);
      }
      estimate = createEstimate();
    }
  }

  function persistEstimate() {
    estimate.currency = currentCurrency;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(estimate));
    } catch (error) {
      console.error('No se pudo guardar la estimación en este navegador.', error);
      announce('No se pudo guardar tu estimación en este navegador. Podés seguir trabajando mientras esta página permanezca abierta.');
    }
  }

  function announce(message) {
    elements.announcements.textContent = '';
    window.requestAnimationFrame(() => {
      elements.announcements.textContent = message;
    });
  }

  function reconcileEstimate() {
    if (!catalogLoaded) return;
    const validIds = new Set(catalog.map((service) => service.id));
    estimate.selectedServices = estimate.selectedServices.filter((id) => validIds.has(id));
    estimate.appliedCombos = estimate.appliedCombos.filter((id) => validIds.has(id));
    invalidateCombos();
  }

  function serviceById(id) {
    return catalog.find((service) => service.id === id);
  }

  function isEvaluationOnly(service, currency = currentCurrency) {
    if (!service) return true;
    const status = service.status.toLocaleLowerCase('es');
    return status.includes('evaluación') || status.includes('evaluacion') || amountFor(service, currency) === null;
  }

  function isAvailability(service) {
    return service.status.toLocaleLowerCase('es').includes('consultar') ||
      service.status.toLocaleLowerCase('es').includes('disponibilidad');
  }

  function isMonthly(service) {
    return MONTHLY_SERVICE_IDS.has(service.id);
  }

  function amountFor(service, currency = currentCurrency) {
    return currency === 'ARS' ? service.ars : service.usd;
  }

  function formatMoney(amount, currency) {
    if (amount === null || amount === undefined || !Number.isFinite(amount)) return 'A confirmar';
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency,
      maximumFractionDigits: currency === 'USD' ? 2 : 0
    }).format(amount);
  }

  function selectedServices() {
    return estimate.selectedServices.map(serviceById).filter(Boolean);
  }

  function comboComponents(comboId) {
    return COMBO_COMPONENTS[comboId] || [];
  }

  function comboCanApply(combo) {
    const components = comboComponents(combo.id);
    return components.length > 0 &&
      components.every((id) => estimate.selectedServices.includes(id)) &&
      components.every((id) => {
        const service = serviceById(id);
        return service && amountFor(service) !== null && !isEvaluationOnly(service);
      }) &&
      amountFor(combo) !== null && !isEvaluationOnly(combo);
  }

  function invalidateCombos() {
    estimate.appliedCombos = estimate.appliedCombos.filter((comboId) => {
      const combo = serviceById(comboId);
      const components = comboComponents(comboId);
      return combo && components.length > 0 && components.every((id) => estimate.selectedServices.includes(id));
    });
  }

  function buildSteps() {
    const result = [{ type: 'needs' }];
    const selectedNeeds = estimate.needs.filter((need) => need !== 'guidance');
    categoryOrder.forEach((need) => {
      if (selectedNeeds.includes(need)) result.push({ type: 'category', need });
    });
    if (estimate.needs.includes('guidance')) {
      DIAGNOSTIC_QUESTIONS.forEach((question) => result.push({ type: 'diagnostic', question }));
    }
    return result;
  }

  function renderStep({ focus = false } = {}) {
    steps = buildSteps();
    stepIndex = Math.min(stepIndex, steps.length - 1);
    const isInitial = stepIndex === 0;
    elements.initialChoices.hidden = !isInitial;
    elements.dynamicSteps.replaceChildren();
    elements.previous.disabled = stepIndex === 0;
    elements.next.textContent = stepIndex > 0 && stepIndex === steps.length - 1
      ? 'Ver mi estimación'
      : 'Continuar';
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = ' →';
    elements.next.append(arrow);
    elements.stepLabel.textContent = `Paso ${stepIndex + 1}`;
    elements.progress.max = Math.max(steps.length - 1, 1);
    elements.progress.value = stepIndex;
    elements.validation.hidden = true;
    elements.validation.textContent = '';
    elements.form.querySelectorAll('[data-need-option]').forEach((input) => {
      input.checked = estimate.needs.includes(input.value);
    });

    if (!isInitial) {
      const step = steps[stepIndex];
      if (step.type === 'category') renderCategoryStep(step.need);
      if (step.type === 'diagnostic') renderDiagnosticStep(step.question);
      if (focus) {
        const target = elements.dynamicSteps.querySelector('legend, label, select');
        if (target) {
          if (!target.matches('input, select, button, textarea')) target.tabIndex = -1;
          target.focus();
        }
      }
    } else if (focus) {
      elements.initialChoices.querySelector('legend').focus();
    }
  }

  function createProductivityPlatformSelector() {
    const section = document.createElement('section');
    section.className = 'project-builder-platform-selector';
    section.setAttribute('aria-labelledby', 'productivity-platform-title');

    const heading = document.createElement('h3');
    heading.id = 'productivity-platform-title';
    heading.textContent = '¿Qué plataforma utilizás?';
    const help = document.createElement('p');
    help.textContent = 'Elegí tu entorno de trabajo. La plataforma no modifica el precio.';
    const choices = document.createElement('div');
    choices.className = 'project-builder-platform-options';

    const platformDetails = {
      microsoft: {
        label: 'Microsoft 365',
        description: 'Outlook · Teams · OneDrive',
        iconClass: 'is-microsoft',
        iconMarkup: '<span></span><span></span><span></span><span></span>'
      },
      google: {
        label: 'Google Workspace',
        description: 'Gmail · Drive · Calendar',
        iconClass: 'is-google',
        iconMarkup: '<strong>G</strong>'
      },
      unsure: {
        label: 'No estoy seguro',
        description: 'KyTech te ayuda a elegir',
        iconClass: 'is-unsure',
        iconMarkup: '<strong>?</strong>'
      }
    };

    PRODUCTIVITY_PLATFORMS.forEach(([value]) => {
      const detail = platformDetails[value];
      const label = document.createElement('label');
      label.className = 'project-builder-platform-card';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'productivity-platform';
      input.value = value;
      input.checked = estimate.answers.productivityPlatform === value;
      input.addEventListener('change', () => {
        estimate.answers.productivityPlatform = value;
        persistEstimate();
        announce(`Plataforma seleccionada: ${detail.label}.`);
      });

      const icon = document.createElement('span');
      icon.className = `project-builder-platform-icon ${detail.iconClass}`;
      icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML = detail.iconMarkup;
      const copy = document.createElement('span');
      copy.className = 'project-builder-platform-copy';
      const name = document.createElement('strong');
      name.textContent = detail.label;
      const description = document.createElement('span');
      description.textContent = detail.description;
      copy.append(name, description);
      const check = document.createElement('span');
      check.className = 'project-builder-platform-check';
      check.setAttribute('aria-hidden', 'true');
      check.textContent = '✓';
      label.append(input, icon, copy, check);
      choices.append(label);
    });

    section.append(heading, help, choices);
    return section;
  }

  function renderCategoryStep(need) {
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'project-builder-choices project-builder-service-catalog';
    const legend = document.createElement('legend');
    legend.textContent = categoryPrompts[need];
    fieldset.append(legend);
    if (need === 'organization') fieldset.append(createProductivityPlatformSelector());
    const categories = CATEGORY_BY_NEED[need];
    const services = catalogLoaded ? catalog.filter((service) => categories.includes(service.category) && !service.id.startsWith('COM-')) : [];
    if (!services.length) {
      const note = document.createElement('p');
      note.textContent = catalogLoaded ? 'No hay opciones publicadas para esta necesidad en este momento.' : 'Podés continuar aunque los precios no estén disponibles. Confirmaremos las opciones al recibir tu consulta.';
      fieldset.append(note);
    }
    const groups = SERVICE_GROUPS[need] || [];
    groups.forEach(([groupId, title, description]) => {
      const matches = services.filter((service) => SERVICE_PRESENTATION[service.id]?.group === groupId);
      if (!matches.length) return;
      const section = document.createElement('section');
      section.className = `project-builder-service-group project-builder-service-group--${groupId}`;
      const heading = document.createElement('div'); heading.className = 'project-builder-service-group-heading';
      const h3 = document.createElement('h3'); h3.textContent = title;
      const p = document.createElement('p'); p.textContent = description;
      heading.append(h3,p);
      const grid = document.createElement('div'); grid.className = 'project-builder-service-grid';
      matches.forEach((service) => grid.append(createServiceOption(service)));
      section.append(heading,grid); fieldset.append(section);
    });
    elements.dynamicSteps.append(fieldset);
  }

  function createServiceOption(service) {
    const view = SERVICE_PRESENTATION[service.id] || {};
    const label = document.createElement('label');
    label.className = 'project-builder-service-card';
    if (view.level) label.classList.add(`project-builder-service-card--${view.level}`);
    if (view.group?.includes('ongoing') || view.group?.includes('monthly')) label.classList.add('project-builder-service-card--monthly');
    const input = document.createElement('input'); input.type='checkbox'; input.name='services'; input.value=service.id; input.checked=estimate.selectedServices.includes(service.id); input.dataset.serviceOption='';
    input.addEventListener('change', () => { if (input.checked && !estimate.selectedServices.includes(service.id)) estimate.selectedServices.push(service.id); else if (!input.checked) estimate.selectedServices=estimate.selectedServices.filter((id)=>id!==service.id); invalidateCombos(); persistEstimate(); renderSolution(); });
    const content=document.createElement('span'); content.className='project-builder-service-card-content';
    const top=document.createElement('span'); top.className='project-builder-service-card-top';
    const icon=document.createElement('span'); icon.className='project-builder-service-icon'; icon.setAttribute('aria-hidden','true'); icon.textContent=view.icon||'•';
    const name=document.createElement('strong'); name.textContent=service.name; top.append(icon,name);
    if(view.badge){const badge=document.createElement('span'); badge.className='project-builder-service-badge'; badge.textContent=view.badge; top.append(badge);} content.append(top);
    const summary=document.createElement('span'); summary.className='project-builder-service-summary'; summary.textContent=service.description||view.summary||''; if(summary.textContent) content.append(summary);
    if(view.features?.length){const features=document.createElement('span'); features.className='project-builder-service-features'; view.features.forEach((text)=>{const item=document.createElement('span'); item.textContent=text; features.append(item);}); content.append(features);}
    const footer=document.createElement('span'); footer.className='project-builder-service-card-footer';
    const price=amountFor(service); const priceText=price===null?'Sin precio publicado':formatMoney(price,currentCurrency);
    const priceEl=document.createElement('span'); priceEl.className='project-builder-service-price'; priceEl.textContent=isMonthly(service)?`${priceText} / mes`:priceText;
    const status=document.createElement('span'); status.className='project-builder-service-status'; status.textContent=isEvaluationOnly(service)?'Requiere evaluación':isAvailability(service)?'Sujeto a disponibilidad':'Disponible'; if(isAvailability(service))status.classList.add('is-warning'); if(isEvaluationOnly(service))status.classList.add('is-evaluation');
    footer.append(priceEl,status); content.append(footer); label.append(input,content); return label;
  }

  function renderDiagnosticStep(question) {
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'project-builder-choices';
    const legend = document.createElement('legend');
    legend.textContent = question.prompt;
    fieldset.append(legend);
    question.options.forEach(([value, labelText]) => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `diagnostic-${question.key}`;
      input.value = value;
      input.checked = estimate.answers[question.key] === value;
      input.addEventListener('change', () => {
        estimate.answers[question.key] = value;
        persistEstimate();
        renderRecommendations();
      });
      const copy = document.createElement('span');
      copy.textContent = labelText;
      label.append(input, copy);
      fieldset.append(label);
    });
    elements.dynamicSteps.append(fieldset);
  }

  function updateNeedsFromForm() {
    estimate.needs = [...elements.form.querySelectorAll('[data-need-option]:checked')].map((input) => input.value);
  }

  function showValidation(message) {
    elements.validation.textContent = message;
    elements.validation.hidden = false;
    elements.validation.focus();
  }

  function continueAssistant() {
    if (stepIndex === 0) {
      updateNeedsFromForm();
      if (!estimate.needs.length) {
        showValidation('Elegí al menos una opción para continuar.');
        return;
      }
      stepIndex = 1;
      persistEstimate();
      renderStep({ focus: true });
      renderSolution();
      return;
    }

    const currentStep = steps[stepIndex];
    if (currentStep.type === 'diagnostic' && !estimate.answers[currentStep.question.key]) {
      showValidation('Elegí una respuesta para continuar.');
      return;
    }

    if (stepIndex === steps.length - 1) {
      finishEstimate();
      return;
    }
    stepIndex += 1;
    renderStep({ focus: true });
    renderRecommendations();
  }

  function previousStep() {
    if (stepIndex <= 0) return;
    stepIndex -= 1;
    renderStep({ focus: true });
  }

  function finishEstimate() {
    estimate.completed = true;
    persistEstimate();
    renderFinalEstimate();
    elements.workspace.hidden = true;
    elements.finalScreen.hidden = false;
    elements.finalScreen.querySelector('h2').focus();
    announce('Tu estimación está lista.');
  }

  function editEstimate() {
    estimate.completed = false;
    persistEstimate();
    elements.finalScreen.hidden = true;
    elements.workspace.hidden = false;
    stepIndex = Math.max(0, steps.length - 1);
    renderStep({ focus: true });
  }

  function clearAndRestart() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('No se pudo borrar la estimación local.', error);
      announce('No se pudo borrar la estimación guardada del navegador.');
    }
    estimate = createEstimate();
    currentCurrency = 'ARS';
    stepIndex = 0;
    elements.finalScreen.hidden = true;
    elements.workspace.hidden = false;
    renderCurrencyButtons();
    renderStep({ focus: true });
    renderSolution();
    persistEstimate();
    announce('Empezaste una nueva estimación.');
  }

  function renderCurrencyButtons() {
    elements.currencyButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.currency === currentCurrency));
    });
  }

  function changeCurrency(currency) {
    if (!['ARS', 'USD'].includes(currency)) return;
    currentCurrency = currency;
    estimate.currency = currency;
    renderCurrencyButtons();
    renderStep();
    renderSolution();
    persistEstimate();
    announce(`Moneda seleccionada: ${currency}.`);
  }

  function diagnosisIsComplete() {
    return DIAGNOSTIC_QUESTIONS.every((question) => Boolean(estimate.answers[question.key]));
  }

  function getDiagnosisRecommendation() {
    if (!diagnosisIsComplete()) return null;
    const answer = estimate.answers;
    const target = answer.improve;
    if (!target) return null;

    if (target === 'presence' && answer.website === 'no') return { id: 'WEB-02', reason: 'Todavía no tenés un sitio web; una web esencial puede ser un primer paso.' };
    if (target === 'presence') return { id: answer.website === 'yes' ? 'WEB-09' : 'WEB-01', reason: 'Una revisión de presencia digital puede ayudarte a definir mejoras concretas.' };
    if (target === 'organization') return { id: 'PROD-01', reason: 'Ordenar herramientas y procesos de trabajo puede ayudarte a colaborar mejor.' };
    if (target === 'data') return { id: answer.people === 'more-than-10' ? 'DATA-02' : 'DATA-01', reason: 'Empezar por ordenar los datos facilita reportes más útiles.' };
    if (target === 'ai') return { id: 'AI-02', reason: 'Un diagnóstico permite identificar usos posibles de IA antes de implementarlos.' };
    if (target === 'support') return { id: answer.help === 'ongoing' ? 'SUP-05' : 'SUP-01', reason: 'El tipo de soporte sugerido depende de si necesitás una ayuda puntual o continua.' };
    return null;
  }

  function renderRecommendations() {
    elements.recommendations.replaceChildren();
    const availableCombos = catalogLoaded
      ? catalog.filter((service) => service.id.startsWith('COM-') && comboCanApply(service))
      : [];

    availableCombos.forEach((combo) => {
      const item = document.createElement('li');
      const components = comboComponents(combo.id).map(serviceById);
      const original = components.reduce((total, service) => total + amountFor(service), 0);
      const comboPrice = amountFor(combo);
      const saving = Math.max(0, original - comboPrice);
      const description = document.createElement('p');
      description.textContent = `${combo.name}: original ${formatMoney(original, currentCurrency)}, combo ${formatMoney(comboPrice, currentCurrency)}, ahorro ${formatMoney(saving, currentCurrency)}.`;
      item.append(description);

      if (estimate.appliedCombos.includes(combo.id)) {
        const appliedLabel = document.createElement('span');
        appliedLabel.textContent = 'Combo aplicado';
        item.append(appliedLabel);
      } else {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = 'Aplicar combo';
        button.addEventListener('click', () => applyCombo(combo.id));
        item.append(button);
      }
      elements.recommendations.append(item);
    });

    const diagnosisInProgress = estimate.needs.includes('guidance') && !diagnosisIsComplete();
    if (diagnosisInProgress) {
      const item = document.createElement('li');
      item.className = 'project-builder-recommendation-progress';
      const message = document.createElement('p');
      message.textContent = 'Estamos preparando tu recomendación. Completá las preguntas para ver una propuesta inicial.';
      item.append(message);
      elements.recommendations.append(item);
    }

    const recommendation = getDiagnosisRecommendation();
    if (recommendation) {
      const item = document.createElement('li');
      const service = serviceById(recommendation.id);
      const message = document.createElement('p');
      message.textContent = `Recomendación: ${service ? service.name : recommendation.reason}. ${recommendation.reason}`;
      item.append(message);
      if (service) {
        const addButton = document.createElement('button');
        addButton.type = 'button';
        addButton.textContent = estimate.selectedServices.includes(service.id) ? 'Ya está en tu solución' : 'Agregar recomendación';
        addButton.disabled = estimate.selectedServices.includes(service.id);
        addButton.addEventListener('click', () => addService(service.id));
        item.append(addButton);
      }
      elements.recommendations.append(item);
    }
  }

  function addService(id) {
    if (!estimate.selectedServices.includes(id)) estimate.selectedServices.push(id);
    invalidateCombos();
    persistEstimate();
    renderSolution();
    renderRecommendations();
    announce('Se agregó la recomendación a tu solución.');
  }

  function applyCombo(comboId) {
    const combo = serviceById(comboId);
    if (!combo || !comboCanApply(combo)) return;
    if (!estimate.appliedCombos.includes(comboId)) estimate.appliedCombos.push(comboId);
    persistEstimate();
    renderSolution();
    renderRecommendations();
    announce(`Se aplicó el combo ${combo.name}.`);
  }

  function removeService(id) {
    estimate.selectedServices = estimate.selectedServices.filter((serviceId) => serviceId !== id);
    invalidateCombos();
    persistEstimate();
    renderStep();
    renderSolution();
    announce('Se quitó un servicio de tu solución.');
  }

  function removeCombo(comboId) {
    estimate.appliedCombos = estimate.appliedCombos.filter((id) => id !== comboId);
    persistEstimate();
    renderSolution();
    renderRecommendations();
    announce('Se quitó el combo aplicado.');
  }

  function createRemoveButton(label, callback) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Quitar';
    button.setAttribute('aria-label', `Quitar ${label} de tu solución`);
    button.addEventListener('click', callback);
    return button;
  }

  function createSummaryItem(service, { representedByCombo = false } = {}) {
    const item = document.createElement('li');
    const copy = document.createElement('span');
    const detail = document.createElement('span');
    const amount = amountFor(service);
    const statusLabel = isEvaluationOnly(service)
      ? 'Requiere evaluación'
      : isAvailability(service)
        ? 'Sujeto a disponibilidad y confirmación'
        : 'Disponible';
    copy.textContent = service.name;
    detail.textContent = representedByCombo
      ? `Incluido en el combo · ${statusLabel}`
      : `${formatMoney(amount, currentCurrency)}${isMonthly(service) ? ' por mes' : ''} · ${statusLabel}`;
    item.append(copy, detail);
    if (isAvailability(service)) item.classList.add('project-builder-subject-to-confirmation');
    if (isEvaluationOnly(service)) item.classList.add('project-builder-requires-evaluation');
    item.append(createRemoveButton(service.name, () => removeService(service.id)));
    return item;
  }

  function createComboSummaryItem(combo) {
    const item = document.createElement('li');
    const title = document.createElement('span');
    title.textContent = combo.name;
    const componentNames = comboComponents(combo.id).map((id) => serviceById(id)?.name).filter(Boolean);
    const detail = document.createElement('span');
    detail.textContent = `${formatMoney(amountFor(combo), currentCurrency)} · Incluye: ${componentNames.join(', ')}${isAvailability(combo) ? ' · Sujeto a disponibilidad y confirmación' : ''}`;
    item.append(title, detail, createRemoveButton(combo.name, () => removeCombo(combo.id)));
    if (isAvailability(combo)) item.classList.add('project-builder-subject-to-confirmation');
    return item;
  }

  function ensureCombinedMonthlyRow() {
    const pricing = document.querySelector('.project-builder-pricing');
    if (!pricing) return {};
    let row = pricing.querySelector('[data-combined-monthly-row]');
    const totalRow = pricing.querySelector('.project-builder-total');
    if (!row) {
      row = document.createElement('p');
      row.dataset.combinedMonthlyRow = '';
      row.className = 'project-builder-monthly-total';
      row.innerHTML = '<span>Total mensual</span><strong data-combined-monthly-total>—</strong>';
      pricing.insertBefore(row, totalRow);
    }
    return { row, total: row.querySelector('[data-combined-monthly-total]') };
  }

  function renderSolution() {
    [elements.solutionOneTime, elements.solutionMonthly, elements.solutionAvailability, elements.solutionEvaluation]
      .forEach((list) => list.replaceChildren());
    const selected = selectedServices();
    const covered = new Set();
    const appliedCombos = estimate.appliedCombos.map(serviceById).filter(Boolean);
    appliedCombos.forEach((combo) => comboComponents(combo.id).forEach((id) => covered.add(id)));

    selected.forEach((service) => {
      if (isEvaluationOnly(service)) {
        elements.solutionEvaluation.append(createSummaryItem(service));
      } else if (isMonthly(service)) {
        elements.solutionMonthly.append(createSummaryItem(service, { representedByCombo: covered.has(service.id) }));
      } else if (isAvailability(service)) {
        elements.solutionAvailability.append(createSummaryItem(service, { representedByCombo: covered.has(service.id) }));
      } else {
        elements.solutionOneTime.append(createSummaryItem(service, { representedByCombo: covered.has(service.id) }));
      }
    });
    appliedCombos.forEach((combo) => {
      const list = isEvaluationOnly(combo)
        ? elements.solutionEvaluation
        : isAvailability(combo)
          ? elements.solutionAvailability
          : elements.solutionOneTime;
      list.append(createComboSummaryItem(combo));
    });

    document.querySelector('[data-monthly-total-row]')?.remove();
    document.querySelector('[data-monthly-reference-row]')?.remove();

    const totals = calculateTotals();
    const combinedMonthly = ensureCombinedMonthlyRow();
    const showSeparateMonthly = totals.primaryOneTime !== null && totals.primaryMonthly !== null;
    if (combinedMonthly.total) {
      combinedMonthly.total.textContent = showSeparateMonthly
        ? `${formatMoney(totals.monthlyTotal, currentCurrency)} / mes`
        : '—';
      combinedMonthly.row.hidden = !showSeparateMonthly;
    }
    elements.subtotal.textContent = totals.primaryOneTime === null ? '—' : formatMoney(totals.subtotal, currentCurrency);
    elements.savings.textContent = totals.primaryOneTime === null ? '—' : formatMoney(totals.savings, currentCurrency);

    const totalLabel = document.querySelector('.project-builder-total span');
    const totalElement = elements.totalArs;
    const referenceElement = elements.totalUsd;
    const referenceCurrency = currentCurrency === 'ARS' ? 'USD' : 'ARS';
    const referenceLabel = referenceElement.closest('p')?.querySelector('span');

    if (totals.primaryOneTime !== null) {
      totalLabel.textContent = `Total pago único ${currentCurrency}`;
      totalElement.textContent = formatMoney(totals.oneTimeTotal, currentCurrency);
    } else if (totals.primaryMonthly !== null) {
      totalLabel.textContent = `Total mensual ${currentCurrency}`;
      totalElement.textContent = `${formatMoney(totals.monthlyTotal, currentCurrency)} / mes`;
    } else {
      totalLabel.textContent = `Total estimado ${currentCurrency}`;
      totalElement.textContent = '—';
    }

    if (referenceLabel) referenceLabel.textContent = `Referencia ${referenceCurrency}`;
    if (totals.referenceOneTime !== null && totals.referenceMonthly !== null) {
      referenceElement.textContent = `${formatMoney(totals.referenceOneTime, referenceCurrency)} + ${formatMoney(totals.referenceMonthly, referenceCurrency)} / mes`;
    } else if (totals.referenceOneTime !== null) {
      referenceElement.textContent = formatMoney(totals.referenceOneTime, referenceCurrency);
    } else if (totals.referenceMonthly !== null) {
      referenceElement.textContent = `${formatMoney(totals.referenceMonthly, referenceCurrency)} / mes`;
    } else {
      referenceElement.textContent = '—';
    }

    document.querySelector('[data-estimated-total]').setAttribute('aria-label',
      totals.primaryOneTime !== null
        ? `Total de pago único ${formatMoney(totals.oneTimeTotal, currentCurrency)}.`
        : totals.primaryMonthly !== null
          ? `Total mensual ${formatMoney(totals.monthlyTotal, currentCurrency)} por mes.`
          : 'No hay servicios con precio seleccionados.');
    renderRecommendations();
  }

  function calculateCurrencyTotals(currency) {
    const selected = selectedServices();
    const validCombos = estimate.appliedCombos.map(serviceById)
      .filter((combo) => combo && amountFor(combo, currency) !== null && !isEvaluationOnly(combo, currency));
    const coveredIds = new Set(validCombos.flatMap((combo) => comboComponents(combo.id)));
    const oneTimeServices = selected.filter((service) => !isMonthly(service) && !isEvaluationOnly(service, currency) && amountFor(service, currency) !== null);
    const monthlyServices = selected.filter((service) => isMonthly(service) && !isEvaluationOnly(service, currency) && amountFor(service, currency) !== null);
    const uncoveredOneTime = oneTimeServices.filter((service) => !coveredIds.has(service.id));
    const uncoveredMonthly = monthlyServices.filter((service) => !coveredIds.has(service.id));
    const comboOriginal = validCombos.reduce((sum, combo) => sum + comboComponents(combo.id).map(serviceById)
      .filter((service) => service && amountFor(service, currency) !== null && !isEvaluationOnly(service, currency))
      .reduce((part, service) => part + amountFor(service, currency), 0), 0);
    const comboTotal = validCombos.reduce((sum, combo) => sum + amountFor(combo, currency), 0);
    const uncoveredOneTimeTotal = uncoveredOneTime.reduce((sum, service) => sum + amountFor(service, currency), 0);
    const monthlyTotal = uncoveredMonthly.reduce((sum, service) => sum + amountFor(service, currency), 0);
    return { subtotal: uncoveredOneTimeTotal + comboOriginal, savings: Math.max(0, comboOriginal - comboTotal), oneTimeTotal: uncoveredOneTimeTotal + comboTotal, monthlyTotal, hasOneTime: oneTimeServices.length > 0 || validCombos.length > 0, hasMonthly: monthlyServices.length > 0 };
  }

  function calculateTotals() {
    const primary = calculateCurrencyTotals(currentCurrency);
    const referenceCurrency = currentCurrency === 'ARS' ? 'USD' : 'ARS';
    const reference = calculateCurrencyTotals(referenceCurrency);
    return { ...primary, primaryOneTime: primary.hasOneTime ? primary.oneTimeTotal : null, primaryMonthly: primary.hasMonthly ? primary.monthlyTotal : null, referenceOneTime: reference.hasOneTime ? reference.oneTimeTotal : null, referenceMonthly: reference.hasMonthly ? reference.monthlyTotal : null, referenceCurrency };
  }

  function renderFinalDiagnosisRecommendation() {
    if (!estimate.needs.includes('guidance') || !diagnosisIsComplete()) return;
    const recommendation = getDiagnosisRecommendation();
    if (!recommendation) return;
    const service = serviceById(recommendation.id);
    if (!service) return;

    const card = document.createElement('div');
    card.className = 'project-builder-final-recommendation';
    card.dataset.finalDiagnosisRecommendation = '';

    const eyebrow = document.createElement('p');
    eyebrow.className = 'project-builder-final-recommendation-eyebrow';
    eyebrow.textContent = 'Nuestra recomendación';
    const title = document.createElement('h4');
    title.textContent = service.name;
    const reason = document.createElement('p');
    reason.textContent = recommendation.reason;
    const price = document.createElement('p');
    price.className = 'project-builder-final-recommendation-price';
    const primaryAmount = amountFor(service, currentCurrency);
    const referenceCurrency = currentCurrency === 'ARS' ? 'USD' : 'ARS';
    const referenceAmount = amountFor(service, referenceCurrency);
    price.textContent = primaryAmount === null
      ? 'Precio a confirmar'
      : `${formatMoney(primaryAmount, currentCurrency)}${referenceAmount === null ? '' : ` · Referencia ${formatMoney(referenceAmount, referenceCurrency)}`}`;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'home-button home-button-primary';
    const alreadyAdded = estimate.selectedServices.includes(service.id);
    button.textContent = alreadyAdded ? 'Agregado a mi solución' : 'Agregar a mi solución';
    button.disabled = alreadyAdded;
    button.addEventListener('click', () => {
      addService(service.id);
      renderFinalEstimate();
      announce(`${service.name} se agregó a tu estimación.`);
    });

    card.append(eyebrow, title, reason, price, button);
    elements.finalSummary.append(card);
  }

  function renderFinalEstimate() {
    elements.estimateReference.textContent = estimate.id;
    elements.finalSummary.replaceChildren();
    const needs = estimate.needs.map((need) => NEED_LABELS[need]).filter(Boolean);
    const needsCopy = document.createElement('p');
    needsCopy.textContent = `Necesidades: ${needs.length ? needs.join(', ') : 'Sin selección'}`;
    elements.finalSummary.append(needsCopy);
    if (estimate.needs.includes('organization')) {
      const selectedPlatform = PRODUCTIVITY_PLATFORMS.find(([value]) => value === estimate.answers.productivityPlatform);
      const platformCopy = document.createElement('p');
      platformCopy.textContent = `Plataforma: ${selectedPlatform ? selectedPlatform[1] : 'No indicada'}`;
      elements.finalSummary.append(platformCopy);
    }

    renderFinalDiagnosisRecommendation();
    const totals = calculateTotals();
    const totalCopy = document.createElement('p');
    totalCopy.textContent = totals.primaryOneTime === null && totals.primaryMonthly === null
      ? 'Todavía no agregaste servicios a tu estimación. Podés sumar la recomendación de KyTech o seguir modificando tus respuestas.'
      : `Pago único ${currentCurrency}: ${totals.primaryOneTime === null ? '—' : formatMoney(totals.oneTimeTotal, currentCurrency)}. Servicios mensuales: ${totals.primaryMonthly === null ? '—' : `${formatMoney(totals.monthlyTotal, currentCurrency)} por mes`}. Ahorro: ${formatMoney(totals.savings, currentCurrency)}.`;
    elements.finalSummary.append(totalCopy);

    const contentLists = [
      [elements.finalOneTime, elements.solutionOneTime],
      [elements.finalMonthly, elements.solutionMonthly],
      [elements.finalAvailability, elements.solutionAvailability],
      [elements.finalEvaluation, elements.solutionEvaluation]
    ];
    contentLists.forEach(([target, source]) => {
      target.replaceChildren();
      const list = document.createElement('ul');
      [...source.children].forEach((item) => {
        const copy = document.createElement('li');
        copy.textContent = [...item.querySelectorAll(':scope > span')]
          .map((part) => part.textContent.trim())
          .filter(Boolean)
          .join(' · ') || item.textContent.replace('Quitar', '').trim();
        list.append(copy);
      });
      if (!list.children.length) {
        const empty = document.createElement('p');
        empty.textContent = 'Ninguno seleccionado.';
        target.append(empty);
      } else {
        target.append(list);
      }
    });

    if (!elements.finalSummary.querySelector('[data-final-reference-total]') &&
        (totals.referenceOneTime !== null || totals.referenceMonthly !== null)) {
      const reference = document.createElement('p');
      reference.dataset.finalReferenceTotal = '';
      reference.textContent = `Referencia ${totals.referenceCurrency}: pago único ${totals.referenceOneTime === null ? '—' : formatMoney(totals.referenceOneTime, totals.referenceCurrency)}; mensual ${totals.referenceMonthly === null ? '—' : `${formatMoney(totals.referenceMonthly, totals.referenceCurrency)} por mes`}.`;
      elements.finalSummary.append(reference);
    }
  }

  function onNeedChange(changedInput) {
    const guidance = elements.form.querySelector('[data-need-option][value="guidance"]');
    const otherNeeds = [...elements.form.querySelectorAll('[data-need-option]:not([value="guidance"])')];
    if (changedInput.value === 'guidance' && changedInput.checked) {
      otherNeeds.forEach((input) => { input.checked = false; });
      return;
    }
    if (changedInput.value !== 'guidance' && changedInput.checked) guidance.checked = false;
  }

  function buildContactPayload() {
    const totals = calculateTotals();
    const services = selectedServices().map((service) => ({
      id: service.id,
      name: service.name,
      monthly: isMonthly(service),
      availability: isAvailability(service),
      evaluation: isEvaluationOnly(service),
      ars: service.ars,
      usd: service.usd
    }));
    const combos = estimate.appliedCombos.map(serviceById).filter(Boolean).map((combo) => ({
      id: combo.id,
      name: combo.name,
      ars: combo.ars,
      usd: combo.usd
    }));
    const platform = PRODUCTIVITY_PLATFORMS.find(([value]) => value === estimate.answers.productivityPlatform)?.[1] || '';
    return {
      id: estimate.id,
      currency: currentCurrency,
      needs: estimate.needs.map((need) => NEED_LABELS[need]).filter(Boolean),
      platform,
      services,
      combos,
      oneTimeArs: calculateCurrencyTotals('ARS').hasOneTime ? calculateCurrencyTotals('ARS').oneTimeTotal : null,
      monthlyArs: calculateCurrencyTotals('ARS').hasMonthly ? calculateCurrencyTotals('ARS').monthlyTotal : null,
      oneTimeUsd: calculateCurrencyTotals('USD').hasOneTime ? calculateCurrencyTotals('USD').oneTimeTotal : null,
      monthlyUsd: calculateCurrencyTotals('USD').hasMonthly ? calculateCurrencyTotals('USD').monthlyTotal : null,
      savingsArs: calculateCurrencyTotals('ARS').savings,
      savingsUsd: calculateCurrencyTotals('USD').savings,
      answers: estimate.answers
    };
  }

  function prepareContactNavigation() {
    const link = document.querySelector('[data-continue-to-contact]');
    if (!link) return;
    link.href = 'contacto.html?desde=estimacion';
    link.addEventListener('click', () => {
      persistEstimate();
      try {
        localStorage.setItem('kytech.project-builder.contact.v1', JSON.stringify(buildContactPayload()));
      } catch (error) {
        console.error('No se pudo preparar la estimación para Contacto.', error);
      }
    });
  }

  elements.form.addEventListener('submit', (event) => event.preventDefault());
  elements.form.addEventListener('change', (event) => {
    if (event.target.matches('[data-need-option]')) onNeedChange(event.target);
  });
  elements.next.addEventListener('click', continueAssistant);
  elements.previous.addEventListener('click', previousStep);
  elements.currencyButtons.forEach((button) => {
    button.addEventListener('click', () => changeCurrency(button.dataset.currency));
  });

  const resetButton = document.createElement('button');
  resetButton.type = 'button';
  resetButton.className = 'home-button';
  resetButton.textContent = 'Borrar y empezar de nuevo';
  resetButton.dataset.resetEstimate = '';
  resetButton.addEventListener('click', clearAndRestart);
  document.querySelector('.project-builder-navigation').append(resetButton);
  document.querySelector('[data-edit-estimation]').addEventListener('click', editEstimate);

  restoreEstimate();
  prepareContactNavigation();
  renderCurrencyButtons();
  const needsWereSaved = estimate.needs.length > 0;
  stepIndex = estimate.completed ? 0 : (needsWereSaved ? 1 : 0);
  elements.finalScreen.hidden = true;
  elements.workspace.hidden = false;
  renderStep();
  renderSolution();
  loadCatalog();

  if (estimate.completed) {
    elements.workspace.hidden = true;
    elements.finalScreen.hidden = false;
    renderFinalEstimate();
  }
})();
