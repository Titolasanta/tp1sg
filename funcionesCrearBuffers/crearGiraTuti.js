function crearGiraTuti(altura,cantidadDeSillas){
  var h = altura/15;
  var ri1 = 7;
  var rf = 10;
  var ri2 = 6;
  var AnchoTieneSillas = 30;
  var gruesoSoga = 0.3;

  var cilll = crearCilindro(h*3,rf);
  cilll.rotate(-Math.PI/2,[1,0,0]);
  cilll.setColor([0.0,0.2,0.3]);
  onTest.addChild(cilll);

  var cilindroTriangular = crearCilindroTriangular(h,rf,ri1);
  cilindroTriangular.translate([0,0,3*h]);
  cilll.addChild(cilindroTriangular);

  var cil = crearCilindro(h,ri1);
  cil.translate([0,0,4*h]);
  cilll.addChild(cil);
  cil.setColor([0.0,0.2,0.3]);

  cilindroTriangular = crearCilindroTriangular(h/2,ri1,ri2);
  cilindroTriangular.translate([0,0,5*h]);
  cilll.addChild(cilindroTriangular);


  var cil = crearCilindro(h*9,ri2);
  cil.translate([0,0,5.5*h]);
  cilll.addChild(cil);
  cil.setColor([0.0,0.2,0.3]);
  //onTest.addChild(cilindroTriangular);
  return cilll;

}
