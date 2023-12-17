import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ColumnType } from '../../types/squarePoint';
import { createField } from '../../helpers/functions';

type Field = {
  columns: ColumnType[];
}

const initialState: Field = {
  columns: [],
};

export const yourFieldSlice = createSlice({
  name: 'yourFiled',
  initialState,
  reducers: {
    init: (state: Field, actions: PayloadAction<number>) => {
      if (!localStorage.getItem('yourField')) {
        state.columns = createField(actions.payload);
        localStorage.setItem('yourField', JSON.stringify(state.columns))
      } else {
        state.columns = JSON.parse(localStorage.getItem('yourField')!);
      }
    },
  }
});

export const { init } = yourFieldSlice.actions; 
export default yourFieldSlice.reducer;