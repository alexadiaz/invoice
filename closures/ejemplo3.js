// Usando una funcion que devuelve otra funcion

function llamarAConvertirUsandoFuncion(moneda){

    var listDOL_COP = [];
    var listCOP = [];
    
    var listDOL_MXN = [];
    var listMXN = [];
    
   
    return function(dolares){

        switch(moneda){
            case 'MXN':
                if(listDOL_MXN[dolares] == null){
                    listDOL_MXN[dolares] = dolares;
                    listMXN[dolares] = convertirAPesosUsandoBanco(dolares, 'MXN', ',', '.', 3);
                }
                return listMXN[dolares];
            case 'COP':
                if(listDOL_COP[dolares] == null){
                        listDOL_COP[dolares] = dolares;
                        listCOP[dolares] = convertirAPesosUsandoBanco(dolares, 'COP', ',', '.', 3);
                    }
                return listCOP[dolares];
            break;
            default:
                return 'error';
        }
    }
}

var cop = llamarAConvertirUsandoFuncion('COP');
var mxn = llamarAConvertirUsandoFuncion('MXN');

cop(10);
mxn(10);