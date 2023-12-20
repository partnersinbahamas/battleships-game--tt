import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ColumnType } from '../../types/squarePoint';
import { createField } from '../../helpers/functions';
import { Battlefield } from '../../classes/Battlefield';

type Field = {
  battlefield: Battlefield;
}

const initialState: Field = {
  battlefield: new Battlefield(),
};

export const yourFieldSlice = createSlice({
  name: 'yourFiled',
  initialState,
  reducers: {
    init: (state: Field, actions: PayloadAction<number>) => {
      if (!localStorage.getItem('yourField')) {
        state.battlefield = new Battlefield();
        state.battlefield.createField(10);
        state.battlefield.genereteShips();

        localStorage.setItem('yourField', JSON.stringify(state.battlefield))
      } else {
        state.battlefield = JSON.parse(localStorage.getItem('yourField')!);
      }
    },

    // unpdate: (state: Field, actions:PayloadAction<ColumnType[]>) => {
    //   state.battlefield = actions.payload;
    //   localStorage.setItem('yourField', JSON.stringify(actions.payload))
    // }
  }
});

export const { init } = yourFieldSlice.actions; 
export default yourFieldSlice.reducer;