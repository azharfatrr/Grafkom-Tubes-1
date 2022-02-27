import { Model } from "../../configs/General";
import Color, { IColor } from "../../types/Color";
import Point, { IPoint } from "../../types/Point";

/**
 * An abstract class for WebGL objects.
 */
abstract class WebGLObject {
  // CLASS PROPERTIES

  // The type model of the object.
  protected abstract _model: Model;
  public get model(): Model {
    return this._model;
  }

  // The number of vertices.
  protected abstract _nPoint: number;
  public get nPoint(): number {
    return this._nPoint;
  }

  // The number of point needed in setPosition.
  protected abstract _constructPoint: number;
  public get constructPoint(): number {
    return this._constructPoint;
  }

  // The id of object.
  protected _id: number;
  public get id(): number {
    return this._id;
  }

  // The array of vertices position.
  protected _position: Point[];
  public get position(): Point[] {
    return this._position;
  }

  // The color of object.
  protected _color: Color[];
  public get color(): Color[] {
    return this._color;
  }

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
    this.setPositionAttributeLocation();
    this.setColorAttributeLocation();
  }

  /**
   * Draws the object.
   */
  abstract draw();

  /**
   * Set the position of the object from n vertices.
   * The of position in parameter is MUST be equal to the number of vertices in the object. 
   * Defining the point of position must be done in the counter clockwise direction, as example:
   * - The first point is the top left corner.
   * - The second point is the bottom left corner.
   * - The third point is the bottom right corner.
   * - etc...
   *
   * @param position - The vertices point position.
   */
  constructPosition(...position: IPoint[]) {
    // Check if the number of vertices is equal to the number of position in parameter.
    if (position.length !== this._constructPoint) {
      throw new Error(`The number of position in parameter must be equal to ${this._constructPoint}.`);
    }

    // Set the position.
    this._position = position.map(p => Point.fromIPoint(p));
  }

  setPosition(...position: IPoint[]) {
    // Check if the number of vertices is equal to the number of position in parameter.
    if (position.length !== this._nPoint) {
      throw new Error(`The number of position in parameter must be equal to ${this._nPoint}.`);
    }

    // Set the position.
    this._position = position.map(p => Point.fromIPoint(p));
  }

  /**
   * Set the color of the object. 
   *
   * @param color - The color of the object.
   */
  constructColor(...color: IColor[]) {
    this._color = color.map(c => Color.fromIColor(c));
  }

  setColor(...color: IColor[]) {
    this._color = color.map(c => Color.fromIColor(c));
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
  setPositionAttributeLocation(positionAttributeName: string = 'a_position') {
    // Set the position attribute location.
    this.positionAttributeLocation = this.gl.getAttribLocation(this.program, positionAttributeName);
  }

  /**
   * Set the shader's color attributes location. 
   *
   * @param colorAttributeName - The name of the color attribute. Default: 'a_color'.
   */
  setColorAttributeLocation(colorAttributeName: string = 'a_color') {
      // Set the color attribute location.
    this.colorAttributeLocation = this.gl.getAttribLocation(this.program, colorAttributeName);
  }


  /**
   * Get the vertex position of object by its index. 
   *
   * @param idx - The index of the vertex.
   * @returns The vertex position.
   */
  getVertex(idx: number): IPoint {
    if (idx < 0 || idx >= this._nPoint) {
      throw new Error(`The index ${idx} is out of bounds.`);
    }

    return this._position[idx];
  }

  /**
   * Set the vertex position of object by its index. 
   * 
   * @param idx - The index of the vertex. 
   * @param point - The vertex position.
   */
  setVertex(idx: number, point: IPoint) {
    if (idx < 0 || idx >= this._nPoint) {
      throw new Error(`The index ${idx} is out of bounds.`);
    }

    this._position[idx] = Point.fromIPoint(point);
  }

  /**
   * Check if the point is inside the object. 
   *
   * @param point - The point to check.
   * @returns true if the point is inside the object, false otherwise.
   */
  isInside(point: IPoint): boolean {
    // Get the maximum and minimum coordinate of the object.
    const xMax = Math.max(...this._position.map(p => p.x));
    const xMin = Math.min(...this._position.map(p => p.x));

    const yMax = Math.max(...this._position.map(p => p.y));
    const yMin = Math.min(...this._position.map(p => p.y));

    // Check if the point is between the minimum and maximum coordinate.
    return (point.x >= xMin && point.x <= xMax) && (point.y >= yMin && point.y <= yMax);
  }


  /**
   * Validate that position already defined.
   */
  protected validatePosition() {
    if (!this._position) {
      throw new Error(`You must define ${this._nPoint} points in the object's position.`);
    }
  }

  /**
   * Validate that color already defined.
   */
  protected validateColor() {
    if (!this._color) {
      throw new Error("You must define object's color.");
    }
  }


  /**
   * Flatten the Position to a Float32Array.
   *
   * @returns The flattened position array.
   */
  protected flatPosition(): Float32Array {
    // Validate the position.
    this.validatePosition();

    const newPosition = [];
    for (let i = 0; i < this._nPoint; i++) {
      newPosition.push(...this._position[i % this._position.length].toTuple());
    }
    return new Float32Array(newPosition);
  }

  /**
   * Flatten the Color to a Uint8Array.
   *
   * @returns The flattened color array.
   */
  protected flatColor(): Uint8Array {
    // Validate the color.
    this.validateColor();

    const newColor = [];
    for (let i = 0; i < this._nPoint; i++) {
      newColor.push(...this._color[i % this._color.length].toTuple());
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
   * MUST be called before drawing. It's NOT recommended to override.
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
}

export default WebGLObject;