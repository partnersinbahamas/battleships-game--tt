import { Square } from "../components/Square/Square";
import { BattlefieldType } from "../types/battlefield";
import { ShipType } from "../types/ship";
import { ColumnType, Coords, SquarePoint } from "../types/squarePoint";
import { columnCoords } from "./variables";
import { ships } from "./variables";

export function getRandomBetween(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1))
};

export function getRandomFrom(...args: any) {
  const index = Math.floor(Math.random() * args.length);
  return args[index];
}

export function isShipPlaced(ship: ShipType): boolean {
  return ship.coordX !== null || ship.coordY !== null;
}

export function inField(x: number | null, y: number | null): boolean {
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

export function isUnderPoint(point: Coords, element: Element): boolean {
  const { x, y } = point;
  const {left, top, height, width} = element.getBoundingClientRect();
  return left <= x && x <= left + width && top <= y && y <= top + height;
}

export function genereteUniqId(array: any[], initialValue = 0): number {
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

      const newPoint: SquarePoint = {
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

export function isEachTowerInField(shipProp: ShipType, field: Element, isOpponent: boolean): boolean {
  for (let i = shipProp.size; i > 0; i--) {
    const {left, top} = document.getElementById(`ship-${shipProp.id}-tower-${i}-${isOpponent ? 'opponent' : 'you'}`)!
      .getBoundingClientRect();

      // console.log(document.getElementById(`ship-${shipProp.id}-tower-${i}-opponent`)!)

    if (!isUnderPoint({x: left + 10, y: top + 10}, field)) {
      return false;
    }
  }

  return true;
}

export const onPlaceShip = (ships: ShipType[]): ColumnType[] => {
  const field = createField(10).squares;

  for (let ship of ships) {
    if (isShipPlaced(ship)) {
      const { coordX, coordY } = ship;

      const dx: number = ship.direction === 'row' ? 1 : 0;
      const dy: number = ship.direction === 'column' ? 1 : 0;

      for (let i = 0; i < ship.size; i++) {
        const cx = coordX! + dy * i;
        const cy = coordY! + dx * i;

        if (inField(cx, cy)) {
          field[cx][cy] = { ...field[cx][cy], ship };
        }
      }

      for (let j = coordY! - 1; j < coordY! + ship.size * dx + dy + 1; j++) {
        for (let k = coordX! - 1; k < coordX! + ship.size * dy + dx + 1; k++) {
          if (inField(j, k)) {
            field[k][j] = {...field[k][j], free: false, ship};
          }
        }
      }
    }
  }

  return field;
};

export const isCoordFree = (squares: ColumnType[], ship: ShipType, x: number, y: number) => {
  if (!inField(x, y)) {
    return false;
  }

  const dx: number = ship.direction === 'row' ? 1 : 0;
  const dy: number = ship.direction === 'column' ? 1 : 0;

  for (let i = 0; i < ship.size; i++) {
    const cx = x! + dy * i;
    const cy = y! + dx * i;

    if (!inField(cx, cy)) {
      return false;
    }

    const item = squares[cx][cy];

    if (!item.free) {
      return false;
    }
  }

  return true;
}


export function isNearesCoordsFree(squares: ColumnType[], coords: Coords, direction: string, ship: ShipType) {
  // needs to check;
  for (let i = coords.x; i < (ship.size + coords.x); i++) {
    if (direction === 'row') {
      const item = squares[coords.x][i]
      if (item && item.ship?.id !== ship.id && !item.free) {
        return false;
      }
    } else {
      const item = squares[i][coords.y];
      if (item && item.ship?.id !== ship.id && !item.free) {
        return false;
      }
    }
  }

  return true;
}

export function randomShipPlace(squares: ColumnType[], ship: ShipType, rootElement: Element, isOpponent: boolean) {
  let preparatedShip = {...ship};
  const rootRect = rootElement.getBoundingClientRect();

  let pointX: number | null = null;
  let pointY: number | null = null;

  let newX: number = ship.defX;
  let newY: number = ship.defY;
  
  let x = getRandomBetween(0, 9);
  let y = getRandomBetween(0, 9);
  const direction = getRandomFrom('column', 'row');

  let isFree = false;

  const cells = document.querySelectorAll(`[data-square="${isOpponent ? 'opponent' : 'you'}"]`);
  console.log(cells);
  let cell: any = null;

  while(!isFree) {
    x = getRandomBetween(0, 9);
    y = getRandomBetween(0, 9);


    cell = Array.from(cells).find((cell: any) => {
      const cellDatas = cell.dataset;
      let dataX = Number(cellDatas.x);
      let dataY = Number(cellDatas.y);
  
      if (dataX === x && dataY === y) {
        return cell;
      }
    })!;

    if (cell) {
      const cellReact = cell.getBoundingClientRect();

      pointX = Number(cell.dataset.x);
      pointY =  Number(cell.dataset.y);
    
      newX = cellReact.left - rootRect.left;
      newY = cellReact.top - rootRect.top;

      preparatedShip = { ...ship,
        x: newX,
        y: newY,
        coordX: pointX,
        coordY: pointY,
        direction,
      };

      isFree = isCoordFree(squares, preparatedShip, pointX, pointY); 
    }
  };
  return preparatedShip;
}
