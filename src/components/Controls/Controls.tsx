import { useAppDispatch } from '../../Redux/hooks';
import { createField, isShipPlaced, onPlaceShip, placeShipAuto } from '../../helpers/functions';
import { useAppSelector } from '../../Redux/hooks';
import * as opponentActions from '../../Redux/features/opponentField';
import * as yourActions from '../../Redux/features/yourField';
import classNames from 'classnames';
import './Controls.scss';

type Props = {
  setIsStart: (value: boolean) => void,
  isStart: boolean,
}

export const Controls: React.FC<Props> = ({ setIsStart, isStart }) => {
  const dispatch = useAppDispatch();
  const { opponentBattlefield } = useAppSelector(state => state.opponentField);
  const { yourBattlefield } = useAppSelector(state => state.yourField);

  const opponentfield = document.querySelector<Element>('[data-field="opponent"]');
  const yourfield = document.querySelector<Element>('[data-field="you"]');

  const onPlace = () => {
  const placedShips = placeShipAuto(yourfield!, false);

  dispatch(
    yourActions.update({
      ...yourBattlefield,
      ships: placedShips,
      squares: onPlaceShip(placedShips)})
    )
  }

  const onRestart = () => {
    const newField = createField(10);

    dispatch(yourActions.update(newField));
    dispatch(opponentActions.update(newField));
    setIsStart(false);
  }

  const onStart = () => {
    const yourShips = yourBattlefield.ships;
    const isYourShipsPlaced = yourShips.every((ship) => isShipPlaced(ship));
      
    if (!isYourShipsPlaced) {
      onPlace();
    }

    const placedShips = placeShipAuto(opponentfield!, true);

    dispatch(
      opponentActions.update({
        ...opponentBattlefield,
        ships: placedShips,
        squares: onPlaceShip(placedShips)})
    )

    setIsStart(true);
  }

  return (
    <section className="controls">
      <button
        className={classNames(
          "controls__button",
          {"controls__button-disabled": isStart}
        )}
        type="button"
        onClick={onStart}
        disabled={isStart}
      > 
        Start
      </button>
      <button
        className={classNames(
          "controls__button",
          {"controls__button-disabled": isStart}
        )}
        type="button"
        onClick={onPlace}
        disabled={isStart}
      > 
        Place your ships
      </button>

      <button
        className="controls__button"
        type="button"
        onClick={onRestart}
      > 
        Reset
      </button>
    </section>
  );
};