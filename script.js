const fechas = document.querySelectorAll(".calendary__date");

fechas.forEach((fecha) => {
    fecha.addEventListener("click", () => {
        const dia = fecha.getAttribute("data-date");

        alert(dia);
    });
});