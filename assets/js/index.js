const cargarNuevaImagen = (contador) => {
    let img = document.querySelector("#banner") //ubica en el lugar del id
    if(contador%2!=0){
        img.setAttribute("src", "/imagenes/apuestas0.png")
    } else {
        img.setAttribute("src", "/imagenes/apuestas1.png")
    }

}

const main = () => {
    const contador = 0;
    window.setInterval(cargarNuevaImagen(contador++), 3000)
}

window.addEventListener("load", main)