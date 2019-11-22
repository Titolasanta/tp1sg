function crearRusaEntera(cantidadDeColumnas){

  var rusa = crearRusa();
  rusa.rotate(-Math.PI/2,[1,0,0]);
  rusa.setColor([0.3,0.3,0.3]);
  var altoCil = 100;
  var bug = 0;
  for(var i = 0;i<cantidadDeColumnas;i++){
    var seg = Math.floor(curvaRusaRecorrido.length * (i/cantidadDeColumnas) );
    var x = curvaRusaRecorrido[seg];

    if(Math.abs(x[1])<2 && Math.abs(x[0])<3){
      bug++;
      if(bug >1000){
        console.log("demasiadas Columnas");
        break;
      }
      cantidadDeColumnas++;
      continue;
    }
    cilindro = crearCilindro(altoCil,0.2);
    cilindro.translate([x[0],x[1],x[2]]);
    cilindro.translate([0,0,-altoCil]);
    cilindro.rotate(Math.PI/2,[0,0,1]);

    cilindro.setColor([0,0.0,0.5]);
    rusa.addChild(cilindro);
  }
  return rusa;
}
