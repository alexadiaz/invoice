function convertirAPesosUsandoBanco(dolares, moneda, separadorMiles, separadorDecimales, numeroDecimales){
    var tasa = 0;
    if(moneda === 'MXN') tasa = 500;
    if(moneda === 'COP') tasa = 2300;

	console.log('cobro por ' + moneda);
    
    return moneda + ' ' + (dolares * tasa) + ' miles ' + separadorMiles + ' decimales ' + separadorDecimales + ' # decimales ' + numeroDecimales;
}