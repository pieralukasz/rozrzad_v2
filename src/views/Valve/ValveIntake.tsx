import React, { useState } from 'react';
import BaseHeader from '../../components/Base/BaseHeader';
import { AppBar, Button, Step, StepLabel, Stepper } from '@material-ui/core';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import IntakeFirstForm from '../../components/Dashboard/Valve/Intake/IntakeFirstForm';
import { IntakeFormSchemaType } from '../../validator/valve/intake/types';
import IntakeSecondForm from '../../components/Dashboard/Valve/Intake/IntakeSecondForm';
import IntakeForm from '../../components/Dashboard/Valve/Intake/IntakeForm';
import BaseStepperTop from '../../components/Base/BaseStepperTop';

const ValveIntake: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const steps = ['Wstępne dane', 'Dodatkowe dane', 'Podsumowanie wyników'];

  const { handleSubmit, register } = useForm();
  const onSubmit = (intakeValues: IntakeFormSchemaType) => {
    // TODO validate and calculate all
    console.log(intakeValues);
    handleNext();
  };

  const getStepContent = (stepIndex: number) => {
    console.log(stepIndex);
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
          <Button color="secondary" variant="outlined" onClick={handleBack}>
            Cofnij
          </Button>
        ) : (
          ''
        )}
        <Button
          color="primary"
          variant="outlined"
          onClick={handleSubmit(onSubmit)}
        >
          Zaakceptuj
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
