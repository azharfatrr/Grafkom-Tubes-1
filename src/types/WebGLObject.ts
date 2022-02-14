class WebGLObjects {
  // CLASS PROPERTIES

  // The id of object.
  protected _id: number;
  public get id(): number {
    return this.id;
  }

  // The array of vertices position.
  public position: number[];

  // The color of object.
  public color: number[];

  // The vertex buffer.
  protected positionBuffer: WebGLBuffer;
  // The location of the vertex buffer.
  protected positionAttributeLocation: number;

  // The color buffer.
  protected colorBuffer: WebGLBuffer;
  // The location of the color buffer.
  protected colorAttributeLocation: number;

  // The WebGL context.
  protected gl: WebGLRenderingContext;
  // The WebGL shader program.
  protected program: WebGLProgram;

  // CLASS METHODS

  /**
   * Construct the object.
   * 
   * @param id - The id of object.
   * @param gl - The WebGL context.
   * @param program - The shader program.
   */
  constructor(id: number, gl: WebGLRenderingContext, program: WebGLProgram) {
    // Set the id and the gl context.
    this._id = id;
    this.gl = gl;
    this.program = program;

    // Create the buffers.
    this.positionBuffer = this.gl.createBuffer();
    this.colorBuffer = this.gl.createBuffer();

    // Set the attributes.
    this.setAttributes();
  }

  /**
   * Set the shader's attributes location.
   * 
   * @param program - The shader program.
   * @param positionAttributeName - The name of the position attribute. Default: 'a_position'.
   * @param colorAttributeName - The name of the color attribute. Default: 'a_color'.
   */
  setAttributes(
    program?: WebGLProgram, 
    positionAttributeName: string = 'a_position', 
    colorAttributeName: string = 'a_color'): void {
    // Check if a new shader program is given.
    if (program) {
      this.program = program;
    }

    // Set the position attribute location.
    this.positionAttributeLocation = this.gl.getAttribLocation(this.program, positionAttributeName);

    // Set the color attribute location.
    this.colorAttributeLocation = this.gl.getAttribLocation(this.program, colorAttributeName);
  }

  /**
   * Binds the vertex buffer to the gl context.
   */
  bind() {
    const gl = this.gl;
    // Start binding the position buffers.
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    // Set the position.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position), gl.STATIC_DRAW);

    // Start binding the color buffers.
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    // Set the colors.
    gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(this.color), gl.STATIC_DRAW);
  }
  
  /**
   * Draws the object.
   */
  draw() {
    const gl = this.gl
    
    // Start drawing vertex.
    // Turn on the attribute.
    gl.enableVertexAttribArray(this.positionAttributeLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
        this.positionAttributeLocation, size, type, normalize, stride, offset);

    // Start coloring object.
    // Turn on the color attribute
    gl.enableVertexAttribArray(this.colorAttributeLocation);
  
    // Bind the color buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
  
    // Tell the color attribute how to get data out of colorBuffer (ARRAY_BUFFER)
    var size = 4;          // 4 components per iteration
    var type = gl.UNSIGNED_BYTE;  // the data is 8bit unsigned bytes
    var normalize = true;         // normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      this.colorAttributeLocation, size, type, normalize, stride, offset);
        
    // Draw the geometry.
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 3;
    gl.drawArrays(primitiveType, offset, count);
  }
}

export default WebGLObjects;