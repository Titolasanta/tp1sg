

function crearRusa()
{
  var pos=[];
  var normal=[];


for(var i = 0, length = puntosCuniaRusa.length; i < length; i++){
    puntosCuniaRusa[i] /= 10;
}
  var fracPorPuntoForma=5;
  var iteracionesTotalForma = fracPorPuntoForma*puntosCuniaRusa.length/3;

  var fracPorPuntoBarrido=4;
  var iteracionesTotalBarrido = fracPorPuntoBarrido*puntosRecorridoRusa.length/3;

  var recorridoSpline = new BSpline(puntosRecorridoRusa);
  var formaBezier = new Bezier(puntosCuniaRusa);
  for (var i=0;i<iteracionesTotalBarrido;i++){
      for (var j=0;j<iteracionesTotalForma;j++){
        var t = Math.floor(j/(4*fracPorPuntoForma));
        var u = j/(4*fracPorPuntoForma) - t;
        var posFroma = formaBezier.bezierGetPunto(t,u);
        //var posFroma = [r*Math.cos(2*Math.PI*j/iteracionesTotalForma),r*Math.sin(2*Math.PI*j/iteracionesTotalForma),0];

        t = Math.floor(i/fracPorPuntoBarrido);
        u = i/fracPorPuntoBarrido - t;

        var punto = recorridoSpline.splineGetPunto(t,u);
        var puntoDer = recorridoSpline.splineGetDerPunto(t,u);
        var tangente = recorridoSpline.splineGetTangente(punto,puntoDer);
        var vNormal = recorridoSpline.splineGetNormal(punto,puntoDer);
        var binormal = recorridoSpline.splineGetBinormal(punto,puntoDer);

        var x = posFroma[2]*tangente[0]+posFroma[1]*vNormal[0]+posFroma[0]*binormal[0] + punto[0];
        var y = posFroma[2]*tangente[1]+posFroma[1]*vNormal[1]+posFroma[0]*binormal[1] + punto[1];
        var z = posFroma[2]*tangente[2]+posFroma[1]*vNormal[2]+posFroma[0]*binormal[2] + punto[2];

        if(Number.isNaN(x)||Number.isNaN(y)||Number.isNaN(z)){
          system.alert("hola");
        }
        pos.push(x);
        pos.push(y);
        pos.push(z);


        normal.push(x-punto[0]);		// lleno el buffer de normales
        normal.push(y-punto[1]);
        normal.push(z-punto[2]);
    }
}

var index=[];


var rows = iteracionesTotalBarrido;
var cols = iteracionesTotalForma;

    for (var i=0;i<=rows-2;i++){
        index.push(i*cols);
        for (var j=0;j<=cols-2;j++){
          // lleno el buffer de indices del quad
            index.push(i*cols+j);
            index.push((i+1)*cols+j);
            //index.push(i*cols+j+1);
            //index.push((i+1)*cols+j+1);
        }
        index.push((i+1)*cols+cols-1);
    }

return new Obj3D(modelMatrix,normalMatrix,pos,normal,index);
}
