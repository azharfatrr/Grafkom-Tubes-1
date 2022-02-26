import Rectangle from "./models/Rectangle";
import Square from "./models/Square";
import Triangle from "./models/Triangle";
import Line from "./models/Line";
import { Vertex } from "./types/Vertex";
import WebGLRenderer from "./types/WebGLRenderer";
import { getMousePos } from "./utils/General";
import WebGLUtils from "./utils/WebGLUtils";
import WebGLObjects from "./types/WebGLObject";
import { convertJsonToObject } from "./utils/Converter";
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

  // // Add the triangle to the renderer.
  // webGLRenderer.addObject(rectangle, triangle, triangle2, square, line1);

  // // Render the scene.
  // webGLRenderer.render();
  // console.log(webGLRenderer.getAllObjects());

  // // Render the scene.
  // webGLRenderer.render();
  // webGLRenderer.removeObject(2);

  // webGLRenderer.render();

  // TEST MOVE VERTEX OF AN OBJECT.
  let isMoved = false;
  let vertex: Vertex;

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

  // save button
  const saveButton = document.getElementById("saveButton");
  saveButton.addEventListener("click", () => {
    const data: WebGLObjects[] = webGLRenderer.getAllObjects();
    const fileContent = data;
    const jsonData = JSON.stringify(fileContent);
    const type = "application/json";
    let blob = new Blob([jsonData], { type: type });
    let a = document.createElement("a"),
      url = URL.createObjectURL(blob);
    a.href = url;
    a.download = "test.json"; // filename
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  });

  // TODO: improve draw function?
  let id = 0; // id for counter
  // draw line function
  document.getElementById("drawLineButton").onclick = function () {
    id += 1;
    let line = new Line(id, gl, program);
    line.setPosition({ x: 200, y: 700 }, { x: 800, y: 700 });
    line.setColor({ r: 0, g: 0, b: 0 });
    webGLRenderer.addObject(line);
    webGLRenderer.render();
  };

  // draw square function
  document.getElementById("drawSquareButton").onclick = function () {
    id += 1;
    let square = new Square(id, gl, program);
    square.setPosition({ x: 500, y: 500 }, { x: 700, y: 350 });
    square.setColor(
      { r: 0, g: 255, b: 0 },
      { r: 0, g: 255, b: 0 },
      { r: 0, g: 0, b: 255 },
      { r: 0, g: 0, b: 255 }
    );
    webGLRenderer.addObject(square);
    webGLRenderer.render();
  };

  // draw rectangle function
  document.getElementById("drawRectangleButton").onclick = function () {
    id += 1;
    let rectangle = new Rectangle(id, gl, program);
    rectangle.setPosition({ x: 200, y: 800 }, { x: 800, y: 300 });
    rectangle.setColor({ r: 0, g: 0, b: 255 });
    webGLRenderer.addObject(rectangle);
    webGLRenderer.render();
  };

  // load function
  document.getElementById("loadButton").onclick = function () {
    let files = document.getElementById("selectFileButton").files;
    console.log(files);
    if (files.length <= 0) {
      return false;
    }

    let fr = new FileReader();

    fr.onload = function (e) {
      console.log(e);
      let loadedData = JSON.parse(e.target.result) as WebGLObjects[];
      let formatted = JSON.stringify(loadedData, null, 2);
      // document.getElementById("result").textContent = formatted; // display json in textarea

      // console.log("Object sebelum:", webGLRenderer.getAllObjects());
      // console.log("Result:", result);
      loadedData.forEach(function (val) {
        let convertedJson = convertJsonToObject(val, gl, program);
        webGLRenderer.addObject(convertedJson);
      });
      // Render the scene.
      webGLRenderer.render();
    };

    fr.readAsText(files.item(0));
  };
}

main();
