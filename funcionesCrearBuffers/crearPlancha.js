function crearPlancha()
{
    var pos=[];
    var normal=[];
    var r=0;
    var rows=128;	// filas
    var cols=256;	// columnas

    for (var i=0;i<rows;i++){
        for (var j=0;j<cols;j++){

            pos.push(20*i/rows-10);			// lleno el buffer de vértices
            pos.push(-1);
            pos.push(20*j/cols-10);

            normal.push(0);		// lleno el buffer de normales
            normal.push(1);
            normal.push(0);
        }
    }

    var index=[];

    for (var i=0;i<rows-1;i++){
        index.push(i*cols);
        for (var j=0;j<cols-1;j++){

            // lleno el buffer de indices del quad
            index.push(i*cols+j);
            index.push((i+1)*cols+j);
        }
        index.push((i+1)*cols+cols-1);
    }
    var temp = mat4.create();
    mat4.identity(temp);
    return new Obj3D(temp,temp,pos,normal,index);
}
