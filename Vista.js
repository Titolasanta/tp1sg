class Vista{









  constructor(){
    this.vistaActual = 0;
    this.totalCamaras = 5;
    this.rotacionCamara = 0;
    this.rotacionQuintaCamaraX = 0;
    this.rotacionQuintaCamaraY = 0;


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
      camara.posicion = vector3MinusVector3(camara.posicion,a);
      camara.lookAt = vector3MinusVector3(camara.lookAt,a);
  }
  if (event.key=="a"){
    var a = vec3.create();
    a=vec3.normalize(a, vec3.cross( a,camara.lookUp,vector3MinusVector3(camara.lookAt,camara.posicion) ) );
    camara.posicion = vector3PlusVector3(camara.posicion,a);
    camara.lookAt = vector3PlusVector3(camara.lookAt,a);
  }
  if (event.key=="d"){

      var a = vec3.create();
      a=vec3.normalize(a, vec3.cross( a,camara.lookUp,vector3MinusVector3(camara.lookAt,camara.posicion) ) );
      camara.posicion = vector3MinusVector3(camara.posicion,a);
      camara.lookAt = vector3MinusVector3(camara.lookAt,a);
  }
  if (event.key=="s"){
        var a = vec3.create();
        a=vec3.normalize(a,vector3MinusVector3(camara.posicion,camara.lookAt));
        camara.posicion = vector3PlusVector3(camara.posicion,a);
        camara.lookAt = vector3PlusVector3(camara.lookAt,a);
  }
  if (event.key=="e"){
    var a = [0,1,0];
    camara.posicion = vector3PlusVector3(camara.posicion,a);
    camara.lookAt = vector3PlusVector3(camara.lookAt,a);
  }
  if (event.key=="q"){
    var a = [0,-1,0];
    camara.posicion = vector3PlusVector3(camara.posicion,a);
    camara.lookAt = vector3PlusVector3(camara.lookAt,a);
  }
  if(event.key=="c"){
      this.vistaActual = (this.vistaActual+1)%this.totalCamaras;

      camara.posicion = vector3PlusVector3(transGira,[100,100,100]);
      camara.lookAt = vector3PlusVector3(transGira,[99,99,99]);
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

        camara.posicion = vector3PlusVector3(transGira,[100,100,100]);
        camara.lookAt = vector3PlusVector3(transGira,[99,99,99]);
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
      camara.posicion = vector3PlusVector3(transRusa,[50,50,50]);
      camara.lookAt = vector3PlusVector3(transRusa,[49,49,49]);
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

        camara.posicion = [100,1,0];
        camara.lookAt = [101,1,0];
        camara.lookUp = [0,1,0];
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


    rotarCamaraGeneral(){
      if(isMouseDown){
        var factorVelocidad = 0.003;
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

      }
    }



      rotarCamaraGeneralAcumulada(){
        var factorVelocidad = 0.003;
        if(isMouseDown){
          var deltaX = mouse.x - previousClientX;
          previousClientX = mouse.x;
          this.rotacionQuintaCamaraX +=deltaX;
        }
          var widthLongAngle = this.rotacionQuintaCamaraX*factorVelocidad;
          var widthRotVector = camara.lookUp;

          var vectorVista = vector3MinusVector3(camara.lookAt,camara.posicion);

          var rotarVista = mat4.create();
          mat4.identity(rotarVista);
          mat4.fromRotation(rotarVista,widthLongAngle,widthRotVector);
          var vectorVista4 = vec4.fromValues(vectorVista[0],vectorVista[1],vectorVista[2],1);
          vectorVista =  multiplyMatrixAndPoint(rotarVista,vectorVista4);

          camara.lookAt = vector3PlusVector3(camara.posicion,vectorVista);


          if(isMouseDown){
          var deltaY = mouse.y - previousClientY;
          previousClientY = mouse.y;
          this.rotacionQuintaCamaraY +=deltaY;
          }
          var hightLongAngle = this.rotacionQuintaCamaraY*factorVelocidad;

          vectorVista = vector3MinusVector3(camara.lookAt,camara.posicion);
          var hightRotVector = vec3.create();
          hightRotVector = vec3.cross(hightRotVector,vectorVista,camara.lookUp);


          var rotarVista = mat4.create();
          mat4.identity(rotarVista);
          mat4.fromRotation(rotarVista,hightLongAngle,hightRotVector);
          var vectorVista4 = vec4.fromValues(vectorVista[0],vectorVista[1],vectorVista[2],1);
          vectorVista =  multiplyMatrixAndPoint(rotarVista,vectorVista4);

          camara.lookAt = vector3PlusVector3(camara.posicion,vectorVista);


        }

  primeraPersona(){
    this.rotarCamaraGeneral();

    viewMatrix = mat4.lookAt(viewMatrix,camara.posicion,camara.lookAt,camara.lookUp);
  }

  segundaCamara(){
      var angulo = this.rotacionCamara*Math.PI*2/100;
      var rotarVista = mat4.create();
      mat4.identity(rotarVista);
      mat4.fromRotation(rotarVista,angulo,camara.lookUp);
      camara.posicion = vec4.fromValues(camara.posicion[0],camara.posicion[1],camara.posicion[2],1);
      camara.posicion =  multiplyMatrixAndPoint(rotarVista,camara.posicion);


      camara.lookAt = vec4.fromValues(camara.lookAt[0],camara.lookAt[1],camara.lookAt[2],1);
      camara.lookAt =  multiplyMatrixAndPoint(rotarVista,camara.lookAt);
      this.rotarCamaraGeneral();



      viewMatrix = mat4.lookAt(viewMatrix,camara.posicion,camara.lookAt,camara.lookUp);
      this.rotacionCamara = 0;
  }


  terceraCamara(){
      var angulo = this.rotacionCamara*Math.PI*2/100;

      var rotarVista = mat4.create();
      mat4.identity(rotarVista);
      mat4.fromRotation(rotarVista,angulo,camara.lookUp);
      camara.posicion = vec4.fromValues(camara.posicion[0],camara.posicion[1],camara.posicion[2],1);
      camara.posicion =  multiplyMatrixAndPoint(rotarVista,camara.posicion);


      camara.lookAt = vec4.fromValues(camara.lookAt[0],camara.lookAt[1],camara.lookAt[2],1);
      camara.lookAt =  multiplyMatrixAndPoint(rotarVista,camara.lookAt);
      this.rotarCamaraGeneral();


      viewMatrix = mat4.lookAt(viewMatrix,camara.posicion,camara.lookAt,camara.lookUp);
      mat4.translate(viewMatrix,viewMatrix,[-transGira[0],transGira[2],transGira[1]]);
      this.rotacionCamara = 0;
  }

  cuartaCamara(){
    var angulo = this.rotacionCamara*Math.PI*2/100;

    var rotarVista = mat4.create();
    mat4.identity(rotarVista);
    mat4.fromRotation(rotarVista,angulo,camara.lookUp);
    camara.posicion = vec4.fromValues(camara.posicion[0],camara.posicion[1],camara.posicion[2],1);
    camara.posicion =  multiplyMatrixAndPoint(rotarVista,camara.posicion);


    camara.lookAt = vec4.fromValues(camara.lookAt[0],camara.lookAt[1],camara.lookAt[2],1);
    camara.lookAt =  multiplyMatrixAndPoint(rotarVista,camara.lookAt);
    this.rotarCamaraGeneral();


    viewMatrix = mat4.lookAt(viewMatrix,camara.posicion,camara.lookAt,camara.lookUp);
    mat4.translate(viewMatrix,viewMatrix,[-transRusa[0],transRusa[2],transRusa[1]]);
    this.rotacionCamara = 0;
  }


    quintaCamara(){


            camara.lookAt = [xc[0],xc[1],xc[2]];
            camara.posicion =[yc[0],yc[1],yc[2]];
            camara.lookUp = [nc[0],nc[1],nc[2]];
            this.rotarCamaraGeneralAcumulada();
            viewMatrix = mat4.lookAt(viewMatrix,camara.posicion,camara.lookAt,camara.lookUp);

            var rotarVista = mat4.create();
            mat4.identity(rotarVista);
            mat4.fromRotation(rotarVista,Math.PI/2,[1,0,0]);

            mat4.multiply(viewMatrix,viewMatrix,rotarVista);
            mat4.translate(viewMatrix,viewMatrix,[-transRusa[0],transRusa[2]-2.5,transRusa[1]]);

    }
}
