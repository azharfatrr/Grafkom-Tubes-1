import Rectangle from "./models/Rectangle";
import Square from "./models/Square";
import Triangle from "./models/Triangle";
import Line from "./models/Line";
import { Vertex } from "./types/Vertex";
import WebGLRenderer from "./types/WebGLRenderer";
import { getMousePos } from "./utils/General";
import WebGLUtils from "./utils/WebGLUtils";
import { Data } from "./utils/Data";
import WebGLObjects from "./types/WebGLObject";
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
  console.log(webGLRenderer.getAllObjects());

  // Render the scene.
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

  const saveButton = document.getElementById("saveButton");
  saveButton.addEventListener("click", () => {
    const data: WebGLObjects[] = webGLRenderer.getAllObjects();
    const fileContent: Data = {
      objectData: data,
    };
    // const fileContent = data;
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

  // const loadButton = document.getElementById("loadButton");

  document.getElementById("load").onclick = function () {
    let files = document.getElementById("selectFiles").files;
    console.log(files);
    if (files.length <= 0) {
      return false;
    }

    let fr = new FileReader();

    fr.onload = function (e) {
      console.log(e);
      let result = JSON.parse(e.target.result) as Data;
      let formatted = JSON.stringify(result, null, 2);
      document.getElementById("result").value = formatted; // display json in textarea

      // TODO load JSON to renderer
      let loadedObjectsArray = [];
      result.objectData.forEach(function (val) {
        console.log(val);
        loadedObjectsArray.push(val);
        // val.draw();
        let obj = JSON.parse(val.object) as Object;
        console.log(obj);
        // loadedObjectsArray.push(obj);
      });

      // console.log(result.objectData);
      // console.log("webGLRenderer" + webGLRenderer.getAllObjects());
      // console.log("loaded objects: " + loadedObjectsArray);
      // webGLRenderer.addObject(loadedObjectsArray);
      // console.log("after loaded objects added: ");
      // console.log(webGLRenderer.getAllObjects()[0]);
      // // error di draw & iterating
      // // loadedObjectsArray.forEach(function (val) {
      // //   val.draw();
      // // });
      // webGLRenderer.render();

      // result.objectData.forEach(function (obj) {
      //   let object = JSON.parse(obj) as Object;
      //   console.log(object);
      //   // console.log(obj);
      //   // loadedObjectsArray.push(obj);
      // });

      // Coba2
      // // Call the render object.
      // const webGLRenderer = new WebGLRenderer(gl);

      // // Add the loaded objects
      // webGLRenderer.addObject(loadedObjectsArray);
      // console.log(webGLRenderer.getAllObjects());

      // Render the scene.
      // webGLRenderer.render();

      // 1. iterate, pisahin data tiap objek
      // 2. parse data tiap objek, masukin ke renderer (add objek)
    };

    fr.readAsText(files.item(0));
  };
}

main();
