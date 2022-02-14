import { IPoint } from "./Point";

/**
 * Interface for an object vertex.
 */
export interface ObjectVertex {
  objectId: number;
  vertexIdx: number;
  position: IPoint;
}