import './YardTitle.scss';

type Props = {
  title: string,
};

export const YardTitle: React.FC<Props> = ({title}) => {
  return (
    <h1 className="yardTitle">{title}</h1>
  )
}