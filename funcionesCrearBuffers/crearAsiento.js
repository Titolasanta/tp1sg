function crearAsiento(){
  var rect1 = crearRectangulo(5,5,2);
  var rect2 = crearRectangulo(5,5,2);
  rect2.rotate(Math.PI/2,[1.0,0.0,0.0]);
  rect1.addChild(rect2);
  return rect1;
}
