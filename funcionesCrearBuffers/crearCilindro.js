function crearCilindro()
{
    var pos=[];
    var normal=[];
    var r=2;
    var rows=128;	// filas
    var cols=256;	// columnas

    for (var i=0;i<=rows;i++){
        for (var j=0;j<=cols;j++){
            var pfi,tita;
            pfi = 2*Math.PI*j/cols;


            pos.push(r  * Math.sin(pfi));
            pos.push(r * Math.cos(pfi));			// lleno el buffer de vértices
            pos.push(i/rows);

            normal.push( Math.sin(pfi));		// lleno el buffer de normales
            normal.push( Math.cos(pfi));
            normal.push(0);
        }
    }

    var index=[];

    for (var i=0;i<=rows-1;i++){
        index.push(i*cols);
        for (var j=0;j<=cols-1;j++){

          // lleno el buffer de indices del quad
            index.push(i*cols+j);
            index.push((i+1)*cols+j);
            index.push(i*cols+j+1);
            index.push((i+1)*cols+j+1);
        }
        index.push((i+1)*cols+cols-1);
    }



            return new Obj3D(modelMatrix,normalMatrix,pos,normal,index);
}
