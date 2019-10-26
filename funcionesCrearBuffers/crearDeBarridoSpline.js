

var ejemploCurvas =
[0,1,0,
  0,1,0,
1,0,0,
0,-1,0,
-1,0,0,
-2,0,0,
-2,0,0];

var ejemploForma =[
  0,1,0,
  0,1,0,
1,0,0,
0,-1,0,
-1,0,0,
0,1,0,
0,1,0];


function crearCurvaBarridoSpline()
{
    var pos=[];
    var normal=[];
    var r = 0.2;
    var fracPorPuntoForma=20;
    var iteracionesTotalForma = fracPorPuntoForma*ejemploForma.length/3;

    var fracPorPuntoBarrido=4;
    var iteracionesTotalBarrido = fracPorPuntoBarrido*ejemploCurvas.length/3;

    var bSpline = new BSpline(ejemploCurvas);
    var formaBSpline = new BSpline(ejemploForma);
    for (var i=0;i<iteracionesTotalBarrido;i++){
        for (var j=0;j<iteracionesTotalForma;j++){

            var t = Math.floor(j/fracPorPuntoForma);
            var u = j/fracPorPuntoForma - t;
            var posFroma = formaBSpline.splineGetPunto(t,u);

            t = Math.floor(i/fracPorPuntoBarrido);
            u = i/fracPorPuntoBarrido - t;

            var punto = bSpline.splineGetPunto(t,u);
            var puntoDer = bSpline.splineGetDerPunto(t,u);
            var tangente = bSpline.splineGetTangente(punto,puntoDer);
            var vNormal = bSpline.splineGetNormal(punto,puntoDer);
            var binormal = bSpline.splineGetBinormal(punto,puntoDer);

            var x = posFroma[2]*tangente[0]+posFroma[1]*vNormal[0]+posFroma[0]*binormal[0] + punto[0];
            var y = posFroma[2]*tangente[1]+posFroma[1]*vNormal[1]+posFroma[0]*binormal[1] + punto[1];
            var z = posFroma[2]*tangente[2]+posFroma[1]*vNormal[2]+posFroma[0]*binormal[2] + punto[2];

            if(Number.isNaN(x)){
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
                index.push(i*cols+j+1);
                index.push((i+1)*cols+j+1);
            }
            index.push((i+1)*cols+cols-1);
            console.log(Math.max.apply(Math, index));
        }

    return new Obj3D(modelMatrix,normalMatrix,pos,normal,index);
}
