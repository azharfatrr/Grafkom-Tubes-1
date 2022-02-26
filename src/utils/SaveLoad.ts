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
  
}