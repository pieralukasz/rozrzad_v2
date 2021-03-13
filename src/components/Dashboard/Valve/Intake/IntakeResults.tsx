import React, { useEffect, useState } from 'react';
import { BaseFormControlType } from '../../../../validator/types';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

const IntakeResult: React.FC = () => {
  const [results, setResults] = useState([]);

  const valveIntakeForm = useAppSelector(state => state.valveIntakeForm);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(valveIntakeForm);
  }, []);

  return (
    <ul>
      <li>HELLO WORLDDD</li>
    </ul>
  );
};

export default IntakeResult;
