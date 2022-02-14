import Color from "./Color";
import Point from "./Point";

/**
 * Class that represents a object's point and color. 
 */
class PointColor {
  // CLASS PROPERTIES
  point: Point;
  color: Color;

  // CLASS METHODS
  
  /**
   * Construct the point and color. 
   *
   * @param point - The point.
   * @param color - The color.
   */
  constructor(point: Point, color: Color) {
    this.point = point;
    this.color = color;
  }
}

export default PointColor;