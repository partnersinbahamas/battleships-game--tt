import { ShipType } from "../../types/ship";
import { allowedShips } from "../../helpers/variables";
import { useState } from "react";
import './ShipYard.scss';
import { Ship as ship } from "../../classes/Ship";
import { Ship } from "./Ship/Ship";

type Props = {
  ships: ship[],
}

export const ShipYard: React.FC<Props> = ({ships}) => {
//   const [ships, setShips] = useState<ShipType[]>(allowedShips);

  return (
    <section className="shipYard">
      <ul className="shipYard__list">
        {ships.map((ship: ship) => (
          <Ship  ship={ship} />
        ))}
      </ul>
    </section>
  )
}