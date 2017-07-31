// Usando funciones sencillas que retornan valores y usan variables globales

var listCOP = [];
var listDOL = [];

function llamarAConvertirCOP(dolares){
    
    if(listDOL[dolares] == null){
        listDOL[dolares] = dolares;
        listCOP[dolares] =  convertirAPesosUsandoBanco(dolares, 'COP', ',', '.', 3);
    }
    
    return listCOP[dolares];
}


llamarAConvertirCOP(10)
llamarAConvertirCOP(10)

listCOP[10] = 'COP 10000000 miles , decimales . # decimales 3'


llamarAConvertirCOP(10)