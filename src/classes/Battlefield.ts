
import { Ship } from "./Ship";
import { columnCoords } from "../helpers/variables";
import { rowCoords } from "../helpers/variables";
import { genereteUniqId } from "../helpers/functions";
import { ships } from "../helpers/variables";
import { isUnderPoint } from "../helpers/functions";

// destroyed = false;

// x: number | null = null
// y: number | null = null

// constructor(
//   public size: number ,
//   public direction: 'row' | 'column',
//   public name: string,
//   public id: number,
// ) {
//   Object.assign(this, {
//     size,
//     direction,
//     id,
//     name,
//   })

export class Battlefield {
  ships: Ship[] = []
  shots = [];
  field = [];

  constructor() {}

  genereteShips() {
    for (const ship of ships) {
      const { id, size, name, x, y } = ship;

      const newShip = new Ship(size, name, id, x, y);

      this.ships = [...this.ships, newShip];
    }
  }

  createField(size: number) {
    let battlefield = new Battlefield();
    let field: any = battlefield.field
    
    for (let i = 1; i <= size; i++) {
      field[i - 1] = [];
    
      for (let k = 1; k <= size; k++) {
        const newId = genereteUniqId(field[i - 1]);
  
        const newPoint = {
          id: newId,
          x: columnCoords[i],
          y: rowCoords[k],
          placed: false,
        };
        
  
        field[i - 1][k - 1] = newPoint;
      }
    };

    this.field = field;
    
    return field;
  };

  addShip (ship: Ship): boolean {
    if (this.ships.includes(ship)) {
      return false;
    }

    this.ships = [...this.ships, ship];
    
    return true;
  }

  removeShip (ship: Ship) {
    if (!this.ships.includes(ship)) {
      return false;
    }

    this.ships = [...this.ships].filter((shipEl: Ship) => {
      return shipEl.id !== ship.id;
    });
  }

  removeAllShips(): number {
    const shipsCopy = [...this.ships];

    for (const ship of shipsCopy) {
      this.removeShip(ship);
    }

    return shipsCopy.length;
  }
 
  addShot () {}
  removeShot () {}

  removeAllShots(): number {
    const shotsCopy = [...this.shots];

    for (const ship of shotsCopy) {
      this.removeShip(ship);
    }

    return shotsCopy.length;
  }

  isUnder(point: {x: number, y: number}, element: Element) {
    return isUnderPoint(point, element);
  }
}