import React, { useState, useRef, useEffect } from 'react';
import { ShipType } from '../../../types/ship';
import { isCoordFree, isUnderPoint, onPlaceShip } from '../../../helpers/functions';
import { useAppDispatch } from '../../../Redux/hooks';
import { useAppSelector } from '../../../Redux/hooks';
import * as yourFieldActions from '../../../Redux/features/yourField';
import classNames from 'classnames';
import { Coords } from '../../../types/squarePoint';
import './Ship.scss';

type Props = {
  ship: ShipType,
  isOpponent: boolean,
};

export const Ship: React.FC<Props> = ({ ship, isOpponent }) => {
  const [coords, setCoords] = useState<Coords>({ x: ship.x, y: ship.y });
  const offsetRef = useRef<Coords>({ x: 0, y: 0 });

  const shipRef = useRef<HTMLLIElement | null>(null);
  const yourfield = document.querySelector<Element>('[data-field="you"]');
  const rootRect: DOMRect = yourfield?.getBoundingClientRect()!;
  const squareEl = document.querySelector('.square');
  const squareRect = squareEl?.getBoundingClientRect();
  // console.log(squareEl);

  const towers: number[] = [];
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { yourBattlefield: field } = useAppSelector(state => state.yourField);

  for (let i = 0; i < ship.size; i++) {
    towers.push(i + 1);
  }

  const handleMouseDown = (e: React.MouseEvent): void => {
    setIsDragging(true);
    
    offsetRef.current = {
      x: e.clientX - coords.x!,
      y: e.clientY - coords.y!,
    };
  };

  const handleMouseMove = (e: MouseEvent): void => {
    if (isDragging) {
      let x = e.clientX - offsetRef.current.x!;
      let y = e.clientY - offsetRef.current.y!;
      setCoords({ x, y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    const copyShips = [...field.ships].map((shipItem) => {
      if (shipItem.id === ship.id) {
        let pointX: number | null = null;
        let pointY: number | null = null;

        let newX: number = shipItem.defX;
        let newY: number = shipItem.defY;

        const { left, top } = shipRef.current?.getBoundingClientRect()!;

        const point: Coords = {
          x: left,
          y: top,
        };
  
        const cells = document.querySelectorAll('.square');
        const cell: any = Array.from(cells).find((cell) => isUnderPoint(point, cell));

        if (cell) {
          const { x, y } = cell.dataset;
          const cellReact = cell.getBoundingClientRect();

          const isFree = isCoordFree(field.squares, shipItem, Number(x), Number(y));

          pointX = isFree ? Number(x) : null;
          pointY = isFree ? Number(y) : null;
          
          newX = isFree ? cellReact.left - rootRect.left : shipItem.defX;
          newY = isFree ? cellReact.top - rootRect.top : shipItem.defY;
        }

        setCoords({x: newX, y: newY});

        shipItem = { ...shipItem,
          x: newX,
          y: newY,
          coordX: pointX,
          coordY: pointY,
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
    if (coords.x === ship.defX) {
      const copyShips = [...field.ships].map((shipItem) => {
        if (shipItem.id === ship.id) { 
          shipItem = {...shipItem, direction: 'row'}; 
        }
  
        return shipItem;
      })

      dispatch(yourFieldActions.update({...field, ships: copyShips}));
    }
  }, [coords])

  useEffect(() => {
    setCoords({ x: ship.x, y: ship.y })
  }, [ship.coordX, ship.coordY])

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
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onWheel={onWheel}
    >
      <ul
        className="ship__list"
        style={{
          flexDirection: ship.direction,
        }}
      >
        {towers.map((tower) => (
          <li
            id={`ship-${ship.id}-tower-${tower}-${isOpponent ? 'opponent' : 'you'}`}
            key={tower}
            className={`ship__tower ship_tower-${ship.id}`}
            style={{ width: `${squareRect?.width}px`, height: `${squareRect?.width}px` }}
          >
            <div className="ship__tower_indicator"/>
          </li>
        ))}
      </ul>
    </li>
  );
};
