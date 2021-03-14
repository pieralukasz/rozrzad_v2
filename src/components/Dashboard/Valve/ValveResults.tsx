import React, { useState } from 'react';
import { BaseFormControlType } from '../../../validator/types';

type ValveResultsProps = {
  results: BaseFormControlType[];
};

const ValveResults: React.FC<ValveResultsProps> = ({ results }) => {
  return (
    <ul>
      {results
        ? results.map(res => {
            return (
              <li key={res.name}>
                {res.inputLabel} {res.formHelperText.split('[')[0]} -{' '}
                {res.value} [{res.formHelperText.split('[')[1]}
              </li>
            );
          })
        : ''}
    </ul>
  );
};

export default ValveResults;
