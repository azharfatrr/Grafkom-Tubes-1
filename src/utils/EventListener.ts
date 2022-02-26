import { Mode, Model } from "../configs/General";
import ModelFactory from "../models/ModelFactory";
import Color from "../types/Color";
import { Vertex } from "../types/Vertex";
import WebGLObjects from "../types/WebGLObject";
import WebGLRenderer from "../types/WebGLRenderer";
import { getMousePos } from "./Mouse";

// Global Variable Mode.
let MODE: Mode;

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
  let modeElement = (<HTMLInputElement>document.getElementById("mode"))

  // Get the value of the mode.
  MODE = <Mode>modeElement.value;

  // Add event listener when the mode is changed.
  modeElement.addEventListener("change", (event) => {
    MODE = <Mode>(<HTMLInputElement>event.target).value;
  });

  // Add event listener to draw mode.
  drawMode(webGLRenderer);

  // Add event listener to move mode.
  moveMode(webGLRenderer);

  // Add event listener to paint mode.
  paintMode(webGLRenderer);
}


/**
 * Initialize the draw mode.
 * @param webGLRenderer
 */
function drawMode(webGLRenderer: WebGLRenderer) {
  // Get the canvas.
  let canvas = document.querySelector("#canvasContent") as HTMLCanvasElement;

  // The object.
  let object: WebGLObjects;

  // The state of drawing.
  let isDrawing = false;

  // Add event listener when mouse is down.
  canvas.addEventListener("mousedown", (event) => {
    // Check if the mode is draw.
    if (MODE !== Mode.Draw) {
      return;
    }

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
    // Check if the mode is draw.
    if (MODE !== Mode.Draw) {
      return;
    }

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
    // Check if the mode is draw.
    if (MODE !== Mode.Draw) {
      return;
    }

    // Toggle the state of drawing.
    isDrawing = false;
  })
}

/**
 * Initialize the move mode. 
 *
 * @param webGLRenderer The renderer.
 */
function moveMode(webGLRenderer: WebGLRenderer) {
  // Get the canvas.
  let canvas = document.querySelector("#canvasContent") as HTMLCanvasElement;

  // The object vertex.
  let vertex: Vertex;

  // The state of moving.
  let isMoving = false;

  // Add event listener when mouse is down.
  canvas.addEventListener("mousedown", (event) => {
    // Check if the mode is move.
    if (MODE !== Mode.Move) {
      return;
    }

    // Get the mouse position.
    let mousePos = getMousePos(canvas, event);

    // Get the vertex.
    vertex = webGLRenderer.getNearestVertex(mousePos);
    if (!vertex) return;

    // Toggle the state of moving.
    isMoving = true;
  })

  // Add event listener when mouse move.
  canvas.addEventListener("mousemove", (event) => {
    // Check if the mode is move.
    if (MODE !== Mode.Move) {
      return;
    }

    if (isMoving) {
      // Get the mouse position.
      let mousePos = getMousePos(canvas, event);

      // Update the object from its vertex.
      let object = webGLRenderer.getObject(vertex.objectId);
      object.setVertex(vertex.vertexIdx, mousePos);

      // Render the object.
      webGLRenderer.render();
    }
  })

  // Add event listener when mouse up.
  canvas.addEventListener("mouseup", (event) => {
    // Check if the mode is move.
    if (MODE !== Mode.Move) {
      return;
    }

    // Toggle the state of moving.
    isMoving = false;
  })
}


function paintMode(webGLRenderer: WebGLRenderer) {
  // Get the canvas.
  let canvas = document.querySelector("#canvasContent") as HTMLCanvasElement;

  // The object vertex.
  let vertex: Vertex;

  // Add event listener when mouse is down.
  canvas.addEventListener("click", (event) => {
    // Check if the mode is move.
    if (MODE !== Mode.Paint) {
      return;
    }

    // Get the mouse position.
    let mousePos = getMousePos(canvas, event);

    // Get the vertex.
    vertex = webGLRenderer.getNearestVertex(mousePos);
    if (!vertex) return;

    console.log(vertex);

    // Get the selected color.
    let colorElement = (<HTMLInputElement>document.getElementById("color"));
    let color = Color.hexToRGB(<string>colorElement.value);

    // Get the object.
    let object = webGLRenderer.getObject(vertex.objectId);

    // Change object color.
    object.setColor(color);

    // Render the object.
    webGLRenderer.render();
  })
}







