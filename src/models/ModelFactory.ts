import { Model } from "../configs/General";
import Color from "../types/Color";
import Point, { IPoint } from "../types/Point";
import WebGLObjects from "../types/WebGLObject";
import WebGLRenderer from "../types/WebGLRenderer";
import Line from "./Line";
import Rectangle from "./Rectangle";
import Square from "./Square";
import Triangle from "./Triangle";

export default class ModelFactory {
  // ATTRIBUTES.
  protected renderer: WebGLRenderer;

  // METHODS.
  constructor(renderer: WebGLRenderer) {
    this.renderer = renderer;
  }

  /**
   * 
   * @param model - The model of the object.
   * @param color - The color of the object.
   * @returns WebGLObjects
   */
  createModel(model: Model, color: Color, mousePos: IPoint): WebGLObjects {
    let object: WebGLObjects = new Line(Date.now(), this.renderer.gl, this.renderer.program);
    object.setPosition(mousePos, mousePos);

    // Create the models based on the model parameter.
    switch (model) {
      case Model.LINE:
        object = new Line(Date.now(), this.renderer.gl, this.renderer.program);
        object.setPosition(mousePos, mousePos);
        break;
      case Model.TRIANGLE:
        object = new Triangle(Date.now(), this.renderer.gl, this.renderer.program);
        object.setPosition(mousePos, mousePos, mousePos);
        break;
      case Model.SQUARE:
        object = new Square(Date.now(), this.renderer.gl, this.renderer.program);
        object.setPosition(mousePos, mousePos);
        break;
      case Model.RECTANGLE:
        object = new Rectangle(Date.now(), this.renderer.gl, this.renderer.program);
        object.setPosition(mousePos, mousePos);
        break;
      case Model.POLYGON:
        break;
      default:
        break;
    }
        
    object.setColor(color);
    return object;
  }
}