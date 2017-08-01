document.addEventListener("DOMContentLoaded", function(){
    comenzar();
});

function getId(id){
    return document.getElementById(id);
}

function create_pegar_elementosUl(elemento,pegar){
    var temp = document.createElement(elemento);
    pegar.appendChild(temp);
    return temp;
}

function propiedades_elementosLi(elemento,contenido){
    elemento.className="js_margen_contenido";
    switch(elemento.nodeName){
        case "SPAN":
            elemento.textContent=contenido;
            break;
        case "DIV":
            elemento.innerText=contenido;
            break; 
        case "INPUT":
            elemento.value= contenido;
            elemento.type= "button";
            break;
    }
}

function comenzar(){
    var ingresar_productoInput = getId("ingresar_producto");
    var ingresar_cantidadInput = getId("ingresar_cantidad");
    var contenidoUl = getId("contenido");
    var terminarInput = getId("terminar");

    ingresar_cantidadInput.addEventListener("keyup", (event)=>{
        var keyname = event.key; 

         var charCode = (event.which) ? event.which : event.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57)){
            alert("Digitar solo numeros");
            ingresar_cantidadInput.value="";
         }
         if (keyname === "Enter"){
            if (ingresar_productoInput.value !== "" && ingresar_cantidadInput.value !==""){
                guardar_contenidoUl(ingresar_productoInput,ingresar_cantidadInput);
                crear_contenidoUl(contenidoUl,"mostrar");
                ingresar_productoInput.value="";
                ingresar_productoInput.focus();
                ingresar_cantidadInput.value="";
            }
        }
    });

    terminarInput.addEventListener("click",function(){
        ingresar_productoInput.disabled=true;
        ingresar_cantidadInput.disabled=true;
        terminarInput.disabled=true;
        crear_contenidoUl(contenidoUl,"terminar");
    });    
}

var contenidoLi=[];
var contador=0;
function guardar_contenidoUl(producto,cantidad){
    contenidoLi.push({
        id: contador += 1,
        articulo: producto.value,
        unidades:cantidad.value,
        valor_unitario: 10,
        valor_total: calcular_valor_total(cantidad.value)
    }); 
}

function crear_contenidoUl(ul,accion){
    var total = 0;
    while(ul.firstChild !== null){
        ul.removeChild(ul.firstChild);
    }

    for(var i in contenidoLi){
        var elementoLi = create_pegar_elementosUl("li",ul);
        elementoLi.data = contenidoLi[i].id;

        var elemento_productoSpan = create_pegar_elementosUl("span",elementoLi);
        propiedades_elementosLi(elemento_productoSpan,contenidoLi[i].articulo);

        var elemento_cantidadSpan = create_pegar_elementosUl("span",elementoLi);
        propiedades_elementosLi(elemento_cantidadSpan,contenidoLi[i].unidades);

        var elemento_unitarioSpan = create_pegar_elementosUl("span",elementoLi);
        propiedades_elementosLi(elemento_unitarioSpan,contenidoLi[i].valor_unitario);

        var elemento_totalSpan = create_pegar_elementosUl("div",elementoLi);
        propiedades_elementosLi(elemento_totalSpan,formato_moneda(contenidoLi[i].valor_total));
        
        if(accion !== "terminar"){
            var elemento_modificarInput = create_pegar_elementosUl("input",elementoLi);
            propiedades_elementosLi(elemento_modificarInput,"Modificar");
            elemento_modificarInput.addEventListener("click",function(){
                modificar_contenidoLi(this.parentElement);
            });

            var elemento_eliminarInput = create_pegar_elementosUl("input", elementoLi);
            propiedades_elementosLi(elemento_eliminarInput,"Eliminar");
            elemento_eliminarInput.addEventListener("click",function(){
                eliminar_contenidoLi(this.parentElement);
            });
        } 

        total= calcular_total_factura(contenidoLi[i].valor_total,total);
    } 
    var total_factura = getId("total_factura");
    total_factura.textContent = formato_moneda(total);
}

function modificar_contenidoLi(li){
    for (var i in contenidoLi){
        if(li.data === contenidoLi[i].id){
            contenidoLi[i].articulo = nueva_info(li);
        }
    }
    crear_contenidoUl(li.parentElement,"mostrar");
}

function eliminar_contenidoLi(li){
    for(i in contenidoLi){
        if(li.data === contenidoLi[i].id){
           contenidoLi.splice(i,1);
        }
    }
    crear_contenidoUl(li.parentElement,"mostrar");
}

function nueva_info(li){
    var result= prompt("Ingrese producto",li.firstChild.textContent);
    if (result=== "" || result === null){
        return li.firstChild.textContent;
    }
    else{
        return result;
    }
}

function calcular_valor_total(cantidad){
    return calculo = parseInt(cantidad)*10;
}

function calcular_total_factura(calculo,total){
    total= parseInt(total) + parseInt(calculo);
    return total;
}

function formato_moneda(valor){
    return "$ " + new Intl.NumberFormat("es-CO").format(valor);
}