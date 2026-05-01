document.addEventListener("DOMContentLoaded", function () {
  //console.log("DOM pronto!");
  //QUESTA è LA DATA DA CUI PARTE IL CALENDARIO (data di oggi di default - imposta mese anno calendario ricerca  e selezione se presente)
  dataDiRiferimento = creaData_calendar();
  applicaCalendarTheme(); //applico Themi css
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

      // Option colore selezione
      const option_coloreSelezione = creaDiveAppendi(
        "option_themeColor",
        topSide_containercalendar,
        `
          <label for="color_selected">Colore selezione</label>
          <input type="color" id="color_selected" value="#4ea7ff">
        `,
      );

      //BTN EFFETTIVO MENU
      const topSide_containercalendar_openbtn = creaDiveAppendi(
        "topside_closeDiv",
        containerCalendar,
        '<button class="_btn" id="closed_btn_topbar"><i class="fa-solid fa-gear"></i></button>',
      );
      //BTN EFFETTIVO RESET DATA
      const topSide_containercalendar_resetDatabtn = creaDiveAppendi(
        "topside_resetDateDiv",
        containerCalendar,
        '<button class="_btn" id="resetDate_btn_topbar"><i class="fa-solid fa-calendar"></i></button>',
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

        //console.log("inputHiddenDate2: ", inputHiddenDate2);
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

      //BTN menu
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

      //BTN menu
      const btn_reset_date =
        topSide_containercalendar_resetDatabtn.querySelector(
          "#resetDate_btn_topbar",
        );

      btn_reset_date.addEventListener("click", () => {
        console.log("clicco resetta data");
        const mesedioggi = new Date().getMonth();
        const annodioggi = new Date().getFullYear();
        popolaCalendarConGiorni(annodioggi, mesedioggi, mid_calendariocentrale);
      });

      //THEME
      const colorSelected =
        topSide_containercalendar.querySelector("#color_selected");

      colorSelected.addEventListener("input", (e) => {
        applicaTemaDaColore(e.target.value);
      });

      //Botton Side - Ui con input date? vediamo
      const footer_calendar = creaDiveAppendi(
        "footer_calendar",
        containerCalendar,
      );
      const input1_footer_calendar = creaDiveAppendi(
        "footer_calendar_input1",
        footer_calendar,
      );
      const wrapper1 = creaDiveAppendi(
        "wrapper-date",
        input1_footer_calendar,
        `<span class="day"></span>
        <div class="wrapper-anno">
        <span class="mese"></span>
        <span class="anno"></span>
        </div>
        `,
      );

      const input2_footer_calendar = creaDiveAppendi(
        "footer_calendar_input2",
        footer_calendar,
      );
      const wrapper2 = creaDiveAppendi(
        "wrapper-date",
        input2_footer_calendar,
        `<span class="day"></span>
        <div class="wrapper-anno">
        <span class="mese"></span>
        <span class="anno"></span>
        </div>
        `,
      );

      //CAMBIA DATA AL CLICK 1
      input1_footer_calendar.addEventListener("click", function (e) {
        e.stopPropagation();
        console.log("click_footer1");

        let wrapper_date =
          input1_footer_calendar.querySelector(".wrapper-date");
        let input1 = calendar.querySelector(".inputHidden1");
        let input1Value = calendar.querySelector(".inputHidden1").value;
        let innerHTML = `
            <div class="wrapper_input">
              <label for="input1_changeclick">Cambia Data</label>
              <input class="fake_changeinput input1" name="input1_changeclick" id="fake_changeinput_1"  type="date" value="${input1Value}"> 
            </div>
            `;

        if (!input1PerChangeAlClick || !input1 || input1 == "") {
          creaDiveAppendi(
            "wrapper_input_click_change1",
            wrapper_date,
            innerHTML,
          );
          let input_perChange = input1_footer_calendar.querySelector(
            ".fake_changeinput.input1",
          );

          input_perChange.focus();
          input_perChange.addEventListener("click", function (e) {
            e.stopPropagation();
            console.log("posso cliccare sull'input");
          });

          input_perChange.addEventListener("change", function (e) {
            const val = e.target.value;

            const dataJS = parseDateInputToDate(val);
            const nuovaData = creaData_calendar(dataJS);

            const nuovaTime = calendarDataToTime(nuovaData);
            const endTime = calendarDataToTime(endDate);

            if (nuovaTime <= endTime) {
              startDate = nuovaData;

              aggiornaInputRange();
              // console.log("nuovaData.anno", nuovaData.anno);
              // console.log("nuovaData.mese", nuovaData.mese);
              if (
                nuovaData.anno !== annodiCalendar ||
                nuovaData.mese !== mesediCalendar
              ) {
                vaiAlMeseDellaData(nuovaData, "");
              } else {
                applicaRangeSelezionato();
              }
            }
          });

          input1PerChangeAlClick = true;
        } else {
          input1PerChangeAlClick = null;
          aggiornaInputRange();
          applicaRangeSelezionato();
          document
            .querySelectorAll(".wrapper_input_click_change1")
            .forEach((el) => {
              el.remove();
            });
        }
      });

      //CAMBIA DATA AL CLICK 2
      input2_footer_calendar.addEventListener("click", function (e) {
        e.stopPropagation();
        console.log("click_footer2");

        let wrapper_date =
          input2_footer_calendar.querySelector(".wrapper-date");
        let input2 = calendar.querySelector(".inputHidden2");
        let input2Value = calendar.querySelector(".inputHidden2").value;
        let innerHTML = `
            <div class="wrapper_input">
              <label for="input2_changeclick">Cambia Data</label>
              <input class="fake_changeinput input2" name="input2_changeclick" id="fake_changeinput_2"  type="date" value="${input2Value}"> 
            </div>
            `;

        if (!input2PerChangeAlClick || !input2 || input2 == "") {
          creaDiveAppendi(
            "wrapper_input_click_change2",
            wrapper_date,
            innerHTML,
          );
          let input_perChange2 = input2_footer_calendar.querySelector(
            ".fake_changeinput.input2",
          );

          input_perChange2.focus();
          input_perChange2.addEventListener("click", function (e) {
            e.stopPropagation();
            console.log("posso cliccare sull'input");
          });

          input_perChange2.addEventListener("change", function (e) {
            const val = e.target.value;

            const dataJS = parseDateInputToDate(val);
            const nuovaData = creaData_calendar(dataJS);

            const nuovaTime = calendarDataToTime(nuovaData);
            const startTime = calendarDataToTime(startDate);

            if (nuovaTime >= startTime) {
              console.log("posso impostarla");

              endDate = nuovaData;

              aggiornaInputRange();
              // console.log("nuovaData.anno", nuovaData.anno);
              // console.log("nuovaData.mese", nuovaData.mese);
              if (
                nuovaData.anno !== annodiCalendar ||
                nuovaData.mese !== mesediCalendar
              ) {
                vaiAlMeseDellaData(nuovaData, "");
              } else {
                applicaRangeSelezionato();
              }
            } else {
              input2PerChangeAlClick = null;
            }
          });
        } else {
          input2PerChangeAlClick = null;
          aggiornaInputRange();
          applicaRangeSelezionato();
          document
            .querySelectorAll(".wrapper_input_click_change2")
            .forEach((el) => {
              el.remove();
            });
        }
      });

      function vaiAlMeseDellaData(data, wrapper) {
        annodiCalendar = data.anno;
        mesediCalendar = data.mese;
        if (!wrapper || wrapper == "") {
          wrapper = calendar.querySelector(".mid_main");
        }
        console.log(wrapper);

        popolaCalendarConGiorni(annodiCalendar, mesediCalendar, wrapper);
      }
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
      const direzione = cardVuota.dataset.nav; // "prev" oppure "next"
      mostraDragHoverLoader(e, direzione);

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

    // 👉 IMPORTANTISSIMO
    setTimeout(() => {
      ignoraClickPostDrag = false;
    }, 0);
  });

  //CHIUDI ELEMENTI AL CLICK OVUNQUE
  const eccezioni = [
    calendar,
    document.querySelector(".topside"),
    document.querySelector(".wrapper_input_click_change1"),
    document.querySelector(".wrapper_input_click_change2"),
  ];
  document.addEventListener("click", (e) => {
    const clickDentroEccezioni = eccezioni.some((el) => {
      return el && el.contains(e.target);
    });

    if (!clickDentroEccezioni) {
      console.log("click sul dom");
      input1PerChangeAlClick = null;
      aggiornaInputRange();
      applicaRangeSelezionato();
      document
        .querySelectorAll(".wrapper_input_click_change1")
        .forEach((el) => {
          el.remove();
        });
      document
        .querySelectorAll(".wrapper_input_click_change2")
        .forEach((el) => {
          el.remove();
        });

      document.querySelector(".topside.open")?.classList.remove("open");
    }
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

//Funzione per popolare il wrapper del calendario con i giorni CARD.
function popolaCalendarConGiorni(annodiCalendar, mesediCalendar, wrapper) {
  let giorniDelMese = getGiorniDelMese_calendar(annodiCalendar, mesediCalendar);
  var animIndex = 0;
  wrapper.innerHTML = "";
  calendar.classList.add("loader");
  clearInterval(checkSelected);
  // console.log("interromposetCheck");
  checkSelected = setTimeout(() => {
    //console.log("partecheck di", annodiCalendar, mesediCalendar);
    checkBottoniNavDate(annodiCalendar, mesediCalendar, wrapper);
  }, 500);

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
    const oggiConfronto = new Date().getDate();
    const meseConfronto = new Date().getMonth();
    const annoConfronto = new Date().getFullYear();
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

      if (
        oggiConfronto == giornotradotto?.giornoNumerico &&
        meseConfronto == giornotradotto?.mese &&
        annoConfronto == giornotradotto?.anno
      ) {
        card.classList.add("today");
      }

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

      abilitaDragRange(card, giornotradotto);
      card.addEventListener("click", (e) => {
        e.stopPropagation();
        if (ignoraClickPostDrag) {
          console.log("ignoro click");
          ignoraClickPostDrag = false;
          return;
        }

        gestisciClickDate(card, giornotradotto);
      });
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

// Aggiorna il testo dell’header del calendario con anno e mese correnti,
// mantenendo sincronizzata la UI dopo cambi mese, reset o navigazione.
function aggiornaValoriHeader(annodiCalendar, mesediCalendar, calendar) {
  calendar.querySelector(".wrapper-centrale .annoCalendar").innerHTML =
    annodiCalendar;

  calendar.querySelector(".wrapper-centrale .meseCalendar").innerHTML =
    mesiArray[mesediCalendar];
}

// Gestisce il click su una card giorno: imposta, completa o resetta la selezione
// e aggiorna classi grafiche/input in base alla modalità singola o range.
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
    //console.log("al click range vale dragHoverLoader:", draggingRange);
    const input2 = calendar.querySelector(".inputHidden2");
    const input2Value = calendar.querySelector(".inputHidden2").value;
    //Vedo se esiste un selecteDunico e lo levo
    let TrovoselecteDunico = false;
    calendar.querySelectorAll(".card").forEach((card_inner) => {
      if (card_inner.classList.contains("selectedDateUnica")) {
        card_inner.classList.remove("selectedDateUnica");
        //console.log("trovo una card selezionata svuoto");
        startDate = null;
        endDate = null;
        TrovoselecteDunico = true;
        aggiornaInputRange();
      }
    });

    if (TrovoselecteDunico) {
      console.log("rimuovo click");
      startDate = null;
      endDate = null;
      aggiornaInputRange();
    } else if (startDate && startDateParametro == dataParametro) {
      rimuoviSelectDaCard();
      //console.log("primo click");
      startDate = date;
      endDate = date;
      aggiornaInputRange();
      card.classList.add("selectedDateUnica");
    } else if (!startDate || endDate || startDateParametro > dataParametro) {
      if (!startDate || (startDateParametro > dataParametro && endDate)) {
        rimuoviSelectDaCard();
        //console.log("click prima di data inizio");
        startDate = date;
        endDate = null;
        card.classList.add("selectedFirst");
        aggiornaInputRange();
      } else {
        console.log("terzo click svuoto");
        startDate = null;
        endDate = null;
        aggiornaInputRange();
        rimuoviSelectDaCard();
      }
    } else if (startDate) {
      //console.log("secondo click");
      endDate = date;
      aggiornaInputRange();
      card.classList.add("selectedEnd");
      let cardFirst_temporanea = calendar.querySelector(".selectedFirst");
      cardFirst_temporanea?.classList.remove("selectedFirst");
      cardFirst_temporanea?.classList.add("selectedFirstDEF");
      applicaRangeSelezionato();
    }

    //console.log("Carico valore data 2: ", input2.value);
    //console.log("endate vale: ", endDate);
  } else {
    console.log("primo click");
    card.classList.add("selectedDateUnica");
    startDate = date;
    aggiornaInputRange();
  }

  //console.log("Carico valore data 1: ", input1.value);
  //console.log("startDate vale: ", startDate);
}

//RIMUOVE classe selectionDate e altre da Card
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

//METTE classe selectionDate e altre da Card
function applicaRangeSelezionato() {
  rimuoviSelectDaCard();
  if (!startDate) return;

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

// Gestisce il drag del range su card dei mesi adiacenti (vuote) senza data,
// aggiornando startDate o endDate al limite del mese corrente e mantenendo coerenza del range.
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

// Aggiorna startDate o endDate durante il drag confrontando la nuova data,
// mantenendo il range valido (start ≤ end) in base al lato trascinato.
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

// Aggiorna la visibilità dei bottoni di navigazione rapida:
// nasconde "torna a oggi" se sei già nel mese corrente e nasconde i bottoni start/end se la data è già visibile.
function checkBottoniNavDate(annodiCalendar, mesediCalendar, wrapper) {
  if (annodiCalendar == null || mesediCalendar == null) {
    return;
  }
  //Logica per gestire btn reset devi vedere se ka data è quella di oggi
  const datediOggi = new Date();
  const giornodioggi = datediOggi.getDate();
  const mesedioggi = datediOggi.getMonth();
  const annodioggi = datediOggi.getFullYear();
  const btn_resetCalendarData = calendar.querySelector(".topside_resetDateDiv");

  if (mesedioggi === mesediCalendar && annodioggi === annodiCalendar) {
    if (!btn_resetCalendarData.classList.contains("hidden")) {
      btn_resetCalendarData.classList.add("hidden");
    }
  } else {
    btn_resetCalendarData.classList.remove("hidden");
  }

  const btn_resetCalendarData_data1 = calendar.querySelector(
    ".btn-gotodate.date1",
  );
  const btn_resetCalendarData_data2 = calendar.querySelector(
    ".btn-gotodate.date2",
  );

  if (btn_resetCalendarData_data1 && startDate) {
    if (mesediCalendar == startDate.mese && startDate.anno == annodiCalendar) {
      //console.log("trovo valore 1", startDate.mese + " - " + startDate.anno);
      btn_resetCalendarData_data1.classList.add("hidden");
    } else {
      btn_resetCalendarData_data1.classList.remove("hidden");
    }
  }

  if (btn_resetCalendarData_data2 && endDate) {
    if (mesediCalendar == endDate.mese && endDate.anno == annodiCalendar) {
      btn_resetCalendarData_data2.classList.add("hidden");
    } else {
      btn_resetCalendarData_data2.classList.remove("hidden");
    }
  }
}

document.addEventListener(
  "pointermove",
  (e) => {
    if (!draggingRange || !draggingEdge) return;

    e.preventDefault();
    ignoraClickPostDrag = true;

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
