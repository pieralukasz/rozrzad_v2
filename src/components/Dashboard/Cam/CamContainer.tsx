import React, { useEffect, useState } from 'react';
import BaseStepperTop from '../../Base/BaseStepperTop';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import BaseForm from '../../Base/Form/BaseForm';
import {
  camFirstFormSchemaIntake,
  camSecondFormSchemaIntake,
} from '../../../validator/cam/intakeSchema';
import { INTAKE } from '../../../views/Cam/CamIntake';
import {
  camFirstFormSchemaOutlet,
  camSecondFormSchemaOutlet,
} from '../../../validator/cam/outletSchema';
import { BaseFormControlType } from '../../../validator/types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  setFirstForm,
  setSecondForm,
} from '../../../slices/camForm/camFormSlice';
import ValveResults from '../Valve/ValveResults';
import { saveJSONFileIntoFolder } from '../../../utils/downloadFile';
import {
  CamFirstFormSchemaValue,
  CamFormSchemaType,
  CamSecondFormSchemaValue,
} from '../../../validator/cam/types';
import {
  calculateSecondFormSchema,
  calculateSkokKrzywki,
} from './calculations';
import { initialState } from '../../../slices/camForm/initialState';

type CamContainerProps = {
  whichOne: string;
};

const CamContainer: React.FC<CamContainerProps> = ({ children, whichOne }) => {
  const steps = [
    'Podstawowe parametry krzywki',
    'Podstawowe parametry krzywki - Obliczenia',
    'Część bierna krzywki1',
    'Część bierna krzywki2',
    'Część bierna krzywki3',
    'Część bierna krzywki4',
    'Część bierna krzywki',
  ];

  const [activeStep, setActiveStep] = useState<number>(0);

  const { handleSubmit, register } = useForm();

  const camForm = useAppSelector(state => state.camForm);
  const dispatch = useAppDispatch();

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  const onSubmit = (intakeValues: CamFormSchemaType) => {
    switch (activeStep) {
      case 0:
        dispatch(setFirstForm(intakeValues as CamFirstFormSchemaValue));

        const secondSchema = calculateSecondFormSchema(
          intakeValues as CamFirstFormSchemaValue
        );

        dispatch(setSecondForm(secondSchema));
        break;
      case 1:
        break;
      default:
        break;
    }
    handleNext();
  };

  const getStepContent = (stepIndex: number) => {
    let returnSchema = [];
    switch (stepIndex) {
      case 0:
        if (whichOne === INTAKE) {
          returnSchema = checkIfStateExist(stepIndex, camFirstFormSchemaIntake);
          return (
            <BaseForm
              formSchema={camFirstFormSchemaIntake}
              register={register}
            />
          );
        } else {
          returnSchema = checkIfStateExist(stepIndex, camFirstFormSchemaOutlet);
          return (
            <BaseForm
              formSchema={camFirstFormSchemaOutlet}
              register={register}
            />
          );
        }
      case 1:
        if (whichOne === INTAKE) {
          const firstSchema = checkIfStateExist(0, camFirstFormSchemaIntake);
          const secondSchema = checkIfStateExist(1, camSecondFormSchemaIntake);
          return <ValveResults results={[...firstSchema, ...secondSchema]} />;
        } else {
          const firstSchema = checkIfStateExist(0, camFirstFormSchemaOutlet);
          const secondSchema = checkIfStateExist(1, camSecondFormSchemaOutlet);
          return <ValveResults results={[...firstSchema, ...secondSchema]} />;
        }

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
        return setNewValue(defaultSchema, camForm.firstForm);
      case 1:
        return setNewValue(defaultSchema, camForm.secondForm);
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
      // @ts-ignore
      if (newSchema[i].name === 'srednicaWaluRozrzadu') {
        const sC = (stateValue as CamFirstFormSchemaValue).srednicaCylindra;
        newSchema[i].additionalHelperItem =
          sC.length > 0
            ? `Wartość zalecana: ${
                Math.round(parseFloat(sC) * 0.25 * 10) / 10
              } <= r <= ${Math.round(parseFloat(sC) * 0.3 * 10) / 10}`
            : 'Wprowadź średnice cylindra D.';
      } else if (newSchema[i].name === 'promienPodstawowyKrzywki') {
        const d = (stateValue as CamFirstFormSchemaValue).srednicaWaluRozrzadu;
        newSchema[i].additionalHelperItem =
          d.length > 0
            ? `Wartość zalecana: ${
                Math.round((parseFloat(d) / 2 + 1.5) * 100) / 100
              } <= r <= ${Math.round(((parseFloat(d) / 2 + 3) * 100) / 100)}`
            : 'Wprowadź średnice wału rozrządu d.';
      } else if (newSchema[i].name === 'promienLukuWierzcholkowego') {
        const D = (stateValue as CamFirstFormSchemaValue).srednicaCylindra;

        const valueMin =
          Math.round(
            (parseFloat(D) * 0.02 < 1.5 ? 1.5 : parseFloat(D) * 0.02) * 10
          ) / 10;
        const valueMax = Math.round(parseFloat(D) * 0.08 * 10) / 10;

        newSchema[i].additionalHelperItem =
          D.length > 0
            ? `Wartość zalecana: ${valueMin} <= ro <= ${valueMax}`
            : 'Wprowadź średnice cylindra D.';
      }
    }

    return defaultSchema;
  };

  const saveFile = () => {
    let form = {};

    switch (activeStep) {
      case 1:
        form = {
          ...camForm.firstForm,
          ...camForm.secondForm,
        };
        break;
      default:
        break;
    }

    Object.keys(form).forEach(function (el) {
      // @ts-ignore
      form[el] = parseFloat(form[el]);
    });

    saveJSONFileIntoFolder('Krzywka', form);
  };

  return (
    <CamIntakeView>
      {children}
      <BaseStepperTop activeStep={activeStep} steps={steps} color="#6e7c7c" />
      <ButtonContainer>
        {activeStep > 0 ? (
          <Button variant="outlined" onClick={handleBack}>
            Cofnij
          </Button>
        ) : (
          ''
        )}
        {activeStep === 1 ? (
          <Button variant="outlined" onClick={() => saveFile()}>
            Pobierz dane
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
    </CamIntakeView>
  );
};

export default CamContainer;

const CamIntakeView = styled.div`
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

  button:nth-child(2),
  button:nth-child(3) {
    margin-left: 2rem;
  }
`;
