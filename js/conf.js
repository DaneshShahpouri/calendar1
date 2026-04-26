// VARIABILI DI SUPPORTO Funzioni
var isRange = true;
var isdebug_calendar = false;
var topbarOpen = false;
var abilitaHoverPerCambioAnno = true;
var stop_Genera_Calendario = false;
var startDate = null;
var endDate = null;

let draggingRange = false;
let draggingEdge = null;

var creaCardRimanenti = true;
var animaIngressoCard = true; //anima card effetto ingresso

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
