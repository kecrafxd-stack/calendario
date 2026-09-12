import { months } from "./data_months.js";

let hardware_date = new Date();

// Elementos del calendario
const calendary_header = document.querySelector(".calendary__month-header");
let day = document.querySelectorAll(".calendary__date");
const tbody = document.querySelector(".calendary__body");
let table_data = tbody.querySelectorAll("td");
let table_rows = tbody.querySelectorAll("tr");

// Menú de agenda
const menu = document.querySelector("#menuAgenda");
const formulario = document.querySelector(".agenda__container");

// Inputs de fecha del formulario
const menudayselect = document.querySelector("#daysel");
const menumonth = document.querySelector("#monthsel");
const menuyear = document.querySelector("#yearsel");

// Selector de meses
const monthList = document.querySelector(".main-nav__month-list");
const month_Cheked = monthList.getElementsByTagName("input");

// Selector de anio
const yearList = document.querySelector(".main-nav__year-list");
const year_Cheked = yearList.getElementsByTagName("input");

// Datos
let mes_seleccionado = hardware_date.getMonth();
let year_seleccionado = hardware_date.getFullYear();

//Datos de los eventos // Referencias o no se wey alchile hjjsjsjs
let eventoMain = document.querySelector(".windowEvents__main");
let contenedoraPicar = document.querySelectorAll('.windowEvents__event');

//Funciones
function draw_day() {
  let contador = 1;
  for (let i = months[0][year_seleccionado][mes_seleccionado].start_position; i < months[0][year_seleccionado][mes_seleccionado].days; i++) {
    table_data[i].textContent = contador;
    contador += 1;
    let index = i - months[0][year_seleccionado][mes_seleccionado].start_position + 1;
    addel[i] = () => {
      mostrarmodal(index);
    };
    day[i].addEventListener("click", addel[i]);
  }
}

function fw() {
  if (months[0][year_seleccionado][mes_seleccionado].start_position >= 5) {
    //fw its from 'five week'
    const fw = document.createElement("tr");
    fw.classList.add("calendary__week-row");
    fw.classList.add("fw");
    for (let i = 0; i < 7; i++) {
      const fw_day = document.createElement("td");
      fw_day.classList.add("calendary__date");
      fw_day.classList.add("fw_day");
      fw_day.textContent = "";
      fw.appendChild(fw_day);
    }
    //Meter el five week en html
    tbody.appendChild(fw);
    //Creo que tiene sentido, cada vez se actualizan
    day = document.querySelectorAll(".calendary__date");
    table_data = tbody.querySelectorAll("td");
    table_rows = tbody.querySelectorAll("tr");
  }
}

function clean() {
  //Limpieza para cada dia
  for (let i = 0; i < table_data.length; i++) {
    table_data[i].textContent = "";
    day[i].removeEventListener("click", addel[i]);
    day[i].classList.remove("calendary__date--previous-month");
  }
  //Limpeza de fw en caso de que exista
  for (let i = 0; i < table_rows.length; i++) {
    if (table_rows[i].classList.contains("fw")) {
      table_rows[i].remove();
    }
  }
}

function previous_month() {
  for (let i = 0; i < day.length; i++) {
    if (day[i].textContent == "") {
      day[i].classList.add("calendary__date--previous-month");
    }
  }
}

function mostrarmodal(index) {
  menu.showModal();
  menudayselect[menudayselect.length - index].selected = true;
  menumonth[menumonth.length - mes_seleccionado - 1].selected = true;
  menuyear[menuyear.length - year_seleccionado + 2026 - 1].selected = true;
}

function seleccionarMMYYxFecha(MMYY, MMSYYS) {
  for (let i = 0; i < MMYY.length; i++) {
    if (MMYY[i].value == MMSYYS) {
      MMYY[i].checked = true;
    }
  }
}

function crearEventoV(numero) {
  if (eventoMain.textContent == 'No hay eventos existentes') {
    eventoMain.textContent = ''
  }
  const eventoContainer = document.createElement("div");
  eventoContainer.classList.add("windowEvents__event");

  const eventoTitulo = document.createElement("h3");
  eventoTitulo.classList.add("windowEvents__eventTitle");

  const eventoDatacontainer = document.createElement("div");
  eventoDatacontainer.classList.add("windowEvents__eventdatedata");

  const eventoFechacontainer = document.createElement("div");
  eventoFechacontainer.classList.add("windowEvents__eventFecha");

  const eventoHora = document.createElement("span");
  eventoHora.classList.add("windowEvents__eventHora");

  eventoContainer.appendChild(eventoTitulo);
  eventoContainer.appendChild(eventoDatacontainer);
  eventoDatacontainer.appendChild(eventoFechacontainer);
  eventoDatacontainer.appendChild(eventoHora);
  eventoMain.appendChild(eventoContainer);

  let eventojuas = JSON.parse(localStorage.getItem(`event${numero}`));

  eventoTitulo.textContent = eventojuas.title;
  eventoFechacontainer.textContent = `${eventojuas.day}/${eventojuas.month}/${eventojuas.year}`
  eventoHora.textContent = (eventojuas.hour).slice(0, 5);

  // contenedoraPicar = document.querySelectorAll('.windowEvents__event');
}

function deleteEvento() {
  contenedoraPicar = document.querySelectorAll('.windowEvents__event');
  for (let i = 0; i < contenedoraPicar.length; i++) {
    contenedoraPicar[i].addEventListener('click', () => {
      
      console.log('Hizo Click a: ' + i)
      for(let j = i; j<contenedoraPicar.length; j++){
        if(j != contenedoraPicar.length-1){
          localStorage.setItem(`event${j}`, localStorage.getItem(`event${j+1}`))
        }
        
      }  
      localStorage.removeItem(`event${localStorage.length-1}`)

    });
  }
}


let addel = [];
let hayListener = [];

if (localStorage.length != 0) {
  for (let i = 0; i < localStorage.length; i++) {
    crearEventoV(i)
  }
}

//Seleccionar Mes segun la fecha del PC
seleccionarMMYYxFecha(month_Cheked, mes_seleccionado);

//Seleccionar anio segun fecha del PC
seleccionarMMYYxFecha(year_Cheked, year_seleccionado);

//Preparacion: Dejar todos vacios
for (let i = 0; i < table_data.length; i++) {
  table_data[i].textContent = "";
}

//Lo que hace al cambiar el año
for (let i = 0; i < year_Cheked.length; i++) {
  year_Cheked[i].addEventListener("input", () => {
    for (let i = 0; i < year_Cheked.length; i++) {
      if (year_Cheked[i].checked == true) {
        year_seleccionado = year_Cheked[i].value;
      }
    }
    //Limpieza para cada dia
    clean();
    //Escribir el Nombre del mes seleccionado
    calendary_header.textContent = months[0][year_seleccionado][mes_seleccionado].name + " - " + months[0][year_seleccionado][mes_seleccionado].data_year;
    //Empezar a dibujar
    //Si el mes inicia desde el indice 5 en adelante creara una nueva semana
    fw();
    draw_day();
    previous_month();
  });
}

//Lo que se hace cada vez que se selecciona un mes
for (let i = 0; i < month_Cheked.length; i++) {
  month_Cheked[i].addEventListener("input", () => {
    if (month_Cheked[i].checked == true) {
      mes_seleccionado = month_Cheked[i].value;
      //Limpieza para cada dia
      clean();
      //Escribir el Nombre del mes seleccionado
      calendary_header.textContent = months[0][year_seleccionado][mes_seleccionado].name + " - " + months[0][year_seleccionado][mes_seleccionado].data_year;
      //Empezar a dibujar
      //Si el mes inicia desde el indice 5 en adelante creara una nueva semana
      fw();
      draw_day();
      previous_month();
    }
  });
}

//Solo cuando se carga la Pagina
calendary_header.textContent = months[0][year_seleccionado][mes_seleccionado].name + " - " + months[0][year_seleccionado][mes_seleccionado].data_year;

fw();

draw_day();

//Asigna previous month en la primera carga
previous_month();

//El formulario es enviado y dentro de un array se crea un evento
formulario.addEventListener("submit", (form) => {
  form.preventDefault();
  let evento = {
    title: document.querySelector("#event__title").value,
    day: document.querySelector("#daysel").value,
    month: document.querySelector("#monthsel").value,
    year: document.querySelector("#yearsel").value,
    hour: document.querySelector("#time__date").value,
  };

  localStorage.setItem(`event${localStorage.length}`, JSON.stringify(evento));

  //Resetea el formulario al terminar de crear el evento
  formulario.reset();

  //Cierra el menu
  menu.close();

  crearEventoV(localStorage.length - 1);
});

deleteEvento()