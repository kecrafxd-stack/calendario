import { months } from "./data_months.js";
let hardware_date = new Date();

// Elementos del calendario
const calendary_header = document.querySelector('.calendary__month-header')
let day = document.querySelectorAll(".calendary__date");
const tbody = document.querySelector(".calendary__body");
let table_data = tbody.querySelectorAll("td");
let table_rows = tbody.querySelectorAll('tr')

// Menú de agenda
const menu = document.querySelector("#menuAgenda");
const formulario = document.querySelector(".agenda__container");
const btn_enviar = document.querySelector("#close");

// Inputs de fecha del formulario
const menuday = document.querySelector("#diasel");
const menudayselect = document.querySelector("#daysel");
const menumonth = document.querySelector("#monthsel");
const menuyear = document.querySelector("#añosel");

// Selector de meses
const monthList = document.querySelector(".main-nav__month-list");
const month_Cheked = monthList.getElementsByTagName("input");

// Datos
let eventos = [];
let mes_seleccionado = hardware_date.getMonth();
function mostrarmodal(index) {
    menu.showModal()
    menudayselect[(menudayselect.length) - index].selected = true;
    menumonth[(menumonth.length)-mes_seleccionado - 1].selected = true;
}

let addel = []


//Seleccionar Mes segun la fecha del PC
for (let i = 0; i < month_Cheked.length; i++) {
    if (month_Cheked[i].value == mes_seleccionado) {
        month_Cheked[i].checked = true
    }
}

for (let i = 0; i < table_data.length; i++) {
    table_data[i].textContent = "";
}

for (let i = 0; i < month_Cheked.length; i++) {
    month_Cheked[i].addEventListener('input', () => {
        if (month_Cheked[i].checked == true) {
            mes_seleccionado = month_Cheked[i].value;



            //Limpieza para cada dia
            for (let i = 0; i < table_data.length; i++) {
                table_data[i].textContent = "";
                day[i].removeEventListener("click", addel[i])
                day[i].classList.remove('calendary__date--previous-month')
            }

            //Limpeza de fw en caso de que exista
            for (let i = 0; i < table_rows.length; i++) {
                if (table_rows[i].classList.contains('fw')) {
                    table_rows[i].remove()
                }
            }

            //Escribir el Nombre del mes seleccionado
            calendary_header.textContent = months[mes_seleccionado].name + ' - ' + months[mes_seleccionado].data_year

            //Empezar a dibujar

            //Si el mes inicia desde el indice 5 en adelante creara una nueva semana
            if (months[mes_seleccionado].start_position >= 5) {
                //fw is from 'five week
                const fw = document.createElement('tr')
                fw.classList.add('calendary__week-row')
                fw.classList.add('fw')

                for (let i = 0; i < 7; i++) {
                    const fw_day = document.createElement('td')
                    fw_day.classList.add('calendary__date')
                    fw_day.classList.add('fw_day')
                    fw_day.textContent = "";

                    fw.appendChild(fw_day)
                }

                //Meter el five week en html
                tbody.appendChild(fw);

                //Creo que tiene sentido, cada vez se actualizan
                day = document.querySelectorAll(".calendary__date");
                table_data = tbody.querySelectorAll("td");
                table_rows = tbody.querySelectorAll('tr')



            }
            let contador = 1;
            for (let i = months[mes_seleccionado].start_position; i < months[mes_seleccionado].days; i++) {

                table_data[i].textContent = contador
                contador += 1

                let index = i - months[mes_seleccionado].start_position + 1;

                addel[i] = () => {
                    mostrarmodal(index)
                }
                day[i].addEventListener('click', addel[i])
            }

            for (let i = 0; i < day.length; i++) {
                if (day[i].textContent == "") {
                    day[i].classList.add('calendary__date--previous-month')
                }

            }
        }
    })
}

//Solo cuando se carga la Pagina
calendary_header.textContent = months[mes_seleccionado].name + ' - ' + months[mes_seleccionado].data_year

for (let i = 0; i < table_data.length; i++) {
    table_data[i].textContent = "";
    day[i].removeEventListener("click", addel[i])
    day[i].classList.remove('calendary__date--previous-month')
}

if (months[mes_seleccionado].start_position >= 5) {
    //fw is from 'five week
    const fw = document.createElement('tr')
    fw.classList.add('calendary__week-row')
    fw.classList.add('fw')

    for (let i = 0; i < 7; i++) {
        const fw_day = document.createElement('td')
        fw_day.classList.add('calendary__date')
        fw_day.classList.add('fw_day')
        fw_day.textContent = "";

        fw.appendChild(fw_day)
    }

    //Meter el five week en html
    tbody.appendChild(fw);

    //Creo que tiene sentido, cada vez se actualizan
    day = document.querySelectorAll(".calendary__date");
    table_data = tbody.querySelectorAll("td");
    table_rows = tbody.querySelectorAll('tr')
}

let counter = 1;
for (let i = months[mes_seleccionado].start_position; i < months[mes_seleccionado].days; i++) {


    table_data[i].textContent = counter;
    counter += 1;

    let index = i - months[mes_seleccionado].start_position + 1;

    addel[i] = () => {
        mostrarmodal(index)
    }
    day[i].addEventListener('click', addel[i])


}

//Asigna previous month en la primera carga
for (let i = 0; i < day.length; i++) {
    console.log("Fix" + day[i].textContent)
    if (day[i].textContent === "") {
        day[i].classList.add('calendary__date--previous-month')
    }
}




//El formulario es enviado y dentro de un array se crea un evento
formulario.addEventListener('submit', (form) => {
    form.preventDefault();
    let evento = {
        title: document.querySelector('#event__title').value,
        day: document.querySelector('#daysel').value,
        month: document.querySelector('#monthsel').value,
        year: document.querySelector('#yearsel').value,
        hour: document.querySelector('#time__date').value
    }

    eventos.push(evento)

    //Usado como debug imprime los eventos existentes en el array 'eventos'
    for (let i = 0; i < eventos.length; i++) {
        console.log(eventos[i])
    }

    //Resetea el formulario al terminar de crear el evento
    formulario.reset();

    //Cierra el menu
    menu.close()
})
