import React from 'react';
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from '@material-ui/core';
import { BaseFormControlType } from '../../../validator/types';
import styled from 'styled-components';

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
}) => {
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
        autoFocus={count !== undefined ? count === 0 : false}
        inputRef={reference}
        inputProps={{
          min: 0,
        }}
        key={`${name}-${count}`}
        defaultValue={value !== undefined ? value : undefined}
        disabled={disabled !== undefined ? disabled : false}
      />
      <FormHelperText>{formHelperText}</FormHelperText>
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

export default BaseFormControl;
