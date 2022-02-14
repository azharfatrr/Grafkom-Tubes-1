/**
 * Class that represents a object's color.
 */
class Color {
  // CLASS PROPERTIES

  // Red color value.
  public r: number;
  // Green color value.
  public g: number;
  // Blue color value.
  public b: number;
  // Alpha color value.
  public a: number;

  // CLASS METHODS

  /**
   * Construct the color. 
   *
   * @param r - The red color value. Valid values: 0 - 255.
   * @param g - The green color value. Valid values: 0 - 255.
   * @param b - The blue color value. Valid values: 0 - 255.
   * @param a - The alpha color value. Valid values: 0 - 255.
   */
  constructor(r: number, g: number, b: number, a?: number) {
    // Check if the red color value is valid.
    if (r < 0 || r > 255) {
      throw new Error("Invalid red color value: " + r);
    }
    // Check if the green color value is valid.
    if (g < 0 || g > 255) {
      throw new Error("Invalid green color value: " + g);
    }
    // Check if the blue color value is valid.
    if (b < 0 || b > 255) {
      throw new Error("Invalid blue color value: " + b);
    }
    // Check if the alpha color value is valid.
    if (a !== undefined && (a < 0 || a > 255)) {
      throw new Error("Invalid alpha color value: " + a);
    }

    // Set the color values.
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a || 255;
  }

  /**
   * Convert the color to a tuple. 
   *
   * @returns The color as a tuple.
   */
  toTuple(): [number, number, number, number] {
    return [this.r, this.g, this.b, this.a];
  }

  /**
   * Convert the tuple to a color. 
   *
   * @param tuple - The color as a tuple.
   * @returns New color object.
   */
  static fromTuple(tuple: [number, number, number, number]): Color {
    return new Color(tuple[0], tuple[1], tuple[2], tuple[3]);
  }
}

export default Color;