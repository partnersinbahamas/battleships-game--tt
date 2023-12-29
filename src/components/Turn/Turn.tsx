import classNames from 'classnames';
import './Turn.scss';

type Props = {
  isTurn: boolean,
}

export const Turn: React.FC<Props> = ({ isTurn }) => {
  return (
    <div
      className={classNames(
        "turn",
        {"turn--left": isTurn},
        {"turn--right": !isTurn},
      )}
    >
      <span className="turn__title">Turn</span>

      <i className="turn__arrow bx bxs-down-arrow"/>
    </div>
  );
};