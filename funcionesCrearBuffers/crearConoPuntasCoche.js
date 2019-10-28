



function crearConoPuntasCoche()
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

            var x = posForma[0]*(1+i/iteracionesTotalBarrido);
            var y = posForma[1]*(1+i/iteracionesTotalBarrido);
            var z = posForma[2]+i;

            pos.push(x);			// lleno el buffer de vértices
            pos.push(y);
            pos.push(z);
            if(Number.isNaN(x)){
              system.alert("hola");

              }


              //mal
              normal.push(1);		// lleno el buffer de normales
              normal.push(0);
              normal.push(0);
      }
    }

    var index=[];



    for (var i=0;i<=iteracionesTotalBarrido-2;i++){
        index.push(i*iteracionesTotalForma);
        for (var j=0;j<=iteracionesTotalForma-2;j++){

          // lleno el buffer de indices del quad
            index.push(i*iteracionesTotalForma+j);
            index.push((i+1)*iteracionesTotalForma+j);
            index.push(i*iteracionesTotalForma+j+1);
            index.push((i+1)*iteracionesTotalForma+j+1);
        }
        index.push((i+1)*iteracionesTotalForma+iteracionesTotalForma-1);
    }
        var temp = mat4.create();
        mat4.identity(temp);

            var temp2 = mat4.create();
            mat4.identity(temp2);
        return new Obj3D(temp,temp2,pos,normal,index);
}
