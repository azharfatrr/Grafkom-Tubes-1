import ModelFactory from "../models/ModelFactory";
import SaveData from "../types/SaveData";
import WebGLObject from "../types/WebGLObject";
import WebGLRenderer from "../types/WebGLRenderer";

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
    // Get the save button.
    const saveButton = document.getElementById("saveButton") as HTMLButtonElement;

    // Add event listener for save button.
    saveButton.addEventListener("click", () => {
      // Get all the objects.
      const objects: WebGLObject[] = this._webGLRenderer.objects;
      const data: SaveData[] = objects.map((object) => {
        return {
          id: object.id,
          model: object.model,
          nPoint: object.nPoint,
          position: object.position,
          color: object.color
        };
      })
  
      // Convert the data to JSON.
      const jsonData = JSON.stringify(data);
  
      // Create a new file.
      const type = "application/json";
  
      // Create a new blob and get the url.
      let blob = new Blob([jsonData], { type: type });
      let a = document.createElement("a"),
        url = URL.createObjectURL(blob);
  
      // Set the url to the a element.
      a.href = url;
      a.download = "models.json"; // filename
  
      // Append the a element to the body.
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      // Delete the url.
      window.URL.revokeObjectURL(url);
    });
  }
  
  /**
   * Load the state of the application.
   */
  private loadListener() {
    // Model Factory.
    let factory = new ModelFactory(this._webGLRenderer);
  
    // Get the load button.
    const loadButton = document.getElementById("loadButton") as HTMLButtonElement;
  
    // Add the event listener to the load button.
    loadButton.addEventListener("click", () => {
      const input = document.getElementById("inputFile") as HTMLInputElement;    
      const file = input.files[0];
     
      // Check if file input exist.
      if (!file) {
        return;
      }
  
      // Create a new reader.
      const reader = new FileReader();
  
      // Read the file.
      reader.readAsText(file);
  
      // Add event listener when the file is loaded.
      reader.onload = (event) => {
        // Get the data.
        const data = JSON.parse(reader.result as string);
  
        // Clear the objects.
        this._webGLRenderer.clear();
  
        // Create the objects.
        data.forEach((saveData: SaveData) => {
          const object = factory.createModel(saveData.model, saveData.color, saveData.position);
          this._webGLRenderer.addObject(object);
        });
  
        // Render the objects.
        this._webGLRenderer.render();
  
        // Clear the input.
        input.value = "";
      };
  
    })
  }

  /**
   * Clear the canvas.
   */
  private clearListener() {
    // Get the clear button.
    const clearButton = document.getElementById("clearButton") as HTMLButtonElement;

    // Add the event listener to the clear button.
    clearButton.addEventListener("click", () => {
      // Clear the objects.
      this._webGLRenderer.clear();

      // Render the objects.
      this._webGLRenderer.render();
    });
  }
}



