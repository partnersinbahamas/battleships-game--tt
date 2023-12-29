import { Square } from "../../../components/Square/Square";
import { ColumnType, Coords as CoordsType, SquarePoint } from "../../../types/squarePoint";
import { rowCoords } from "../../../helpers/variables";
import { columnCoords } from "../../../helpers/variables";
import { FieldTitle } from "./FieldTitle/FieldTitle";
import { ShipYard } from "../../../components/ShipYard/ShipYard";
import { BattlefieldType } from "../../../types/battlefield";
import { SelectCoords } from "../../../components/SelectCoords/SelectCoords";
import { getRandomBetween, isShipPlaced, isSquareChecked } from "../../../helpers/functions";
import { FireButton } from "../../../components/Buttons/FireButton/FireButton";
import { Coords } from "../../../components/Coords/Coords";
import { GraveYard } from "../../../components/GraveYard/GraveYard";
import { onShot } from "../../../helpers/functions";
import { useAppDispatch } from "../../../Redux/hooks";
import { useEffect } from "react";
import { useAppSelector } from "../../../Redux/hooks";
import * as yourActions from '../../../Redux/features/yourField';
import classNames from "classnames";
import './Field.scss';

type Props = {
  battlefield: BattlefieldType,
  isOpponent?: boolean,
  isTurn: boolean,
  setIsTurn: (value: boolean) => void,
  isStart: boolean
}

export const Field: React.FC<Props> = ({
battlefield,
isOpponent = false,
isTurn,
setIsTurn,
isStart
}) => {
  const isEachShipPlaced = battlefield.ships.every((ship) => isShipPlaced(ship));

  const dispatch = useAppDispatch();
  const { yourBattlefield } = useAppSelector(state => state.yourField);

  const onShotHandle = (shotPoint: CoordsType, field: BattlefieldType, actions: any) => {
    if (!isStart) {
      return;
    }

    if (isTurn) {
      const newField: BattlefieldType = onShot(shotPoint, field);
      dispatch(actions.update(newField));
      setIsTurn(false);
    }
  }

  useEffect(() => {
    if (!isTurn) {
      let isAllow = true;

      let shotPoint: CoordsType = {
        x: 0,
        y: 0,
      }

      const isEachChecked = yourBattlefield.squares.every((column) => {
        return column.every((sq) => sq.isChecked)
      });

      if (isEachChecked) {
        return;
      }

      while(isAllow && !isEachChecked) {
        shotPoint = {
          x: getRandomBetween(0, 9),
          y: getRandomBetween(0, 9),
        }

        isAllow = isSquareChecked(shotPoint, yourBattlefield.squares);
      }

      setTimeout(() => {
        const newField: BattlefieldType = onShot(shotPoint, yourBattlefield);
        dispatch(yourActions.update(newField));
        setIsTurn(true);
      }, 1500)
    }
  }, [isTurn])

  return (
    <div className="field">
      <FieldTitle
        title={isOpponent ? 'Opponent fleet' : 'Your fleet'}
        isOpponent={isOpponent}
      />

      <div className="field__container">
        <div className="field__coords">
          <Coords coords={Object.values(columnCoords)} />
        </div>

        <div className="field__shell">
          <Coords coords={Object.values(rowCoords)} />

          <ul
            className="field__list"
            data-field={isOpponent ? 'opponent' : 'you'}
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
              <ShipYard
                ships={battlefield.ships}
                isOpponent={isOpponent}
              />
            )}
          </ul>
        </div>
      </div>
  
      {!isOpponent && (
        <div className={classNames(
          "field__battle",
          {"field__battle--smooth": isEachShipPlaced}
        )}>
          <SelectCoords/>
          <FireButton onShot={onShotHandle} />
        </div>
      )}

      {isOpponent && (
        <GraveYard ships={battlefield.ships} />
      )}
    </div>
  );
};