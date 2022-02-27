import Rectangle from "../models/Rectangle";
import Square from "../models/Square";
import Triangle from "../models/Triangle";
import Line from "../models/Line";
import WebGLObject from "./WebGL/WebGLObject";

export function convertJsonToObject(
  jsonData,
  gl: WebGLRenderingContext,
  program: WebGLProgram
) {
  let object: WebGLObject;
  let position = jsonData._position; // array of {x, y}
  switch (jsonData._model) {
    case "LINE":
      object = new Line(jsonData._id, gl, program);
      break;
    case "TRIANGLE":
      object = new Triangle(jsonData._id, gl, program);
      break;
    // For rectangle and square, the number of _position is 2
    case "RECTANGLE":
      object = new Rectangle(jsonData._id, gl, program);
      break;
    case "SQUARE":
      object = new Square(jsonData._id, gl, program);
      break;
    case "POLYGON":
      // TODO polygon
      // webGLObject = new Polygon(jsonData.id,gl,program);
      break;
    default:
      break;
  }
  object.setPosition(...position);
  object.setColor(...jsonData._color);
  return object;
}
