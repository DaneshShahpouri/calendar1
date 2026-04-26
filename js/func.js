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

function cambiaDataDaEl(el) {
  console.log("cambiaDataDaEl() con valore= ", el.value);
  const date = parseInputDate(el.value);
  creaCalendario(date);
}
function cambiaDat(date) {
  console.log("cambiaDat() con valore= ", date);
  const date_form = parseInputDate(date);
  creaCalendario(date_form);
}

function parseInputDate(valore) {
  if (!valore) return new Date();

  const [anno, mese, giorno] = valore.split("-").map(Number);

  return new Date(anno, mese - 1, giorno);
}

function animaIngressoCard(card, index) {
  if (animaIngressoCard) {
    card.classList.add("card-enter");
    card.style.animationDelay = `${index * 25}ms`;
  }
}

function setAbilitaHoverPerCambioAnno(val) {
  abilitaHoverPerCambioAnno = Boolean(val);
}

function abilitaDragRange(card, giornotradotto) {
  card.addEventListener("pointerdown", (e) => {
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
  const input1 = calendar.querySelector(".inputHidden1");
  const input2 = calendar.querySelector(".inputHidden2");

  if (input1 && startDate) {
    input1.value = formatDateForInput(startDate);
  }

  if (input2 && endDate) {
    input2.value = formatDateForInput(endDate);
  }
}

function formatDateForInput(dateObj) {
  return (
    dateObj.anno +
    "-" +
    String(dateObj.mese + 1).padStart(2, "0") +
    "-" +
    String(dateObj.giornoNumerico).padStart(2, "0")
  );
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

function mostraDragHoverLoader(e) {
  nascondiDragHoverLoader();

  dragHoverLoader = document.createElement("div");
  dragHoverLoader.className = "drag-hover-loader";

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
