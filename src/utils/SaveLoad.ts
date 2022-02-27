import SaveData from "../types/SaveData";
import WebGLObject from "./WebGL/WebGLObject";
import WebGLRenderer from "./WebGL/WebGLRenderer";
import { convertJsonToObject } from "./Converter";
export default class SaveLoad {
  // ATTRIBUTES.
  private _webGLRenderer: WebGLRenderer;

  // METHODS.
  constructor(webGLRenderer: WebGLRenderer) {
    this._webGLRenderer = webGLRenderer;
    this.init();
  }

  private init() {
    this.saveListener();
    this.loadListener();
    this.clearListener();
  }

  /**
   * Save the current state of the application.
   */
  private saveListener() {
    const saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("click", () => {
      const renderer: WebGLRenderer = this._webGLRenderer;
      const data: WebGLObject[] = renderer.objects;
      const jsonData = JSON.stringify(data);
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
  }

  /**
   * Load the state of the application.
   */
  public loadListener() {
    const renderer = this._webGLRenderer;
    const gl = this._webGLRenderer.gl;
    const program = this._webGLRenderer.program;

    document.getElementById("loadButton").onclick = function () {
      let files = document.getElementById("inputFile").files;
      console.log(files);
      if (files.length <= 0) {
        return false;
      }

      let fr = new FileReader();

      fr.onload = function (e) {
        // console.log(e.target.result);
        let loadedData = JSON.parse(e.target.result) as WebGLObject[];
        loadedData.forEach(function (val) {
          let object = convertJsonToObject(val, gl, program);
          renderer.addObject(object);
        });
        // Render the scene.
        renderer.render();
      };
      fr.readAsText(files.item(0));
    };
  }

  // }

  /**
   * Clear the canvas.
   */
  private clearListener() {
    const clearButton = document.getElementById("clearButton");
    const renderer: WebGLRenderer = this._webGLRenderer;
    const objects: WebGLObject[] = renderer.objects;
    clearButton.addEventListener("click", () => {
      // Remove objects
      renderer.clear();
      // Render the scene after clearing canvas
      renderer.render();
    });
  }
}
