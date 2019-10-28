function crearCoche(){

  var tapaCoche=[];
  var conoPuntasCoche=[];
                tapaCoche[0] = crearTapaCoche();
                conoPuntasCoche[0] = crearConoPuntasCoche();
                tapaCoche[0].addChild(conoPuntasCoche[0]);

                tapaCoche[1] = crearTapaCoche();
                conoPuntasCoche[1] = crearConoPuntasCoche();
                tapaCoche[1].addChild(conoPuntasCoche[1]);

                tapaCoche[1].translate([0,0,50]);
                tapaCoche[1].rotate(Math.PI,[0.0,1.0,0.0]);
                tapaCoche[0].addChild(tapaCoche[1]);

                var cuerpoCoche = crearCuerpoCoche();

                cuerpoCoche.translate([0,0,9]);
                tapaCoche[0].addChild(cuerpoCoche);

                var asiento1 = crearAsiento();
                var asiento2 = crearAsiento();

                asiento1.translate([0,0,10]);
                asiento2.translate([0,0,28]);
                asiento1.scale([2,2,2]);
                asiento2.scale([2,2,2]);
                tapaCoche[0].addChild(asiento2);
                tapaCoche[0].addChild(asiento1);

                return tapaCoche[0];
              }
