document.addEventListener("DOMContentLoaded", function(){
    comenzar();
});

function getId(id){
    return document.getElementById(id);
}

function createElement(elemento,contenido){
    var temp = document.createElement(elemento);
    temp.textContent = contenido.value;
    return temp;
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
    var elementoLi = createElement("li","1");
    
    var elemento_productoSpan = createElement("span",producto);
    var elemento_cantidadSpan = createElement("span",cantidad);
    var elemento_unitarioSpan = createElement("span",producto);
    var elemento_totalSpan = createElement("span",cantidad);
    
    elementoLi.appendChild(elemento_productoSpan);
    elementoLi.appendChild(elemento_cantidadSpan);
    elementoLi.appendChild(elemento_unitarioSpan);
    elementoLi.appendChild(elemento_totalSpan);

    ul.appendChild(elementoLi);
    guardar_contenidoUl(elementoLi);
}

var contenidoLi=[];
function guardar_contenidoUl(li){
    contenidoLi.push({
        articulo: li.children[0].textContent,
        cantidad: li.children[1].textContent,
        valor_unitatio: li.children[2].textContent,
        valor_total: li.children[3].textContent
    }); 
    console.log(contenidoLi);
}