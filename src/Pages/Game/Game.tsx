import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import * as yourFieldActions from '../../Redux/features/yourField';
import { Field } from './Field/Field';
import './Game.scss';
import { Battlefield } from '../../classes/Battlefield';

export const Game = () => {
  const size: number = 10;

  const dispatch = useAppDispatch();
  const { battlefield } = useAppSelector(state => state.yourField);

  useEffect(() => {
    dispatch(yourFieldActions.init(size));
  }, []);

  return (
    <section className="game">
      <Field columns={battlefield.field} size={size} battlefield={battlefield} />
      <Field columns={battlefield.field} size={size} isOpponent={true} battlefield={battlefield} />
    </section>
  )
}