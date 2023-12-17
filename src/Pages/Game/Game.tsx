import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import * as yourFieldActions from '../../Redux/features/yourField';
import { Field } from './Field/Field';
import './Game.scss';

export const Game = () => {
  const size: number = 10;

  const dispatch = useAppDispatch();
  const { columns } = useAppSelector(state => state.yourField);

  useEffect(() => {
    dispatch(yourFieldActions.init(size));
  }, []);

  return (
    <section className="game">
      <Field columns={columns} size={size} />
      <Field columns={columns} size={size} isOpponent={true} />
    </section>
  )
}