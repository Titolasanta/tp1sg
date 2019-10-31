function crearPlancha(largo,ancho)
{
    var pos=[];
    var normal=[];
    var r=0;
    var rows=3;	// filas
    var cols=3;	// columnas

    for (var i=0;i<rows;i++){
        for (var j=0;j<cols;j++){

            var x = largo * i/(rows-1) - largo/2;
            var y = 0;
            var z = ancho*j/(cols-1)-ancho/2;


            pos.push(x);			// lleno el buffer de vértices
            pos.push(0);
            pos.push(z);

            normal.push(0);		// lleno el buffer de normales
            normal.push(1);
            normal.push(0);
        }
    }

    var index=[];

    for (var i=0;i<rows-1;i++){
        index.push(i*cols);
        for (var j=0;j<cols;j++){

            // lleno el buffer de indices del quad
            index.push(i*cols+j);
            index.push((i+1)*cols+j);

        }
        index.push((i+1)*cols+cols-1);
    }

        var temp = mat4.create();
        mat4.identity(temp);

                    var temp2 = mat3.create();
            mat3.identity(temp2);
        return new Obj3D(temp,temp2,pos,normal,index);
}
