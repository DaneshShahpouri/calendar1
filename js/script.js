document.addEventListener("DOMContentLoaded", function () {
  //console.log("DOM pronto!");
  //QUESTA è LA DATA DA CUI PARTE IL CALENDARIO (data di oggi di default - imposta mese anno calendario ricerca  e selezione se presente)
  var dataDiRiferimento = creaData_calendar();

  //console.log("dataDiRiferimento: ", dataDiRiferimento);
  //creare Mese e Anno per far partire Calendar

  let annodiCalendar = dataDiRiferimento.anno;
  let mesediCalendar = dataDiRiferimento.mese;
  let meseItalianodiCalendar = dataDiRiferimento.meseItaliano;
  //Qui devo effettivamente creare il calendar centrale
  const calendarCreazione = document.getElementById("calendar");
  calendarCreazione.innerHTML = '<div class="loader_standard"></div>';

  if (!stop_Genera_Calendario) {
    setTimeout(() => {
      calendarCreazione.innerHTML = "";
      //console.log("elemento che sto cercando", calendarCreazione);
      calendarCreazione.classList.remove("loader");

      const header = creaDiveAppendi(
        "_wrapper-counter-mese",
        calendarCreazione,
      );

      //HEADER - LEFT PART
      //----------------------------------------------------------------
      const left_part = creaDiveAppendi("_left", header);
      const left_part_btn = creaBtneAppendi(
        "prev_mouth",
        left_part,
        ' <i class="fa-solid fa-caret-left"></i>',
      );

      //HEADER - center PART
      const center_part = creaDiveAppendi("_center", header);
      //HEADER - right PART
      const right_part = creaDiveAppendi("_right", header);
      const right_part_btn = creaBtneAppendi(
        "prev_mouth",
        right_part,
        ' <i class="fa-solid fa-caret-right"></i>',
      );

      //HEADER - popolamento centrale mese anno
      const wrappercenter = creaDiveAppendi("wrapper-centrale", center_part);
      const wrappercenter_meseanno = creaDiveAppendi(
        "wrapper-centrale_meseanno",
        wrappercenter,
      );
      const meseDiv = creaDiveAppendi(
        "mese",
        wrappercenter_meseanno,
        '<span class="meseCalendar">' + meseItalianodiCalendar + "</span>",
      );

      const annoDiv = creaDiveAppendi(
        "anno",
        wrappercenter_meseanno,
        '<span class="annoCalendar">' + annodiCalendar + "</span>",
      );
      //BTN cambio anno
      const wrappercambioanno = creaDiveAppendi(
        "wrapper_cambioanno_wrapper",
        wrappercenter_meseanno,
      );
      const btnannoProssimo = creaBtneAppendi(
        "wrapper_cambioanno",
        wrappercambioanno,
        '<i class="fa-solid fa-caret-up"></i>',
      );
      const btnannoPassato = creaBtneAppendi(
        "wrapper_cambioanno",
        wrappercambioanno,
        '<i class="fa-solid fa-caret-down"></i>',
      );

      //Aggiungo la classe btn
      left_part_btn.classList.add("_btn");
      right_part_btn.classList.add("_btn");
      btnannoProssimo.classList.add("_btn");
      btnannoPassato.classList.add("_btn");

      //Creazione Calendario Effettivo

      //Wrapper - totale
      const containerCalendar = creaDiveAppendi(
        "container-calendar",
        calendarCreazione,
      );

      //UI top side potrei mettere delle opzioni
      const topSide_containercalendar = creaDiveAppendi(
        "topside",
        containerCalendar,
      );

      if (topbarOpen) {
        topSide_containercalendar.classList.add("open"); //apertura al caricamento del dom
      }

      //Creo option per hover cambio anno
      let inputChecked =
        `<input type="checkbox" name="checkbox_hoverCambioAnno" id="checkbox_hoverCambioAnno" ` +
        (abilitaHoverPerCambioAnno ? `checked` : ``) +
        `>`;
      //console.log("inputChecked", inputChecked);

      const option_hoverCambioAnno = creaDiveAppendi(
        "option_hoverCambioAnno",
        topSide_containercalendar,
        inputChecked,
      );

      const topSide_containercalendar_openbtn = creaDiveAppendi(
        "topside_closeDiv",
        containerCalendar,
        '<button class="_btn" id="closed_btn_topbar"><i class="fa-solid fa-gear"></i></button>',
      );

      //CREAZIONE GIORNI
      //wrapper calendario con dentro -top per giorni settimana - e wrapper delle card giorni
      const calendar_centrale = creaDiveAppendi(
        "calendar_wrapper_main",
        containerCalendar,
      );
      //-top per giorni settimana
      const top_calendariocentrale = creaDiveAppendi(
        "top_main",
        calendar_centrale,
      );

      //CREA INPUT DATE HIDDEN
      const inputHiddenDate1 = creaTageAppendi(
        "input",
        calendar_centrale,
        "inputHidden1",
        "",
        "hidden",
        "date1",
        dataDiRiferimento,
        "date1",
      );

      if (isRange) {
        //CREA INPUT DATE HIDDEN
        const inputHiddenDate2 = creaTageAppendi(
          "input",
          calendar_centrale,
          "inputHidden2",
          "",
          "hidden",
          "date2",
          dataDiRiferimento,
          "date2",
        );

        console.log("inputHiddenDate2: ", inputHiddenDate2);
      }
      //-wrapper delle card
      const mid_calendariocentrale = creaDiveAppendi(
        "mid_main",
        calendar_centrale,
      );

      //fine CREAZIONE GIORNI
      popolaCalendarConGiorni(
        annodiCalendar,
        mesediCalendar,
        mid_calendariocentrale,
      );

      //Aggiungo gli evetnLISTENRE dell'HEADER
      //----------------------------------------------------------------
      left_part_btn.addEventListener("click", () => {
        //console.log("clicco su bottone sinistro - cambio un mese dietro");
        dataDiRiferimento.mese == 0
          ? (dataDiRiferimento.mese = 11)
          : dataDiRiferimento.mese--;
        //console.log("dataDiRiferimento.mese", dataDiRiferimento.mese);
        //console.log("dataDiRiferimento.anno", dataDiRiferimento.anno);
        popolaCalendarConGiorni(
          dataDiRiferimento.anno,
          dataDiRiferimento.mese,
          mid_calendariocentrale,
        );
      });
      right_part_btn.addEventListener("click", () => {
        // console.log("clicco su bottone destro");

        dataDiRiferimento.mese == 11
          ? (dataDiRiferimento.mese = 0)
          : dataDiRiferimento.mese++;
        popolaCalendarConGiorni(
          dataDiRiferimento.anno,
          dataDiRiferimento.mese,
          mid_calendariocentrale,
        );
        //console.log("dataDiRiferimento.mese", dataDiRiferimento.mese);
        //console.log("dataDiRiferimento.anno", dataDiRiferimento.anno);
      });
      btnannoProssimo.addEventListener("click", () => {
        // console.log("clicco su bottone su");
        dataDiRiferimento.anno++;
        popolaCalendarConGiorni(
          dataDiRiferimento.anno,
          dataDiRiferimento.mese,
          mid_calendariocentrale,
        );
        //console.log("dataDiRiferimento.mese", dataDiRiferimento.mese);
        //console.log("dataDiRiferimento.anno", dataDiRiferimento.anno);
      });
      btnannoPassato.addEventListener("click", () => {
        // console.log("clicco su bottone giu");
        dataDiRiferimento.anno--;
        popolaCalendarConGiorni(
          dataDiRiferimento.anno,
          dataDiRiferimento.mese,
          mid_calendariocentrale,
        );
        //console.log("dataDiRiferimento.mese", dataDiRiferimento.mese);
        //console.log("dataDiRiferimento.anno", dataDiRiferimento.anno);
      });

      //hoveranno
      wrappercambioanno.addEventListener("mouseenter", () => {
        if (abilitaHoverPerCambioAnno) {
          //console.log("mouse entrato su bottone anno su");
          annoDiv.querySelector(".annoCalendar").classList.add("hover");
        }
      });
      wrappercambioanno.addEventListener("mouseleave", () => {
        if (abilitaHoverPerCambioAnno) {
          //console.log("mouse usctio su bottone anno su");
          annoDiv.querySelector(".annoCalendar").classList.remove("hover");
        }
      });

      right_part_btn.addEventListener("mouseenter", () => {
        if (abilitaHoverPerCambioAnno) {
          //console.log("mouse entrato su bottone anno su");
          meseDiv.querySelector(".meseCalendar").classList.add("hover");
        }
      });
      right_part_btn.addEventListener("mouseleave", () => {
        if (abilitaHoverPerCambioAnno) {
          //console.log("mouse usctio su bottone anno su");
          meseDiv.querySelector(".meseCalendar").classList.remove("hover");
        }
      });
      left_part_btn.addEventListener("mouseenter", () => {
        if (abilitaHoverPerCambioAnno) {
          //console.log("mouse entrato su bottone anno su");
          meseDiv.querySelector(".meseCalendar").classList.add("hover");
        }
      });
      left_part_btn.addEventListener("mouseleave", () => {
        if (abilitaHoverPerCambioAnno) {
          //console.log("mouse usctio su bottone anno su");
          meseDiv.querySelector(".meseCalendar").classList.remove("hover");
        }
      });

      wrappercenter_meseanno.addEventListener("click", () => {
        console.log("click su anno e mese scelta calendario");
      });

      //Setta hover per cambio anno e mese
      const checkHover = topSide_containercalendar.querySelector(
        "#checkbox_hoverCambioAnno",
      );

      const closed_btn_topbar =
        topSide_containercalendar_openbtn.querySelector("#closed_btn_topbar");

      checkHover.addEventListener("change", () => {
        console.log("click click lcikc", checkHover.checked);
        setAbilitaHoverPerCambioAnno(checkHover.checked);
      });

      closed_btn_topbar.addEventListener("click", () => {
        topSide_containercalendar.classList.toggle("open");
        if (topSide_containercalendar.classList.contains("open")) {
          closed_btn_topbar.classList.add("selected");
        } else {
          closed_btn_topbar.classList.remove("selected");
        }
      });

      //Botton Side - Ui con input date? vediamo
      const footer_calendar = creaDiveAppendi(
        "footer_calendar",
        containerCalendar,
      );
      const input1_footer_calendar = creaDiveAppendi(
        "footer_calendar",
        containerCalendar,
      );
    }, 200);

    //Funzioen che al click di fuori certi elementi mi faccia  chiudere le schede aperte
  }
  calendar.addEventListener(
    "pointerover",
    function (e) {
      const cardVuota = e.target.closest(".cardvuota");

      if (!cardVuota || !draggingRange || !draggingEdge) return;

      aggiornaRangeDaCardVuota(cardVuota);

      const mid_calendariocentrale = calendar.querySelector(".mid_main");

      clearTimeout(dragHoverTimer);
      mostraDragHoverLoader(e);

      dragHoverTimer = setTimeout(() => {
        if (!draggingRange || !draggingEdge) {
          nascondiDragHoverLoader();
          return;
        }

        if (cardVuota.dataset.nav === "prev") {
          cambiaMeseDuranteDrag(-1, mid_calendariocentrale);
        }

        if (cardVuota.dataset.nav === "next") {
          cambiaMeseDuranteDrag(1, mid_calendariocentrale);
        }

        nascondiDragHoverLoader();
        applicaRangeSelezionato();
      }, 1000);
    },
    true,
  );
  calendar.addEventListener(
    "pointerout",
    function (e) {
      const cardVuota = e.target.closest(".cardvuota");
      if (!cardVuota) return;

      clearTimeout(dragHoverTimer);
      dragHoverTimer = null;
      nascondiDragHoverLoader();
    },
    true,
  );

  document.addEventListener("pointerup", () => {
    clearTimeout(dragHoverTimer);
    dragHoverTimer = null;
    nascondiDragHoverLoader();

    draggingRange = false;
    draggingEdge = null;
  });

  function cambiaMeseDuranteDrag(offset, mid_calendariocentrale) {
    const nuovaData = new Date(
      dataDiRiferimento.anno,
      dataDiRiferimento.mese + offset,
      1,
    );

    dataDiRiferimento.anno = nuovaData.getFullYear();
    dataDiRiferimento.mese = nuovaData.getMonth();

    popolaCalendarConGiorni(
      dataDiRiferimento.anno,
      dataDiRiferimento.mese,
      mid_calendariocentrale,
    );
  }
});

function popolaCalendarConGiorni(annodiCalendar, mesediCalendar, wrapper) {
  let giorniDelMese = getGiorniDelMese_calendar(annodiCalendar, mesediCalendar);
  var animIndex = 0;
  wrapper.innerHTML = "";
  calendar.classList.add("loader");

  //Crea Elementi in base a giorni (settimana)
  for (let g = 0; g < 7; g++) {
    const settimana = [
      ["l", "lunedi"],
      ["m", "martedi"],
      ["m", "mercoledi"],
      ["g", "giovedi"],
      ["v", "venerdi"],
      ["s", "sabato"],
      ["d", "domenica"],
    ];
    // console.log(settimana[g]);
    let card = creaDiveAppendi(
      "card_header",
      wrapper,
      settimana[g][1].slice(0, 2),
    );
    g == 5 ? card.classList.add("sabato") : "";
    g == 6 ? card.classList.add("domenica") : "";
  }
  //Crea Elementi in base a giorni

  //Primo ciclo per craere card vuote
  // Primo ciclo: card del mese precedente
  //----------------------------------------------------------------
  const primoGiorno = giorniDelMese[0];
  const primoTradotto = creaData_calendar(primoGiorno);

  let cardPrima =
    primoTradotto.giornoSettimana === 0 ? 6 : primoTradotto.giornoSettimana - 1;

  if (cardPrima === 0) {
    cardPrima = 7;
  }

  for (let i = cardPrima; i > 0; i--) {
    const dataPrecedente = new Date(annodiCalendar, mesediCalendar, 1 - i);

    const giornoPrecedente = creaData_calendar(dataPrecedente);

    let cardvuote = creaDiveAppendi(
      "card",
      wrapper,
      giornoPrecedente.giornoNumerico,
    );

    cardvuote.classList.add("cardvuota", "card-altro-mese");

    const prev = getMeseOffset(annodiCalendar, mesediCalendar, -1);

    cardvuote.dataset.nav = "prev";
    cardvuote.dataset.tipo = "vuota";
    cardvuote.dataset.meseTarget = prev.mese;
    cardvuote.dataset.annoTarget = prev.anno;
    cardvuote.dataset.annoCorrente = annodiCalendar;
    cardvuote.dataset.meseCorrente = mesediCalendar;
    cardvuote.dataset.anno = giornoPrecedente.anno;
    cardvuote.dataset.mese = giornoPrecedente.mese;
    cardvuote.dataset.giorno = giornoPrecedente.giornoNumerico;

    animaIngressoCard(cardvuote, animIndex++);
  }

  // ciclo per craere card calendario
  //----------------------------------------------------------------
  if (!isdebug_calendar) {
    for (let i = 0; i < giorniDelMese.length; i++) {
      const element = giorniDelMese[i];

      let giornotradotto = creaData_calendar(element);
      let contenuto2 =
        "giornoNumerico" +
        giornotradotto.giornoSettimana +
        "<br>giorno:" +
        giornotradotto.giornoNumerico +
        " " +
        giornotradotto.meseItaliano +
        " " +
        giornotradotto.anno;

      if (startDate) {
      }
      let contenuto = giornotradotto.giornoNumerico;

      let card = creaDiveAppendi("card", wrapper, contenuto);
      animaIngressoCard(card, animIndex++);
      card.dataset.anno = giornotradotto.anno;
      card.dataset.mese = giornotradotto.mese;
      card.dataset.giorno = giornotradotto.giornoNumerico;

      const settimana = [
        ["d", "domenica"],
        ["l", "lunedi"],
        ["m", "martedi"],
        ["m", "mercoledi"],
        ["g", "giovedi"],
        ["v", "venerdi"],
        ["s", "sabato"],
      ];

      card.classList.add(settimana[giornotradotto.giornoSettimana][1]);
      settimana[giornotradotto.giornoSettimana][1] == "domenica" ||
      settimana[giornotradotto.giornoSettimana][1] == "sabato"
        ? card.classList.add("feriale")
        : "";

      card.addEventListener("pointerdown", (e) => {
        if (!isRange || !startDate || !endDate) return;

        if (card.classList.contains("selectedFirstDEF")) {
          draggingRange = true;
          draggingEdge = "start";
          e.preventDefault();
        }

        if (card.classList.contains("selectedEnd")) {
          draggingRange = true;
          draggingEdge = "end";
          e.preventDefault();
        }
      });

      card.addEventListener("click", (e) => {
        e.stopPropagation();

        if (dragIniziato) {
          if (dragHaMosso) {
            // era un drag vero: non fare la logica click normale
            dragIniziato = false;
            dragHaMosso = false;
            return;
          }

          // era solo pointerdown + pointerup senza movimento: allora è click vero
          dragIniziato = false;
          dragHaMosso = false;
        }

        gestisciClickDate(card, giornotradotto);
      });
      abilitaDragRange(card, giornotradotto);
    }
  }

  // Secondo ciclo: card del mese successivo
  //----------------------------------------------------------------

  if (creaCardRimanenti) {
    const ultimoGiorno = giorniDelMese[giorniDelMese.length - 1];
    const ultimoTradotto = creaData_calendar(ultimoGiorno);

    let cardDaAggiungere =
      ultimoTradotto.giornoSettimana === 0
        ? 3
        : 7 - ultimoTradotto.giornoSettimana;

    for (let i = 1; i <= cardDaAggiungere; i++) {
      const dataSuccessiva = new Date(
        annodiCalendar,
        mesediCalendar,
        ultimoTradotto.giornoNumerico + i,
      );

      const giornoSuccessivo = creaData_calendar(dataSuccessiva);

      let cardvuota = creaDiveAppendi(
        "card",
        wrapper,
        giornoSuccessivo.giornoNumerico,
      );
      cardvuota.classList.add("cardvuota");
      cardvuota.classList.add("card-altro-mese");
      cardvuota.dataset.nav = "next"; // vuoti prima dell'1
      const next = getMeseOffset(annodiCalendar, mesediCalendar, +1);

      cardvuota.dataset.tipo = "vuota";
      cardvuota.dataset.meseTarget = next.mese;
      cardvuota.dataset.annoTarget = next.anno;
      cardvuota.dataset.annoCorrente = annodiCalendar;
      cardvuota.dataset.meseCorrente = mesediCalendar;
      cardvuota.dataset.anno = giornoSuccessivo.anno;
      cardvuota.dataset.mese = giornoSuccessivo.mese;
      cardvuota.dataset.giorno = giornoSuccessivo.giornoNumerico;
      animaIngressoCard(cardvuota, animIndex++);
    }
  }

  calendar.classList.remove("loader");
  applicaRangeSelezionato();
  aggiornaValoriHeader(annodiCalendar, mesediCalendar, calendar);
  //fine Crea Elementi in base a giorni
}

function aggiornaValoriHeader(annodiCalendar, mesediCalendar, calendar) {
  calendar.querySelector(".wrapper-centrale .annoCalendar").innerHTML =
    annodiCalendar;

  calendar.querySelector(".wrapper-centrale .meseCalendar").innerHTML =
    mesiArray[mesediCalendar];
}

function gestisciClickDate(card, date) {
  //console.log("devo impostare il valore:", date);
  const dataParametro =
    date.anno +
    "-" +
    String(date.mese).padStart(2, "0") +
    "-" +
    String(date.giornoNumerico).padStart(2, "0");

  const startDateParametro = startDate
    ? startDate.anno +
      "-" +
      String(startDate.mese).padStart(2, "0") +
      "-" +
      String(startDate.giornoNumerico).padStart(2, "0")
    : "";

  const EndDateParametro = endDate
    ? endDate.anno +
      "-" +
      String(endDate.mese).padStart(2, "0") +
      "-" +
      String(endDate.giornoNumerico).padStart(2, "0")
    : null;
  //console.log("devo impostare il valore tradotto:", dataParametro);

  const input1 = calendar.querySelector(".inputHidden1");
  const input1Value = calendar.querySelector(".inputHidden1").value;
  if (isRange) {
    console.log("al click range vale dragHoverLoader:", draggingRange);
    const input2 = calendar.querySelector(".inputHidden2");
    const input2Value = calendar.querySelector(".inputHidden2").value;
    //Vedo se esiste un selecteDunico e lo levo
    let TrovoselecteDunico = false;
    calendar.querySelectorAll(".card").forEach((card_inner) => {
      if (card_inner.classList.contains("selectedDateUnica")) {
        card_inner.classList.remove("selectedDateUnica");
        console.log("trovo una card selezionata svuoto");
        input1.value = "";
        startDate = null;
        input2.value = "";
        endDate = null;
        TrovoselecteDunico = true;
      }
    });

    if (TrovoselecteDunico) {
      console.log("rimuovo click");
      input1.value = "";
      startDate = null;
      input2.value = "";
      endDate = null;
    } else if (startDate && startDateParametro == dataParametro) {
      rimuoviSelectDaCard();
      console.log("primo click");
      input1.value = dataParametro;
      startDate = date;
      input2.value = dataParametro;
      endDate = date;
      card.classList.add("selectedDateUnica");
    } else if (!startDate || endDate || startDateParametro > dataParametro) {
      if (!startDate || startDateParametro > dataParametro) {
        rimuoviSelectDaCard();
        console.log("primo click");
        input1.value = dataParametro;
        startDate = date;
        card.classList.add("selectedFirst");
      } else {
        console.log("terzo click svuoto");
        input1.value = "";
        startDate = null;
        input2.value = "";
        endDate = null;
        rimuoviSelectDaCard();
      }
    } else if (startDate) {
      console.log("secondo click");
      input2.value = dataParametro;
      endDate = date;
      card.classList.add("selectedEnd");
      let cardFirst_temporanea = calendar.querySelector(".selectedFirst");
      cardFirst_temporanea?.classList.remove("selectedFirst");
      cardFirst_temporanea?.classList.add("selectedFirstDEF");
      applicaRangeSelezionato();
    }

    console.log("Carico valore data 2: ", input2.value);
    console.log("endate vale: ", endDate);
  } else {
    console.log("primo click");
    input1.value = dataParametro;
    card.classList.add("selectedDateUnica");
    startDate = date;
  }

  console.log("Carico valore data 1: ", input1.value);
  console.log("startDate vale: ", startDate);
}

function rimuoviSelectDaCard() {
  calendar.querySelectorAll(".card").forEach((card) => {
    card.classList.contains("selectedDate")
      ? card.classList.remove("selectedDate")
      : "";
    card.classList.contains("selectedDateUnica")
      ? card.classList.remove("selectedDateUnica")
      : "";
    card.classList.contains("selectedFirst")
      ? card.classList.remove("selectedFirst")
      : "";
    card.classList.contains("selectedEnd")
      ? card.classList.remove("selectedEnd")
      : "";
    card.classList.contains("selectedFirstDEF")
      ? card.classList.remove("selectedFirstDEF")
      : "";
  });
}

function applicaRangeSelezionato() {
  if (!startDate) return;

  rimuoviSelectDaCard();

  const startTime = new Date(
    startDate.anno,
    startDate.mese,
    startDate.giornoNumerico,
  ).getTime();

  const endTime = endDate
    ? new Date(endDate.anno, endDate.mese, endDate.giornoNumerico).getTime()
    : null;

  calendar.querySelectorAll(".card").forEach((card) => {
    if (!card.dataset.anno) return;

    const dataCardTime = new Date(
      card.dataset.anno,
      card.dataset.mese,
      card.dataset.giorno,
    ).getTime();

    // caso data singola: start e end uguali
    if (endTime && startTime === endTime && dataCardTime === startTime) {
      card.classList.add("selectedDateUnica");
      return;
    }

    if (endTime && dataCardTime > startTime && dataCardTime < endTime) {
      card.classList.add("selectedDate");
    }

    if (dataCardTime === startTime) {
      card.classList.add(endTime ? "selectedFirstDEF" : "selectedFirst");
    }

    if (endTime && dataCardTime === endTime) {
      card.classList.add("selectedEnd");
    }
  });
}

function aggiornaRangeDaCardVuota(cardVuota) {
  if (!draggingRange || !draggingEdge) return;

  const nav = cardVuota.dataset.nav;

  const annoCorrente = Number(cardVuota.dataset.annoCorrente);
  const meseCorrente = Number(cardVuota.dataset.meseCorrente);

  if (Number.isNaN(annoCorrente) || Number.isNaN(meseCorrente)) return;

  let nuovaData = null;

  if (nav === "prev") {
    nuovaData = {
      anno: annoCorrente,
      mese: meseCorrente,
      giornoNumerico: 1,
    };
  }

  if (nav === "next") {
    const ultimoGiorno = new Date(annoCorrente, meseCorrente + 1, 0).getDate();

    nuovaData = {
      anno: annoCorrente,
      mese: meseCorrente,
      giornoNumerico: ultimoGiorno,
    };
  }

  if (!nuovaData) return;

  const nuovaTime = new Date(
    nuovaData.anno,
    nuovaData.mese,
    nuovaData.giornoNumerico,
  ).getTime();

  const startTime = new Date(
    startDate.anno,
    startDate.mese,
    startDate.giornoNumerico,
  ).getTime();

  const endTime = new Date(
    endDate.anno,
    endDate.mese,
    endDate.giornoNumerico,
  ).getTime();

  if (draggingEdge === "start" && nuovaTime <= endTime) {
    startDate = nuovaData;
  }

  if (draggingEdge === "end" && nuovaTime >= startTime) {
    endDate = nuovaData;
  }

  aggiornaInputRange();
  applicaRangeSelezionato();
}

function aggiornaRangeDaNuovaData(nuovaData) {
  const nuovaTime = new Date(
    nuovaData.anno,
    nuovaData.mese,
    nuovaData.giornoNumerico,
  ).getTime();

  const startTime = new Date(
    startDate.anno,
    startDate.mese,
    startDate.giornoNumerico,
  ).getTime();

  const endTime = new Date(
    endDate.anno,
    endDate.mese,
    endDate.giornoNumerico,
  ).getTime();

  if (draggingEdge === "start" && nuovaTime <= endTime) {
    startDate = nuovaData;
  }

  if (draggingEdge === "end" && nuovaTime >= startTime) {
    endDate = nuovaData;
  }
}

document.addEventListener(
  "pointermove",
  (e) => {
    if (!draggingRange || !draggingEdge) return;

    e.preventDefault();
    dragHaMosso = true;

    const el = document.elementFromPoint(e.clientX, e.clientY);
    const card = el?.closest(".card");

    if (!card) return;

    if (card.classList.contains("cardvuota")) {
      aggiornaRangeDaCardVuota(card);
      return;
    }

    if (!card.dataset.anno) return;

    const nuovaData = getDateFromCard(card);
    if (!nuovaData) return;

    aggiornaRangeDaNuovaData(nuovaData);
    aggiornaInputRange();
    applicaRangeSelezionato();
  },
  { passive: false },
);
