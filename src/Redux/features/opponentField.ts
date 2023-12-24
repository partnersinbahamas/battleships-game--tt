import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { createField } from '../../helpers/functions';
import { BattlefieldType } from '../../types/battlefield';

type Field = {
  opponentBattlefield: BattlefieldType;
}

const initialState: Field = {
    opponentBattlefield: {
    ships: [],
    shots: [],
    squares: [],
  },
};

export const opponentFieldSlice = createSlice({
  name: 'opponentsField',
  initialState,
  reducers: {
    init: (state: Field, actions: PayloadAction<number>) => {
      if (!localStorage.getItem('opponentsField')) {
        const battlefield = createField(actions.payload);
        state.opponentBattlefield = battlefield;
        localStorage.setItem('opponentsField', JSON.stringify(battlefield))
      } else {
        state.opponentBattlefield = JSON.parse(localStorage.getItem('opponentsField')!);
      }
    },

    update: (state: Field, actions:PayloadAction<BattlefieldType>) => {
      state.opponentBattlefield = actions.payload;
      localStorage.setItem('opponentsField', JSON.stringify(actions.payload))
    }
  },
});

export const { init, update } = opponentFieldSlice.actions; 
export default opponentFieldSlice.reducer;