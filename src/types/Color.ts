/**
 * Class that represents a object's color.
 */
export interface IColor {
  // CLASS PROPERTIES

  // Red color value. (0-255)
  r: number;
  // Green color value. (0-255)
  g: number;
  // Blue color value. (0-255)
  b: number;
  // Alpha color value. (0-255)
  a?: number;
}
 
export class Color implements IColor {
  // CLASS PROPERTIES

  // Red color value.
  public r: number;
  // Green color value.
  public g: number;
  // Blue color value.
  public b: number;
  // Alpha color value.
  public a?: number;

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

  /**
   * Convert the IColor to Color object. 
   *
   * @param obj - The IColor object.
   * @returns A new Color object.
   */
  static fromIColor(obj: IColor): Color {
    return new Color(obj.r, obj.g, obj.b, obj.a);
  }

  /**
   * Convert the Hex color to Color object.
   * 
   * @param hex - The hexadecimal color value.
   * @returns a new Color object.
   */
  static hexToRGB(hex: string): Color {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return new Color(r, g, b);
  }
}

export default Color;