import Color from "./Color";
import Point from "./Point";

/**
 * An abstract class for WebGL objects.
 */
abstract class WebGLObjects {
  // CLASS PROPERTIES

  // The id of object.
  protected _id: number;
  public get id(): number {
    return this.id;
  }

  // The number of vertices.
  protected abstract nPoint: number;

  // The array of vertices position.
  protected position: Point[];

  // The color of object.
  protected color: Color;

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
    this.setPositionAttribute();
    this.setColorAttribute();
  }

  /**
   * Set the position of the object from n vertices.
   * The of position in parameter is MUST be equal to the number of vertices in the object. 
   *
   * @param position - The vertices point position.
   */
  setPosition(...position: Point[]) {
    // Check if the number of vertices is equal to the number of position in parameter.
    if (position.length !== this.nPoint) {
      throw new Error(`The number of position in parameter must be equal to ${this.nPoint}.`);
    }

    // Set the position.
    this.position = position;
  }

  /**
   * Set the color of the object. 
   *
   * @param color - The color of the object.
   */
  setColor(color: Color) {
    this.color = color;
  }


  /**
   * Set the shader program that will be used to draw the object. 
   *
   * @param program - The shader program.
   */
  setProgram(program: WebGLProgram) {
    this.program = program;
  }

  /**
   * Set the shader's position attributes location.
   * 
   * @param positionAttributeName - The name of the position attribute. Default: 'a_position'.
   * 
   */
  setPositionAttribute(positionAttributeName: string = 'a_position') {
    // Set the position attribute location.
    this.positionAttributeLocation = this.gl.getAttribLocation(this.program, positionAttributeName);
  }

  /**
   * Set the shader's color attributes location. 
   *
   * @param colorAttributeName - The name of the color attribute. Default: 'a_color'.
   */
  setColorAttribute(colorAttributeName: string = 'a_color') {
      // Set the color attribute location.
    this.colorAttributeLocation = this.gl.getAttribLocation(this.program, colorAttributeName);
  }


  /**
   * Flatten the Position to a Float32Array.
   *
   * @returns The flattened position array.
   */
  private flatPosition(): Float32Array {
    const newPosition = [];
    for (let i = 0; i < this.nPoint; i++) {
      // position.push(this.position[i].x);
      // position.push(this.position[i].y);
      newPosition.push(...this.position[i].toTuple());
    }
    console.log(newPosition);
    return new Float32Array(newPosition);
  }

  /**
   * Flatten the Color to a Uint8Array.
   *
   * @returns The flattened color array.
   */
  private flatColor(): Uint8Array {
    const newColor = [];
    for (let i = 0; i < this.nPoint; i++) {
      newColor.push(...this.color.toTuple());
    }
    return new Uint8Array(newColor);
  }

  /**
   * Binds the vertex buffer to the gl context.
   */
  protected bind() {
    const gl = this.gl;
    // Start binding the position buffers.
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    // Set the position.
    gl.bufferData(gl.ARRAY_BUFFER, this.flatPosition(), gl.STATIC_DRAW);

    // Start binding the color buffers.
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    // Set the colors.
    gl.bufferData(gl.ARRAY_BUFFER, this.flatColor(), gl.STATIC_DRAW);
  }

  /**
   * Initialize ceremonies for drawing object.
   * MUST be called before drawing.
   */
  protected initDraw() {
    const gl = this.gl

    // Bind the buffers.
    this.bind();
        
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
  }
  
  /**
   * Draws the object.
   */
  abstract draw();

  // draw() {
  //   const gl = this.gl;

  //   // Init the draw.
  //   this.initDraw();
        
  //   // Draw the geometry.
  //   var primitiveType = gl.TRIANGLES;
  //   var offset = 0;
  //   var count = 3;
  //   gl.drawArrays(primitiveType, offset, count);
  // }
}

export default WebGLObjects;