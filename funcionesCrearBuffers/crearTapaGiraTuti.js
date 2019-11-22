function crearTapaGiraTuti(altura,cantidadDeSillas,h){

  var ri1 = 7;
  var rf = 10;
  var ri2 = 6;
  var AnchoTieneSillas = 30;
  var gruesoSoga = 0.3;

  var tempb = crearTapaCircular(AnchoTieneSillas,altura,cantidadDeSillas);

  tempb.rotate(Math.PI/2,[1,0,0]);
  tempb.translate([0,14.5*h,0]);
  tempb.setColor([0.0,0.5,0.5]);


  var cil = crearCilindro(h*2,AnchoTieneSillas);
  cil.rotate(-Math.PI/2,[1,0,0]);
  tempb.addChild(cil);
  cil.setColor([0.0,0.3,0.5]);
  //onTest = creartapaCircular(10);


  var tempa = crearTapaCircular(AnchoTieneSillas);
  tempa.translate([0,2*h,0]);
  tempb.addChild(tempa);
  tempa.setColor([0.0,0.5,0.5]);
  for(var i = 0;i<cantidadDeSillas;i++){
    var soga = crearCilindro(9*h,gruesoSoga);
    soga.rotate(Math.PI/2,[1,0,0]);
    soga.rotate(i*2*Math.PI/(cantidadDeSillas),[0,0,1]);
    soga.translate([0,AnchoTieneSillas*2/3,0]);
    tempb.addChild(soga);
    soga.setColor([0.5,0.25,0.0]);

    var silla = crearAsiento();
    silla.translate([0,0,altura*2/3]);
    silla.rotate(-Math.PI/2,[0,0,1]);
    silla.rotate(-Math.PI/2,[1,0,0]);
    silla.setColor([0.7,0.7,0.7])
    soga.addChild(silla);
  }
  return tempb;
}
