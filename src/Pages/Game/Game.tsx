import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import * as yourFieldActions from '../../Redux/features/yourField';
import * as opponentFieldActions from '../../Redux/features/opponentField';
import { Field } from './Field/Field';
import { onPlaceShip, randomShipPlace } from '../../helpers/functions';
import { BattlefieldType } from '../../types/battlefield';
import { ShipType } from '../../types/ship';
import { Controls } from '../../components/Controls/Controls';
import './Game.scss';

export const Game = () => {
  const size: number = 10;

  const dispatch = useAppDispatch();
  const { yourBattlefield } = useAppSelector(state => state.yourField);
  const { opponentBattlefield } = useAppSelector(state => state.opponentField);

  // const opponentfield = document.querySelector<Element>('[data-field="opponent"]');

  // function placeShipAuto(
  //   dispatchField: BattlefieldType, 
  //   actions: any,
  //   field: Element
  // ) {
  //   let copyShips: ShipType[] = [...dispatchField.ships];

  //   for (let i = 0; i < copyShips.length; i++) {
  //     const ship = copyShips[i];

  //     copyShips = [...copyShips].map((el) => {
  //       if (el.id === ship.id) {
  //         el = randomShipPlace(onPlaceShip(copyShips), ship, field!, true);
  //       }

  //       return el;
  //     })

  //     dispatch(
  //       actions.update({
  //         ...dispatchField,
  //         ships: copyShips,
  //         squares: onPlaceShip(copyShips)})
  //     )
  //   };

  //   return copyShips;
  // }
  
  useEffect(() => {
    dispatch(yourFieldActions.init(size));
    dispatch(opponentFieldActions.init(size));
  }, []);

  return (
    <section className="game">
      <Field
        battlefield={yourBattlefield}
        size={size}
      />

      {/* <button onClick={() => placeShipAuto(opponentBattlefield, opponentFieldActions, opponentfield!)}>+</button> */}

      <Controls />

      <Field
        battlefield={opponentBattlefield}
        size={size}
        isOpponent={true}
      />
    </section>
  )
}