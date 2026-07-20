const day = document.querySelectorAll(".calendary__date");
const menu = document.querySelector("#menuAgenda")
const menuday = document.querySelector('#diasel')
const menudayselect = document.querySelector('#daysel')
const menumonth = document.querySelector('#messel')
const menuyear = document.querySelector('#añosel')
const formulario = document.querySelector(".agenda__container")
const btn_enviar = document.querySelector('#close')

let eventos = [];




//Segun el dia clickeado selecciona el dia automaticamente al momento de crear un evento
for(let i = 0; i < day.length; i++){
    day[i].addEventListener('click',()=>{
        menu.showModal()
        // console.log(menudayselect[(menudayselect.length) - i -1]) //No es buena practica PARA NADA; pero sirve :3
        menudayselect[(menudayselect.length) - i -1].selected = true;
    })
}

//El formulario es enviado y dentro de un array se crea un evento
formulario.addEventListener('submit', (form)=>{
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
    for(let i = 0; i < eventos.length; i++){
        console.log(eventos[i])
    }

    //Resetea el formulario al terminar de crear el evento
    formulario.reset();

    //Cierra el menu
    menu.close()
})
