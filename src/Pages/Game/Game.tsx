import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import * as yourFieldActions from '../../Redux/features/yourField';
import * as opponentFieldActions from '../../Redux/features/opponentField';
import { Field } from './Field/Field';
import './Game.scss';

export const Game = () => {
  const size: number = 10;

  const dispatch = useAppDispatch();
  const { yourBattlefield } = useAppSelector(state => state.yourField);
  const { opponentBattlefield } = useAppSelector(state => state.opponentField);

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

      <Field
        battlefield={opponentBattlefield}
        size={size}
        isOpponent={true}
      />
    </section>
  )
}