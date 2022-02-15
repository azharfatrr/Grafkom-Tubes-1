import { IPoint } from "./Point";

/**
 * Interface for an object vertex.
 */
export interface Vertex {
  objectId: number;
  vertexIdx: number;
  position: IPoint;
}