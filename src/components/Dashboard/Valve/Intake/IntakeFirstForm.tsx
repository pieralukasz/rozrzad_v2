import React from 'react';
import { intakeFirstFormSchema } from '../../../../validator/valve/intake/schema';
import BaseFormControl from '../../../Base/BaseFormControl';
import { IntakeFormProps } from '../../types';

const IntakeFirstForm: React.FC<IntakeFormProps> = ({ register }) => {
  return (
    <>
      {intakeFirstFormSchema.map((formControl, count) => {
        return (
          <BaseFormControl
            key={count}
            count={count}
            reference={register({
              required:
                formControl.required !== undefined
                  ? formControl.required
                  : false,
              min: 0,
            })}
            {...formControl}
          />
        );
      })}
    </>
  );
};

export default IntakeFirstForm;
