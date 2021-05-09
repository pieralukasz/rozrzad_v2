import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  SpringFirstFormSchemaValue,
  SpringSecondFormSchemaValue,
} from '../../validator/spring/types';
import { initialState } from './initialState';

export const springFormSlice = createSlice({
  name: 'valveIntakeForm',
  initialState,
  reducers: {
    setFirstForm: (
      state,
      action: PayloadAction<SpringFirstFormSchemaValue>
    ) => {
      state.firstForm = action.payload as SpringFirstFormSchemaValue;
    },
    clearFirstForm: state => {
      state.firstForm = initialState.firstForm as SpringFirstFormSchemaValue;
    },
    setSecondForm: (
      state,
      action: PayloadAction<SpringSecondFormSchemaValue>
    ) => {
      state.secondForm = action.payload as SpringSecondFormSchemaValue;
    },
    clearSecondForm: state => {
      state.secondForm = initialState.secondForm as SpringSecondFormSchemaValue;
    },
    // setThirdForm: (state, action: PayloadAction<ValveThirdFormSchemaValue>) => {
    //   state.thirdForm = action.payload as ValveThirdFormSchemaValue;
    // },
    // clearThirdForm: state => {
    //   state.thirdForm = initialState.thirdForm as ValveThirdFormSchemaValue;
    // },
  },
});

export const {
  setFirstForm,
  setSecondForm,
  clearFirstForm,
  clearSecondForm,
  // setThirdForm,
  // clearThirdForm,
} = springFormSlice.actions;

export default springFormSlice.reducer;
