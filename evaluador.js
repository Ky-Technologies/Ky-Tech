(() => {
  const areas = [
    {
      id: "presencia",
      name: "Presencia digital",
      questions: [
        "¿Tu sitio explica claramente qué hace tu empresa y para quién?",
        "¿Tu sitio funciona correctamente en celular y tiene una acción clara para contactar?",
        "¿Podés medir visitas, búsquedas y contactos generados desde la web?"
      ],
      recommendation: {
        title: "Fortalecé tu presencia digital",
        description: "Revisá si tu sitio explica claramente la propuesta, funciona bien en celular y permite medir las acciones importantes.",
        resources: [
          {
            title: "¿Tu empresa necesita una nueva página web?",
            href: "assets/recursos/01_checklist_necesita_nueva_pagina_web.pdf",
            label: "Descargar checklist web ↓"
          },
          {
            title: "Checklist SEO para PyMEs",
            href: "assets/recursos/02_checklist_seo_para_pymes.pdf",
            label: "Descargar checklist SEO ↓"
          }
        ]
      }
    },
    {
      id: "microsoft365",
      name: "Microsoft 365",
      questions: [
        "¿Cada persona utiliza una cuenta corporativa individual para trabajar?",
        "¿Usuarios, licencias y accesos se administran de forma ordenada?",
        "¿Tienen definido para qué usar Outlook, Teams, OneDrive y SharePoint?"
      ],
      recommendation: {
        title: "Ordená cuentas, herramientas y accesos",
        description: "Definí una estructura clara para usuarios, licencias, correo, Teams, OneDrive y SharePoint.",
        resources: [
          {
            title: "Microsoft 365 para PyMEs",
            href: "assets/recursos/03_guia_ordenar_microsoft_365.pdf",
            label: "Descargar guía de Microsoft 365 ↓"
          }
        ]
      }
    },
    {
      id: "colaboracion",
      name: "Organización y colaboración",
      questions: [
        "¿El equipo sabe dónde debe guardar cada tipo de documento?",
        "¿Pueden identificar fácilmente cuál es la versión actual de un archivo compartido?",
        "¿Los permisos se asignan según funciones o grupos y se revisan cuando alguien cambia de rol?"
      ],
      recommendation: {
        title: "Ordená dónde vive la información del equipo",
        description: "Definí espacios compartidos, responsables, versiones y reglas simples de acceso.",
        resources: [
          {
            title: "Cómo organizar archivos y trabajo en equipo",
            href: "assets/recursos/04_guia_organizar_archivos_trabajo_equipo.pdf",
            label: "Descargar guía de organización ↓"
          }
        ]
      }
    },
    {
      id: "automatizacion",
      name: "Automatización",
      questions: [
        "¿Tienen identificadas las tareas administrativas que se repiten frecuentemente?",
        "¿Los avisos, aprobaciones o actualizaciones repetitivas están automatizados cuando tiene sentido?",
        "¿Pueden detectar errores o saber qué ocurrió cuando un proceso automático falla?"
      ],
      recommendation: {
        title: "Identificá qué tareas repetitivas vale la pena simplificar",
        description: "Empezá por procesos frecuentes, claros y medibles antes de elegir una herramienta.",
        resources: [
          {
            title: "¿Qué tareas de tu empresa podrías automatizar?",
            href: "assets/recursos/05_checklist_tareas_para_automatizar.pdf",
            label: "Descargar checklist de automatización ↓"
          }
        ]
      }
    },
    {
      id: "ia",
      name: "Inteligencia artificial",
      questions: [
        "¿Tienen casos concretos donde la inteligencia artificial aporte valor al trabajo diario?",
        "¿Está definido qué información puede y no puede utilizarse con herramientas de inteligencia artificial?",
        "¿Existe revisión humana de los resultados antes de utilizarlos en tareas importantes?"
      ],
      recommendation: {
        title: "Elegí un primer caso de uso concreto",
        description: "Empezá por una tarea, definí qué información puede utilizarse y quién revisará el resultado.",
        resources: [
          {
            title: "IA en tu empresa: por dónde empezar",
            href: "assets/recursos/06_guia_ia_en_empresa_por_donde_empezar.pdf",
            label: "Descargar guía de inteligencia artificial ↓"
          }
        ]
      }
    },
    {
      id: "soporte",
      name: "Soporte y continuidad",
      questions: [
        "¿Las personas saben a quién recurrir cuando tienen un problema tecnológico?",
        "¿Existe un proceso definido para altas, bajas y cambios de accesos?",
        "¿Los problemas recurrentes se registran para evitar resolverlos desde cero cada vez?"
      ],
      recommendation: {
        title: "Definí responsables y procesos de continuidad",
        description: "Organizá la atención de problemas y los procesos de alta, baja y cambio de accesos.",
        resources: [
          {
            title: "Checklist tecnológico para incorporar un nuevo colaborador",
            href: "assets/recursos/07_checklist_alta_tecnologica_colaborador.pdf",
            label: "Descargar checklist de incorporación ↓"
          }
        ]
      }
    }
  ];

  const responses = [
    { value: "yes", label: "Sí", points: 2 },
    { value: "partial", label: "Parcialmente", points: 1 },
    { value: "no", label: "No", points: 0 }
  ];
  const generalLevels = [
    {
      minimum: 0,
      maximum: 9,
      name: "Base por ordenar",
      description: "Tu empresa tiene oportunidades importantes para construir una base digital más clara. El mejor próximo paso es ordenar primero los aspectos fundamentales y avanzar por etapas."
    },
    {
      minimum: 10,
      maximum: 18,
      name: "En desarrollo",
      description: "Tu empresa ya cuenta con algunas prácticas y herramientas digitales, pero todavía hay áreas que dependen de procesos informales o poco conectados."
    },
    {
      minimum: 19,
      maximum: 29,
      name: "Bien encaminada",
      description: "Tu empresa ya cuenta con varias bases digitales. Las mayores oportunidades están en ordenar algunos procesos y aprovechar mejor las herramientas disponibles."
    },
    {
      minimum: 30,
      maximum: 36,
      name: "Preparada para evolucionar",
      description: "Tu empresa cuenta con una base digital sólida. El próximo paso puede enfocarse en optimizar procesos, mejorar la medición e incorporar soluciones más específicas."
    }
  ];
  const areaLevels = [
    {
      minimum: 0,
      maximum: 1,
      name: "Base por ordenar",
      description: "Hay aspectos fundamentales que conviene ordenar antes de incorporar nuevas herramientas."
    },
    {
      minimum: 2,
      maximum: 3,
      name: "En desarrollo",
      description: "Ya existe una base, pero todavía depende de prácticas informales o poco consistentes."
    },
    {
      minimum: 4,
      maximum: 5,
      name: "Bien encaminada",
      description: "La base funciona. Hay oportunidades concretas para ordenar, medir o simplificar."
    },
    {
      minimum: 6,
      maximum: 6,
      name: "Preparada para evolucionar",
      description: "El área cuenta con una base sólida para avanzar hacia mejoras más específicas."
    }
  ];
  const priorityTieBreak = ["presencia", "microsoft365", "colaboracion", "soporte", "automatizacion", "ia"];
  const questionList = areas.flatMap((area) =>
    area.questions.map((question) => ({ areaId: area.id, question }))
  );
  const root = document.getElementById("digital-evaluator");

  if (!root) return;

  const introScreen = root.querySelector('[data-evaluator-screen="intro"]');
  const introTitle = root.querySelector("#evaluator-title");
  const questionScreen = root.querySelector('[data-evaluator-screen="question"]');
  const resultsScreen = root.querySelector('[data-evaluator-screen="results"]');
  const startButton = root.querySelector("[data-evaluator-start]");
  const questionArea = root.querySelector("[data-question-area]");
  const questionCount = root.querySelector("[data-question-count]");
  const progress = root.querySelector("[data-question-progress]");
  const form = root.querySelector("[data-question-form]");
  const questionContent = root.querySelector("[data-question-content]");
  const questionError = root.querySelector("[data-question-error]");
  const previousButton = root.querySelector("[data-previous]");
  const nextButton = root.querySelector("[data-next]");

  if (
    !introScreen || !introTitle || !questionScreen || !resultsScreen || !startButton ||
    !questionArea || !questionCount || !progress || !form ||
    !questionContent || !questionError || !previousButton || !nextButton
  ) {
    throw new Error("No se pudo inicializar el Evaluador Digital: falta un elemento requerido.");
  }

  if (areas.length !== 6 || questionList.length !== 18 || areas.some((area) => area.questions.length !== 3)) {
    throw new Error("La configuración del Evaluador Digital debe tener 6 áreas con 3 preguntas cada una.");
  }

  const state = { currentQuestion: 0, answers: Array(questionList.length).fill(null) };

  function makeElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function showScreen(screenName) {
    introScreen.hidden = screenName !== "intro";
    questionScreen.hidden = screenName !== "question";
    resultsScreen.hidden = screenName !== "results";
  }

  function renderQuestion() {
    const questionNumber = state.currentQuestion + 1;
    const questionData = questionList[state.currentQuestion];
    const area = areas.find((item) => item.id === questionData.areaId);
    const fieldset = makeElement("fieldset", "evaluator-question-fieldset");
    const legend = makeElement("legend", "", questionData.question);
    const options = makeElement("div", "evaluator-options");

    legend.tabIndex = -1;
    fieldset.append(legend);
    questionArea.textContent = area.name;
    questionCount.textContent = `Pregunta ${questionNumber} de ${questionList.length}`;
    progress.value = questionNumber;
    progress.setAttribute("aria-valuetext", `Pregunta ${questionNumber} de ${questionList.length}`);
    previousButton.hidden = state.currentQuestion === 0;
    nextButton.replaceChildren();
    nextButton.append(document.createTextNode(
      state.currentQuestion === questionList.length - 1 ? "Ver resultado" : "Siguiente "
    ));
    if (state.currentQuestion !== questionList.length - 1) {
      const arrow = makeElement("span", "", "→");
      arrow.setAttribute("aria-hidden", "true");
      nextButton.append(arrow);
    }
    questionError.hidden = true;

    responses.forEach((response) => {
      const optionId = `evaluator-answer-${questionNumber}-${response.value}`;
      const label = makeElement("label", "evaluator-option");
      const input = document.createElement("input");
      const text = makeElement("span", "", response.label);

      input.type = "radio";
      input.name = `evaluator-answer-${questionNumber}`;
      input.id = optionId;
      input.value = response.value;
      input.checked = state.answers[state.currentQuestion] === response.value;
      input.setAttribute("aria-describedby", "evaluator-validation-message");
      input.addEventListener("change", () => {
        state.answers[state.currentQuestion] = response.value;
        questionError.hidden = true;
        options.querySelectorAll(".evaluator-option").forEach((option) => {
          const optionInput = option.querySelector("input");
          option.setAttribute("aria-checked", String(optionInput.checked));
        });
      });

      label.htmlFor = optionId;
      label.setAttribute("aria-checked", String(input.checked));
      label.append(input, text);
      options.append(label);
    });

    fieldset.append(options);
    questionContent.replaceChildren(fieldset);
    showScreen("question");
    legend.focus();
  }

  function getAreaLevel(score) {
    return areaLevels.find((level) => score >= level.minimum && score <= level.maximum);
  }

  function getAreaScores() {
    return areas.map((area) => {
      const areaQuestions = questionList
        .map((item, index) => ({ ...item, answer: state.answers[index] }))
        .filter((item) => item.areaId === area.id);
      const score = areaQuestions.reduce((total, item) => {
        const response = responses.find((option) => option.value === item.answer);
        return total + (response ? response.points : 0);
      }, 0);
      return { area, score, level: getAreaLevel(score) };
    });
  }

  function createAreaCard(result) {
    const card = makeElement("article", "evaluator-area-card");
    const title = makeElement("h4", "", result.area.name);
    const status = makeElement("div", "evaluator-area-status");
    const levelText = makeElement("span", "", result.level.name);
    const segments = makeElement("span", "evaluator-segments");
    const description = makeElement("p", "evaluator-area-description", result.level.description);

    segments.setAttribute("role", "img");
    segments.setAttribute("aria-label", `Indicador de nivel: ${result.level.name}`);
    for (let index = 0; index < 4; index += 1) {
      const segment = makeElement("span", index < areaLevels.indexOf(result.level) + 1 ? "is-active" : "");
      segment.setAttribute("aria-hidden", "true");
      segments.append(segment);
    }
    status.append(levelText, segments);
    card.append(title, status, description);
    return card;
  }

  function createResourceLink(resource) {
    const wrapper = makeElement("div", "");
    wrapper.append(
      makeElement("p", "evaluator-resource-title", resource.title)
    );
    const link = makeElement("a", "evaluator-resource-link", resource.label);
    link.href = resource.href;
    link.download = "";
    wrapper.append(link);
    return wrapper;
  }

  function createPriorityCard(result, number) {
    const card = makeElement("article", "evaluator-priority");
    const resources = makeElement("div", "evaluator-priority-resources");

    card.append(
      makeElement("p", "evaluator-priority-number", `0${number}`),
      makeElement("h4", "", result.area.name),
      makeElement("p", "evaluator-recommendation-title", result.area.recommendation.title),
      makeElement("p", "", result.area.recommendation.description)
    );
    result.area.recommendation.resources.forEach((resource) => {
      resources.append(createResourceLink(resource));
    });
    card.append(resources);
    return card;
  }

  function renderResults() {
    const areaScores = getAreaScores();
    const overallScore = areaScores.reduce((total, result) => total + result.score, 0);
    const overallLevel = generalLevels.find((level) =>
      overallScore >= level.minimum && overallScore <= level.maximum
    );
    const priorityResults = [...areaScores]
      .sort((first, second) =>
        first.score - second.score ||
        priorityTieBreak.indexOf(first.area.id) - priorityTieBreak.indexOf(second.area.id)
      )
      .slice(0, 3);
    const resultsContent = document.createDocumentFragment();
    const resultsTitle = makeElement("h2", "", "Tu diagnóstico digital");
    const overview = makeElement("div", "evaluator-overview");
    const areaTitle = makeElement("h3", "evaluator-section-title", "Estado de tus áreas");
    const areaGrid = makeElement("div", "evaluator-area-grid");
    const priorityTitle = makeElement("h3", "evaluator-section-title", "Tus próximas 3 prioridades");
    const priorityGrid = makeElement("div", "evaluator-priorities");
    const map = makeElement("section", "evaluator-map");
    const finalCta = makeElement("section", "evaluator-final-cta");
    const restartButton = makeElement("button", "evaluator-restart", "Reiniciar diagnóstico");

    resultsTitle.tabIndex = -1;
    overview.append(
      makeElement("p", "evaluator-level", overallLevel.name),
      makeElement("p", "", overallLevel.description)
    );
    areaScores.forEach((result) => areaGrid.append(createAreaCard(result)));
    priorityResults.forEach((result, index) => {
      priorityGrid.append(createPriorityCard(result, index + 1));
    });

    map.append(
      makeElement("h4", "", "Ordená tu panorama completo"),
      makeElement("p", "", "Usá nuestro mapa de prioridades para convertir las oportunidades detectadas en próximos pasos concretos.")
    );
    const mapLink = makeElement("a", "evaluator-resource-link", "Descargar mapa de prioridades ↓");
    mapLink.href = "assets/recursos/08_mapa_prioridades_digitales_pyme.pdf";
    mapLink.download = "";
    map.append(mapLink);

    finalCta.append(
      makeElement("h3", "", "No necesitás resolver todo de una vez"),
      makeElement("p", "", "Si querés, podemos ayudarte a convertir estas prioridades en un plan concreto.")
    );
    const contactLink = makeElement("a", "home-button", "Hablemos de tu proyecto →");
    contactLink.href = "contacto.html";
    finalCta.append(contactLink);

    resultsContent.append(
      makeElement("p", "home-eyebrow", "Evaluador digital"),
      resultsTitle,
      overview,
      areaTitle,
      areaGrid,
      priorityTitle,
      priorityGrid,
      map,
      finalCta,
      restartButton
    );
    resultsScreen.replaceChildren(resultsContent);
    restartButton.type = "button";
    restartButton.addEventListener("click", resetEvaluator);
    showScreen("results");
    resultsTitle.focus();
  }

  function resetEvaluator() {
    state.currentQuestion = 0;
    state.answers.fill(null);
    progress.value = 0;
    questionCount.textContent = "";
    questionArea.textContent = "";
    questionError.hidden = true;
    resultsScreen.replaceChildren();
    questionContent.replaceChildren();
    showScreen("intro");
    introTitle.focus();
  }

  startButton.addEventListener("click", () => {
    state.currentQuestion = 0;
    renderQuestion();
  });

  previousButton.addEventListener("click", () => {
    if (state.currentQuestion > 0) {
      state.currentQuestion -= 1;
      renderQuestion();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (state.answers[state.currentQuestion] === null) {
      questionError.hidden = false;
      questionContent.querySelector("input")?.focus();
      return;
    }
    if (state.currentQuestion === questionList.length - 1) {
      renderResults();
      return;
    }
    state.currentQuestion += 1;
    renderQuestion();
  });
})();
