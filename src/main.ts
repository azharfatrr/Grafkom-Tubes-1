import Rectangle from "./models/Rectangle";
import Square from "./models/Square";
import Triangle from "./models/Triangle";
import { startup } from "./utils/EventListener";
import { Vertex } from "./types/Vertex";
import WebGLRenderer from "./types/WebGLRenderer";
import { getMousePos } from "./utils/Mouse";
import WebGLUtils from "./utils/WebGLUtils";

// TODO: Create a function for select corner of an object.

async function main() {
  // Get A WebGL context
  let canvas = document.querySelector("#canvasContent") as HTMLCanvasElement;
  let gl = canvas.getContext("webgl");

  if (!gl) {
    window.alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }
  
  // Use utils to compile the shaders and link into a program
  let program = await WebGLUtils.createDefaultProgram(gl)

  // Call the render object.
  const webGLRenderer = new WebGLRenderer(gl, program);

  // Initialize the event listener.
  startup(webGLRenderer)


  // TEST MOVE VERTEX OF AN OBJECT.
  // var isMoved = false;
  // var vertex: Vertex;

  // canvas.addEventListener("mousedown", (event) => {
  //   const mousePos = getMousePos(canvas, event);

  //   if (!isMoved) {
  //     vertex = webGLRenderer.getNearestVertex(mousePos);
  //     if (!vertex) return;
  //   } else {
  //     vertex = null;
  //   }

  //   // Toggle the isMoved flag.
  //   isMoved = !isMoved;
  // })

  // canvas.addEventListener("mousemove", (event) => {
  //   if (isMoved && vertex) {
  //     const mousePos = getMousePos(canvas, event);

  //     let object = webGLRenderer.getObject(vertex.objectId);
  //     object.setVertex(vertex.vertexIdx, mousePos);

  //     webGLRenderer.render();
  //   }
  // })
}


main();



