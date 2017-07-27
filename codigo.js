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
            elemento.textContent=contenido.value;
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
    var elementoLi = create_pegar_elementosUl("li",ul);
           
    var elemento_productoSpan = create_pegar_elementosUl("span",elementoLi);
    propiedades_elementosLi(elemento_productoSpan,producto);
    
    var elemento_cantidadSpan = create_pegar_elementosUl("span",elementoLi);
    propiedades_elementosLi(elemento_cantidadSpan,cantidad);
    
    var elemento_unitarioSpan = create_pegar_elementosUl("span",elementoLi);
    propiedades_elementosLi(elemento_unitarioSpan,producto);
    
    var elemento_totalSpan = create_pegar_elementosUl("div",elementoLi);
    var valor_total = calcular_valor_total(elemento_cantidadSpan);
    propiedades_elementosLi(elemento_totalSpan,valor_total);

    var elemento_modificarInput = create_pegar_elementosUl("input",elementoLi);
    propiedades_elementosLi(elemento_modificarInput,"Modificar");
    elemento_modificarInput.addEventListener("click",function(){
        modificar_contenidoUl(this.parentElement);
    });
    
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

function modificar_contenidoUl(li){
    
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