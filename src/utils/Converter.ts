import Rectangle from "../models/Rectangle";
import Square from "../models/Square";
import Triangle from "../models/Triangle";
import Line from "../models/Line";
import WebGLObject from "./WebGL/WebGLObject";
import Polygon from "../models/Polygon";

export function convertJsonToObject(
  jsonData,
  gl: WebGLRenderingContext,
  program: WebGLProgram
) {
  let object: WebGLObject;
  let id = jsonData._id;
  let position = jsonData._position; // array of {x, y}
  switch (jsonData._model) {
    case "LINE":
      object = new Line(id, gl, program);
      break;
    case "TRIANGLE":
      object = new Triangle(id, gl, program);
      break;
    case "RECTANGLE":
      object = new Rectangle(id, gl, program);
      break;
    case "SQUARE":
      object = new Square(id, gl, program);
      break;
    case "POLYGON":
      object = new Polygon(id, gl, program);
      break;
    default:
      break;
  }
  object.setPosition(...position);
  object.setColor(...jsonData._color);
  return object;
}
