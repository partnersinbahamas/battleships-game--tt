import { isUnderPoint } from "../helpers/functions";
// import { TowerType } from "../types/ship";
import { BattlefieldSerializable } from "./Battlefield";

export interface ShipSerializable {
    size: number,
    name: string,
    id: number,
    x: number | null,
    y: number | null,
}

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

  static fromJSON(json: ShipSerializable): Ship {
    const { size, name, id, x, y } = json;
    // const shipsArray = ships.map(ship => new Ship(ship.size, ship.name, ship.id, ship.x, ship.y));
    return new Ship(size, name, id, x, y);
}

  toSerializableObject(): ShipSerializable {
    return {
      size: this.size,
      name: this.name,
      id: this.id,
      x: this.x,
      y: this.y,
    };
  }

  get placed() {
    return this.x !== null && this.y !== null;
  }

  isUnder(point: {x: number, y: number}, element: Element) {
    return isUnderPoint(point, element);
  }
}