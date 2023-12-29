import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Coords } from '../../../types/squarePoint';
import * as opponentActions from '../../../Redux/features/opponentField';
import { BattlefieldType } from '../../../types/battlefield';
import { useAppSelector } from '../../../Redux/hooks';
import classNames from 'classnames';
import './FireButton.scss';


type Props = {
  onShot: (point: Coords, battlefield: BattlefieldType, actions: any) => void,
}

export const FireButton: React.FC<Props> = ({ onShot }) => {
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

    onShot(shotPoint, opponentBattlefield, opponentActions);
  }
  
  return (
    <div
      className="fireButton"
      onMouseDown={() => setClick(true)}
      onMouseUp={() => onClick()}
    >
      <button className="fireButton__button" type="button"/>
      <div
        className={classNames(
          "fireButton__fire",
          { "fireButton__fire-active": click },
        )}
      >
        <div
          className={classNames(
            "fireButton__shot",
            { "fireButton__shot--scale": click}
          )}
        />
      </div>
    </div>
  );
};