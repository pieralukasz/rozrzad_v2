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
import IntakeResults from '../../components/Dashboard/Valve/Intake/IntakeResults';
import { calculateSrednicaKanalu } from '../../components/Dashboard/Valve/Intake/calculations';
import { initialState } from '../../slices/valveIntakeForm/initialState';

const ValveIntake: React.FC = () => {
  const steps = ['Wstępne dane', 'Obliczenia wstępne', 'Podsumowanie wyników'];

  const [activeStep, setActiveStep] = useState<number>(0);
  const [srednicaKanalu, setSrednicaKanalu] = useState<string>('0');

  const valveIntakeForm = useAppSelector(state => state.valveIntakeForm);
  const dispatch = useAppDispatch();

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 1) {
      dispatch(clearSecondForm());
    }
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  const { handleSubmit, register } = useForm();
  const onSubmit = (intakeValues: IntakeFormSchemaType) => {
    switch (activeStep) {
      case 0:
        // TODO validate

        const initialSecondForm = JSON.parse(
          JSON.stringify(initialState.secondForm)
        );

        const sK = calculateSrednicaKanalu(
          intakeValues as IntakeFirstFormSchemaValue
        ) as string;

        initialSecondForm.srednicaKanalu = `${sK}`;
        setSrednicaKanalu(sK);

        // chceck srednica trzonu zaworu

        dispatch(setSecondForm(initialSecondForm));
        dispatch(setFirstForm(intakeValues as IntakeFirstFormSchemaValue));
        break;
      case 1:
        // TODO validate and calculate all
        const results = intakeValues as IntakeSecondFormSchemaValue;
        results.srednicaKanalu = srednicaKanalu;

        dispatch(setSecondForm(results as IntakeSecondFormSchemaValue));
        break;
      default:
        console.log('nothing');
        break;
    }

    handleNext();
  };

  const getStepContent = (stepIndex: number) => {
    let returnSchema = [];
    switch (stepIndex) {
      case 0:
        returnSchema = checkIfStateExist(stepIndex, intakeFirstFormSchema);
        return <BaseForm formSchema={returnSchema} register={register} />;
      case 1:
        returnSchema = checkIfStateExist(stepIndex, intakeSecondFormSchema);
        return <BaseForm formSchema={returnSchema} register={register} />;
      case 2:
        return <IntakeResults />;
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
    const newSchema = defaultSchema;

    for (let i = 0; i <= defaultSchema.length - 1; i++) {
      // @ts-ignore
      newSchema[i].value = stateValue[defaultSchema[i].name] as string;
    }
    return newSchema;
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
