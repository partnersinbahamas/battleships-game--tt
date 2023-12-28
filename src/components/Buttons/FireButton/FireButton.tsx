import { useState } from 'react';
import './FireButton.scss';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Coords } from '../../../types/squarePoint';
import { useAppDispatch } from '../../../Redux/hooks';
import * as opponentActions from '../../../Redux/features/opponentField';
import { BattlefieldType } from '../../../types/battlefield';
import { useAppSelector } from '../../../Redux/hooks';

type Props = {
    onShot: (point: Coords, battlefield: BattlefieldType) => BattlefieldType,
}

export const FireButton: React.FC<Props> = ({onShot}) => {
  const dispatch = useAppDispatch();
  const { opponentBattlefield } = useAppSelector(state => state.opponentField);
  const [click, setClick] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const x = searchParams.get('x') || 0;
  const y = searchParams.get('y') || 0;

  const onClick = () => {
    setClick(false);

    const shotPoint: Coords = {
      x: +x,
      y: +y,
    }

    const newField: BattlefieldType = onShot(shotPoint, opponentBattlefield);

    dispatch(opponentActions.update(newField))
  }
  
  
  return (
    <div className="fireButton" onMouseDown={() => setClick(true)} onMouseUp={() => onClick()}>
      <button className="fireButton__button" type="button"/>
      <div className={classNames(
        "fireButton__fire",
        { "fireButton__fire-active": click },
      )} />
    </div>
  )
}