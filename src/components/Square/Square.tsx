import { SquarePoint } from "../../types/squarePoint";
import classNames from "classnames";
import './Square.scss';
import { useEffect, useRef } from "react";
import { Ship } from "../ShipYard/Ship/Ship";

type Props = {
  square: SquarePoint,
  isOpponent: boolean
}

export const Square: React.FC<Props> = ({ square, isOpponent }) => {
  const ref = useRef(null);

  return (
    <>
      {square.placed ? (
        <div>placed</div>
      ) : (
        <input
        ref={ref}
        name={`${square.x}${square.y}`}
        className={classNames(
          "square",
          {"square-you": !isOpponent},
          {"square-opponent": isOpponent},
        )}
        type="checkbox"
      />
      )}
    </>

  )
}