import { SquarePoint } from "../../types/squarePoint";
import classNames from "classnames";
import './Square.scss';

type Props = {
  square: SquarePoint,
  isOpponent: boolean
}

export const Square: React.FC<Props> = ({ square, isOpponent }) => {
  return (
    <div className="sq" data-x={square.x} data-y={square.y}>
      {!square.free && !square.ship && (
        <span>busy</span>
      )}

      {square.ship && (
        <span>ship</span>
      )}
        <input
        onChange={() => {}}
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