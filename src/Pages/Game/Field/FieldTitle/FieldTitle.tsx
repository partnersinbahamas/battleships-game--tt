import React from "react";
import classNames from "classnames";
import './FieldTitle.scss';

type Props = {
  title: string,
  isOpponent: boolean,
}

export const FieldTitle: React.FC<Props> = ({ title, isOpponent }) => {
  return (
    <h1
      className={classNames(
        "fieldTitle",
        { "fieldTitle-opponent": isOpponent },
        { "fieldTitle-you": !isOpponent },
      )}
    >
      {title}
    </h1>
  )
}