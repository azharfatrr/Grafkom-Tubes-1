import Point, { IPoint } from "../types/Point";
import WebGLObjects from "../types/WebGLObject";

class Square extends WebGLObjects {
  // CLASS PROPERTIES

  // Number of vertices.
  protected _nPoint = 4;

  // CLASS METHODS

  // TODO: Fix tis method.
  /**
   * Set the position of the vertices.
   * Only need 2 vertices for a square:
   * - Middle
   * - Corner
   *
   * @param position 
   */
  setPosition(...position: IPoint[]): void {
    // Check if the number of vertices is equal to the number of position in parameter.
    if (position.length !== 2) {
      throw new Error(`The number of position in parameter must be equal to 2.`);
    }

    // The middle of square.
    const middle = position[0];

    // Calculate the distance between the middle and other point.
    const d = Point.distance(middle, position[1]);

    // Create complete position.
    const allPosition: IPoint[] = [
      { x: middle.x - d, y: middle.y - d },
      { x: middle.x - d, y: middle.y + d },
      { x: middle.x + d, y: middle.y + d },
      { x: middle.x + d, y: middle.y - d }
    ];

    // Set the position.
    this.position = allPosition.map(p => Point.fromIPoint(p));  
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

export default Square;