function crearLampara(){
  var bolaDeLuz = crearBolaDeLuz();
  var paloDePoste = crearPaloDePoste();
  bolaDeLuz.addChild(paloDePoste);
  return bolaDeLuz;
}
