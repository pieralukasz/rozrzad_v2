import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    clearFirstForm: state => {
      state.firstForm = initialState.firstForm;
    },
    setSecondForm: (
      state,
      action: PayloadAction<IntakeSecondFormSchemaValue>
    ) => {
      state.secondForm = action.payload;
    },
    clearSecondForm: state => {
      state.secondForm = initialState.secondForm;
    },
  },
});

export const {
  setFirstForm,
  setSecondForm,
  clearFirstForm,
  clearSecondForm,
} = valveIntakeFormSlice.actions;

export default valveIntakeFormSlice.reducer;
