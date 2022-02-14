import WebGLObjects from "../types/WebGLObject";

class Triangle extends WebGLObjects {
  // CLASS PROPERTIES

  // Number of vertices.
  protected nPoint = 3;

  // CLASS METHODS

  // Construct the object.
  constructor(id: number, gl: WebGLRenderingContext, program: WebGLProgram) {
    super(id, gl, program);
  }

  
  /**
   * Draws the triangle object.
   */
  draw() {
    // Init drawing.
    this.initDraw();
        
    // Draw the geometry.
    var primitiveType = this.gl.TRIANGLES;
    var offset = 0;
    var count = this.nPoint;
    this.gl.drawArrays(primitiveType, offset, count);
  }
}

export default Triangle;