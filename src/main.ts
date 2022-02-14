import WebGLObject from "./types/WebGLObject";
import WebGLRenderer from "./types/WebGLRenderer";
import WebGLUtils from "./utils/WebGLUtils";

async function main() {
  // Get A WebGL context
  let canvas = document.querySelector("#canvasContent") as HTMLCanvasElement;
  let gl = canvas.getContext("webgl");
  if (!gl) {
    window.alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }
  
  // Use utils to compile the shaders and link into a program
  let program = await WebGLUtils.createProgram(gl, "vertex-shader.glsl", "fragment-shader.glsl");

  // look up uniform locations
  let resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

  // Create a new WebGLObject.
  let triangle = new WebGLObject(1, gl, program);

  // Set the position of the triangle.
  // TODO: Create an interface for this.
  triangle.position = [
    0, 0,
    0, 200,
    200, 0,
  ];

  // Set the color of the triangle.
  // TODO: Create an interface for this.
  triangle.color = [
    255, 0, 0, 255,
    255, 0, 0, 255,
    255, 0, 0, 255,
  ];

  // Bind the triangle.
  triangle.bind();


  let triangle2 = new WebGLObject(2, gl, program);

  // Set the position of the triangle.
  triangle2.position = [
    0, 0,
    0, 100,
    100, 0,
  ];

  // Set the color of the triangle.
  triangle2.color = [
    0, 255, 0, 255,
    0, 255, 0, 255,
    0, 255, 0, 255,
  ];

  // Bind the triangle.
  triangle2.bind();

  // Call the render object.
  const webGLRenderer = new WebGLRenderer(gl);

  // Add the triangle to the renderer.
  webGLRenderer.addObject(triangle);
  webGLRenderer.addObject(triangle2);

  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);

  // set the resolution
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

  // Draw the triangle.
  triangle.draw();
  triangle2.draw();

  // Render the scene.
  webGLRenderer.render();

  triangle.color = [
    0, 0, 255, 255,
    0, 0, 255, 255,
    0, 0, 255, 255,
  ];

  // Bind the triangle.
  triangle.bind();

  // Render the scene.
  // webGLRenderer.render();
}


main();
