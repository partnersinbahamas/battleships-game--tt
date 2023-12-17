import { SquarePoint } from "../../types/squarePoint";
import classNames from "classnames";
import './Square.scss';

type Props = {
  square: SquarePoint,
  isOpponent: boolean
}

export const Square: React.FC<Props> = ({ square, isOpponent }) => {
  return (
    <input
      name={`${square.x}${square.y}`}
      className={classNames(
        "square",
        {"square-you": !isOpponent},
        {"square-opponent": isOpponent},
      )}
      type="checkbox"
    />
  )
}