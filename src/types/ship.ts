// import { SquarePoint } from "./squarePoint";

export type TowerType = {
  id: number,
  checked: boolean,
}

export type ShipType = {
  id: number,
  destroyed: boolean,
  towers: TowerType[],
  name: string,
  x: number | null,
  y: string | null,
}