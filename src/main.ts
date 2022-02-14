import Rectangle from "./models/Rectangle";
import Square from "./models/Square";
import Triangle from "./models/Triangle";
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
  let program = await WebGLUtils.createDefaultProgram(gl)

  // Create a new WebGLObject.
  let triangle = new Triangle(1, gl, program);

  triangle.setPosition(
    {x: 0, y: 0},
    {x: 0, y: 500},
    {x: 500, y: 0});

  // Set the color of the triangle.
  triangle.setColor({ r: 255, g: 0, b: 0 });


  let triangle2 = new Triangle(2, gl, program);

  triangle2.setPosition(
    {x: 0, y: 0},
    {x: 0, y: 255},
    {x: 255, y: 0});

  triangle2.setColor({ r: 0, g: 255, b: 0 });

  let rectangle = new Rectangle(3, gl, program);

  rectangle.setPosition(
    {x: 300, y: 300},
    {x: 800, y: 500});
  rectangle.setColor({ r: 0, g: 0, b: 255 });

  let square = new Square(4, gl, program);

  square.setPosition(
    {x: 300, y: 300},
    {x: 350, y: 350});

  square.setColor({ r: 255, g: 255, b: 0 });
  

  // Call the render object.
  const webGLRenderer = new WebGLRenderer(gl);

  // Add the triangle to the renderer.
  webGLRenderer.addObject(rectangle, triangle, triangle2, square);

  // Render the scene.
  webGLRenderer.render();

  // webGLRenderer.removeObject(2);

  // webGLRenderer.render();
}


main();
