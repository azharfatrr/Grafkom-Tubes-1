import ProgramMode from "./utils/ProgramMode";
import WebGLRenderer from "./types/WebGLRenderer";
import WebGLUtils from "./utils/WebGLUtils";
import { load, save } from "./utils/SaveLoad";

// TODO: Create a function for select corner of an object.

async function main() {
  // Get A WebGL context
  const canvas = document.querySelector("#canvasContent") as HTMLCanvasElement;
  const gl = canvas.getContext("webgl");

  if (!gl) {
    window.alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }
  
  // Use utils to compile the shaders and link into a program
  const program = await WebGLUtils.createDefaultProgram(gl)

  // Call the render object.
  const webGLRenderer = new WebGLRenderer(gl, program);

  // Initialize the event listener.
  const modeListener = new ProgramMode(webGLRenderer, canvas);

  save(webGLRenderer);
  load(webGLRenderer);
}


main();



