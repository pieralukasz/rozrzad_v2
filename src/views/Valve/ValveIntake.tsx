import React, { useEffect, useState } from 'react';
import BaseHeader from '../../components/Base/BaseHeader';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import IntakeFirstForm from '../../components/Dashboard/Valve/Intake/IntakeFirstForm';
import {
  IntakeFirstFormSchemaValue,
  IntakeFormSchemaType,
  IntakeSecondFormSchemaValue,
} from '../../validator/valve/intake/types';
import IntakeSecondForm from '../../components/Dashboard/Valve/Intake/IntakeSecondForm';
import IntakeForm from '../../components/Dashboard/Valve/Intake/IntakeForm';
import BaseStepperTop from '../../components/Base/BaseStepperTop';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setFirstForm,
  setSecondForm,
} from '../../features/valveIntakeForm/valveIntakeFormSlice';

const ValveIntake: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const valveIntakeForm = useAppSelector(state => state.valveIntakeForm);
  const dispatch = useAppDispatch();

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    console.log(valveIntakeForm);
  }, [valveIntakeForm]);

  const steps = ['Wstępne dane', 'Obliczenia wstępne', 'Podsumowanie wyników'];

  const { handleSubmit, register } = useForm();
  const onSubmit = (intakeValues: IntakeFormSchemaType) => {
    switch (activeStep) {
      case 0:
        // TODO validate and calculate all
        dispatch(setFirstForm(intakeValues as IntakeFirstFormSchemaValue));
        handleNext();
        break;
      case 1:
        // TODO validate and calculate all
        dispatch(setSecondForm(intakeValues as IntakeSecondFormSchemaValue));
        handleNext();
        break;
      default:
        console.log('nothing');
        break;
    }
  };

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <IntakeFirstForm register={register} />;
      case 1:
        return <IntakeSecondForm register={register} />;
      case 2:
        return <IntakeForm register={register} />;
      default:
        return 'Unknown';
    }
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
