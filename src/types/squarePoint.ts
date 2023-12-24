import { Ship } from "../classes/Ship";
import { ShipType } from "./ship";

export type ColumnType = SquarePoint[];

export type SquarePoint = {
  id: number,
  x: number,
  y: number,
  ship: ShipType | null,
  free: boolean
};