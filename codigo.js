document.addEventListener("DOMContentLoaded", function(){
    comenzar();
});

function getId(id){
    return document.getElementById(id);
}

function createElement(elemento){
    return document.createElement(elemento);
}

function asignar_propiedades(elemento,contenido){
    if(elemento.nodeName==="SPAN"){
        elemento.textContent = contenido.value;
    }
    else{
        elemento.innerText=contenido;
    }
    elemento.className= "js_margen_contenido";
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
    asignar_propiedades(elemento_productoSpan,producto);
    
    var elemento_cantidadSpan = createElement("span");
    asignar_propiedades(elemento_cantidadSpan,cantidad);
    
    var elemento_unitarioSpan = createElement("span");
    asignar_propiedades(elemento_unitarioSpan,producto);
    
    var elemento_totalSpan = createElement("div");
    var valor_total = calcular_valor_total(elemento_cantidadSpan);
    asignar_propiedades(elemento_totalSpan,valor_total);
    
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

function calcular_valor_total(cantidad){
    return(parseInt(cantidad.textContent)*10);
}