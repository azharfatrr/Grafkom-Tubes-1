import Point, { IPoint } from "../types/Point";
import WebGLObjects from "../types/WebGLObject";
import { mod } from "../utils/Math";

class Square extends WebGLObjects {
  // CLASS PROPERTIES

  // Number of vertices.
  protected _nPoint = 4;

  // CLASS METHODS

  /**
   * Set the new position for vertex in the square. 
   *
   * @param idx - The index of vertex.
   * @param point - The new position of vertex.
   */
  setVertex(idx: number, point: IPoint): void {
    // Get the anchor vertex.
    const anchorVertex = this.position[(idx + 2) % 4];
    
    // Distance between the anchor and the corner.
    let dx = point.x - anchorVertex.x;
    let dy = point.y - anchorVertex.y;

    // Select the minimum distance.
    const minDistance = Math.min(Math.abs(dx), Math.abs(dy));

    // Set the sign of dx and dy.
    dx = dx > 0 ? minDistance : -minDistance;
    dy = dy > 0 ? minDistance : -minDistance;

    // Calculate new position corner vertex.
    const newCorner = {
      x: anchorVertex.x + dx,
      y: anchorVertex.y + dy
    }

    // Calculate new position for each vertex.
    this.position[idx] = Point.fromIPoint(newCorner);
    if (idx % 2 === 0) {
      // The even vertex is the top left or bottom right.
      this.position[mod(idx - 1,4)].y = newCorner.y;
      this.position[mod(idx + 1,4)].x = newCorner.x;
    } else {
      // The odd vertex is the top right or bottom left.
      this.position[mod(idx - 1,4)].x = newCorner.x;
      this.position[mod(idx + 1,4)].y = newCorner.y;
    }
  }

  /**
   * Set the position of the vertices.
   * Only need 2 vertices for a square:
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
    let dx = position[1].x - position[0].x;
    let dy = position[1].y - position[0].y;

    // Select the minimum distance.
    const minDistance = Math.min(Math.abs(dx), Math.abs(dy));

    // Set the sign of dx and dy.
    dx = dx > 0 ? minDistance : -minDistance;
    dy = dy > 0 ? minDistance : -minDistance;

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

export default Square;