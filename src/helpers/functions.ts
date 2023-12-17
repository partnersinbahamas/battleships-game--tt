import { ColumnType } from "../types/squarePoint";
import { rowCoords } from "./variables";
import { columnCoords } from "./variables";

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
  let field: ColumnType[] = [];
  
  for (let i = 1; i <= size; i++) {
    field[i - 1] = [];
  
    for (let k = 1; k <= size; k++) {
      const newId = genereteUniqId(field[i - 1]);

      const newPoint = {
        id: newId,
        x: columnCoords[i],
        y: rowCoords[k],
      };
      

      field[i - 1][k - 1] = newPoint;
    }
  };
  
  return field;
};
