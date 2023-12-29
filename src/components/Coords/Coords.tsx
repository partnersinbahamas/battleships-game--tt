import classNames from 'classnames';
import './Coords.scss';

type Props = {
  coords: string[] | number[],
};

export const Coords: React.FC<Props> = ({ coords }) => {
  return (
    <ul
      className={classNames(
        'coords',
        {'coords--vertical': typeof coords[0] === 'number'}
      )}
    >
      {coords.map((coord) => (
        <li
          key={coord}
          className="coords__item"
        >
          {typeof coord === 'number' ? coord + 1: coord}
        </li>
      ))}
    </ul>
  );
};