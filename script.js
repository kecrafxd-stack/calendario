const day = document.querySelectorAll(".calendary__date");
const menu = document.querySelector("#menuAgenda")
const menuday = document.querySelector('#diasel')
const menudayselect = document.querySelector('#daysel')
const menumonth = document.querySelector('#messel')
const menuyear = document.querySelector('#añosel')
const closemenu = document.querySelector("#close")


for(let i = 0; i < day.length; i++){
    day[i].addEventListener('click',()=>{
        menu.showModal()
        // console.log(menudayselect[(menudayselect.length) - i -1]) //No es buena practica PARA NADA; pero sirve :3Q4TG  87898,M   
        menudayselect[(menudayselect.length) - i -1].selected = true;
    })
}

closemenu.addEventListener('click', () =>{
    menu.close();
})
