var gl;

window.addEventListener("load", function(){
  // Get our extended GL Context Object
  gl = GLInstance("glCanvas").fSetSize(500, 500).fClear();

  // SHADER STEPS
  // 1. Get Vertex and Fragment Shader Text
  var vShaderText = ShaderUtil.domShaderSrc("vertex_shader"),
          fShaderText = ShaderUtil.domShaderSrc("fragment_shader"),
          // 2. Compile text and validate
          vShader = ShaderUtil.createShader(gl, vShaderText, gl.VERTEX_SHADER),
          fShader = ShaderUtil.createShader(gl, fShaderText, gl.FRAGMENT_SHADER),
          // 3. Link the shaders together as a program.
          shaderProg = ShaderUtil.createProgram(gl, vShader, fShader, true);

  // 4. Get Location of Uniforms and Attributes.
  gl.useProgram(shaderProg);
  var aPositionLoc = gl.getAttribLocation(shaderProg, "a_position"),
          uPointSizeLoc = gl.getUniformLocation(shaderProg, "uPointSize");
  gl.useProgram(null);

  // Set up Data Buffers
  var aryVerts = new Float32Array([ 0,0,0, 0.5, 0.5,0 ]),
        bufVerts = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, bufVerts);
  gl.bufferData(gl.ARRAY_BUFFER, aryVerts, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // Set up for drawing
  gl.useProgram(shaderProg);
  gl.uniform1f(uPointSizeLoc, 50.0);

  // How its down without VAOs
  gl.bindBuffer(gl.ARRAY_BUFFER, bufVerts);
  gl.enableVertexAttribArray(aPositionLoc);
  gl.vertexAttribPointer(aPositionLoc,3,gl.FLOAT,false,0,0);
  gl.bindBuffer(gl.ARRAY_BUFFER,null);

  this.gl.drawArrays(gl.POINTS, 0, 2);
});
