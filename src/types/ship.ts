import { Coords, SquarePoint } from "./squarePoint";

export type ShipTower = {
  id: number,
  isChecked: boolean,
  square: SquarePoint | null,
};

export type ShipType = Coords & {
  id: number,
  destroyed: boolean,
  size: number,
  direction: 'column' | 'row',
  name: string,
  defX: number,
  defY: number,
  coordX: number | null,
  coordY: number | null,
  towers: ShipTower[],
};