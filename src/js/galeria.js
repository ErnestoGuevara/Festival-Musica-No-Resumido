document.addEventListener("DOMContentLoaded",function(){
    crearGaleria();
})
function crearGaleria(){
    const galeria=document.querySelector(".galeria-imagenes");

    for(let i=1; i<=12;i++){
        const imagen=document.createElement("IMG");
        imagen.src=`build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId=i;

        //Añadir la funcion de mostrarImagen
        imagen.onclick=mostrarImagen;
        
        const lista=document.createElement("LI");
        lista.appendChild(imagen);

        galeria.appendChild(lista);
    }
   
}

function mostrarImagen(e) {

    const id=parseInt(e.target.dataset.imagenId);
    
    //Generar Imagen Grande
    const imagen= document.createElement("IMG")
    imagen.src=`build/img/grande/${id}.webp`;

    const overlay=document.createElement("DIV")
    overlay.appendChild(imagen);
    overlay.classList.add("overlay");
    //Boton para cerra la imagen
    const cerrarImagen=document.createElement("P")
    cerrarImagen.textContent="X"
    cerrarImagen.classList.add("btn-cerrar")

    //Cuando se da click cerrar la imagen
    overlay.onclick=function () {
        overlay.remove();
    }

    //Cuando se presiona cierra imagen
    cerrarImagen.onclick=function() {
        overlay.remove();
    }
    overlay.appendChild(cerrarImagen);
    //Mostrar en el html
    const body=document.querySelector("body");
    body.appendChild(overlay);
    body.classList.add("fijar-body");
    
}