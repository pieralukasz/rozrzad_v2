import React from 'react';
import BaseHeader from '../../components/Base/BaseHeader';
import ValveContainer from '../../components/Dashboard/Valve/ValveContainer';

const ValveIntake: React.FC = () => {
  return (
    <ValveContainer>
      <BaseHeader>Obliczenia zaworu dolotowego</BaseHeader>
    </ValveContainer>
  );
};

export default ValveIntake;
