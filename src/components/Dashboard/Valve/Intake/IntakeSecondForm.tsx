import React from 'react';
import { intakeSecondFormSchema } from '../../../../validator/valve/intake/schema';
import { IntakeFormProps } from '../../types';
import BaseForm from '../../../Base/Form/BaseForm';

const IntakeSecondForm: React.FC<IntakeFormProps> = ({ register }) => {
  return <BaseForm register={register} formSchema={intakeSecondFormSchema} />;
};

export default IntakeSecondForm;
