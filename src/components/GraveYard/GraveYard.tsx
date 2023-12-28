import classNames from "classnames";
import { ShipType } from "../../types/ship";
import { YardTitle } from "../YardTitle/YardTitle";
import './GraveYard.scss';

type Props = {
  ships: ShipType[],
}

export const GraveYard: React.FC<Props> = ({ships}) => {
  return (
    <section className="graveYard">
      <div className="graveYard__container">

        <YardTitle title="GRAVEYARD" />

        <ul className="graveYard__list">
          {ships.map((ship) => (
            <li key={ship.id} className={classNames(
              "graveYard__item",
              {"graveYard__item-destroyed" : ship.destroyed}
            )}>
              {`${ship.name} (${ship.size})`}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}