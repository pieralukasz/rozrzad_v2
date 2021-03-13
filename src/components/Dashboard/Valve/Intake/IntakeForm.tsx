import React from 'react';
import {
  intakeFirstFormSchema,
  intakeSecondFormSchema,
} from '../../../../validator/valve/intake/schema';
import { IntakeFormProps } from '../../types';
import { BaseFormControlType } from '../../../../validator/types';
import BaseForm from '../../../Base/Form/BaseForm';

const IntakeForm: React.FC<IntakeFormProps> = ({ register }) => {
  const formSchema: BaseFormControlType[] = [
    ...intakeFirstFormSchema,
    ...intakeSecondFormSchema,
  ];

  return <BaseForm register={register} formSchema={formSchema} />;
};

export default IntakeForm;
