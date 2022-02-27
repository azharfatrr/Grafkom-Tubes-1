import { Model } from "../configs/General";
import Point, { IPoint } from "../types/Point";
import WebGLObjects from "../types/WebGLObject";
import { mod } from "../utils/Math";

class Polygon extends WebGLObjects {
  protected _model = Model.POLYGON;
  protected _nPoint: number;

  draw() {
      
  }

}

export default Polygon;