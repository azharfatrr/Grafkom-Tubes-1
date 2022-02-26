import { Model } from "../configs/General";
import Color from "../types/Color";
import Point, { IPoint } from "../types/Point";
import WebGLObject from "../types/WebGLObject";
import WebGLRenderer from "../types/WebGLRenderer";
import Line from "./Line";
import Polygon from "./Polygon";
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
  createModel(model: Model, color: Color, ...position: IPoint[]): WebGLObject {
    // Check the length of the position.
    if (position.length === 0) {
      throw new Error("The position array is empty.");
    }

    // Initialize the object.
    let object: WebGLObject = new Line(Date.now(), this.renderer.gl, this.renderer.program);
   
    // Create the models based on the model parameter.
    switch (model) {
      case Model.LINE:
        object = new Line(Date.now(), this.renderer.gl, this.renderer.program);
        break;
      case Model.TRIANGLE:
        object = new Triangle(Date.now(), this.renderer.gl, this.renderer.program);
        break;
      case Model.SQUARE:
        object = new Square(Date.now(), this.renderer.gl, this.renderer.program);
        break;
      case Model.RECTANGLE:
        object = new Rectangle(Date.now(), this.renderer.gl, this.renderer.program);
        break;
      case Model.POLYGON:
        object = new Polygon(Date.now(), this.renderer.gl, this.renderer.program);  
        break
      default:
        break;
    }

    // Set the object position for non-polygon objects.
    if (model != Model.POLYGON) {
      // The object position.
      let modelPosition: IPoint[] = [];
      for (let i = 0; i < object.nPoint; i++) {
        modelPosition.push(position[i % position.length]);
      }
  
      // Set the object position.
      object.setPosition(...modelPosition);   
    } else {
      // Set the object position for polygon objects.
      object.setPosition(...position); 
    }

    // Set the object color.
    object.constructColor(color);

    // Return the object.
    return object;
  }
}