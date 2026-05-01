//   console.log(
//     "-----------------------------------------------------------------",
//   );
//   console.log(" START FUNCTION");
//   console.log(
//     "-----------------------------------------------------------------",
//   );

//VARIABILI

function creaCalendario(data_oggi) {
  if (!data_oggi || !isValidDate_calendar(data_oggi)) {
    data_oggi = new Date();
  }

  //---------------------------------------------------------------
  //            Funzionizzare con un parametro data
  //---------------------------------------------------------------

  //LOGICA
  const datadiRiferimento = creaData_calendar(data_oggi);
  console.log("data elaborata ->", datadiRiferimento);

  const giornidelMese = getGiorniDelMese_calendar(
    datadiRiferimento.anno,
    datadiRiferimento.mese,
  );
  console.log("mese ->", giornidelMese);
}

// Funzioni
function creaDiveAppendi(
  divClass,
  elPadre,
  contDiv = "",
  divId = "",
  divName = "",
  divValue = "",
) {
  const div = document.createElement("div");
  div.className = divClass;
  div.innerHTML = contDiv;

  elPadre.appendChild(div);
  return div;
}

function creaTageAppendi(
  divTypeMaster,
  elPadre,
  divClass = "",
  contDiv = "",
  divType = "",
  divName = "",
  divValue = "",
  divId = "",
) {
  const div = document.createElement(divTypeMaster);
  divClass ? (div.className = divClass) : "";
  contDiv ? (div.innerHTML = contDiv) : "";
  divType ? (div.type = divType) : "";
  divName ? (div.name = divName) : "";
  divId ? (div.id = divId) : "";

  elPadre.appendChild(div);
  return div;
}

function creaBtneAppendi(
  divClass,
  elPadre,
  contDiv = "",
  divId = "",
  divName = "",
  divValue = "",
) {
  const div = document.createElement("button");
  div.className = divClass;
  div.innerHTML = contDiv;

  elPadre.appendChild(div);
  return div;
}

function creaData_calendar(data) {
  if (!data || !isValidDate_calendar(data)) {
    data = new Date();
  }

  const anno = data.getFullYear();
  const mese = data.getMonth();
  const giornoNumerico = data.getDate();
  const giornoSettimana = data.getDay();

  return {
    anno: anno,
    mese: mese,
    meseItaliano: mesiArray[mese],
    giornoNumerico: giornoNumerico,
    giornoSettimana: giornoSettimana,
    giornoSettimanaNome: giorniSettimanaArray[giornoSettimana],
  };
}

function isValidDate_calendar(date) {
  return date instanceof Date && !isNaN(date);
}

function getGiorniDelMese_calendar(anno, mese) {
  const ultimoGiorno = new Date(anno, mese + 1, 0).getDate();
  const giorniMese = [];

  for (let giorno = 1; giorno <= ultimoGiorno; giorno++) {
    giorniMese.push(new Date(anno, mese, giorno));
  }

  return giorniMese;
}
//---------------------------------------------------------------
//            Funzionizzare con un parametro data
//---------------------------------------------------------------
//---------------------------------------------------------------
//           cambio data
//---------------------------------------------------------------

// function cambiaDataDaEl(el) {
//   console.log("cambiaDataDaEl() con valore= ", el.value);
//   const date = parseInputDate(el.value);
//   creaCalendario(date);
// }

// function cambiaDat(date) {
//   console.log("cambiaDat() con valore= ", date);
//   const date_form = parseInputDate(date);
//   creaCalendario(date_form);
// }

function parseInputDate(valore) {
  if (!valore) return new Date();

  const [anno, mese, giorno] = valore.split("-").map(Number);

  return new Date(anno, mese - 1, giorno);
}

function animaIngressoCard(card, index) {
  if (abilitaAnimazioneIngressoCard) {
    card.classList.add("card-enter");
    card.style.animationDelay = `${index * 25}ms`;
  }
}

function setAbilitaHoverPerCambioAnno(val) {
  abilitaHoverPerCambioAnno = Boolean(val);
}

function abilitaDragRange(card, giornotradotto) {
  card.addEventListener("pointerdown", (e) => {
    if (mostraDebugFunzioni_start) {
      console.log("pointerdown");
    }
    if (!isRange || !startDate || !endDate) return;

    if (card.classList.contains("selectedFirstDEF")) {
      draggingRange = true;
      draggingEdge = "start";

      dragIniziato = true;
      dragHaMosso = false;
      e.preventDefault();
    }

    if (card.classList.contains("selectedEnd")) {
      draggingRange = true;
      draggingEdge = "end";

      dragIniziato = true;
      dragHaMosso = false;
      e.preventDefault();
    }
  });

  card.addEventListener("pointerover", () => {
    if (mostraDebugFunzioni_start) {
      console.log("pointerover");
    }
    if (!draggingRange || !draggingEdge) return;

    const nuovaData = giornotradotto;

    if (draggingEdge === "start") {
      const nuovaStartTime = new Date(
        nuovaData.anno,
        nuovaData.mese,
        nuovaData.giornoNumerico,
      ).getTime();

      const endTime = new Date(
        endDate.anno,
        endDate.mese,
        endDate.giornoNumerico,
      ).getTime();

      if (nuovaStartTime <= endTime) {
        startDate = nuovaData;
      }
    }

    if (draggingEdge === "end") {
      const nuovaEndTime = new Date(
        nuovaData.anno,
        nuovaData.mese,
        nuovaData.giornoNumerico,
      ).getTime();

      const startTime = new Date(
        startDate.anno,
        startDate.mese,
        startDate.giornoNumerico,
      ).getTime();

      if (nuovaEndTime >= startTime) {
        endDate = nuovaData;
      }
    }

    aggiornaInputRange();
    applicaRangeSelezionato();
  });
}

function aggiornaInputRange() {
  if (mostraDebugFunzioni_start) {
    console.log("func aggiornaInputRange");
  }
  const input1 = calendar.querySelector(".inputHidden1");
  const input2 = calendar.querySelector(".inputHidden2");
  const fakeInput1 = calendar.querySelector(".footer_calendar_input1");
  const fakeInput2 = calendar.querySelector(".footer_calendar_input2");

  if (input1 && startDate) {
    const val = formatDateForInput(startDate);

    if (input1.value !== val) {
      input1.value = val;
      aggiornaFakeInput(fakeInput1, startDate, "start");
    }
  } else {
    if (input1) input1.value = "";
    aggiornaFakeInput(fakeInput1, null);
  }

  //NASCONDI ELEMENTO DATA SE C'è SOLO STARTDATE
  const dataUnica = sonoStessaData(startDate, endDate);

  if (fakeInput1) {
    aggiornaFakeInput(fakeInput1, startDate, "start");
  }

  if (fakeInput2) {
    if (!endDate || dataUnica) {
      fakeInput2.classList.add("hidden");
    } else {
      fakeInput2.classList.remove("hidden");
      aggiornaFakeInput(fakeInput2, endDate, "end");
    }
  }

  if (input2 && endDate) {
    const val = formatDateForInput(endDate);

    if (input2.value !== val) {
      input2.value = val;
      aggiornaFakeInput(fakeInput2, endDate, "end");
    }
  } else {
    if (input2) input2.value = "";
    aggiornaFakeInput(fakeInput2, null);
  }
}

function aggiornaConAnim(el, newVal) {
  if (mostraDebugFunzioni_start) {
    console.log("func aggiornaConAnim");
  }
  if (el.textContent !== newVal) {
    el.textContent = newVal;

    el.classList.remove("animate");
    void el.offsetWidth;
    el.classList.add("animate");
  }
}

function formatDateForInput(dateObj) {
  if (mostraDebugFunzioni_start) {
    console.log("func formatDateForInput");
  }
  return (
    dateObj.anno +
    "-" +
    String(dateObj.mese + 1).padStart(2, "0") +
    "-" +
    String(dateObj.giornoNumerico).padStart(2, "0")
  );
}

function formatDateForFakeInput(dateObj) {
  const d = new Date(dateObj.anno, dateObj.mese, dateObj.giornoNumerico);

  const parts = d
    .toLocaleDateString("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .split(" ");

  return parts; // ["13", "aprile", "2025"]
}

function getDateFromCard(card) {
  if (!card || !card.dataset.anno) return null;

  return {
    anno: Number(card.dataset.anno),
    mese: Number(card.dataset.mese),
    giornoNumerico: Number(card.dataset.giorno),
  };
}

function vaiAlMese(anno, mese) {
  annodiCalendar = anno;
  mesediCalendar = mese;

  generaCalendario(anno, mese);
}

function getMeseOffset(anno, mese, offset) {
  const data = new Date(anno, mese + offset, 1);

  return {
    anno: data.getFullYear(),
    mese: data.getMonth(),
  };
}

function mostraDragHoverLoader(e, direzione) {
  nascondiDragHoverLoader();

  dragHoverLoader = document.createElement("div");
  dragHoverLoader.className = `drag-hover-loader ${direzione}`;

  document.body.appendChild(dragHoverLoader);
  aggiornaDragHoverLoader(e);
}

function aggiornaDragHoverLoader(e) {
  if (!dragHoverLoader) return;

  dragHoverLoader.style.left = e.clientX + "px";
  dragHoverLoader.style.top = e.clientY + "px";
}

function nascondiDragHoverLoader() {
  if (!dragHoverLoader) return;

  dragHoverLoader.remove();
  dragHoverLoader = null;
}

function aggiornaFakeInput(fakeInput, date, tipo) {
  const wrapper = fakeInput.querySelector(".wrapper-date");
  checkBottoniNavDate(
    dataDiRiferimento?.anno,
    dataDiRiferimento?.mese,
    wrapper,
  );

  const dayEl = wrapper.querySelector(".day");
  const meseEl = wrapper.querySelector(".mese");
  const annoEl = wrapper.querySelector(".anno");

  // bottone X
  let clearBtn = wrapper.querySelector(".clear-date");
  // bottone <i class="fa-solid fa-arrow-rotate-left"></i>
  let goToDate = wrapper.querySelector(".btn-gotodate");

  if (!date) {
    aggiornaConAnim(dayEl, "");
    aggiornaConAnim(meseEl, "");
    aggiornaConAnim(annoEl, "");

    if (clearBtn) clearBtn.remove();
    if (goToDate) goToDate.remove();

    return;
  }

  const [day, mese, anno] = formatDateForFakeInput(date);

  aggiornaConAnim(dayEl, day);
  aggiornaConAnim(meseEl, mese);
  aggiornaConAnim(annoEl, anno);

  // crea bottone se non esiste
  if (!goToDate) {
    goToDate = document.createElement("button");
    goToDate.className = "btn-gotodate";
    const classe = tipo === "start" ? "date1" : "date2";
    goToDate.classList.add(classe);
    // console.log("aggiungo classe hidden");
    goToDate.classList.add("hidden");
    goToDate.innerHTML = '<i class="fa-solid fa-calendar"></i>';

    wrapper.appendChild(goToDate);

    goToDate.addEventListener("click", (e) => {
      e.stopPropagation();
      const mid_calendariocentrale = calendar.querySelector(".mid_main");

      if (tipo === "start") {
        //console.log("inizio");
        popolaCalendarConGiorni(
          startDate.anno,
          startDate.mese,
          mid_calendariocentrale,
        );
      }
      if (tipo === "end") {
        //console.log("fine");
        popolaCalendarConGiorni(
          endDate.anno,
          endDate.mese,
          mid_calendariocentrale,
        );
      }
    });
  }
  if (!clearBtn) {
    clearBtn = document.createElement("span");
    clearBtn.className = "clear-date";
    clearBtn.innerHTML = "✕";

    wrapper.appendChild(clearBtn);

    clearBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      if (tipo === "start") {
        startDate = null;
        if (endDate) {
          endDate = null;
        }
      }
      if (tipo === "end") endDate = null;

      aggiornaInputRange();
      applicaRangeSelezionato();
    });
  }
}
//CONFRONTO DATE
function sonoStessaData(a, b) {
  if (!a || !b) return false;

  return (
    a.anno === b.anno &&
    a.mese === b.mese &&
    a.giornoNumerico === b.giornoNumerico
  );
}

function calendarDataToTime(data) {
  return new Date(data.anno, data.mese, data.giornoNumerico).getTime();
}

function parseDateInputToDate(val) {
  const [anno, mese, giorno] = val.split("-").map(Number);
  return new Date(anno, mese - 1, giorno);
}

//CONFIGURAZIONE CSS
function applicaCalendarTheme(themeConfig = CALENDAR_THEME) {
  const root = document.documentElement;

  Object.entries(themeConfig).forEach(([nomeVariabile, valore]) => {
    root.style.setProperty(nomeVariabile, valore);
  });
}

function aggiornaVariabileTema(nomeVariabile, valore) {
  console.log("setto", nomeVariabile, valore);

  document.documentElement.style.setProperty(nomeVariabile, valore);
  CALENDAR_THEME[nomeVariabile] = valore;
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }) {
  return (
    "#" +
    [r, g, b]
      .map((v) =>
        Math.max(0, Math.min(255, Math.round(v)))
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}

function mixColor(hex1, hex2, amount = 0.5) {
  const c1 = hexToRgb(hex1);
  const c2 = hexToRgb(hex2);

  return rgbToHex({
    r: c1.r + (c2.r - c1.r) * amount,
    g: c1.g + (c2.g - c1.g) * amount,
    b: c1.b + (c2.b - c1.b) * amount,
  });
}

function alphaHex(hex, alpha = "55") {
  return hex + alpha;
}

function applicaTemaDaColore(base) {
  const temaGenerato = generaTemaDaColore(base);

  Object.entries(temaGenerato).forEach(([variabile, valore]) => {
    aggiornaVariabileTema(variabile, valore);
  });
}

function getLuminosita(hex) {
  const { r, g, b } = hexToRgb(hex);

  // formula standard percezione luminosità
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function generaTemaDaColore(base) {
  const luminosita = getLuminosita(base);
  const isDark = luminosita < 0.45;

  const chiaro = mixColor(base, "#ffffff", 0.55);
  const chiarissimo = mixColor(base, "#ffffff", 0.78);
  const scuro = mixColor(base, "#000000", 0.35);
  const scurissimo = mixColor(base, "#000000", 0.6);

  const textColor = isDark ? "#ffffff" : "#111111";
  const textBorderColor = isDark ? "#00000055" : "#ffffff66";
  const loaderSfondo = isDark ? alphaHex(scuro, "99") : alphaHex(scuro, "66");
  const loaderColor = isDark ? "#ffffff" : "#111111";

  const headerText = isDark ? "#ffffff" : "#111111";
  const headerBg = isDark
    ? alphaHex(base, "33") // più visibile su tema scuro
    : alphaHex(base, "12"); // più leggero su tema chiaro

  return {
    "--text-border-color": textBorderColor,

    "--bordercolor_card": alphaHex(base, "00"),
    "--background-card": "transparent",

    "--borderSelectedColor": base,
    "--borderSelected": `linear-gradient(45deg, ${base}, ${chiaro})`,

    "--background-card-selected_def": `linear-gradient(45deg, ${base}, ${chiaro})`,
    "--background-card-selected_def-hover": `linear-gradient(45deg, ${chiaro}, ${chiarissimo})`,

    "--background-card-selected_prov": alphaHex(base, "61"),
    "--background-card-selected": alphaHex(base, "26"),

    "--borderSelected_border": isDark ? chiaro : scuro,
    "--borderSelected_border_prov": alphaHex(textColor, "00"),

    "--bordercolor_card-vuote": alphaHex(base, "00"),
    "--background-card-vuote": alphaHex(base, "12"),

    "--background-card-vuota-selected": alphaHex(base, "12"),
    "--shadow-card-vuota-selected": alphaHex(chiaro, "3b"),
    "--background-card-vuota-selected_def": alphaHex(base, "26"),

    "--shadow-selected": alphaHex(scuro, "55"),

    "--calendar-text-selected": textColor,
    "--calendar-text-selected-soft": isDark ? "#f5f5f5" : "#1a1a1a",
    "--calendar-accent-dark": scuro,
    "--calendar-accent-light": chiaro,
    "--calendar-accent-extra-light": chiarissimo,
    "--colore_loader_sfondo": loaderSfondo,
    "--colore_loader": loaderColor,
    "--colore_heacolore_header_sfondoder": headerBg,
    "--colore_header": headerText,
  };
}
//uso
//aggiornaVariabileTema("--background-card-selected_prov", "#ffcc0033");
