import { Step, StepLabel, Stepper } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

interface BaseStepperTopProps {
  steps: string[];
  activeStep: number;
}

const BaseStepperTop: React.FC<BaseStepperTopProps> = ({
  steps,
  activeStep,
}) => {
  return (
    <StepperContainer activeStep={activeStep} alternativeLabel>
      {steps.map(label => (
        <Step key={label}>
          <StepLabelContainer>{label}</StepLabelContainer>
        </Step>
      ))}
    </StepperContainer>
  );
};

const StepperContainer = styled(Stepper)`
  background-color: #92967d !important;
  padding-bottom: 0 !important;
`;

const StepLabelContainer = styled(StepLabel)`
  font-weight: bold;
`;

export default BaseStepperTop;
