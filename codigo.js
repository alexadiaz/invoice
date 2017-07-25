document.addEventListener("DOMContentLoaded", function(){
    comenzar();
});

function getId(id){
    return document.getElementById(id);
}

function createElement(elemento){
    return document.createElement(elemento);
}

function comenzar(){
    var ingresar_productoInput = getId("ingresar_producto");
    var ingresar_cantidadInput = getId("ingresar_cantidad");
    var contenidoUl = getId("contenido");

    ingresar_productoInput.addEventListener("click",function(){
        crear_contenidoUl(ingresar_productoInput,ingresar_cantidadInput,contenidoUl);
    });
}

function crear_contenidoUl(producto,cantidad,ul){
    var elementoLi = createElement("li");
    
    var elemento_productoSpan = createElement("span");
    var elemento_cantidadSpan = createElement("span");
    var elemento_unitarioSpan = createElement("span");
    var elemento_totalSpan = createElement("span");

    elementoLi.appendChild(elemento_productoSpan);
    elementoLi.appendChild(elemento_cantidadSpan);
    elementoLi.appendChild(elemento_unitarioSpan);
    elementoLi.appendChild(elemento_totalSpan);

    ul.appendChild(elementoLi);
    
    guardar_contenidoLi(producto,cantidad,ul);
}

function guardar_contenidoLi(producto,cantidad,ul){
    var li = ul.children;
    var contenidoLi =[];
   
    for (var i=0; i< li.length; i++){
         
        contenidoLi[i] = {
            articulo: producto.value,
            cantidad: cantidad.value,
            valor_unitatio: "1000",
            valor_total: "2000"
        }
    }
}