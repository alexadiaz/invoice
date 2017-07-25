document.addEventListener("DOMContentLoaded", function(){
    var ingresar_productoInput = getId("ingresar_producto");
    var ingresar_cantidadInput = getId("ingresar_cantidad");
    var contenidoUl = getId("contenido");

    ingresar_productoInput.addEventListener("click",function(){
        crear_contenido(ingresar_productoInput,ingresar_cantidadInput,contenidoUl);
    });
});

function getId(id){
    return document.getElementById(id);
}

function createElement(elemento){
    return document.createElement(elemento);
}

function crear_contenido(producto,cantidad,ul){
    var elementoLi = createElement("li");
    var elemento_productoSpan = createElement("span");
    var elemento_cantidadSpan = createElement("span");

    elemento_productoSpan.textContent=producto.value;
    elemento_cantidadSpan.textContent=cantidad.value;

    elementoLi.appendChild(elemento_productoSpan);
    elementoLi.appendChild(elemento_cantidadSpan);

    ul.appendChild(elementoLi);
}