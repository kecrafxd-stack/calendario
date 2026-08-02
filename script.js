import { months } from "./data_months.js";
let hardware_date = new Date();

// Elementos del calendario
const day = document.querySelectorAll(".calendary__date");
const tbody = document.querySelector(".calendary__body");
const table_data = tbody.getElementsByTagName("td");

// Menú de agenda
const menu = document.querySelector("#menuAgenda");
const formulario = document.querySelector(".agenda__container");
const btn_enviar = document.querySelector("#close");

// Inputs de fecha del formulario
const menuday = document.querySelector("#diasel");
const menudayselect = document.querySelector("#daysel");
const menumonth = document.querySelector("#messel");
const menuyear = document.querySelector("#añosel");

// Selector de meses
const monthList = document.querySelector(".main-nav__month-list");
const month_Cheked = monthList.getElementsByTagName("input");

// Datos
let eventos = [];
let mes_seleccionado = hardware_date.getMonth()
function mostrarmodal(index) {
    menu.showModal()
    menudayselect[(menudayselect.length) - index].selected = true;
}

let addel = []


//Seleccionar Mes segun la fecha del PC
for (let i = 0; i < month_Cheked.length; i++) {
    if (month_Cheked[i].value == mes_seleccionado) {
        month_Cheked[i].checked = true
    }
}

console.log(table_data)

for (let i = 0; i < month_Cheked.length; i++) {
    month_Cheked[i].addEventListener('input', () => {
        if (month_Cheked[i].checked == true) {
            mes_seleccionado = month_Cheked[i].value;

            for (let i = 0; i < table_data.length; i++) {
                table_data[i].textContent = " "
                day[i].removeEventListener("click", addel[i])
            }


            console.log("Indice de mes seleccionado: " + mes_seleccionado)

            let contador = 1;
            for (let i = months[mes_seleccionado].start_position; i < months[mes_seleccionado].days; i++) {

                table_data[i].textContent = contador;
                contador += 1;
                
                let index = i - months[mes_seleccionado].start_position + 1;

                addel[i] = ( )=> {
                    mostrarmodal(index)
                }
                day[i].addEventListener('click', addel[i]) 
            }
        }
    })
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
