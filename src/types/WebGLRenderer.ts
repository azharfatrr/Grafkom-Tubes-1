import { MIN_DISTANCE_BETWEEN_POINT } from "../configs/General";
import WebGLUtils from "../utils/WebGLUtils";
import Point, { IPoint } from "./Point";
import { Vertex } from "./Vertex";
import WebGLObjects from "./WebGLObject";

/**
 * A Class for rendering WebGL objects.
 */
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
   * @param objects - The WebGLObject to add.
   */
  addObject(...objects: WebGLObjects[]) {
    // Add the object.
    this.objects.push(...objects);
    // Increment the count.
    this.count += objects.length;
  }

  /**
   * Get a WebGLObject from the renderer. 
   *
   * @param id - The id of the WebGLObject.
   * @returns The WebGLObject.
   */
  getObject(id: number) {
    // Find the object index in the list.
    const index = this.objects.findIndex(object => object.id === id);
    // Return the object.
    if (index > -1) {
      return this.objects[index];
    }
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
   * Get the nearest vertex of any object to the given point.
   * 
   * @param position - The position to check nearby vertex.
   * @returns The nearest vertex with object information.
   */
  getNearestVertex(position: IPoint): Vertex {
    // Iterate each object from last to first.
    for (let i = this.objects.length - 1; i >= 0; i--) {
      // Get the object.
      const object = this.objects[i];
     
      // Iterate each vertex.
      for (let j = 0; j < object.nPoint; j++) {
        // Get the vertex.
        const vertex = object.getVertex(j);

        // Check if the vertex is near the position.
        if (Point.distance(vertex, position) < MIN_DISTANCE_BETWEEN_POINT) {
          // Return the vertex.
          return {
            objectId: object.id,
            vertexIdx: j,
            position: vertex
          };
        }
      }
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