import {
  CamFirstFormSchemaValue,
  CamSecondFormSchemaValue,
} from '../../../validator/cam/types';
import { initialState } from '../../../slices/camForm/initialState';

export const calculateSkokKrzywki = (
  przelozenieDzwigienki: string,
  skokZaworu: string
): number => {
  return (
    Math.round(
      (parseFloat(skokZaworu) / parseFloat(przelozenieDzwigienki as string)) *
        100
    ) / 100
  );
};

export const calculateA = (
  skokKrzywki: string,
  skokZaworu: string,
  promienPodstawyKrzywki: string
): number => {
  return 10;
};

export const calculateSecondFormSchema = (
  firstFormSchema: CamFirstFormSchemaValue
): CamSecondFormSchemaValue => {
  const initalSecondForm = JSON.parse(
    JSON.stringify(initialState.secondForm)
  ) as CamSecondFormSchemaValue;

  const skokKrzywki = calculateSkokKrzywki(
    firstFormSchema.przelozenieDzwigienki as string,
    firstFormSchema.skokZaworu
  );

  initalSecondForm.skokKrzywki = skokKrzywki.toString();

  const A = calculateA(
    skokKrzywki.toString(),
    firstFormSchema.skokZaworu,
    firstFormSchema.promienPodstawowyKrzywki
  );

  initalSecondForm.polozenieSrodkaLukuWierzcholkowego = A.toString();

  return initalSecondForm;
};
