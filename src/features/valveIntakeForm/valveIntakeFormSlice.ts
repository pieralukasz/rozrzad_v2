import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import {
  IntakeFirstFormSchemaValue,
  IntakeSecondFormSchemaValue,
} from '../../validator/valve/intake/types';
import { initialState } from './initialState';

export const valveIntakeFormSlice = createSlice({
  name: 'valveIntakeForm',
  initialState,
  reducers: {
    setFirstForm: (
      state,
      action: PayloadAction<IntakeFirstFormSchemaValue>
    ) => {
      state.firstForm = action.payload;
    },
    setSecondForm: (
      state,
      action: PayloadAction<IntakeSecondFormSchemaValue>
    ) => {
      state.secondForm = action.payload;
    },
  },
});

export const { setFirstForm, setSecondForm } = valveIntakeFormSlice.actions;

export const selectFirstForm = (state: RootState) =>
  state.valveIntakeForm.firstForm;
export const selectSecondForm = (state: RootState) =>
  state.valveIntakeForm.secondForm;

export default valveIntakeFormSlice.reducer;
