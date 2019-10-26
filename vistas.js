
function primeraPersona(){
  var factorVelocidad = 0.003;
  if(isMouseDown){
    var deltaX = mouse.x - previousClientX;
    previousClientX = mouse.x;
    widthLongAngle = deltaX * factorVelocidad;
    widthRotVector = camara.lookUp;

    var vectorVista = vector3MinusVector3(camara.lookAt,camara.posicion);

    var rotarVista = mat4.create();
    mat4.identity(rotarVista);
    mat4.fromRotation(rotarVista,widthLongAngle,widthRotVector);
    var vectorVista4 = vec4.fromValues(vectorVista[0],vectorVista[1],vectorVista[2],1);
    vectorVista =  multiplyMatrixAndPoint(rotarVista,vectorVista4);

    camara.lookAt = vector3PlusVector3(camara.posicion,vectorVista);


    var deltaY = mouse.y - previousClientY;
    previousClientY = mouse.y;
    hightLongAngle = deltaY * factorVelocidad;

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
