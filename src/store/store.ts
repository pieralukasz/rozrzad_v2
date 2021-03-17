import { configureStore } from '@reduxjs/toolkit';
import valveIntakeFormSlice from '../slices/valveForm/valveFormSlice';
import camFormSlice from '../slices/camForm/camFormSlice';

const store = configureStore({
  reducer: {
    valveIntakeForm: valveIntakeFormSlice,
    camForm: camFormSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
