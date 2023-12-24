import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { createField } from '../../helpers/functions';
import { BattlefieldType } from '../../types/battlefield';

type Field = {
  yourBattlefield: BattlefieldType;
}

const initialState: Field = {
  yourBattlefield: {
    ships: [],
    shots: [],
    squares: [],
  },
};

export const yourFieldSlice = createSlice({
  name: 'yourFiled',
  initialState,
  reducers: {
    init: (state: Field, actions: PayloadAction<number>) => {
      if (!localStorage.getItem('yourField')) {
        const battlefield = createField(actions.payload);
        state.yourBattlefield = battlefield;
        localStorage.setItem('yourField', JSON.stringify(battlefield))
      } else {
        state.yourBattlefield = JSON.parse(localStorage.getItem('yourField')!);
      }
    },

    update: (state: Field, actions:PayloadAction<BattlefieldType>) => {
      state.yourBattlefield = actions.payload;
      localStorage.setItem('yourField', JSON.stringify(actions.payload))
    }
  },
});

export const { init, update } = yourFieldSlice.actions; 
export default yourFieldSlice.reducer;