import { ShipType } from "./ship";

export type Coords = {
  x:  number,
  y: number,
}
export type ColumnType = SquarePoint[];

export type SquarePoint = Coords & {
  id: number,
  ship: ShipType | null,
  belong: ShipType | null,
  free: boolean,
  isChecked: boolean
};