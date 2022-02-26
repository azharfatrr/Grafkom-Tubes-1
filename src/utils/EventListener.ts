import { Mode, Model } from "../configs/General";
import ModelFactory from "../models/ModelFactory";
import Rectangle from "../models/Rectangle";
import Square from "../models/Square";
import Triangle from "../models/Triangle";
import Color from "../types/Color";
import WebGLObjects from "../types/WebGLObject";
import WebGLRenderer from "../types/WebGLRenderer";
import { getMousePos } from "./Mouse";


/**
 * Initialize the application.
 */
export function startup(webGLRenderer: WebGLRenderer) {
  initMode(webGLRenderer);
}

/**
 * Initialize the mode and listener for any change in mode.
 */
function initMode(webGLRenderer: WebGLRenderer) {
  // Get the mode input.
  let mode = (<HTMLInputElement>document.getElementById("mode"))

  // Get the value of the mode.
  let modeValue = <Mode>mode.value;

  // Select the mode.
  selectMode(modeValue, webGLRenderer);

  mode.addEventListener("change", (event) => {
    let mode = (<HTMLInputElement>event.target);
    let modeValue = <Mode>mode.value;
    changeMode(modeValue, webGLRenderer);
  });
}


function selectMode(modeValue: Mode, webGLRenderer: WebGLRenderer) {
  switch (modeValue) {
    case Mode.Draw:
      drawMode(webGLRenderer);
      break;
    case Mode.Move:
      console.log("Move mode is selected.");
      break;
    case Mode.Paint:
      console.log("Paint mode is selected.");
      break;
    default:
      break;
  }
}

function changeMode(modeValue: Mode, webGLRenderer: WebGLRenderer) {
  resetMode()
  selectMode(modeValue, webGLRenderer);
}

function resetMode() {
  console.log("Reset mode is selected.");
  // Select the canvas.
  let canvas = document.querySelector("#canvasContent") as HTMLCanvasElement;

  // Remove all event listeners.
  canvas.addEventListener("mousedown", (event) => { });
  canvas.addEventListener("mousemove", (event) => { });
  canvas.addEventListener("mouseup", (event) => { });
}


function drawMode(webGLRenderer: WebGLRenderer) {
  console.log("Draw mode is selected.");
  // Get the canvas.
  let canvas = document.querySelector("#canvasContent") as HTMLCanvasElement;

  // The object.
  let object: WebGLObjects;

  // The state of drawing.
  let isDrawing = false;

  // Add event listener when mouse is down.
  canvas.addEventListener("mousedown", (event) => {
    // Create the factory for creating the object.
    let factory = new ModelFactory(webGLRenderer);

    // Get the selected model.
    let shapeElement = (<HTMLInputElement>document.getElementById("shape"));
    let model = <Model>shapeElement.value;

    // Get the selected color.
    let colorElement = (<HTMLInputElement>document.getElementById("color"));
    let color = Color.hexToRGB(<string>colorElement.value);

    // Get the mouse position.
    let mousePos = getMousePos(canvas, event);

    // Create the object.
    object = factory.createModel(model, color, mousePos);

    // Add the object to the renderer.
    webGLRenderer.addObject(object);
    webGLRenderer.render();

    // Toggle the state of drawing.
    isDrawing = true;
  })

  // Add event listener when mouse move.
  canvas.addEventListener("mousemove", (event) => {
    if (isDrawing) {
      // Get the mouse position.
      let mousePos = getMousePos(canvas, event);

      // Update the object.
      object.setVertex(1, mousePos);

      // Render the object.
      webGLRenderer.render();
    }
  })

  // Add event listener when mouse up.
  canvas.addEventListener("mouseup", (event) => {
    // Toggle the state of drawing.
    isDrawing = false;
  })
}







