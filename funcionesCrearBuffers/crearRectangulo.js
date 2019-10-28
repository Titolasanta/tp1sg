function crearRectangulo(ancho,alto,profundidad)
{
  var plancha = {};
  plancha[0] = crearPlancha(ancho,profundidad);

  plancha[1] = crearPlancha(alto,profundidad);
  plancha[1].translate([ancho/2,alto/2,0]);
  plancha[1].rotate(Math.PI/2,[0,0,1]);
  plancha[0].addChild(plancha[1]);

  plancha[1] = crearPlancha(alto,profundidad);
  plancha[1].translate([-ancho/2,alto/2,0]);
  plancha[1].rotate(-Math.PI/2,[0,0,1]);
  plancha[0].addChild(plancha[1]);

  plancha[1] = crearPlancha(ancho,profundidad);
  plancha[1].translate([0,alto,0]);
  plancha[0].addChild(plancha[1]);

  plancha[1] = crearPlancha(ancho,alto);
  plancha[1].translate([0,alto/2,profundidad/2]);
  plancha[1].rotate(-Math.PI/2,[1,0,0]);
  plancha[0].addChild(plancha[1]);

    plancha[1] = crearPlancha(ancho,alto);
    plancha[1].translate([0,alto/2,-profundidad/2]);
    plancha[1].rotate(-Math.PI/2,[1,0,0]);
    plancha[0].addChild(plancha[1]);

  return plancha[0];
}
