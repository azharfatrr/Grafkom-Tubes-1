class WebGLUtils {
  /**
   * Fetches the shader source from /shaders folder.
   * 
   * @param source The source name.
   */
  static async fetchShader(source: String) {
    // Fetch the shader.
    const rawShader = await fetch(`/shaders/${source}`);

    // Convert the shader to a string.
    const shader = await rawShader.text();

    // Return the shader.
    return shader;
  }


  /**
   * Creates and compiles a shader.
   *
   * @param gl The WebGL Context.
   * @param shaderSource The GLSL source code for the shader.
   * @param shaderType The type of shader, VERTEX_SHADER or FRAGMENT_SHADER.
   * @return The shader.
   */
  static async compileShader(
    gl: WebGLRenderingContext, 
    shaderSource: string, 
    shaderType: number)
    : Promise<WebGLShader> {
    // Fetch the shader.
    const fetchedShader = await this.fetchShader(shaderSource);
    
    // Create the shader object
    var shader = gl.createShader(shaderType);
    
    // Set the shader source code.
    gl.shaderSource(shader, fetchedShader);
    
    // Compile the shader
    gl.compileShader(shader);
    
    // Check if it compiled
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
      // Something went wrong during compilation; get the error
      throw "Could not compile shader:" + gl.getShaderInfoLog(shader);
    }
    
    return shader;
  }
  
  
  /**
   * Creates a program from 2 shaders source.
   *
   * @param gl The WebGL context.
   * @param vertexShaderSource A vertex shader source.
   * @param fragShaderSource A fragment shader source.
   * @return A program.
   */
  static async createProgram(
    gl: WebGLRenderingContext, 
    vertexShaderSource: string, 
    fragShaderSource: string): Promise<WebGLProgram> {
    // Create the shaders.
    const vertexShader = await this.compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER)
    const fragmentShader = await this.compileShader(gl, fragShaderSource, gl.FRAGMENT_SHADER)

    // create a program.
    var program = gl.createProgram();
    
    // attach the shaders.
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    
    // Link the program.
    gl.linkProgram(program);
    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);
    
    // Check if it linked.
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
        // something went wrong with the link
        throw ("program failed to link:" + gl.getProgramInfoLog (program));
    }
    
    return program;
  };


  /**
   * Creates a default shader program from 'vertex-shader.glsl' and 'fragment-shader.glsl'.
   * Also sets the WebGL's Shader uniform 'u_resolution' variables.
   * 
   * @param gl The WebGL context.
   * @return A program.
   */
  static async createDefaultProgram(
    gl: WebGLRenderingContext): Promise<WebGLProgram> {

    // Create the shader program.
    const program = await this.createProgram(gl, 'vertex-shader.glsl', 'fragment-shader.glsl');

    // Set up shader uniform variable resolution.
    this.setUniformVariable(gl, program, "u_resolution", gl.canvas.width, gl.canvas.height);

    // Return the shader program.
    return program;
  }
  
  
  /**
   * Resize a canvas to match the size its displayed.
   * @param {HTMLCanvasElement} canvas The canvas to resize.
   * @param {number} [multiplier] amount to multiply by.
   *    Pass in window.devicePixelRatio for native pixels.
   * @return {boolean} true if the canvas was resized.
   */
  static resizeCanvasToDisplaySize(canvas) {
    // Lookup the size the browser is displaying the canvas in CSS pixels.
    const dpr = window.devicePixelRatio;
    // const displayWidth  = Math.round(canvas.clientWidth * dpr);
    // const displayHeight = Math.round(canvas.clientHeight * dpr);

    const displayWidth  = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
  
      // Check if the canvas is not the same size.
      const needResize = (canvas.width != displayWidth || canvas.height != displayHeight);
  
      if (needResize) {
        // Make the canvas the same size
        canvas.width  = displayWidth;
        canvas.height = displayHeight;
      }
  
      return needResize;
  }


  /**
   * Set the WebGL's Shader uniform variables.  
   *
   * @param gl - The WebGL context.
   * @param program - The WebGL shader program.
   * @param uniformName - The uniform name.
   * @param uniformData - The uniform data.
   */
  static setUniformVariable(
    gl: WebGLRenderingContext, 
    program: WebGLProgram,
    uniformName: string,
    ...uniformData: number[]
  ) {
    // Get the location of the uniform.
    const uniformLocation = gl.getUniformLocation(program, uniformName);

    // Set the uniform based on length of the data.
    switch (uniformData.length) {
      case 1:
        gl.uniform1f(uniformLocation, uniformData[0]);
        break;
      case 2:
        gl.uniform2f(uniformLocation, uniformData[0], uniformData[1]);
        break;
      case 3:
        gl.uniform3f(uniformLocation, uniformData[0], uniformData[1], uniformData[2]);
        break;
      case 4:
        gl.uniform4f(uniformLocation, uniformData[0], uniformData[1], uniformData[2], uniformData[3]);
        break;
      default:
        throw "Invalid uniform data length.";
    }
  }
}

export default WebGLUtils;