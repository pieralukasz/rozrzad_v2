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
      state.firstForm = action.payload as IntakeFirstFormSchemaValue;
    },
    clearFirstForm: state => {
      state.firstForm = initialState.firstForm as IntakeFirstFormSchemaValue;
    },
    setSecondForm: (
      state,
      action: PayloadAction<IntakeSecondFormSchemaValue>
    ) => {
      state.secondForm = action.payload as IntakeSecondFormSchemaValue;
    },
    clearSecondForm: state => {
      state.secondForm = initialState.secondForm as IntakeSecondFormSchemaValue;
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
