import WebGLObjects from "../types/WebGLObject";

class Line extends WebGLObjects {
  // CLASS PROPERTIES

  // Number of vertices.
  protected nPoint = 2;

  // CLASS METHODS

  /**
   * Draws the line object.
   */
  draw() {
    // Init drawing.
    this.initDraw();

    // Draw the geometry.
    var primitiveType = this.gl.LINES;
    var offset = 0;
    var count = this.nPoint;
    this.gl.drawArrays(primitiveType, offset, count);
  }
}

export default Line;
