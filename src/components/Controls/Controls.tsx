import { useAppDispatch } from '../../Redux/hooks';
import { createField, onPlaceShip, randomShipPlace } from '../../helpers/functions';
import { BattlefieldType } from '../../types/battlefield';
import { ShipType } from '../../types/ship';
import { useAppSelector } from '../../Redux/hooks';
import * as opponentActions from '../../Redux/features/opponentField';
import * as yourActions from '../../Redux/features/yourField';
import './Controls.scss';

export const Controls = () => {
    const dispatch = useAppDispatch();
    const { opponentBattlefield } = useAppSelector(state => state.opponentField);
    const { yourBattlefield } = useAppSelector(state => state.yourField);

    const opponentfield = document.querySelector<Element>('[data-field="opponent"]');
    const yourfield = document.querySelector<Element>('[data-field="you"]');

    console.log(yourfield);

    function placeShipAuto(
      dispatchField: BattlefieldType, 
      actions: any,
      field: Element,
      isOpponent: boolean
    ) {
      let copyShips: ShipType[] = createField(10).ships;
  
      for (let i = 0; i < copyShips.length; i++) {
        const ship = copyShips[i];
  
        copyShips = [...copyShips].map((el) => {
          if (el.id === ship.id) {
            el = randomShipPlace(onPlaceShip(copyShips), ship, field!, isOpponent);
          }
  
          return el;
        })
  
        dispatch(
          actions.update({
            ...dispatchField,
            ships: copyShips,
            squares: onPlaceShip(copyShips)})
        )
      };
  
      return copyShips;
    }

  return (
    <section className="controls">
      <button type="button" onClick={() => placeShipAuto(opponentBattlefield, opponentActions, opponentfield!, true)}>
        Place opponent ships
      </button>

      <button type="button" onClick={() => placeShipAuto(yourBattlefield, yourActions, yourfield!, false)}> 
        Place your ships
      </button>
    </section>
  )
}