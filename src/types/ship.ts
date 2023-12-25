import { Coords } from "./squarePoint"

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
}