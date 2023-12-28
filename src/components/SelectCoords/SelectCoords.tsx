import { useParams, useSearchParams } from "react-router-dom";
import { columnCoords, rowCoords } from "../../helpers/variables";
import { SelectInput } from "../SelectInput/SelectInpit";
import { updateSeachParams } from "../../hooks/UpdateSearchParams";
import './SelectCoords.scss';

export const SelectCoords = () => {
  const rowCoordsArray = Object.values(rowCoords);
  const columnCoordsArray = Object.values(columnCoords);
  const [searchParams, setSearchParams] = useSearchParams();

  const onCoordXSelect = (coord: number) => {
    setSearchParams((updateSeachParams(searchParams, {x: String(coord)})));
  }

  const onCoordYSelect = (coord: number) => {
    setSearchParams((updateSeachParams(searchParams, {y: String(coord)})));
  }


  return (
    <div className="selectCoords">
      <div className="selectCoords__shell">
      <div className="selectCoords__shell">
        <span>x: </span>
        <SelectInput coords={columnCoordsArray} onSelect={onCoordXSelect} isString={false}/>
      </div>

        <span>y: </span>
        <SelectInput coords={columnCoordsArray} onSelect={onCoordYSelect}/>
      </div>
    </div>
  )
}