function GLInstance(canvasID) {
  var canvas = document.getElementById(canvasID);
          gl = canvas.getContext("webgl2");

  if (!gl) {
    alert("Unable to initialize webgl. Your browser or machine may not support it.");
    return;
  }

  // Setup GL, Set all the default configurations we need.
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  // Methods
  gl.fClear = function() {
    this.clear(this.COLOR_BUFFER_BIT | this.DEPTH_BUFFER_BIT);
    return this;
  }

  // Setters - Getters
  gl.fSetSize = function(w, h) {
    // Set the size of the canvas, on chrome we need to set it 3 wyas to make it work perfectly.
    this.canvas.style.width = w + "px";
    this.canvas.style.height = h + "px";
    this.canvas.width = w;
    this.canvas.height = h;

    // When updating the canvas size, must reset the viewport of the canvas
    // else the resolution WebGL render ar will not change
    this.viewport(0, 0, w, h);
    return this;
  }

  return gl;
}
