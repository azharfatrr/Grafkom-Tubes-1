import WebGLUtils from "../utils/WebGLUtils";
import WebGLObjects from "./WebGLObject";

class WebGLRenderer {
  // CLASS PROPERTIES

  // List of WebGLObjects.
  protected objects: WebGLObjects[];
  // The number of objects.
  protected count: number;

  // The WebGL context.
  protected gl: WebGLRenderingContext;

  // CLASS METHODS
  
  /**
   * Construct the renderer. 
   *
   * @param gl - The WebGL context.
   */
  constructor(gl: WebGLRenderingContext) {
    this.objects = [];
    this.count = 0;
    this.gl = gl;
  }


  /**
   * Add a WebGLObject to the renderer.
   * 
   * @param object - The WebGLObject to add.
   */
  addObject(object: WebGLObjects) {
    // Add the object.
    this.objects.push(object);
    this.count++;
  }

  /**
   * Remove a WebGLObject from the renderer. 
   *
   * @param id - The id of the WebGLObject to remove.
   */
  removeObject(id: number) {
    // Find the object index in the list.
    const index = this.objects.findIndex(object => object.id === id);
    // Remove the object.
    if (index > -1) {
      this.objects.splice(index, 1);
      this.count--;
    }
  }

  /**
   * Render the all objects.
   */
  render() {
    // Resize the canvas to fit the window.
    WebGLUtils.resizeCanvasToDisplaySize(this.gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

    // Clear the canvas
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    // Render each object.
    this.objects.forEach(object => {
      // Draw the object.
      object.draw();
    })
  }

}

export default WebGLRenderer;