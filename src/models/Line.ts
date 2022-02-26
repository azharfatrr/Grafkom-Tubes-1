import { Model } from "../configs/General";
import WebGLObject from "../utils/WebGL/WebGLObject";

class Line extends WebGLObject {
  // CLASS PROPERTIES

  // The model of this object.
  protected _model = Model.LINE;

  // Number of vertices.
  protected _nPoint = 2;
  protected _constructPoint = 2;

  // CLASS METHODS
  
  /**
   * Draws the triangle object.
   */
  draw() {
    // Init drawing.
    this.initDraw();
        
    // Draw the geometry.
    var primitiveType = this.gl.LINES;
    var offset = 0;
    var count = this._nPoint;
    this.gl.drawArrays(primitiveType, offset, count);
  }
}

export default Line;