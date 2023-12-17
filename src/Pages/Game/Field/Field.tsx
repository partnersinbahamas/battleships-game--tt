import { Square } from "../../../components/Square/Square";
import { ColumnType, SquarePoint } from "../../../types/squarePoint";
import { rowCoords } from "../../../helpers/variables";
import { columnCoords } from "../../../helpers/variables";
import './Field.scss';
import { Coords } from "../../../components/Coords/Coords";
import { FieldTitle } from "./FieldTitle/FieldTitle";

type Props = {
  columns: ColumnType[],
  size: number,
  isOpponent?: boolean,
}

export const Field: React.FC<Props> = ({ columns, size, isOpponent = false }) => {
  
  return (
    <div className="field">
      <FieldTitle title={isOpponent ? 'Opponent fleet' : 'Your fleet'} isOpponent={isOpponent} />

      <div className="field__container">
        <div className="field__coords">
          <Coords coords={Object.values(columnCoords)} />
        </div>

        <div className="field__shell">
          <Coords coords={Object.values(rowCoords)} />

          <ul
            className="field__list"
            style={{
              gridTemplateColumns: `repeat(${size}, 1fr)`,
              gridTemplateRows: `repeat(${size}, 1fr)`
            }}
          >
            {columns.map((column: ColumnType) => {  
              return (
                column.map((square: SquarePoint) => {
                  return <Square key={square.id} square={square} isOpponent={isOpponent} />
                })
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}