import { MIN_DISTANCE_BETWEEN_POINT } from "../../configs/General";
import WebGLUtils from "./WebGLUtils";
import Point, { IPoint } from "../../types/Point";
import { Vertex } from "../../types/Vertex";
import WebGLObject from "./WebGLObject";

/**
 * A Class for rendering WebGL objects.
 */
class WebGLRenderer {
  // CLASS PROPERTIES

  // List of WebGLObjects.
  protected _objects: WebGLObject[];
  public get objects() {
    return this._objects;
  }

  // The number of objects.
  protected count: number;

  // The WebGL context.
  protected _gl: WebGLRenderingContext;
  public get gl() {
    return this._gl;
  }

  // The Shader Program.
  protected _program: WebGLProgram;
  public get program() {
    return this._program;
  }

  // CLASS METHODS

  /**
   * Construct the renderer.
   *
   * @param gl - The WebGL context.
   */
  constructor(gl: WebGLRenderingContext, program: WebGLProgram) {
    this._objects = [];
    this.count = 0;
    this._gl = gl;
    this._program = program;
  }

  /**
   * Add a WebGLObject to the renderer.
   *
   * @param objects - The WebGLObject to add.
   */
  addObject(...objects: WebGLObject[]) {
    // Add the object.
    this._objects.push(...objects);
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
    const index = this._objects.findIndex((object) => object.id === id);
    // Return the object.
    if (index > -1) {
      return this._objects[index];
    }
  }

  /**
   * Remove a WebGLObject from the renderer.
   *
   * @param id - The id of the WebGLObject to remove.
   */
  removeObject(id: number) {
    // Find the object index in the list.
    const index = this._objects.findIndex((object) => object.id === id);
    // Remove the object.
    if (index > -1) {
      this._objects.splice(index, 1);
      this.count--;
    }
  }

  clear() {
    // Clear the objects.
    this._objects = [];
    // Reset the count.
    this.count = 0;
  }

  /**
   * Get the nearest vertex of any object to the given point.
   *
   * @param position - The position to check nearby vertex.
   * @returns The nearest vertex with object information.
   */
  getNearestVertex(position: IPoint): Vertex {
    // Iterate each object from last to first.
    for (let i = this._objects.length - 1; i >= 0; i--) {
      // Get the object.
      const object = this._objects[i];

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
            position: vertex,
          };
        }
      }
    }
  }

  /**
   * Get the object that inside the point position.
   *
   * @param position - The position to check if the point is inside the object.
   * @returns - WebGLObject if the point is inside the object, otherwise null.
   */
  getObjectInside(position: IPoint): WebGLObject {
    // Iterate each object from last to first.
    for (let i = this._objects.length - 1; i >= 0; i--) {
      // Get the object.
      const object = this._objects[i];

      // Check if the object is inside the position.
      if (object.isInside(position)) {
        // Return the object.
        return object;
      }
    }
  }

  /**
   * Render the all objects.
   */
  render() {
    // Resize the canvas to fit the window.
    WebGLUtils.resizeCanvasToDisplaySize(this._gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    this._gl.viewport(0, 0, this._gl.canvas.width, this._gl.canvas.height);

    // Clear the canvas
    this._gl.clearColor(0, 0, 0, 0);
    this._gl.clear(this._gl.COLOR_BUFFER_BIT);

    // Render each object.
    this._objects.forEach((object) => {
      // Draw the object.
      object.draw();
    });
  }
}

export default WebGLRenderer;
