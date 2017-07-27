document.addEventListener("DOMContentLoaded", function(){
    comenzar();
});

function getId(id){
    return document.getElementById(id);
}

function createElement(elemento,pegar){
    var temp = document.createElement(elemento);
    pegar.appendChild(temp);
    return temp;
}

function asignar_propiedades(elemento,contenido){
    switch(elemento.nodeName){
        case "SPAN":
            elemento.textContent=contenido.value;
            elemento.className="js_margen_contenido";
            break;
        case "DIV":
            elemento.innerText=contenido;
            elemento.className="js_margen_contenido";
            break; 
        case "INPUT":
            elemento.type= contenido;
            elemento.value="Modificar";
    }
}

function comenzar(){
    var ingresar_productoInput = getId("ingresar_producto");
    var ingresar_cantidadInput = getId("ingresar_cantidad");
    var contenidoUl = getId("contenido");
    
    ingresar_cantidadInput.addEventListener("keyup", (event)=>{
        var keyname = event.key; 

        if (keyname === "Enter"){
            if (ingresar_productoInput.value !== "" && ingresar_cantidadInput.value !==""){
                crear_contenidoUl(ingresar_productoInput,ingresar_cantidadInput,contenidoUl);
            }
        }
    });
}

function crear_contenidoUl(producto,cantidad,ul){
    var elementoLi = createElement("li",ul);
       
    var elemento_productoSpan = createElement("span",elementoLi);
    asignar_propiedades(elemento_productoSpan,producto);
    
    var elemento_cantidadSpan = createElement("span",elementoLi);
    asignar_propiedades(elemento_cantidadSpan,cantidad);
    
    var elemento_unitarioSpan = createElement("span",elementoLi);
    asignar_propiedades(elemento_unitarioSpan,producto);
    
    var elemento_totalSpan = createElement("div",elementoLi);
    var valor_total = calcular_valor_total(elemento_cantidadSpan);
    asignar_propiedades(elemento_totalSpan,valor_total);

    var elemento_modificarInput = createElement("input",elementoLi);
    asignar_propiedades(elemento_modificarInput,"button");
    
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
    var calculo = parseInt(cantidad.textContent)*10;
    calcular_total_factura(calculo);
    return calculo;
}

var total=0;
function calcular_total_factura(calculo){
    var total_factura= getId("total_factura");
    total= total + calculo;
    total_factura.textContent = total;
}