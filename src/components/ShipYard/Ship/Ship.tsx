import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch } from '../../../Redux/hooks';
import { useAppSelector } from '../../../Redux/hooks';
import * as fieldActions from '../../../Redux/features/yourField';
import { ShipType } from '../../../types/ship';
import './Ship.scss';
import { ColumnType } from '../../../types/squarePoint';
import { Ship as ship } from '../../../classes/Ship';

type Props = {
  ship: ship;
};

export const Ship: React.FC<Props> = ({ ship }) => {
  const towers: number[] = [];
  const field = JSON.parse(JSON.stringify(localStorage.getItem('yourField')));

  for (let i = 0; i < ship.size; i++) {
    towers.push(i);
  };

  console.log(ship.x, ship.y);

  const onMove = () => {}


  return (
    <li
      className="ship"
      id={`${ship.name}-${ship.id}`}
      style={{
        position: 'absolute',
        left: `${ship.x}px`,
        top: `${ship.y}px`,
        transform: ship.direction === 'column' ? `rotate(90deg)` : '' 
      }}
    >
      <ul className="ship__list">
        {towers.map((tower) => (
          <li
            key={tower}
            className="ship__tower"
            style={{ width: `${36}px`, height: `${36}px` }}
          >
            <div className="ship__tower_indicator" />
          </li>
        ))}
      </ul>
    </li>
  );
};
