import Rectangle from "./models/Rectangle";
import Square from "./models/Square";
import Triangle from "./models/Triangle";
import Line from "./models/Line";
import { Vertex } from "./types/Vertex";
import WebGLRenderer from "./types/WebGLRenderer";
import { getMousePos } from "./utils/General";
import WebGLUtils from "./utils/WebGLUtils";

// TODO: Create a function for select corner of an object.

async function main() {
  // Get A WebGL context
  let canvas = document.querySelector("#canvasContent") as HTMLCanvasElement;
  let gl = canvas.getContext("webgl");

  if (!gl) {
    window.alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
  }

  // Use utils to compile the shaders and link into a program
  let program = await WebGLUtils.createDefaultProgram(gl);

  // Create a new WebGLObject.
  let triangle = new Triangle(1, gl, program);

  triangle.setPosition({ x: 0, y: 0 }, { x: 0, y: 500 }, { x: 500, y: 0 });

  // Set the color of the triangle.
  triangle.setColor({ r: 255, g: 0, b: 0 });

  let triangle2 = new Triangle(2, gl, program);

  triangle2.setPosition({ x: 0, y: 0 }, { x: 0, y: 255 }, { x: 255, y: 0 });

  triangle2.setColor({ r: 0, g: 255, b: 0 });

  let rectangle = new Rectangle(3, gl, program);

  rectangle.setPosition({ x: 200, y: 800 }, { x: 800, y: 300 });
  rectangle.setColor({ r: 0, g: 0, b: 255 });

  let square = new Square(4, gl, program);

  square.setPosition({ x: 500, y: 500 }, { x: 700, y: 350 });

  square.setColor(
    { r: 0, g: 255, b: 0 },
    { r: 0, g: 255, b: 0 },
    { r: 0, g: 0, b: 255 },
    { r: 0, g: 0, b: 255 }
  );

  rectangle.setColor(
    { r: 255, g: 0, b: 0 },
    { r: 255, g: 0, b: 0 },
    { r: 0, g: 0, b: 255 },
    { r: 0, g: 0, b: 255 }
  );

  let line1 = new Line(5, gl, program);

  line1.setPosition({ x: 200, y: 700 }, { x: 800, y: 700 });
  line1.setColor({ r: 0, g: 255, b: 255 });

  // Call the render object.
  const webGLRenderer = new WebGLRenderer(gl);

  // Add the triangle to the renderer.
  webGLRenderer.addObject(rectangle, triangle, triangle2, square, line1);

  // Render the scene.
  webGLRenderer.render();

  // Render the scene.
  // webGLRenderer.render();
  // webGLRenderer.removeObject(2);

  // webGLRenderer.render();

  // TEST MOVE VERTEX OF AN OBJECT.
  var isMoved = false;
  var vertex: Vertex;

  canvas.addEventListener("mousedown", (event) => {
    const mousePos = getMousePos(canvas, event);
    console.log(mousePos);

    if (!isMoved) {
      vertex = webGLRenderer.getNearestVertex(mousePos);
      if (!vertex) return;
    } else {
      vertex = null;
    }

    // Toggle the isMoved flag.
    isMoved = !isMoved;
  });

  canvas.addEventListener("mousemove", (event) => {
    if (isMoved && vertex) {
      const mousePos = getMousePos(canvas, event);

      let object = webGLRenderer.getObject(vertex.objectId);
      object.setVertex(vertex.vertexIdx, mousePos);

      webGLRenderer.render();
    }
  });
}

main();
