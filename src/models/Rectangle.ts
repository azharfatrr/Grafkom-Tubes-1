import Point, { IPoint } from "../types/Point";
import WebGLObjects from "../types/WebGLObject";
import { mod } from "../utils/Math";

class Rectangle extends WebGLObjects {
  // CLASS PROPERTIES

  // Number of vertices.
  protected _nPoint = 4;

  // CLASS METHODS

  /**
   * Set the new position for vertex in the rectangle. 
   *
   * @param idx - The index of vertex.
   * @param point - The new position of vertex.
   */
  setVertex(idx: number, point: IPoint): void {
    // Calculate new position for each vertex.
    this.position[idx] = Point.fromIPoint(point);
    if (idx % 2 === 0) {
      // The even vertex is the top left or bottom right.
      this.position[mod(idx - 1,4)].y = point.y;
      this.position[mod(idx + 1,4)].x = point.x;
    } else {
      // The odd vertex is the top right or bottom left.
      this.position[mod(idx - 1,4)].x = point.x;
      this.position[mod(idx + 1,4)].y = point.y;
    }

    // Alternative method
    // It's not working because the position is updated thus the idx.
    // const anchorVertex = this.position[(idx + 2) % 4];
    // this.setPosition(anchorVertex, point);
  }

  /**
   * Set the position of the vertices.
   * Only need 2 vertices for a rectangle:
   * - Anchor - First position
   * - Corner - Second position
   *
   * @param position 
   */
  setPosition(...position: IPoint[]): void {
    // Check if the number of vertices is equal to the number of position in parameter.
    if (position.length !== 2) {
      throw new Error(`The number of position in parameter must be equal to 2.`);
    }

    // Distance between the anchor and the corner.
    const dx = position[1].x - position[0].x;
    const dy = position[1].y - position[0].y;

    // Create complete position.
    const allPosition: IPoint[] = [
      { x: position[0].x, y: position[0].y },
      { x: position[0].x, y: position[0].y + dy },
      { x: position[0].x + dx, y: position[0].y + dy },
      { x: position[0].x + dx , y: position[0].y }
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

export default Rectangle;