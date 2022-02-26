import { Mode, Model } from "../configs/General";
import ModelFactory from "../models/ModelFactory";
import Color from "../types/Color";
import { Vertex } from "../types/Vertex";
import WebGLObjects from "../types/WebGLObject";
import WebGLRenderer from "../types/WebGLRenderer";
import { getMousePos } from "./Mouse";

export default class ModeListener {
  // ATTRIBUTES.
  private _webGLRenderer: WebGLRenderer;

  private _mode: Mode;

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

    // Add event listener when the mode is changed.
    modeElement.addEventListener("change", (event) => {
      this._mode = <Mode>(<HTMLInputElement>event.target).value;
    });

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
    let object: WebGLObjects;

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

      // Get the mouse position.
      let mousePos = getMousePos(this._canvas, event);

      // Create the object.
      object = factory.createModel(model, color, mousePos);

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
    // The object vertex.
    let vertex: Vertex;

    // Add event listener when mouse is down.
    this._canvas.addEventListener("click", (event) => {
      // Check if the mode is move.
      if (this._mode !== Mode.Paint) {
        return;
      }

      // Get the mouse position.
      let mousePos = getMousePos(this._canvas, event);

      // Get the vertex.
      vertex = this._webGLRenderer.getNearestVertex(mousePos);
      if (!vertex) return;

      console.log(vertex);

      // Get the selected color.
      let colorElement = (<HTMLInputElement>document.getElementById("color"));
      let color = Color.hexToRGB(<string>colorElement.value);

      // Get the object.
      let object = this._webGLRenderer.getObject(vertex.objectId);

      // Change object color.
      object.setColor(color);

      // Render the object.
      this._webGLRenderer.render();
    })
  }
}
