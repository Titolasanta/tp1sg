function crearLampara(){
  var bolaDeLuz = crearBolaDeLuz();
  var paloDePoste = crearPaloDePoste();
  bolaDeLuz.setColor([0.9,0.9,0.9])
  paloDePoste.setColor([0.1,0.1,0.1])
  bolaDeLuz.addChild(paloDePoste);
  return bolaDeLuz;
}
