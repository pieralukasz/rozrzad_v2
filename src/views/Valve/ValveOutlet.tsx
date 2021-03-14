import React from 'react';
import BaseHeader from '../../components/Base/BaseHeader';
import ValveContainer from '../../components/Dashboard/Valve/ValveContainer';

const ValveOutlet: React.FC = () => {
  return (
    <ValveContainer>
      <BaseHeader>Obliczenia zaworu wylotowego</BaseHeader>
    </ValveContainer>
  );
};

export default ValveOutlet;
