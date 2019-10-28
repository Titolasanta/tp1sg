
class Obj3D{
  constructor(localModelMatrix,localNormalMatrix,pos,normal,index,color){
  this.childs = [];
  this.numberOfChilds = 0;
  this.localModelMatrix = localModelMatrix;
  this.localNormalMatrix = localNormalMatrix;
  this.trianglesVerticeBuffer = gl.createBuffer();
  this.vColor = [1.0,0.0,0.0];
  if(color)
    this.vColor = color;
  gl.bindBuffer(gl.ARRAY_BUFFER, this.trianglesVerticeBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW);



  this.trianglesNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.trianglesNormalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normal), gl.STATIC_DRAW);

  this.trianglesIndexBuffer = gl.createBuffer();
  this.trianglesIndexBuffer.number_vertex_point = index.length;
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.trianglesIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(index), gl.STATIC_DRAW);
}

  drawObj(parentModelMatrix){
        var tempMoldelMatrix = mat4.create();
        if(!parentModelMatrix){
          parentModelMatrix = mat4.create();
          parentModelMatrix = mat4.identity(parentModelMatrix);
        }
    //console.log(this.localModelMatrix);

        var colorMaterialUniform  = gl.getUniformLocation(glProgram, "colorMaterial");
        gl.uniform3f(colorMaterialUniform, this.vColor[0],this.vColor[1],this.vColor[2]);

        var modelMatrixUniform = gl.getUniformLocation(glProgram, "modelMatrix");
        var normalMatrixUniform  = gl.getUniformLocation(glProgram, "normalMatrix");

        gl.uniformMatrix4fv(modelMatrixUniform, false,  mat4.multiply(tempMoldelMatrix,parentModelMatrix,this.localModelMatrix));

        gl.uniformMatrix4fv(normalMatrixUniform, false, this.localNormalMatrix);


        var vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
        gl.enableVertexAttribArray(vertexPositionAttribute);
        gl.bindBuffer(gl.ARRAY_BUFFER,this.trianglesVerticeBuffer);
        gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

        var vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");
        gl.enableVertexAttribArray(vertexNormalAttribute);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.trianglesNormalBuffer);
        gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.trianglesIndexBuffer);
        gl.drawElements( gl.TRIANGLE_STRIP, this.trianglesIndexBuffer.number_vertex_point, gl.UNSIGNED_SHORT, 0);

        for(var i = this.numberOfChilds;i>0;i--){
          this.childs[i-1].drawObj(tempMoldelMatrix);
        }
  }
  rotate(rotateAngle, directions){

    mat4.rotate(this.localModelMatrix,this.localModelMatrix, rotateAngle, directions);

    mat4.identity(this.localNormalMatrix);
    mat4.multiply(this.localNormalMatrix,viewMatrix,this.localModelMatrix);

    mat4.invert(this.localNormalMatrix,this.localNormalMatrix);
    mat4.transpose(this.localNormalMatrix,this.localNormalMatrix);

  }
  translate(directions){
      mat4.translate(this.localModelMatrix,this.localModelMatrix, directions);
  }

  scale(directions){
      mat4.scale(this.localModelMatrix,this.localModelMatrix, directions);
  }


  addChild(child){
    this.childs[this.numberOfChilds] = child;
    this.numberOfChilds++;
  }

  setColor(vColor){
    this.vColor = vColor;
  }

}
