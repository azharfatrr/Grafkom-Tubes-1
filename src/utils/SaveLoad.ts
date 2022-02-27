import SaveData from "../types/SaveData";
import WebGLObject from "./WebGL/WebGLObject";
import WebGLRenderer from "./WebGL/WebGLRenderer";


// TODO: ADD SAVE/LOAD FUNCTIONALITY.
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

  }
  
  /**
   * Load the state of the application.
   */
  private loadListener() {

  }

  /**
   * Clear the canvas.
   */
  private clearListener() {

  }
}



