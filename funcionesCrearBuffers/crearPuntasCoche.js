

function crearPuntaCoche(){
  var tapa = crearTapaCoche();
  var curva = crearSuperficiePuntasCoche();
  curva.addChild(tapa);
  return curva;
}
