import { ShipType } from "./ship";
import { ColumnType, SquarePoint } from "./squarePoint";

export interface BattlefieldType {
  shots: any[],
  ships: ShipType[],
  squares: ColumnType[],
}