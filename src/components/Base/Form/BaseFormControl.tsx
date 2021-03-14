import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from '@material-ui/core';
import { BaseFormControlType } from '../../../validator/types';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { ValveSecondFormSchemaValue } from '../../../validator/valve/types';
import { setSecondForm } from '../../../slices/valveForm/valveFormSlice';

interface BaseFormControlProps extends BaseFormControlType {
  count: number;
  reference: any;
}

const BaseFormControl: React.FC<BaseFormControlProps> = ({
  inputLabel,
  count,
  formHelperText,
  reference,
  name,
  value,
  disabled,
  additionalHelperItem,
  autoFocus,
}) => {
  const valveIntakeForm = useAppSelector(state => state.valveIntakeForm);
  const dispatch = useAppDispatch();

  const passValue = (value: string) => {
    const valveSecondForm = JSON.parse(
      JSON.stringify(valveIntakeForm.secondForm)
    ) as ValveSecondFormSchemaValue;

    // @ts-ignore
    valveSecondForm[name] = value;

    dispatch(setSecondForm(valveSecondForm));
  };

  const setInputValue = (e: any) => {
    passValue(e.target.value);
  };

  return (
    <FormControlView>
      <InputLabel htmlFor={inputLabel}>
        {count !== undefined ? `${count + 1}` : ''}. {inputLabel}
      </InputLabel>
      <Input
        color="primary"
        id={inputLabel}
        name={name}
        type="number"
        autoFocus={autoFocus !== undefined ? autoFocus : count === 0}
        inputRef={reference}
        inputProps={{
          min: 0,
        }}
        key={`${name}-${count}`}
        defaultValue={value !== undefined ? value : undefined}
        disabled={disabled !== undefined ? disabled : false}
        onChange={setInputValue}
      />
      <FormHelperText>{formHelperText}</FormHelperText>
      {additionalHelperItem !== undefined ? (
        <>
          <AdditionalFormHelperText>
            {additionalHelperItem}
          </AdditionalFormHelperText>
        </>
      ) : (
        ''
      )}
    </FormControlView>
  );
};

const FormControlView = styled(FormControl)`
  min-width: 340px !important;
  margin: 0.25rem !important;

  .MuiOutlinedInput-notchedOutline {
    border-color: white;
  }
  .MuiFormLabel-root {
    color: white;
    font-weight: bold;
  }
  .MuiFormHelperText-root {
    color: white;
  }
  .MuiInputBase-input {
    color: #ddfc74; // Mindaro
    font-weight: bold;
  }
`;

const AdditionalFormHelperText = styled(FormHelperText)`
  color: #1e3af3 !important;
  font-weight: bold !important;
`;

const AdditionalButton = styled(Button)`
  color: #1e3af3 !important;
`;

export default BaseFormControl;
