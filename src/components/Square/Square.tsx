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
    <div className="sq" data-x={square.x} data-y={square.y}>
      {!square.free && (
        <span>busy</span>
      )}
        <input
        onChange={() => {}}
        ref={ref}
        name={`${square.x}${square.y}`}
        className={classNames(
          "square",
          {"square-you": !isOpponent},
          {"square-opponent": isOpponent},
        )}
        type="checkbox"

      />
    </div>
  )
}