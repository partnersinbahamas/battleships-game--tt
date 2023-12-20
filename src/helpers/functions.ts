import { Battlefield } from "../classes/Battlefield";
import { ColumnType } from "../types/squarePoint";
import { rowCoords } from "./variables";
import { columnCoords } from "./variables";

export function getRandomBetween(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1))
};

export function getRandomFrom(...args: any) {
  const index = Math.floor(Math.random() * args.length);
  return args[index];
}

export function isUnderPoint(point: {x: number, y: number}, element: Element) {
  const { x, y } = point;
  const {left, top, height, width} = element.getBoundingClientRect();

  return left <= x && x <= left + width && top <= y && y <= top + height
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
    

export function createField(size: number): any[] {
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
  
  return field;
};
