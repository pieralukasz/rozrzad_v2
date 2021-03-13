import React from 'react';
import { intakeSecondFormSchema } from '../../../../validator/valve/intake/schema';
import BaseFormControl from '../../../Base/BaseFormControl';
import { IntakeFormProps } from '../../types';

const IntakeSecondForm: React.FC<IntakeFormProps> = ({ register }) => {
  return (
    <>
      {intakeSecondFormSchema.map((formControl, count) => {
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

export default IntakeSecondForm;
