import React, { useState, useRef, useEffect, ElementRef } from 'react';
import { ShipType } from '../../../types/ship';
import { isEachTowerInField, isUnderPoint, onPlaceShip } from '../../../helpers/functions';
import { useAppDispatch } from '../../../Redux/hooks';
import { useAppSelector } from '../../../Redux/hooks';
import * as yourFieldActions from '../../../Redux/features/yourField';
import classNames from 'classnames';
import './Ship.scss';
import { Coords } from '../../../types/squarePoint';

type Props = {
  ship: ShipType;
};

export const Ship: React.FC<Props> = ({ ship }) => {
  const [coords, setCoords] = useState<Coords>({ x: ship.x, y: ship.y });
  const offsetRef = useRef<Coords>({ x: 0, y: 0 });

  const shipRef = useRef<HTMLLIElement | null>(null);
  const yourfield = document.querySelector<Element>('.field__list-you');
  const rootRect = yourfield?.getBoundingClientRect()!;

  const towers: number[] = [];
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { yourBattlefield: field } = useAppSelector(state => state.yourField);

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

  const handleMouseUp = (event: any) => {
    setIsDragging(false);

    const copyShips = [...field.ships].map((shipItem) => {
      if (shipItem.id === ship.id) {
        let pointX: number | null = null;
        let pointY: number | null = null;

        let newX = 0;
        let newY = 0;

        if (!isUnderPoint({x: event.clientX , y: event.clientY}, yourfield!) || !isEachTowerInField(ship, yourfield!)) {
          newX = shipItem.defX;
          newY = shipItem.defY;

          pointX = null;
          pointY = null;
        } else {
          const { left, top } = shipRef.current?.getBoundingClientRect()!;

          const point = {
            x: left,
            y: top,
          };
  
          const cells = document.querySelectorAll('.sq');
          const cell: any = Array.from(cells).find((cell) => isUnderPoint(point, cell));

          if (cell) {
            const { x, y } = cell.dataset;
            const cellReact = cell.getBoundingClientRect();
            
            const isCoordsFree = field.squares.map((column) => {
              return column.find((sq) => sq.x === Number(x) && sq.y === Number(y));
            }).find((el) => el)?.free;

            pointX = isCoordsFree ? Number(x) : null;
            pointY = isCoordsFree ? Number(y) : null;

            newX = isCoordsFree ? cellReact.left - rootRect.left : shipItem.defX;
            newY = isCoordsFree ? cellReact.top - rootRect.top : shipItem.defY;  
          }
        }

        setCoords({x: newX, y: newY});

        shipItem = { ...shipItem,
          x: coords.x,
          y: coords.y,
          coordX: pointX,
          coordY: pointY,
          direction: ship.direction
        };
      }

      return shipItem;
    })


    dispatch(yourFieldActions.update({
      ...field,
      ships: copyShips,
      squares: onPlaceShip(copyShips),
    }));
  };

  const onWheel = (event: React.WheelEvent) => {
    if (isDragging) {
      const copyShips = [...field.ships].map((shipItem) => {
        if (shipItem.id === ship.id) {
          const direction = event.deltaY > 0 ? 'column' : 'row';    
          shipItem = {...shipItem, direction}; 
        }
  
        return shipItem;
      })

      dispatch(yourFieldActions.update({...field, ships: copyShips}));
    }
  }

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

  return (
    <li
      ref={shipRef}
      className={classNames(
        "ship",
        {"ship-smooth": !isDragging},
      )}
      style={{
        left: `${coords.x}px`,
        top: `${coords.y}px`,
      }}
      onMouseDown={(event) => handleMouseDown(event)}
      onMouseUp={handleMouseUp}
      onWheel={(event) => onWheel(event)}
    >
      <ul
        className="ship__list"
        style={{
          flexDirection: ship.direction === 'column' ? `column` : 'row',
        }}
      >
        {towers.map((tower) => (
          <li
            id={`ship-${ship.id}-tower-${tower}`}
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
