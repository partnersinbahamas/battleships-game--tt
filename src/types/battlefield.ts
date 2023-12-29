import { ShipType } from "./ship";
import { ColumnType } from "./squarePoint";

export interface BattlefieldType {
  shots: any[],
  ships: ShipType[],
  squares: ColumnType[],
};