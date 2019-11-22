function crearLampara(){
  var bolaDeLuz = crearBolaDeLuz();
  var paloDePoste = crearCilindro(50,1);
  bolaDeLuz.setColor([0.9,0.9,0.9])
  paloDePoste.setColor([0.1,0.1,0.1])
  bolaDeLuz.addChild(paloDePoste);
  return bolaDeLuz;
}
