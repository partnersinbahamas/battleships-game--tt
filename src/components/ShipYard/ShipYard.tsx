import { ShipType } from '../../types/ship';
import { YardTitle } from '../YardTitle/YardTitle';
import { Ship } from "./Ship/Ship";
import './ShipYard.scss';

type Props = {
  ships: ShipType[],
  isOpponent: boolean,
}

export const ShipYard: React.FC<Props> = ({ ships, isOpponent }) => {
  return (
    <section className="shipYard">
      <ul className="shipYard__list">
        {ships.map((ship: ShipType) => (
          <Ship  key={ship.id} ship={ship} isOpponent={isOpponent} />
        ))}
      </ul>
    </section>
  )
}