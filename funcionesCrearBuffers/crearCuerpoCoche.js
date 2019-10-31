
function crearCuerpoCoche()
{
  var pos=[];
  var normal=[];
  var fracPorPuntoForma=10;
  var iteracionesTotalForma = fracPorPuntoForma*(puntosTapaCoche.length/3);

  var iteracionesTotalBarrido=10;	// filas
  var bezier = new Bezier(puntosTapaCoche);

      for (var i=0;i<=iteracionesTotalBarrido;i++){
        for (var j=0;j<iteracionesTotalForma;j++){

            var t = Math.floor(j/(4*fracPorPuntoForma));
            var u = j/(4*fracPorPuntoForma) - t;
            var posForma = bezier.bezierGetPunto(t,u);
            var derForma = bezier.bezierGetDerPunto(t,u);

            var x = posForma[0]*(1.9);
            var y = posForma[1]*(1.9);
            var z = posForma[2]+i*4;

            pos.push(x);			// lleno el buffer de vértices
            pos.push(y);
            pos.push(z);
            if(Number.isNaN(x)){
              system.alert("hola");

              }

              var vN = bezier.bezierGetNormal(posForma,derForma);

              //mal
              normal.push(vN[0]);		// lleno el buffer de normales
              normal.push(vN[1]);
              normal.push(vN[2]);
      }
    }

    var index=[];
    //creacion de rotacion
    for (var i=iteracionesTotalForma*1/10;i<=iteracionesTotalForma*2/5-2;i++){
        for (var j=0;j<=iteracionesTotalBarrido-2;j++){

          // lleno el buffer de indices del quad
            index.push(j*iteracionesTotalForma+i);
            index.push((j)*iteracionesTotalForma+i+1);


        }
    }

        var temp = mat4.create();
        mat4.identity(temp);

                    var temp2 = mat3.create();
            mat3.identity(temp2);
        return new Obj3D(temp,temp2,pos,normal,index,[0.0,0.0,1.0]);
}
