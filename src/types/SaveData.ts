import { Model } from "../configs/General";
import { IColor } from "./Color";
import { IPoint } from "./Point";

export default interface SaveData {
  // The id of model.
  id: number;
  // The name of model.
  model: Model;
  // The number of vertices.
  nPoint: number;
  // The list of vertices.
  position: IPoint[];
  // The color of object.
  color: IColor[];
}