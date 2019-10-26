function setUniformMatrix4fv(name,matrix){
    var matrixLoc = gl.getUniformLocation(glProgram, name);
    gl.uniformMatrix4fv(matrixLoc, false, matrix);
}


function createBuffer(bufferArray,elementArray){
    var buffer = gl.createBuffer();

    if(elementArray){
        buffer.number_vertex_point = bufferArray.length;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, bufferArray, gl.STATIC_DRAW);
        return buffer;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, bufferArray, gl.STATIC_DRAW);
    return buffer;


}

function getBuffers(buffers)
{
    var trianglesVerticeBuffer = createBuffer(new Float32Array(buffers.pos), false);
    var trianglesNormalBuffer = createBuffer(new Float32Array(buffers.normal), false);
    var trianglesIndexBuffer = createBuffer(new Uint16Array(buffers.index), true);
    return {trianglesVerticeBuffer : trianglesVerticeBuffer,
            trianglesNormalBuffer : trianglesNormalBuffer,
            trianglesIndexBuffer : trianglesIndexBuffer};
}


function drawNode(node){

    setUniformMatrix4fv("modelMatrix",node.worldMatrix);
    setUniformMatrix4fv("normalMatrix",node.normalMatrix);

    //console.log(node);
    var vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, node.drawInfo.buffers.trianglesVerticeBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    var vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");
    console.log(vertexNormalAttribute);
    gl.enableVertexAttribArray(vertexNormalAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER,  node.drawInfo.buffers.trianglesNormalBuffer);
    gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, node.drawInfo.buffers.trianglesIndexBuffer);


    var colorMaterialUniform  = gl.getUniformLocation(glProgram, "colorMaterial");
    gl.uniform3f(colorMaterialUniform,  node.drawInfo.color.r, node.drawInfo.color.g, node.drawInfo.color.b);


    gl.drawElements(gl.TRIANGLE_STRIP,  node.drawInfo.buffers.trianglesIndexBuffer.number_vertex_point, gl.UNSIGNED_SHORT, 0);
}
