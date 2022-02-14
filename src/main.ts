import Triangle from "./models/Triangle";
import Color from "./types/Color";
import Point from "./types/Point";
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

  // Set up shader uniform variable resolution.
  WebGLUtils.setUniformVariable(gl, program, "u_resolution", gl.canvas.width, gl.canvas.height);

  // Create a new WebGLObject.
  let triangle = new Triangle(1, gl, program);

  // Set the position of the triangle.
  triangle.setPosition(new Point(0,0), new Point(0,500), new Point(500,0));

  // Set the color of the triangle.
  triangle.setColor(new Color(255,0,0));


  // let triangle2 = new Triangle(2, gl, program);

  // // Set the position of the triangle.
  // triangle2.position = [
  //   0, 0,
  //   0, 100,
  //   100, 0,
  // ];

  // // Set the color of the triangle.
  // triangle2.color = [
  //   0, 255, 0, 255,
  //   0, 255, 0, 255,
  //   0, 255, 0, 255,
  // ];

  // Call the render object.
  const webGLRenderer = new WebGLRenderer(gl);

  // Add the triangle to the renderer.
  webGLRenderer.addObject(triangle);

  // Render the scene.
  webGLRenderer.render();

  // triangle.color = [
  //   0, 0, 255, 255,
  //   0, 0, 255, 255,
  //   0, 0, 255, 255,
  // ];

  // // Render the scene.
  // webGLRenderer.render();
}


main();
