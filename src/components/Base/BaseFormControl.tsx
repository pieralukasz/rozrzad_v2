import React from 'react';
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from '@material-ui/core';
import { BaseFormControlType } from '../../validator/types';
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
      />
      <FormHelperText>{formHelperText}</FormHelperText>
    </FormControlView>
  );
};

const FormControlView = styled(FormControl)`
  margin-top: 0.5rem;
  min-width: 340px !important;

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
    color: white;
  }
`;

export default BaseFormControl;
