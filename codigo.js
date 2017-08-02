document.addEventListener("DOMContentLoaded", function(){
    comenzar();
});

var isNuevo = true;
var idActual = null;

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

    ingresar_cantidadInput.addEventListener("keyup", function(event){
        var resultado = es_numero_valido(event);
        if(resultado == false){
            alert("Digitar solo numeros");
            ingresar_cantidadInput.value="";
        }
        else{

            var keyname = event.key; 
            if (keyname === "Enter"){
                if( es_inputs_validos(ingresar_productoInput,ingresar_cantidadInput) === true ){

                    guardar_contenidoUl(ingresar_productoInput,ingresar_cantidadInput);
                    crear_contenidoUl(contenidoUl,"mostrar");
                    ingresar_productoInput.value="";
                    ingresar_productoInput.focus();
                    ingresar_cantidadInput.value="";
                }
            }
        }
    });
      
    terminarInput.addEventListener("click",function(){
        ingresar_productoInput.disabled=true;
        ingresar_productoInput.value="";
        ingresar_cantidadInput.disabled=true;
        ingresar_cantidadInput.value="";
        terminarInput.disabled=true;
        crear_contenidoUl(contenidoUl,"terminar");
    });    
}

function es_numero_valido(event){
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)){
        return false;
    }
    else{
        return true;
    }
}

function es_inputs_validos(ingresar_productoInput, ingresar_cantidadInput){
    if (ingresar_productoInput.value !== "" && ingresar_cantidadInput.value !==""){
        return true;
    }
    else{
        return false;
    }
}

var contenidoLi=[];
var contador=0;
function guardar_contenidoUl(producto,cantidad ){
    if (isNuevo){
        contenidoLi.push({
            id: contador += 1,
            articulo: producto.value,
            unidades:cantidad.value,
            valor_unitario: 10,
            valor_total: calcular_valor_total(cantidad.value)
        }); 
    }
    else{
        contenidoLi[idActual - 1].articulo = producto.value;
        contenidoLi[idActual - 1].unidades = cantidad.value;
        isNuevo = true;
        idActual = null;
    }
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

                isNuevo = false;
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
    var ingresar_productoInput = getId("ingresar_producto");
    var ingresar_cantidadInput = getId("ingresar_cantidad");
       
    for (var i in contenidoLi){
        if(li.data === contenidoLi[i].id){
            ingresar_productoInput.value = contenidoLi[i].articulo;
            ingresar_cantidadInput.value = contenidoLi[i].unidades;
            crear_contenidoUl(li.parentElement,"terminar");
            idActual = contenidoLi[i].id;
        }
    }
}

function eliminar_contenidoLi(li){
    for(i in contenidoLi){
        if(li.data === contenidoLi[i].id){
           contenidoLi.splice(i,1);
        }
    }
    crear_contenidoUl(li.parentElement,"mostrar");
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