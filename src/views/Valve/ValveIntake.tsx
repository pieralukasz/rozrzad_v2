import React, { useEffect, useState } from 'react';
import BaseHeader from '../../components/Base/BaseHeader';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import {
  IntakeFirstFormSchemaValue,
  IntakeFormSchemaType,
  IntakeSecondFormSchemaValue,
} from '../../validator/valve/intake/types';
import BaseStepperTop from '../../components/Base/BaseStepperTop';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setFirstForm,
  setSecondForm,
  clearFirstForm,
  clearSecondForm,
} from '../../slices/valveIntakeForm/valveIntakeFormSlice';
import BaseForm from '../../components/Base/Form/BaseForm';
import {
  intakeFirstFormSchema,
  intakeSecondFormSchema,
} from '../../validator/valve/intake/schema';
import { BaseFormControlType } from '../../validator/types';

const ValveIntake: React.FC = () => {
  const steps = ['Wstępne dane', 'Obliczenia wstępne', 'Podsumowanie wyników'];

  const [activeStep, setActiveStep] = useState<number>(0);

  const valveIntakeForm = useAppSelector(state => state.valveIntakeForm);
  const dispatch = useAppDispatch();

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 1) {
      // clear second form becouse values changed
      console.log('znika druga');
      dispatch(clearSecondForm());
    }
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  const { handleSubmit, register } = useForm();
  const onSubmit = (intakeValues: IntakeFormSchemaType) => {
    switch (activeStep) {
      case 0:
        // TODO validate and calculate second Form
        dispatch(setFirstForm(intakeValues as IntakeFirstFormSchemaValue));
        break;
      case 1:
        // TODO validate and calculate all
        console.log(intakeValues);
        dispatch(setSecondForm(intakeValues as IntakeSecondFormSchemaValue));
        break;
      default:
        console.log('nothing');
        break;
    }

    handleNext();
  };

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        const returnSchema = checkIfStateExist(
          stepIndex,
          intakeFirstFormSchema
        );
        return (
          <BaseForm formSchema={intakeFirstFormSchema} register={register} />
        );
      case 1:
        return (
          <BaseForm formSchema={intakeSecondFormSchema} register={register} />
        );
      case 2:
        return (
          <BaseForm
            formSchema={[...intakeFirstFormSchema, ...intakeSecondFormSchema]}
            register={register}
          />
        );
      default:
        return <div>Unknown</div>;
    }
  };

  const checkIfStateExist = (
    numberForm: number,
    defaultSchema: BaseFormControlType[]
  ): BaseFormControlType[] => {
    switch (numberForm) {
      case 0:
        return setNewValue(defaultSchema, valveIntakeForm.firstForm);
      case 1:
        return setNewValue(defaultSchema, valveIntakeForm.secondForm);
      default:
        return defaultSchema;
    }
  };

  const setNewValue = (
    defaultSchema: BaseFormControlType[],
    stateValue: object
  ): BaseFormControlType[] => {
    for (let i = 0; i <= defaultSchema.length - 1; i++) {
      // @ts-ignore
      defaultSchema[i].value = stateValue[defaultSchema[i].name] as string;
    }
    return defaultSchema;
  };

  return (
    <ValveIntakeView>
      <BaseHeader>Obliczenia zaworu dolotowego</BaseHeader>
      <BaseStepperTop activeStep={activeStep} steps={steps} />
      <ButtonContainer>
        {activeStep > 0 ? (
          <Button variant="outlined" onClick={handleBack}>
            Cofnij
          </Button>
        ) : (
          ''
        )}
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Potwierdź
        </Button>
      </ButtonContainer>
      <FormView onSubmit={handleSubmit(onSubmit)}>
        {getStepContent(activeStep)}
      </FormView>
    </ValveIntakeView>
  );
};

export default ValveIntake;

const ValveIntakeView = styled.div`
  margin-bottom: 2rem;
`;

const FormView = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white !important;
  padding-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;

  button:nth-child(2) {
    margin-left: 2rem;
  }
`;
