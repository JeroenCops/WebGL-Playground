var gl,                     // Global Reference to our extended GL context.
    gVertCnt = 0,
    uPointSizeLoc = -1,
    uAngle = 0,
    gRLoop;                 // Global Ref to our Render Loop.

window.addEventListener("load", function(){
  // Get our extended GL Context Object.
  gl = GLInstance("glCanvas").fSetSize(500, 500).fClear();

  // ---------------------------------------------
  // Shader setup
  shaderProg = ShaderUtil.domShaderProgram(gl, "vertex_shader", "fragment_shader", true);

  // Get Location of Uniforms and Attributes.
  gl.useProgram(shaderProg);
  var aPositionLoc = gl.getAttribLocation(shaderProg, "a_position");

  uAngle           = gl.getUniformLocation(shaderProg, "uAngle");
  uPointSizeLoc    = gl.getUniformLocation(shaderProg, "uPointSize");
  gl.useProgram(null);

  // ---------------------------------------------
  // Set up Data Buffers
  var aryVerts = new Float32Array([0,0,0]),
      bufVerts = gl.fCreateArrayBuffer(aryVerts);

  // How many vertices are we storing in the array.
  gVertCnt = aryVerts.length / 3;

  // ---------------------------------------------
  // Set up for drawing.
  gl.useProgram(shaderProg);

  // How its done without VAOs.
  // Tell gl which buffer we want to use at the moment.
  gl.bindBuffer(gl.ARRAY_BUFFER, bufVerts);
  // Enable the position attribute in the shader.
  gl.enableVertexAttribArray(aPositionLoc);
  // Set which buffer the attribute will pull its data from.
  gl.vertexAttribPointer(aPositionLoc,3,gl.FLOAT,false,0,0);
  // Done setting up the buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER,null);

  RLoop = new RenderLoop(onRender).start();
});

var gPointSize = 0,
    gPSizeStep = 3,
    gAngle     = 0,
    gAngleStep = (Math.PI / 180.0) * 90;

function onRender(dt) {
  gPointSize += gPSizeStep * dt;
  var size = (Math.sin(gPointSize) * 10.0) + 30.0;
  gl.uniform1f(uPointSizeLoc, size);

  // Update the angle at the rate of AngleStep Per Second.
  gAngle += gAngleStep * dt;
  // Pass new angle value to the shader.
  gl.uniform1f(uAngle, gAngle);

  gl.fClear();
  // Draw the points
  gl.drawArrays(gl.POINTS, 0, gVertCnt);
}
