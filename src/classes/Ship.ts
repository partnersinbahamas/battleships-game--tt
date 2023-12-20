import { isUnderPoint } from "../helpers/functions";
import { TowerType } from "../types/ship";

export class Ship {
  destroyed = false;
  direction: 'row' | 'column' = 'row'

  constructor(
    public size: number ,
    public name: string,
    public id: number,
    public x: number | null,
    public y: number | null,
  ) {
    Object.assign(this, {
      size,
      id,
      name,
      x,
      y,
    })
  }

  get placed() {
    return this.x !== null && this.y !== null;
  }

  isUnder(point: {x: number, y: number}, element: Element) {
    return isUnderPoint(point, element);
  }
}