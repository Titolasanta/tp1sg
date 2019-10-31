function crearTapaCircular(r)
{
    var pos=[];
    var normal=[];
    if(!r){
      var r=1;
    }
    var rows=50;	// filas

    pos.push(0);
    pos.push(0);
    pos.push(0);

    for (var i=0;i<=rows;i++){
            var alpha = 2*Math.PI*i/rows;

            var x = r * Math.cos(alpha);
            var y = 0;
            var z = r * Math.sin(alpha);


            pos.push(x);			// lleno el buffer de vértices
            pos.push(0);
            pos.push(z);

            normal.push(0);		// lleno el buffer de normales
            normal.push(1);
            normal.push(0);
    }

    var index=[];

    for (var i=0;i<=rows;i++){
        index.push(0);
        index.push(i);
    }

        index.push(1);

        var temp = mat4.create();
        mat4.identity(temp);

                    var temp2 = mat3.create();
            mat3.identity(temp2);
        return new Obj3D(temp,temp2,pos,normal,index);
}
