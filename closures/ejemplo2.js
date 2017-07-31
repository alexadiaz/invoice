// Usando una funcion que retorna un objeto, y luego llamando las funciones del objeto

function llamarAConvertirUsandoObjeto(){
    var mxnFn = llamarAConvertirUsandoFuncion('MXN');
    var obj = {
        cop: function(dolares){
            return convertirAPesosUsandoBanco(dolares, 'COP', ',', '.', 3);
        },
        mxn: function(dolares){
            return mxnFn(dolares);
        }
    };
    return obj;
}


var fnObj = llamarAConvertirUsandoObjeto()

fnObj.mxn(10)
fnObj.cop(10)