import { Square } from "../../../components/Square/Square";
import { ColumnType, Coords as CoordsType, SquarePoint } from "../../../types/squarePoint";
import { rowCoords } from "../../../helpers/variables";
import { columnCoords } from "../../../helpers/variables";
import { FieldTitle } from "./FieldTitle/FieldTitle";
import { ShipYard } from "../../../components/ShipYard/ShipYard";
import { BattlefieldType } from "../../../types/battlefield";
import './Field.scss';
import { SelectCoords } from "../../../components/SelectCoords/SelectCoords";
import { isShipPlaced } from "../../../helpers/functions";
import { FireButton } from "../../../components/Buttons/FireButton/FireButton";
import { Coords } from "../../../components/Coords/Coords";
import { GraveYard } from "../../../components/GraveYard/GraveYard";
import classNames from "classnames";

type Props = {
  battlefield: BattlefieldType,
  size: number,
  isOpponent?: boolean,
}

export const Field: React.FC<Props> = ({ battlefield, size, isOpponent = false }) => {
  const isEachShipPlaced = battlefield.ships.every((ship) => isShipPlaced(ship));

  const onShot = (point: CoordsType, battlefield: BattlefieldType): BattlefieldType => {
    const copyField = {...battlefield};
    let copyShips = [...copyField.ships];
    let copySquares = [...copyField.squares];

    copySquares = [...copySquares].map((column) => {
      return column.map((cell) => {
        if (cell.x === point.x && cell.y === point.y) {
          cell = {...cell, isChecked: true};
        }

        return cell;
      })
    })

    copyShips = [...copyShips].map((ship) => {
      let copyTowers = [...ship.towers];

      copyTowers = [...copyTowers].map((tower) => {
        if (tower.square?.x === point.x && tower.square.y === point.y) {
          tower = {...tower, isChecked: true};
        }

        return tower;
      });

      const isShipDestroyed = copyTowers.every((tower) => tower.isChecked);

      return {...ship, towers: copyTowers, destroyed: isShipDestroyed ? true : false};
    })


    copyField.squares = copySquares;
    copyField.ships = copyShips;

    return copyField;
  }

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
            data-field={isOpponent ? 'opponent' : 'you'}
            style={{
              gridTemplateColumns: `repeat(${size}, 1fr)`,
              gridTemplateRows: `repeat(${size}, 1fr)`
            }}
          >
            {battlefield.squares?.map((column: ColumnType) => {  
              return (
                column.map((square: SquarePoint) => (
                  <Square
                    key={square.id}
                    square={square}
                    isOpponent={isOpponent}
                  />
                ))
              )
            })}

            {!isOpponent && (
              <ShipYard ships={battlefield.ships} isOpponent={isOpponent} />
            )}

            {/* <ShipYard ships={battlefield.ships} isOpponent={isOpponent} /> */}

          </ul>
        </div>
      </div>
      {!isOpponent && (
        <div className={classNames(
          "field__battle",
          {"field__battle--smooth": isEachShipPlaced}
        )}>
          <SelectCoords/>
          <FireButton onShot={onShot}/>
        </div>
      )}

      {isOpponent && (
        <GraveYard ships={battlefield.ships}/>
      )}
    </div>
  )
}