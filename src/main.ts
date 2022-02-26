import ApplicationMode from "./utils/ApplicationMode";
import WebGLRenderer from "./types/WebGLRenderer";
import WebGLUtils from "./utils/WebGLUtils";
import SaveLoad from "./utils/SaveLoad";

/**
 * The main function of application.
 */
async function main() {
  // Get A WebGL context
  const canvas = document.querySelector("#canvas-content") as HTMLCanvasElement;
  const gl = canvas.getContext("webgl");

  // Check if WebGL is supported.
  if (!gl) {
    window.alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }
  
  // Use utils to compile the shaders and link into a program
  const program = await WebGLUtils.createDefaultProgram(gl)

  // Call the render object.
  const webGLRenderer = new WebGLRenderer(gl, program);

  // The application's event listener.
  const modeListener = new ApplicationMode(webGLRenderer, canvas);

  // The application's save/load listener.
  const saveLoad = new SaveLoad(webGLRenderer);
}


main();



