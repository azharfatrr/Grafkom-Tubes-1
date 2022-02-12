class WebGLObjects {
  // CLASS PROPERTIES

  // The id of object.
  protected _id: number;
  public get id(): number {
    return this.id;
  }

  // The array of vertices.
  protected _position: number[];
  public get position(): number[] {
    return this._position;
  }
  public set position(value: number[]) {
    this._position = value;
  }

  // The color of object.
  protected _color: number[];
  public get color(): number[] {
    return this._color;
  }
  public set color(value: number[]) {
    this._color = value;
  }

  // The vertex buffer.
  protected _positionBuffer: WebGLBuffer;

  // The color buffer.
  protected _colorBuffer: WebGLBuffer;

  // The WebGL context.
  public gl: WebGLRenderingContext;

  // CLASS METHODS

  constructor(id: number, gl: WebGLRenderingContext) {
    // Set the id and the gl context.
    this._id = id;
    this.gl = gl;

    // Create the buffers.
    this._positionBuffer = this.gl.createBuffer();
    this._colorBuffer = this.gl.createBuffer();
  }

  /**
   * Binds the vertex buffer to the gl context.
   */
  bind() {
    const gl = this.gl;
    // Start binding the position buffers.
    gl.bindBuffer(gl.ARRAY_BUFFER, this._positionBuffer);
    // Set the position.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._position), gl.STATIC_DRAW);

    // Start binding the color buffers.
    gl.bindBuffer(gl.ARRAY_BUFFER, this._colorBuffer);
    // Set the colors.
    gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(this._color), gl.STATIC_DRAW);
  }
  
  /**
   * Draws the object.
   */
  draw(positionAttributeLocation: number, colorAttributeLocation: number) {
    const gl = this.gl
    
    // Start drawing vertex.
    // Turn on the attribute.
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, this._positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
        positionAttributeLocation, size, type, normalize, stride, offset);

    // Start coloring object.
    // Turn on the color attribute
    gl.enableVertexAttribArray(colorAttributeLocation);
  
    // Bind the color buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, this._colorBuffer);
  
    // Tell the color attribute how to get data out of colorBuffer (ARRAY_BUFFER)
    var size = 4;          // 4 components per iteration
    var type = gl.UNSIGNED_BYTE;  // the data is 8bit unsigned bytes
    var normalize = true;         // normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      colorAttributeLocation, size, type, normalize, stride, offset);
        
    // Draw the geometry.
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 3;
    gl.drawArrays(primitiveType, offset, count);
  }
}

export default WebGLObjects;