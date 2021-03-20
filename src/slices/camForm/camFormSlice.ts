import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import {
  CamFifthFormSchemaValue,
  CamFirstFormSchemaValue,
  CamFourthFormSchemaValue,
  CamSecondFormSchemaValue,
  CamSixthFormSchemaValue,
  CamThirdFormSchemaValue,
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
    setThirdForm: (state, action: PayloadAction<CamThirdFormSchemaValue>) => {
      state.thirdForm = action.payload as CamThirdFormSchemaValue;
    },
    clearThirdForm: state => {
      state.thirdForm = initialState.thirdForm as CamThirdFormSchemaValue;
    },
    setFourthForm: (state, action: PayloadAction<CamFourthFormSchemaValue>) => {
      state.fourthForm = action.payload as CamFourthFormSchemaValue;
    },
    clearFourthForm: state => {
      state.fourthForm = initialState.fourthForm as CamFourthFormSchemaValue;
    },
    setFifthForm: (state, action: PayloadAction<CamFifthFormSchemaValue>) => {
      state.fifthForm = action.payload as CamFifthFormSchemaValue;
    },
    clearFifthForm: state => {
      state.fifthForm = initialState.fifthForm as CamFifthFormSchemaValue;
    },
    setSixthForm: (state, action: PayloadAction<CamSixthFormSchemaValue>) => {
      state.sixForm = action.payload as CamSixthFormSchemaValue;
    },
    clearSixthForm: state => {
      state.sixForm = initialState.sixForm as CamSixthFormSchemaValue;
    },
  },
});

export const {
  setFirstForm,
  clearFirstForm,
  setSecondForm,
  clearSecondForm,
  setThirdForm,
  clearThirdForm,
  setFourthForm,
  clearFourthForm,
  setFifthForm,
  clearFifthForm,
  setSixthForm,
  clearSixthForm,
} = camFormSlice.actions;

export default camFormSlice.reducer;
