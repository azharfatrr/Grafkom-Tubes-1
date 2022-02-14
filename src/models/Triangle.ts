import WebGLObjects from "../types/WebGLObject";

class Triangle extends WebGLObjects {
  // CLASS PROPERTIES

  // Number of vertices.
  protected _nPoint = 3;

  // CLASS METHODS
  
  /**
   * Draws the triangle object.
   */
  draw() {
    // Init drawing.
    this.initDraw();
        
    // Draw the geometry.
    var primitiveType = this.gl.TRIANGLES;
    var offset = 0;
    var count = this._nPoint;
    this.gl.drawArrays(primitiveType, offset, count);
  }
}

export default Triangle;