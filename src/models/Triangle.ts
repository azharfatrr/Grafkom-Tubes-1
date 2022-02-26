import { Model } from "../configs/General";
import WebGLObject from "../types/WebGLObject";

class Triangle extends WebGLObject {
  // CLASS PROPERTIES

  // The model of this object.
  protected _model = Model.TRIANGLE;

  // Number of vertices.
  protected _nPoint = 3;
  protected _constructPoint = 3;

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