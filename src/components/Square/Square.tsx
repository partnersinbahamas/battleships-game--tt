import { SquarePoint } from "../../types/squarePoint";
import classNames from "classnames";
import React from "react";
import './Square.scss';

type Props = {
  square: SquarePoint;
  isOpponent: boolean;
};

export const Square: React.FC<Props> = ({ square, isOpponent }) => {

  return (
    <div
      data-square={isOpponent ? 'opponent' : 'you'}
      className={classNames(
        "square",
        {"square-you": !isOpponent},
        {"square-you_busy": !square.free && !isOpponent},
        {"square-opponent": isOpponent},
        {"square-opponent_busy": isOpponent && !square.free},
      )}
      data-x={square.x}
      data-y={square.y}
    />
  )
};