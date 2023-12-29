import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import * as yourFieldActions from '../../Redux/features/yourField';
import * as opponentFieldActions from '../../Redux/features/opponentField';
import { Field } from './Field/Field';
import { Controls } from '../../components/Controls/Controls';
import { Turn } from '../../components/Turn/Turn';
import { Modal } from '../../components/Modal/Modal';
import { Won } from '../../components/Won/Won';
import { Lose } from '../../components/Lose/Lose';
import './Game.scss';

export const Game = () => {
  const [isTurn, setIsTurn] = useState<boolean>(true);
  const [isStart, setIsStart] = useState<boolean>(false);

  const [isModal, setIsModal] = useState<boolean>(false);

  const [isOpponentWon, setIsOpponentWon] = useState<boolean>(false);
  const [isYouWon, setIsYouWon] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { yourBattlefield } = useAppSelector(state => state.yourField);
  const { opponentBattlefield } = useAppSelector(state => state.opponentField);
 
  useEffect(() => {
    dispatch(yourFieldActions.init(10));
    dispatch(opponentFieldActions.init(10));
  }, []);

  useEffect(() => {
    if (isStart) {
      const isYouLose = yourBattlefield.ships.every((ship) => ship.destroyed);
      const isOpponentLose = opponentBattlefield.ships.every((ship) => ship.destroyed);

      setIsOpponentWon(isYouLose);
      setIsYouWon(isOpponentLose);

      if (isOpponentWon || isYouWon) {
        setIsModal(true);
      }
    }
  }, [yourBattlefield, opponentBattlefield])

  useEffect(() => {
    if (!isStart) {
      setIsOpponentWon(false);
      setIsYouWon(false);
    }
  }, [isStart])

  return (
    <section className="game">
      {isYouWon && isModal && (
        <Modal setModal={setIsModal}>
          <Won/>
        </Modal>
      )}

      {isOpponentWon && isModal &&  (
        <Modal setModal={setIsModal}>
          <Lose />
        </Modal>
      )}

      <Turn isTurn={isTurn}/>

      <div className="game__container">
        <Field
          battlefield={yourBattlefield}
          isTurn={isTurn}
          setIsTurn={setIsTurn}
          isStart={isStart}
        />

        <Controls setIsStart={setIsStart} isStart={isStart} />

        <Field
          battlefield={opponentBattlefield}
          isOpponent={true}
          isTurn={isTurn}
          setIsTurn={setIsTurn}
          isStart={isStart}
        />
      </div>
    </section>
  );
};