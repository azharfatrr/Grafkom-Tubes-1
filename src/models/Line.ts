import { Model } from "../configs/General";
import WebGLObjects from "../types/WebGLObject";

class Line extends WebGLObjects {
  // CLASS PROPERTIES

  // The model of this object.
  protected _model = Model.LINE;
  // Number of vertices.
  protected _nPoint = 2;

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
