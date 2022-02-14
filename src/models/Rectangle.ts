import Point, { IPoint } from "../types/Point";
import WebGLObjects from "../types/WebGLObject";

class Square extends WebGLObjects {
  // CLASS PROPERTIES

  // Number of vertices.
  protected nPoint = 4;

  // CLASS METHODS

  /**
   * Set the position of the vertices.
   * Only need 2 vertices for a rectangle:
   * - Top left
   * - Bottom right 
   *
   * @param position 
   */
  setPosition(...position: IPoint[]): void {
    // Check if the number of vertices is equal to the number of position in parameter.
    if (position.length !== 2) {
      throw new Error(`The number of position in parameter must be equal to 2.`);
    }

    // Create complete position.
    const allPosition: IPoint[] = [
      { x: position[0].x, y: position[0].y },
      { x: position[0].x, y: position[1].y },
      { x: position[1].x, y: position[1].y },
      { x: position[1].x, y: position[0].y }
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
    var count = this.nPoint;
    this.gl.drawArrays(primitiveType, offset, count);
  }
}

export default Square;