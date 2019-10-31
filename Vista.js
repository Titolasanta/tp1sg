class Vista{









  constructor(){
    this.vistaActual = 0;
    this.totalCamaras = 5;
    this.rotacionCamara = 0;


  }



  handlePressKeyEvent(event){
    switch (this.vistaActual) {
      case 0:
        this.handlePressKeyEvent0();
        break;
      case 1:
        this.handlePressKeyEvent1();
        break;
      case 2:
        this.handlePressKeyEvent2();
        break;
      case 3:
        this.handlePressKeyEvent3();
        break;
      case 4:
        this.handlePressKeyEvent4();
      default:

    }

  }

handlePressKeyEvent0(){
  if (event.key=="w"){
      var a = vec3.create();
      a=vec3.normalize(a,vector3MinusVector3(camara.posicion,camara.lookAt));
      mat4.translate(viewMatrix,viewMatrix,a);
  }
  if (event.key=="a"){
          var a = vec3.create();
          a=vec3.normalize(a, vec3.cross( a,vector3MinusVector3(camara.lookAt,camara.posicion),camara.lookUp ) );
          mat4.translate(viewMatrix,viewMatrix,a);
  }
  if (event.key=="d"){

        var a = vec3.create();
        a=vec3.normalize(a, vec3.cross( a,camara.lookUp,vector3MinusVector3(camara.lookAt,camara.posicion) ) );
        mat4.translate(viewMatrix,viewMatrix,a);
  }
  if (event.key=="s"){
      var a = vec3.create();
      a=vec3.normalize(a,vector3MinusVector3(camara.lookAt,camara.posicion));
      mat4.translate(viewMatrix,viewMatrix,a);
  }
  if (event.key=="e"){
      mat4.translate(viewMatrix,viewMatrix,[0,1,0]);
  }
  if (event.key=="q"){
      mat4.translate(viewMatrix,viewMatrix,[0,-1,0]);
  }
  if(event.key=="c"){
      this.vistaActual = (this.vistaActual+1)%this.totalCamaras;

  }
}
handlePressKeyEvent1(){
  if(event.key=="d"){
      this.rotacionCamara++;
  }
  if(event.key=="a"){
        this.rotacionCamara--;
  }
  if(event.key=="c"){
      this.vistaActual = (this.vistaActual+1)%this.totalCamaras;
  }
}


handlePressKeyEvent2(){
  if(event.key=="d"){
      this.rotacionCamara++;
  }
  if(event.key=="a"){
        this.rotacionCamara--;
  }
  if(event.key=="c"){
      this.vistaActual = (this.vistaActual+1)%this.totalCamaras;
  }
}

handlePressKeyEvent3(){
  if(event.key=="d"){
      this.rotacionCamara++;
  }
  if(event.key=="a"){
        this.rotacionCamara--;
  }
  if(event.key=="c"){
      this.vistaActual = (this.vistaActual+1)%this.totalCamaras;
  }
}


handlePressKeyEvent4(){
  if(event.key=="c"){
      this.vistaActual = (this.vistaActual+1)%this.totalCamaras;
      isMouseDown = true;
      this.primeraPersona();
      isMouseDown = false;
  }
}



  runVista(){
    switch (this.vistaActual) {
      case 0:
        this.primeraPersona();
        break;
      case 1:
        this.segundaCamara();
        break;
      case 2:
        this.terceraCamara();
        break;
      case 3:
        this.cuartaCamara();
        break;
      case 4:
        this.quintaCamara();
        break;
      default:

    }
  }



  primeraPersona(){
    var factorVelocidad = 0.003;
    if(isMouseDown){
      var deltaX = mouse.x - previousClientX;
      previousClientX = mouse.x;
      var widthLongAngle = deltaX * factorVelocidad;
      var widthRotVector = camara.lookUp;

      var vectorVista = vector3MinusVector3(camara.lookAt,camara.posicion);

      var rotarVista = mat4.create();
      mat4.identity(rotarVista);
      mat4.fromRotation(rotarVista,widthLongAngle,widthRotVector);
      var vectorVista4 = vec4.fromValues(vectorVista[0],vectorVista[1],vectorVista[2],1);
      vectorVista =  multiplyMatrixAndPoint(rotarVista,vectorVista4);

      camara.lookAt = vector3PlusVector3(camara.posicion,vectorVista);


      var deltaY = mouse.y - previousClientY;
      previousClientY = mouse.y;
      var hightLongAngle = deltaY * factorVelocidad;

      vectorVista = vector3MinusVector3(camara.lookAt,camara.posicion);
      var hightRotVector = vec3.create();
      hightRotVector = vec3.cross(hightRotVector,vectorVista,camara.lookUp);


      var rotarVista = mat4.create();
      mat4.identity(rotarVista);
      mat4.fromRotation(rotarVista,hightLongAngle,hightRotVector);
      var vectorVista4 = vec4.fromValues(vectorVista[0],vectorVista[1],vectorVista[2],1);
      vectorVista =  multiplyMatrixAndPoint(rotarVista,vectorVista4);

      if(Math.abs(vectorVista[0])+Math.abs(vectorVista[2])>Math.abs(vectorVista[1])){//genera bug, bajar al min vista->girar->subir se traba
        camara.lookAt = vector3PlusVector3(camara.posicion,vectorVista);
      }

      viewMatrix = mat4.lookAt(viewMatrix,camara.posicion,camara.lookAt,camara.lookUp);
    }
  }

  segundaCamara(){
      var posCamara = [100,100,100];
      var angulo = this.rotacionCamara*Math.PI*2/100;

      var rotarVista = mat4.create();
      mat4.identity(rotarVista);
      mat4.fromRotation(rotarVista,angulo,camara.lookUp);
      posCamara = vec4.fromValues(posCamara[0],posCamara[1],posCamara[2],1);
      posCamara =  multiplyMatrixAndPoint(rotarVista,posCamara);

      viewMatrix = mat4.lookAt(viewMatrix,posCamara,[0,0,0],camara.lookUp);
  }


  terceraCamara(){
      var posCamara = [60,60,60];
      var angulo = this.rotacionCamara*Math.PI*2/100;

      var rotarVista = mat4.create();
      mat4.identity(rotarVista);
      mat4.fromRotation(rotarVista,angulo,camara.lookUp);
      posCamara = vec4.fromValues(posCamara[0],posCamara[1],posCamara[2],1);
      posCamara =  multiplyMatrixAndPoint(rotarVista,posCamara);

      viewMatrix = mat4.lookAt(viewMatrix,posCamara,[0,0,0],camara.lookUp);
            mat4.translate(viewMatrix,viewMatrix,[-transRusa[0],transRusa[2],transRusa[1]]);
  }

  cuartaCamara(){
      var posCamara = [60,60,60];
      var angulo = this.rotacionCamara*Math.PI*2/100;

      var rotarVista = mat4.create();
      mat4.identity(rotarVista);
      mat4.fromRotation(rotarVista,angulo,camara.lookUp);
      posCamara = vec4.fromValues(posCamara[0],posCamara[1],posCamara[2],1);
      posCamara =  multiplyMatrixAndPoint(rotarVista,posCamara);

      viewMatrix = mat4.lookAt(viewMatrix,posCamara,[0,0,0],camara.lookUp);
      mat4.translate(viewMatrix,viewMatrix,[-transGira[0],transGira[2],transGira[1]]);
  }


    quintaCamara(){

      var rotarVista = mat4.create();

      mat4.lookAt(viewMatrix,[yc[0],yc[1],yc[2]],[xc[0],xc[1],xc[2]],[nc[0],nc[1],nc[2]]);


      var rotarVista = mat4.create();
      mat4.identity(rotarVista);
      mat4.fromRotation(rotarVista,Math.PI/2,[1,0,0]);

      mat4.multiply(viewMatrix,viewMatrix,rotarVista);


      mat4.translate(viewMatrix,viewMatrix,[-transRusa[0],transRusa[2]-2.5,transRusa[1]]);

    }



}
