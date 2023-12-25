import { ShipType } from '../../types/ship';
import { Ship } from "./Ship/Ship";
import './ShipYard.scss';

type Props = {
  ships: ShipType[],
}

export const ShipYard: React.FC<Props> = ({ships}) => {
  return (
    <section className="shipYard">
      <ul className="shipYard__list">
        {ships.map((ship: ShipType) => (
          <Ship  key={ship.id} ship={ship} />
        ))}
      </ul>
    </section>
  )
}