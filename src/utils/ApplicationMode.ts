import { Mode, Model } from "../configs/General";
import ModelFactory from "../models/ModelFactory";
import Color from "../types/Color";
import { IPoint } from "../types/Point";
import { Vertex } from "../types/Vertex";
import WebGLObject from "../types/WebGLObject";
import WebGLRenderer from "../types/WebGLRenderer";
import { getMousePos } from "./Mouse";

export default class ApplicationMode {
  // ATTRIBUTES.
  private _webGLRenderer: WebGLRenderer;

  // The mode of the application.
  private _mode: Mode;

  // The list of polygon vertices.
  private _vertices: IPoint[] = [];

  private _canvas: HTMLCanvasElement;

  // METHODS.
  /**
   * Construct the ModeListener.
   * @param webGLRenderer 
   * @param canvas
   */
  constructor(webGLRenderer: WebGLRenderer, canvas: HTMLCanvasElement) {
    this._webGLRenderer = webGLRenderer;
    this._canvas = canvas;

    this.init();
  }

  /**
   * Initialize the application.
   */
  private init(): void {
    // Change the cursor.
    this._canvas.style.cursor = "crosshair";

    // Get the mode input.
    let modeElement = (<HTMLInputElement>document.getElementById("mode"))

    // Initialize the mode listener.
    this._mode = <Mode>modeElement.value;

    // Add event listener for change of mode
    modeElement.addEventListener("change", (event) => {
      // Reset the vertices.
      this._vertices = [];

      // Change the mode.
      this._mode = <Mode>(<HTMLInputElement>event.target).value;
    });

    // Add event listener for change of shape.
    this.shapeListener();

    // Add event listener to draw mode.
    this.drawMode();

    // Add event listener to move mode.
    this.moveMode();

    // Add event listener to paint mode.
    this.paintMode();
  }

  /**
   * Add event listener to draw mode.
   */
  private drawMode(): void {
    // The object.
    let object: WebGLObject;

    // The state of drawing.
    let isDrawing = false;

    // Add event listener when mouse is down.
    this._canvas.addEventListener("mousedown", (event) => {
      // Check if the mode is draw.
      if (this._mode !== Mode.Draw) {
        return;
      }

      // Create the factory for creating the object.
      let factory = new ModelFactory(this._webGLRenderer);

      // Get the selected model.
      let shapeElement = (<HTMLInputElement>document.getElementById("shape"));
      let model = <Model>shapeElement.value;

      // Get the selected color.
      let colorElement = (<HTMLInputElement>document.getElementById("color"));
      let color = Color.hexToRGB(<string>colorElement.value);

      // Get the number of vertices.
      let numVertices = parseInt((<HTMLInputElement>document.getElementById("vertex")).value);

      // Get the mouse position.
      let mousePos = getMousePos(this._canvas, event);

      // Check if the shape is polygon.
      if (model === Model.POLYGON) {
        // Add the mousePos to the list of vertices.
        this._vertices.push(mousePos);

        // Check if the number of vertices is already reached.
        if (this._vertices.length === numVertices) {
          // Create the object.
          object = factory.createModel(model, [color], this._vertices);

          // Add the object to the renderer.
          this._webGLRenderer.addObject(object);
          this._webGLRenderer.render();

          // Clear the list of vertices.
          this._vertices = [];
        }
        return;
      }

      // Create the object.
      object = factory.createModel(model, [color], [mousePos]);

      // Add the object to the renderer.
      this._webGLRenderer.addObject(object);
      this._webGLRenderer.render();

      // Toggle the state of drawing.
      isDrawing = true;
    })


    // Add event listener when mouse move.
    this._canvas.addEventListener("mousemove", (event) => {
      // Check if the mode is draw.
      if (this._mode !== Mode.Draw) {
        return;
      }

      if (isDrawing) {
        // Get the mouse position.
        let mousePos = getMousePos(this._canvas, event);

        // Update the object.
        object.setVertex(1, mousePos);

        // Render the object.
        this._webGLRenderer.render();
      }
    })

    // Add event listener when mouse up.
    this._canvas.addEventListener("mouseup", (event) => {
      // Check if the mode is draw.
      if (this._mode !== Mode.Draw) {
        return;
      }

      // Toggle the state of drawing.
      isDrawing = false;
    })
  }

  /**
   * Add event listener to move mode.
   */
  private moveMode(): void {
    // The object vertex.
    let vertex: Vertex;

    // The state of moving.
    let isMoving = false;

    // Add event listener when mouse is down.
    this._canvas.addEventListener("mousedown", (event) => {
      // Check if the mode is move.
      if (this._mode !== Mode.Move) {
        return;
      }

      // Get the mouse position.
      let mousePos = getMousePos(this._canvas, event);

      // Get the vertex.
      vertex = this._webGLRenderer.getNearestVertex(mousePos);
      if (!vertex) return;

      // Toggle the state of moving.
      isMoving = true;
    })

    // Add event listener when mouse move.
    this._canvas.addEventListener("mousemove", (event) => {
      // Check if the mode is move.
      if (this._mode !== Mode.Move) {
        return;
      }

      if (isMoving) {
        // Get the mouse position.
        let mousePos = getMousePos(this._canvas, event);

        // Update the object from its vertex.
        let object = this._webGLRenderer.getObject(vertex.objectId);
        object.setVertex(vertex.vertexIdx, mousePos);

        // Render the object.
        this._webGLRenderer.render();
      }
    })

    // Add event listener when mouse up.
    this._canvas.addEventListener("mouseup", (event) => {
      // Check if the mode is move.
      if (this._mode !== Mode.Move) {
        return;
      }

      // Toggle the state of moving.
      isMoving = false;
    })
  }

  /**
   * Add event listener to paint mode.
   */
  private paintMode(): void {
    // Add event listener when mouse is down.
    this._canvas.addEventListener("click", (event) => {
      // Check if the mode is move.
      if (this._mode !== Mode.Paint) {
        return;
      }

      // Get the mouse position.
      let mousePos = getMousePos(this._canvas, event);

      // Get the object.
      let object = this._webGLRenderer.getObjectInside(mousePos);
      if (!object) return;

      // Get the selected color.
      let colorElement = (<HTMLInputElement>document.getElementById("color"));
      let color = Color.hexToRGB(<string>colorElement.value);

      // Change object color.
      object.constructColor(color);

      // Render the object.
      this._webGLRenderer.render();
    })
  }


  /**
   * Add event listener to change of shape.
   */
  private shapeListener(): void {
    // Get the selected model and value.
    let shapeElement = (<HTMLInputElement>document.getElementById("shape"));
    let model = <Model>shapeElement.value;

    if (model === Model.POLYGON) {
      // Hide the vertex input and label.
      (<HTMLInputElement>document.getElementById("vertex-label")).style.display = "block";
      (<HTMLInputElement>document.getElementById("vertex")).style.display = "block";
    }
    
    // Add event listener for change of shape.
    shapeElement.addEventListener("change", (event) => {
      // Reset the vertices.
      this._vertices = [];

      // Get the shape.
      let model = <Model>(<HTMLInputElement>event.target).value;

      // Check if shape is non-polygon.
      if (model !== Model.POLYGON) {
        // Hide the vertex input and label.
        (<HTMLInputElement>document.getElementById("vertex-label")).style.display = "none";
        (<HTMLInputElement>document.getElementById("vertex")).style.display = "none";
      } else {
        // Show the vertex input.
        (<HTMLInputElement>document.getElementById("vertex-label")).style.display = "block";
        (<HTMLInputElement>document.getElementById("vertex")).style.display = "block";
      }
    });
  }
}
