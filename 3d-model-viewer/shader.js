class ShaderUtil {
  static domShaderSrc(elmID) {
    var elm = document.getElementById(elmID);
    if (!elm || elm == "") {
      console.log(elmID + " shader not found or no text.");
      return null;
    }
    return elm.text;
  }

  static createShader(gl, src, type) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    // Get Error data if shader failed to compile
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Error compiling shader : " + src, gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  static createProgram(gl, vShader, fShader, doValidate) {
    // Link shaders together.
    var prog = gl.createProgram();
    gl.attachShader(prog, vShader);
    gl.attachShader(prog, fShader);
    gl.linkProgram(prog);

    // Check if succesfull.
    if(!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("Error creating shader program.", gl.getProgramInfoLog(prog));
      gl.deleteProgram(prog);
      return null;
    }

    // Only do this for additional debugging.
    if(doValidate) {
      gl.validateProgram(prog);
      if(!gl.getProgramParameter(prog, gl.VALIDATE_STATUS)) {
        console.error("Error validating program", gl.getProgramInfoLog(prog))
        gl.deleteProgram(prog)
        return null;
      }
    }

    // Can delete the shaders since the program has been made
    gl.detachShader(prog, vShader);
    gl.detachShader(prog, fShader);
    gl.deleteShader(vShader);
    gl.deleteShader(fShader);

    return prog;
  }

  // ----------------------------------------------
  // Helper functions
  // ----------------------------------------------

  // Pass in Script Tag IDs for our two shaders and create a program from it.
  static domShaderProgram(gl, vectID, fragID, doValidate) {
    // 1. Get Vertex and Fragment Shader Text
    var vShaderText = ShaderUtil.domShaderSrc(vectID);
    if (!vShaderText) return null;
    var fShaderText = ShaderUtil.domShaderSrc(fragID);
    // 2. Compile text and validate
    if (!fShaderText) return null;
    var vShader     = ShaderUtil.createShader(gl, vShaderText, gl.VERTEX_SHADER);
    if (!vShader)     return null;
    var fShader     = ShaderUtil.createShader(gl, fShaderText, gl.FRAGMENT_SHADER);
    if (!fShader)     return null;
    // 3. Link the shaders together as a program.
    return ShaderUtil.createProgram(gl, vShader, fShader, doValidate);
  }
}
