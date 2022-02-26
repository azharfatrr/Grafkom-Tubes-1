import Rectangle from "../models/Rectangle";
import Square from "../models/Square";
import Triangle from "../models/Triangle";
import Line from "../models/Line";
// import { Vertex } from "../types/Vertex";
// import WebGLRenderer from "../types/WebGLRenderer";
// import { getMousePos } from "../utils/General";
// import WebGLUtils from "../utils/WebGLUtils";
import WebGLObjects from "../types/WebGLObject";

export function convertJsonToObject(
  jsonData,
  gl: WebGLRenderingContext,
  program: WebGLProgram
) {
  let object: WebGLObjects;
  let position = jsonData.position; // array of {x, y}
  // console.log("Position", position);
  switch (jsonData._model) {
    case "LINE":
      object = new Line(jsonData._id, gl, program);
      position = jsonData.position;
      break;
    case "TRIANGLE":
      object = new Triangle(jsonData._id, gl, program);
      position = jsonData.position;
      break;
    // For rectangle and square, the number of position is 2
    case "RECTANGLE":
      object = new Rectangle(jsonData._id, gl, program);
      position = jsonData.position
        .slice(0, 1)
        .concat(jsonData.position.slice(2, 3));
      break;
    case "SQUARE":
      object = new Square(jsonData._id, gl, program);
      position = jsonData.position
        .slice(0, 1)
        .concat(jsonData.position.slice(2, 3));
      break;
    case "POLYGON":
      // TODO polygon
      // webGLObject = new Polygon(jsonData.id,gl,program);
      // position = jsonData.position;
      break;
    default:
      break;
  }
  object.setPosition(...position);
  object.setColor(...jsonData.color);
  return object;
}
