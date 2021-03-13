import React from 'react';
import { intakeFirstFormSchema } from '../../../../validator/valve/intake/schema';
import { IntakeFormProps } from '../../types';
import BaseForm from '../../../Base/Form/BaseForm';

const IntakeFirstForm: React.FC<IntakeFormProps> = ({ register }) => {
  return <BaseForm register={register} formSchema={intakeFirstFormSchema} />;
};

export default IntakeFirstForm;
