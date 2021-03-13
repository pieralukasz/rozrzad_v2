import React from 'react';
import BaseHeader from '../../components/Base/BaseHeader';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import IntakeFirstForm from '../../components/Dashboard/Valve/Intake/IntakeFirstForm';
import { IntakeFormSchemaType } from '../../validator/valve/intake/types';

const ValveIntake: React.FC = () => {
  const { handleSubmit, register } = useForm();
  const onSubmit = (data: IntakeFormSchemaType) => {
    console.log(data);
  };

  return (
    <ValveIntakeView>
      <BaseHeader>Obliczenia zaworu dolotowego</BaseHeader>
      <FormView onSubmit={handleSubmit(onSubmit)}>
        <IntakeFirstForm register={register} />
      </FormView>
      <ButtonContainer>
        <Button color="secondary" variant="outlined">
          Przykład
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          onClick={handleSubmit(onSubmit)}
        >
          Zaakceptuj
        </Button>
      </ButtonContainer>
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
  margin-top: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;

  button:nth-child(2) {
    margin-left: 2rem;
  }
`;
