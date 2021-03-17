import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import {
  CamFirstFormSchemaValue,
  CamSecondFormSchemaValue,
} from '../../validator/cam/types';

export const camFormSlice = createSlice({
  name: 'camForm',
  initialState,
  reducers: {
    setFirstForm: (state, action: PayloadAction<CamFirstFormSchemaValue>) => {
      state.firstForm = action.payload as CamFirstFormSchemaValue;
    },
    clearFirstForm: state => {
      state.firstForm = initialState.firstForm as CamFirstFormSchemaValue;
    },
    setSecondForm: (state, action: PayloadAction<CamSecondFormSchemaValue>) => {
      state.secondForm = action.payload as CamSecondFormSchemaValue;
    },
    clearSecondForm: state => {
      state.secondForm = initialState.secondForm as CamSecondFormSchemaValue;
    },
  },
});

export const {
  setFirstForm,
  clearFirstForm,
  setSecondForm,
  clearSecondForm,
} = camFormSlice.actions;

export default camFormSlice.reducer;
