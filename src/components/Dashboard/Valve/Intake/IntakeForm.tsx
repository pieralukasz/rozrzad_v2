import React from 'react';
import {
  intakeFirstFormSchema,
  intakeSecondFormSchema,
} from '../../../../validator/valve/intake/schema';
import BaseFormControl from '../../../Base/BaseFormControl';
import { IntakeFormProps } from '../../types';
import { BaseFormControlType } from '../../../../validator/types';

const IntakeForm: React.FC<IntakeFormProps> = ({ register }) => {
  const formSchema: BaseFormControlType[] = [
    ...intakeFirstFormSchema,
    ...intakeSecondFormSchema,
  ];

  return (
    <>
      {formSchema.map((formControl, count) => {
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

export default IntakeForm;
