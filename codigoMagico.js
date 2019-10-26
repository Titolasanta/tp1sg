
function loadShader( url, callback ){

  var req = new XMLHttpRequest();
  req.open( "GET", url );
  req.onload = function (e) {
    callback(e.target.responseText);
  };
  req.send();
}


var vs_source="";
var fs_source="";


function loadVertexShader(){
  loadShader("glsl/vertex1.glsl",function(code){
    vs_source=code;
    loadShader("glsl/fragment1.glsl",function(code){
      fs_source=code;
      initWebGL();
    })
  })
};


function initShaders() {

    //compile shaders
    vertexShader = makeShader(vs_source, gl.VERTEX_SHADER);
    fragmentShader = makeShader(fs_source, gl.FRAGMENT_SHADER);

    //create program
    glProgram = gl.createProgram();

    //attach and link shaders to the program
    gl.attachShader(glProgram, vertexShader);
    gl.attachShader(glProgram, fragmentShader);
    gl.linkProgram(glProgram);

    if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
        alert("Unable to initialize the shader program.");
    }

    //use program
    gl.useProgram(glProgram);
}

function makeShader(src, type){
  //compile the vertex shader
  var shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.log("Error compiling shader: " + gl.getShaderInfoLog(shader));
  }
  return shader;
}
