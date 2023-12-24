import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import yourFieldReducer from '../Redux/features/yourField';
import opponentReducer from '../Redux/features/opponentField';

export const store = configureStore({
  reducer: {
    yourField: yourFieldReducer,
    opponentField: opponentReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
