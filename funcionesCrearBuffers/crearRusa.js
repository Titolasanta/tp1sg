

function crearRusa()
{


  var puntosRecorridoRusa = puntosRecorridoRusa1;

if(primeraEjecuccion){

  for(var i = 0, length = puntosRecorridoRusa.length; i < length; i++){
      puntosRecorridoRusa[i] *= 3;
  }

  for(var i = 0, length = puntosCuniaRusa.length; i < length; i++){
      puntosCuniaRusa[i] /= 10;
  }
}


var puntosRecorridoRusa = puntosRecorridoRusa2;

if(primeraEjecuccion){

for(var i = 0, length = puntosRecorridoRusa.length; i < length; i++){
    puntosRecorridoRusa[i] *= 30;
}

}

if(primeraEjecuccion){

  for(var i = 0, length = puntosCuniaRusa.length; i < length; i++){
      puntosCuniaRusa[i] *= 1;
  }
  for(var i = 0, length = puntosCuniaRusa.length; i < length; i++){
    if(i%3==1)
        puntosCuniaRusa[i] *= 1.2;
    }

  }



  var pos=[];
  var normal=[];

  if(curvaRusaElegida == 1){
    puntosRecorridoRusa = puntosRecorridoRusa1;
  }else {
    puntosRecorridoRusa = puntosRecorridoRusa2;
  }


  var recorridoSpline = new BSpline(puntosRecorridoRusa);
  var formaBezier = new Bezier(puntosCuniaRusa);

  var fracPorPuntoForma=2;
  var iteracionesTotalForma = fracPorPuntoForma*(puntosCuniaRusa.length/3);


  var fracPorPuntoBarrido=25;
  var iteracionesTotalBarrido = fracPorPuntoBarrido*puntosRecorridoRusa.length/3 - (3 * fracPorPuntoBarrido);
  var r = 0.2;
  for (var i=0;i<iteracionesTotalBarrido;i++){


      for (var j=0;j<iteracionesTotalForma;j++){
        var t = Math.floor(j/(4*fracPorPuntoForma));
        var u = j/(4*fracPorPuntoForma) - t;
        var posFroma = formaBezier.bezierGetPunto(t,u);
        var derForma = formaBezier.bezierGetDerPunto(t,u);
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
        if(curvaRusaElegida == 1){
          if(j==0&&i>1&&i<iteracionesTotalBarrido-fracPorPuntoBarrido){
                curvaRusaRecorrido.push([x,y,z] );
                curvaRusaRecorridoNormal.push(vNormal)
          }
        }else{
          if(j==0&&i>0){
                curvaRusaRecorrido.push([x,y,z] );
                curvaRusaRecorridoNormal.push(vNormal)
          }
        }
        if(Number.isNaN(x)||Number.isNaN(y)||Number.isNaN(z)){
          system.alert("hola");
        }
        pos.push(x);
        pos.push(y);
        pos.push(z);

        var vN = formaBezier.bezierGetNormal(posFroma,derForma);

        //mal
        normal.push(vN[0]);		// lleno el buffer de normales
        normal.push(vN[1]);
        normal.push(vN[2]);
    }
}

console.log(i*j,i,j);
var index=[];


var rows = iteracionesTotalBarrido;
var cols = iteracionesTotalForma;

    for (var i=0;i<=rows-2;i++){
        index.push(i*cols);
        for (var j=0;j<=cols-2;j++){
          // lleno el buffer de indices del quad
            index.push(i*cols+j);
            index.push((i+1)*cols+j);
            index.push(i*cols+j+1);
            index.push((i+1)*cols+j+1);
        }
        index.push((i+1)*cols+cols-1);
    }
        var temp = mat4.create();
        mat4.identity(temp);

            var temp2 = mat3.create();
            mat3.identity(temp2);
        return new Obj3D(temp,temp2,pos,normal,index);
}
