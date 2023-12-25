import { BattlefieldType } from "../types/battlefield";
import { ShipType } from "../types/ship";
import { ColumnType } from "../types/squarePoint";
import { columnCoords } from "./variables";
import { ships } from "./variables";

// export function getRandomBetween(min: number, max: number) {
//   return min + Math.floor(Math.random() * (max - min + 1))
// };

// export function getRandomFrom(...args: any) {
//   const index = Math.floor(Math.random() * args.length);
//   return args[index];
// }

export function isShipPlaced(ship: ShipType): boolean {
  return ship.coordX !== null || ship.coordY !== null;
}

export function inField(x: number | null, y: number | null) {
  const isNumber = (n: number) =>
    parseInt(String(n)) === n && !isNaN(n) && ![Infinity, -Infinity].includes(n);

  if (x !== null && y !== null) {
    if (!isNumber(x) && !isNumber(y)) {
      return false;
    }
  } else {
    return false;
  }

  return 0 <= x! && x! < 10 && 0 <= y! && y! < 10;
}

export function isUnderPoint(point: {x: number, y: number}, element: Element): boolean {
  const { x, y } = point;
  const {left, top, height, width} = element.getBoundingClientRect();
  return left <= x && x <= left + width && top <= y && y <= top + height;
}

export function genereteUniqId(array: any[], initialValue = 0) {
  let maxId = initialValue;
  
  for (const item of array) {
    if (item.id > maxId) {
      maxId = item.id;
    }
  }
  
  return maxId + 1;
}

export function createField(size: number): BattlefieldType {
  const field: BattlefieldType = {
    ships: [],
    shots: [],
    squares: [],
  };

  for (let i = 1; i <= size; i++) {
    field.squares[i - 1] = [];
  
    for (let k = 1; k <= size; k++) {
      const newId = genereteUniqId(field.squares[i - 1]);

      const newPoint = {
        id: newId,
        x: columnCoords[i],
        y: columnCoords[k],
        ship: null,
        free: true,
      };

      field.squares[i - 1][k - 1] = newPoint;
    }
  };

  field.ships = ships;
  
  return field;
};

export function isEachTowerInField(shipProp: ShipType, field: Element) {
  for (let i = 0; i < shipProp.size; i++) {
    const {left, top} = document.getElementById(`ship-${shipProp.id}-tower-${i}`)!.getBoundingClientRect();

    if (!isUnderPoint({x: left, y: top}, field)) {
      return false;
    }
  }

  return true;
}

export const onPlaceShip = (ships: ShipType[]): ColumnType[] => {
  const copy = createField(10).squares;

  for (let ship of ships) {
    if (isShipPlaced(ship)) {
      const { coordX, coordY } = ship;
      const dx: number = ship.direction === 'row' ? 1 : 0;
      const dy: number = ship.direction === 'column' ? 1 : 0;

      for (let i = 0; i < ship.size; i++) {
        const cx = coordX! + dy * i;
        const cy = coordY! + dx * i;
        copy[cx][cy] = { ...copy[cx][cy], ship };
      }

      for (let j = coordY! - 1; j < coordY! + ship.size * dx + dy + 1; j++) {
        for (let k = coordX! - 1; k < coordX! + ship.size * dy + dx + 1; k++) {
          if (inField(j, k)) {
            console.log(inField(j, k))
            copy[k][j] = {...copy[k][j], free: false};
          }
        }
      }
    }
  }

  return copy;
};
