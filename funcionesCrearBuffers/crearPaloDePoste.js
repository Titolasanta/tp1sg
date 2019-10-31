function crearPaloDePoste()
{
    var pos=[];
    var normal=[];
    var r=0.85;
    var rows=50;	// filas
    var cols=56;	// columnas

    for (var i=0;i<=rows;i++){
        for (var j=0;j<=cols;j++){
            var pfi,tita;
            pfi = 2*Math.PI*j/cols;


            pos.push(r  * Math.sin(pfi));
            pos.push(r * Math.cos(pfi));			// lleno el buffer de vértices
            pos.push(10*i/rows);

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
        var temp = mat4.create();
        mat4.identity(temp);

                    var temp2 = mat3.create();
            mat3.identity(temp2);
        return new Obj3D(temp,temp2,pos,normal,index);
}
