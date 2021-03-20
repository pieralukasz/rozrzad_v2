import React, { useEffect, useState } from 'react';
import BaseStepperTop from '../../Base/BaseStepperTop';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import BaseForm from '../../Base/Form/BaseForm';
import {
  camFifthFormSchemaIntake,
  camFirstFormSchemaIntake,
  camFourthFormSchemaIntake,
  camSecondFormSchemaIntake,
  camSixthFormSchemaIntake,
  camThirdFormSchemaIntake,
} from '../../../validator/cam/intakeSchema';
import { INTAKE } from '../../../views/Cam/CamIntake';
import {
  camFifthFormSchemaOutlet,
  camFirstFormSchemaOutlet,
  camFourthFormSchemaOutlet,
  camSecondFormSchemaOutlet,
  camSixthFormSchemaOutlet,
  camThirdFormSchemaOutlet,
} from '../../../validator/cam/outletSchema';
import { BaseFormControlType } from '../../../validator/types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  setFirstForm,
  setSecondForm,
} from '../../../slices/camForm/camFormSlice';
import {
  setFirstForm as setValveFirstForm,
  setSecondForm as setValveSecondForm,
  setThirdForm as setValveThirdForm,
} from '../../../slices/valveForm/valveFormSlice';
import ValveResults from '../Valve/ValveResults';
import { saveJSONFileIntoFolder } from '../../../utils/downloadFile';
import {
  CamFifthFormSchemaValue,
  CamFirstFormSchemaValue,
  CamFormSchemaType,
  CamSecondFormSchemaValue,
} from '../../../validator/cam/types';
import {
  calculateSecondFormSchema,
  calculateSkokKrzywki,
} from './calculations';
import { initialState } from '../../../slices/camForm/initialState';
import { selectFile } from '../../../utils/selectFile';

type CamContainerProps = {
  whichOne: string;
};

const CamContainer: React.FC<CamContainerProps> = ({ children, whichOne }) => {
  const steps = [
    'Podstawowe parametry krzywki',
    'Podstawowe parametry krzywki - Obliczenia',
    'Kinematyka krzywki',
    'Kinematyka krzywki - Obliczenia',
    'Część bierna krzywki',
    'Część bierna krzywki - Obliczenia',
    'Część bierna krzywkixx',
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
      case 2:
        // TODO calculate all
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
          const firstSchema = checkIfStateExist(
            stepIndex - 1,
            camFirstFormSchemaIntake
          );
          const secondSchema = checkIfStateExist(
            stepIndex,
            camSecondFormSchemaIntake
          );
          return <ValveResults results={[...firstSchema, ...secondSchema]} />;
        } else {
          const firstSchema = checkIfStateExist(
            stepIndex - 1,
            camFirstFormSchemaOutlet
          );
          const secondSchema = checkIfStateExist(
            stepIndex,
            camSecondFormSchemaOutlet
          );
          return <ValveResults results={[...firstSchema, ...secondSchema]} />;
        }
      case 2:
        if (whichOne === INTAKE) {
          returnSchema = checkIfStateExist(stepIndex, camThirdFormSchemaIntake);
          return (
            <BaseForm
              formSchema={camThirdFormSchemaIntake}
              register={register}
            />
          );
        } else {
          returnSchema = checkIfStateExist(stepIndex, camThirdFormSchemaOutlet);
          return (
            <BaseForm
              formSchema={camThirdFormSchemaOutlet}
              register={register}
            />
          );
        }
      case 3:
        if (whichOne === INTAKE) {
          const thirdSchema = checkIfStateExist(
            stepIndex - 1,
            camThirdFormSchemaIntake
          );
          const fourthSchema = checkIfStateExist(
            stepIndex,
            camFourthFormSchemaIntake
          );
          return <ValveResults results={[...thirdSchema, ...fourthSchema]} />;
        } else {
          const thirdSchema = checkIfStateExist(
            stepIndex - 1,
            camThirdFormSchemaOutlet
          );
          const fourthSchema = checkIfStateExist(
            stepIndex,
            camFourthFormSchemaOutlet
          );
          return <ValveResults results={[...thirdSchema, ...fourthSchema]} />;
        }
      case 4:
        if (whichOne === INTAKE) {
          returnSchema = checkIfStateExist(stepIndex, camFifthFormSchemaIntake);
          return (
            <BaseForm
              formSchema={camFifthFormSchemaIntake}
              register={register}
            />
          );
        } else {
          returnSchema = checkIfStateExist(stepIndex, camFifthFormSchemaOutlet);
          return (
            <BaseForm
              formSchema={camFifthFormSchemaOutlet}
              register={register}
            />
          );
        }
      case 5:
        if (whichOne === INTAKE) {
          const fifthForm = checkIfStateExist(
            stepIndex - 1,
            camFifthFormSchemaIntake
          );
          const sixthForm = checkIfStateExist(
            stepIndex,
            camSixthFormSchemaIntake
          );
          return <ValveResults results={[...fifthForm, ...sixthForm]} />;
        } else {
          const fifthForm = checkIfStateExist(
            stepIndex - 1,
            camFifthFormSchemaOutlet
          );
          const sixthForm = checkIfStateExist(
            stepIndex,
            camSixthFormSchemaOutlet
          );
          return <ValveResults results={[...fifthForm, ...sixthForm]} />;
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
      case 2:
        return setNewValue(defaultSchema, camForm.thirdForm);
      case 3:
        return setNewValue(defaultSchema, camForm.fourthForm);
      case 4:
        return setNewValue(defaultSchema, camForm.fifthForm);
      case 5:
        return setNewValue(defaultSchema, camForm.sixForm);
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
      } else if (newSchema[i].name === 'luzZaworu') {
        console.log(stateValue);
        const D = camForm.firstForm.srednicaCylindra;

        const valueMin = Math.round(0.0015 * parseFloat(D) * 10) / 10 + 0.1;
        const valueMax = Math.round(0.004 * parseFloat(D) * 10) / 10 + 0.1;

        newSchema[
          i
        ].additionalHelperItem = `Wartość zalecana: ${valueMin} <= sz <= ${valueMax}`;
      } else if (newSchema[i].name === 'luzKonstrukcyjnyKrzywki') {
        console.log(camForm.firstForm.przelozenieDzwigienki);

        const i =
          1 / parseFloat(camForm.firstForm.przelozenieDzwigienki as string);

        console.log(i);

        const sz = (stateValue as CamFifthFormSchemaValue).luzZaworu;

        console.log(sz);

        const sp = i * parseFloat(sz);

        const valueMin = 1.2 * sp;
        const valueMax = 1.5 * sp;

        // newSchema[
        //   i
        // ].additionalHelperItem = `Wartość zalecana: ${valueMin} <= sz <= ${valueMax}`;
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
      if (
        el === 'wspolrzednePunktuGranicznegoE' ||
        el === 'wspolrzedneSrodkaPromieniaLukuR' ||
        el === 'wspolrzednePunktuGranicznegoF'
      ) {
        console.log('');
      } else {
        // @ts-ignore
        form[el] = parseFloat(form[el]);
      }
    });

    saveJSONFileIntoFolder('Krzywka', form);
  };

  const importFile = async () => {
    const data = await selectFile();

    dispatch(setValveFirstForm(data));
    dispatch(setValveSecondForm(data));
    dispatch(setValveThirdForm(data));
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
        {/*{activeStep === 0 ? (*/}
        {/*  <Button variant="outlined" onClick={importFile}>*/}
        {/*    Zaimportuj dane zaworu*/}
        {/*  </Button>*/}
        {/*) : (*/}
        {/*  ''*/}
        {/*)}*/}
        {activeStep % 2 === 1 ? (
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
