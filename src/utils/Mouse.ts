import { IPoint } from "../types/Point";

/**
 * Get the position of mouse in canvas. 
 *
 * @param canvas - The canvas to in it.
 * @param e - The event.
 * @returns The position of mouse in canvas.
 */
export function getMousePos(canvas, e): IPoint {
  let rect = canvas.getBoundingClientRect(); // abs. size of element
  let scaleX = canvas.width / rect.width;    // relationship bitmap vs. element for X
  let scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

  let point: IPoint = {
    x: (e.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (e.clientY - rect.top) * scaleY      // been adjusted to be relative to element
  } 
  
  return point;
}


