import ModelFactory from "../models/ModelFactory";
import SaveData from "../types/SaveData";
import WebGLObject from "../types/WebGLObject";
import WebGLRenderer from "../types/WebGLRenderer";

export function save(webGLRenderer: WebGLRenderer) {
  const saveButton = document.getElementById("saveButton") as HTMLButtonElement;
  saveButton.addEventListener("click", () => {
    // Get all the objects.
    const objects: WebGLObject[] = webGLRenderer.objects;
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
    a.download = "test.json"; // filename

    // Append the a element to the body.
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // Delete the url.
    window.URL.revokeObjectURL(url);
  });
}


export function load(webGLRenderer: WebGLRenderer) {
  // Model Factory.
  let factory = new ModelFactory(webGLRenderer);

  const loadButton = document.getElementById("loadButton") as HTMLButtonElement;
  loadButton.addEventListener("click", () => {
    const input = document.getElementById("inputFile") as HTMLInputElement;    
    const file = input.files[0];
   
    if (!file) {
      return;
    }

    console.log("this is the file", file);

    // Create a new reader.
    const reader = new FileReader();

    // Read the file.
    reader.readAsText(file);

    // Add event listener when the file is loaded.
    reader.onload = (event) => {
      // Get the data.
      const data = JSON.parse(reader.result as string);

      // Clear the objects.
      webGLRenderer.clear();

      // Create the objects.
      data.forEach((saveData: SaveData) => {
        const object = factory.createModel(saveData.model, saveData.color[0], ...saveData.position);
        webGLRenderer.addObject(object);
      });

      // Render the objects.
      webGLRenderer.render();

      // Clear the input.
      input.value = "";
    };

  })
}