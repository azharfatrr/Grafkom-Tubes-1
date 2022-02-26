import { Model } from "../configs/General";
import Point, { IPoint } from "../types/Point";
import WebGLObject from "../types/WebGLObject";

class Polygon extends WebGLObject {
  // CLASS PROPERTIES

  // The model of this object.
  protected _model = Model.POLYGON;

  // Number of vertices.
  protected _nPoint = 3;
  protected _constructPoint = 3;

  // CLASS METHODS
  /**
   * Set the vertices position. The number of vertices is determined by the length of the array. 
   *
   * @param position 
   */
  setPosition(...position: IPoint[]): void {
    // Set the number of vertices.
    this._nPoint = position.length;
    this._constructPoint = this._nPoint;

    // Set the position.
    this.position = position.map(p => Point.fromIPoint(p));
  }
  
  /**
   * Draws the triangle object.
   */
  draw() {
    // Init drawing.
    this.initDraw();
        
    // Draw the geometry.
    var primitiveType = this.gl.TRIANGLE_FAN;
    var offset = 0;
    var count = this._nPoint;
    this.gl.drawArrays(primitiveType, offset, count);
  }
}


export default Polygon;