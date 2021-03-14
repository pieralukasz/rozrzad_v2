import { configureStore } from '@reduxjs/toolkit';
import valveIntakeFormSlice from '../slices/valveForm/valveFormSlice';

const store = configureStore({
  reducer: {
    valveIntakeForm: valveIntakeFormSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
