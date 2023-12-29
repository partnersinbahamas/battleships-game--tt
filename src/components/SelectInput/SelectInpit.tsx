import { useState } from "react";
import { rowCoords } from "../../helpers/variables";
import './SelectInput.scss';

type Props = {
  coords: number[],
  onSelect: (coord: number) => void,
  isString?: boolean
}

export const SelectInput: React.FC<Props> = ({coords, onSelect, isString = true}) => {
  const [selectedCoord, setSelectedCoord] = useState<number>(isString ? 0 : coords[0] + 1);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const visibleCoords = coords.filter((coord: number) => !isString
    ? coord + 1 !== selectedCoord
    : coord !== selectedCoord
  )

  const onClickHandle = (coord: number) => {
    setIsOpen(false);
    setSelectedCoord(isString ? coord : coord + 1)
    onSelect(coord);
  }

  return (
    <div className="select">
      <p
        className="select__selected select__item"
        onClick={() => setIsOpen((current) => !current)}
      >
        { !isString ? selectedCoord : rowCoords[selectedCoord + 1] }
      </p>

      {isOpen && (
        <ul className="select__list">
          {visibleCoords.map((coord: any) => (
            <li
              key={coord}
              className="select__item" 
              onClick={() => onClickHandle(coord)}
            >
              {!isString ? coord + 1 : rowCoords[coord  + 1]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};