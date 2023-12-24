import React, { useState, useRef, useEffect } from 'react';
import { ShipType } from '../../../types/ship';
import { inField, isShipPlaced, isUnderPoint } from '../../../helpers/functions';
import { useAppDispatch } from '../../../Redux/hooks';
import * as yourFieldActions from '../../../Redux/features/yourField';
import { BattlefieldType } from '../../../types/battlefield';
import classNames from 'classnames';
import './Ship.scss';
import { ColumnType, SquarePoint } from '../../../types/squarePoint';
import { off } from 'process';
import { Node } from 'typescript';


type Coords = {
  x:  number,
  y: number,
}

type Props = {
  ship: ShipType;
};

export const Ship: React.FC<Props> = ({ ship }) => {
  const towers: number[] = [];
  const [field, setField] = useState<BattlefieldType>(JSON.parse(localStorage.getItem('yourField')!));
  const [coords, setCoords] = useState<Coords>({ x: ship.x, y: ship.y });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const offsetRef = useRef<Coords>({ x: 0, y: 0 });
  const shipRef = useRef<any>(null);

  const dispatch = useAppDispatch();

  for (let i = 0; i < ship.size; i++) {
    towers.push(i);
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    offsetRef.current = {
      x: e.clientX - coords.x!,
      y: e.clientY - coords.y!,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      let x = e.clientX - offsetRef.current.x!;
      let y = e.clientY - offsetRef.current.y!;

      setCoords({ x, y });
    }
  };

  const onPlaceShip = (ships: ShipType[], squares: ColumnType[]) => {
    const copy = squares.map(column => [...column]);
  
    for (let ship of ships) {
      if (isShipPlaced(ship)) {
        const { coordX, coordY } = ship;
        const x = Number(coordX);
        const y = Number(coordY);
        const dx: number = ship.direction === 'row' ? 0 : 1;
        const dy: number = ship.direction === 'column' ? 0 : 1;

        for (let i = 0; i < ship.size; i++) {
          const cx = x! + dx * i;
          const cy = y! + dy * i;
          copy[cx][cy] = { ...copy[cx][cy], ship };
        }

        for (let j = y - 1; j < y + ship.size * dx + dy + 1; j++) {
          for (let k = x- 1; k < x + ship.size * dy + dx + 1; k++) {
            if (inField(j, k)) {
              copy[j][k] = {...copy[j][k], free: false};
            }
          }
        }
      }
    }
  
    return copy;
  };
  
  

  const handleMouseUp = (event: any) => {
    setIsDragging(false);

    let x: number = 0;
    let y: number = 0;


    const copyShips = [...field.ships].map((shipItem) => {
      if (shipItem.id === ship.id) {
        const yourfield = document.querySelector('.field__list-you');

        if (!isUnderPoint({x: event.clientX , y: event.clientY}, yourfield!)) {
          setCoords({ x: shipItem.defX, y: shipItem.defY });
          shipItem = { ...shipItem, x: shipItem.defX, y: shipItem.defY };
        } else {

          const {left, top} = shipRef.current?.getBoundingClientRect();

          const point = {
            x: left,
            y: top,
          };
  
          const cells = document.querySelectorAll('.sq');
          const cell: any = Array.from(cells).find((cell) => isUnderPoint(point, cell));

          if (cell) {
            const { x, y } = cell.dataset;

            const cellReact = cell.getBoundingClientRect();
            const rootRect = yourfield?.getBoundingClientRect()!;

            setCoords({
              x: cellReact.left - rootRect.left,
              y: cellReact.top - rootRect.top
            });
          }
        }

        shipItem = { ...shipItem,
          x: coords.x,
          y: coords.y,
          coordX: x,
          coordY: y,
        };
      }

      return shipItem;
    })


    setField((current) => ({...current, ships: copyShips, squares: onPlaceShip(field.ships, field.squares) }));
  };


  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const onWheel = (event: React.WheelEvent) => {
    if (isDragging) {
      const copyShips = [...field.ships].map((shipItem) => {
        if (shipItem.id === ship.id) {
          const direction = event.deltaY > 0 ? 'column' : 'row';
          shipItem = { ...shipItem, direction }
        }
  
        return shipItem;
      })

      setField((current) => ({...current, ships: copyShips }));
    }
  }

  useEffect(() => {
    dispatch(yourFieldActions.update(field));

    // console.log(isShipPlaced(ship), ship)

  }, [field])



  return (
    <li
      ref={shipRef}
      className={classNames(
        "ship",
        {"ship-smooth": ship.x === ship.defX && !isDragging},
      )}
      style={{
        left: `${coords.x}px`,
        top: `${coords.y}px`,
        transform: ship.direction === 'column' ? `rotate(90deg)` : '',
      }}
      onMouseDown={(event) => handleMouseDown(event)}
      onMouseUp={handleMouseUp}
      onWheel={(event) => onWheel(event)}
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
