/**
 * Class that represents a object's point.
 */
class Point {
  // CLASS PROPERTIES
  public x: number;
  public y: number;

  // CLASS METHODS

  /**
   * Construct the point. 
   *
   * @param x - The x coordinate.
   * @param y - The y coordinate.
   */
  constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
  }

  /**
   * Convert the Point to a tuple.
   *
   * @returns Tuple of x and y coordinates.
   */
  toTuple(): [number, number] {
    return [this.x, this.y];
  }


  /**
   * Convert the tuple to a Point. 
   *
   * @param tuple - The tuple to convert.
   * @returns new Point object.
   */
  static fromTuple(tuple: [number, number]): Point {
    return new Point(tuple[0], tuple[1]);
  }


  /**
   * Calculate the euclidean distance between two points. 
   *
   * @param p1 - The first point.
   * @param p2 - The second point.
   * @returns - The euclidean distance between the two points.
   */
  static distance(p1: Point, p2: Point): number {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

export default Point;