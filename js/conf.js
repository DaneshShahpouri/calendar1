var mostraDebugFunzioni_start = false;
// VARIABILI DI SUPPORTO Funzioni
var input1PerChangeAlClick = null; //input per click su data
var input2PerChangeAlClick = null; //input per click su data

var dataDiRiferimento = null;
var isRange = true;
var isdebug_calendar = false;
var topbarOpen = false;
var abilitaHoverPerCambioAnno = true;
var stop_Genera_Calendario = false;
var startDate = null;
var endDate = null;
var checkSelected = null;

let dragHoverTimer = null;
let isDragging = false;
let dragMode = null;
// esempio: "start" oppure "end"
let draggingRange = false;
let draggingEdge = null;
let dragHoverLoader = null; //loadermouse per mesi navigazibne
let ignoraClickPostDrag = false;

var creaCardRimanenti = true;
var abilitaAnimazioneIngressoCard = true; //anima card effetto ingresso

const calendar = document.getElementById("calendar");
const mesiArray = [
  "gennaio",
  "febbraio",
  "marzo",
  "aprile",
  "maggio",
  "giugno",
  "luglio",
  "agosto",
  "settembre",
  "ottobre",
  "novembre",
  "dicembre",
];
const giorniSettimanaArray = [
  "domenica",
  "lunedì",
  "martedì",
  "mercoledì",
  "giovedì",
  "venerdì",
  "sabato",
];

/*THEMI CALENDARIO CSS */
const CALENDAR_THEME = {
  "--bordercolor_card": "#f5f5f500",
  "--background-card": "transparent",
  "--bordercolor_card-vuote": "#f5f5f500",
  "--background-card-vuote": "#bababa12",
};
