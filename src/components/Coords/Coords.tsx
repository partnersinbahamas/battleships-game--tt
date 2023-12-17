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
        <div key={coord} className="coords__item">{coord}</div>
      ))}
    </ul>
  )
}