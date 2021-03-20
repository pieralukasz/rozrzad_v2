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
  promienLukuWierzcholkowego: string,
  promienPodstawyKrzywki: string
): number => {
  const Hk = parseFloat(skokKrzywki);
  const ro = parseFloat(promienLukuWierzcholkowego);
  const r = parseFloat(promienPodstawyKrzywki);

  return Math.round((r + Hk - ro) * 100) / 100;
};

export const calculateAlpha = (
  promienPodstawyKrzywki: string,
  promienLukiWierzcholkowego: string,
  srodek: string,
  katOtwarciaZaworuPrzedDMP: string,
  katZamknieciaZaworuPoDMP: string
) => {
  const r = parseFloat(promienPodstawyKrzywki);
  const ro = parseFloat(promienLukiWierzcholkowego);
  const A = parseFloat(srodek);
  const ad = parseFloat(katOtwarciaZaworuPrzedDMP);
  const bc = parseFloat(katZamknieciaZaworuPoDMP);

  const e = 180 + ad + bc;

  const alpha = 90 - e / 4;

  const sinAlpha = Math.sin((alpha * Math.PI) / 180);

  const cosAlpha = Math.cos((alpha * Math.PI) / 180);

  return {
    alpha,
    sinAlpha,
    cosAlpha,
  };
};

export const calculatePromienLukuBocznego = (
  r: number,
  ro: number,
  A: number,
  sinAlpha: number
): number => {
  return (
    (Math.pow(r, 2) - Math.pow(ro, 2) + Math.pow(A, 2) - 2 * A * r * sinAlpha) /
    (2 * (r - ro - A * sinAlpha))
  );
};

export const checkIfRIsOk = (R: number, Hk: number) => {
  return R <= 10 * Hk || R >= 18 * Hk;
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
    firstFormSchema.promienLukuWierzcholkowego,
    firstFormSchema.promienPodstawowyKrzywki
  );

  initalSecondForm.polozenieSrodkaLukuWierzcholkowego = A.toString();

  const alpha = calculateAlpha(
    firstFormSchema.promienPodstawowyKrzywki,
    firstFormSchema.promienLukuWierzcholkowego,
    A.toString(),
    firstFormSchema.katOtwarciaZaworuPrzedDMP,
    firstFormSchema.katZamknieciaZaworuPoDMP
  );

  const r = parseFloat(firstFormSchema.promienPodstawowyKrzywki);

  const xE = Math.round(r * alpha.cosAlpha * 1000) / 1000;
  const yE = Math.round(r * alpha.sinAlpha * 1000) / 1000;

  initalSecondForm.wspolrzednePunktuGranicznegoE = `(${xE}, ${yE})`;

  const ro = parseFloat(firstFormSchema.promienLukuWierzcholkowego);

  const R = calculatePromienLukuBocznego(r, ro, A, alpha.sinAlpha);

  initalSecondForm.promienLukuBocznego = (
    Math.round(R * 1000) / 1000
  ).toString();

  const xB = Math.round((R - r) * alpha.cosAlpha * 1000) / 1000;
  const yB = Math.round((R - r) * alpha.sinAlpha * 1000) / 1000;

  initalSecondForm.wspolrzedneSrodkaPromieniaLukuR = `(${xB}, ${yB})`;

  const cosB = xB / (R - ro);
  const sinB = Math.sin(Math.acos(cosB));

  const xF = Math.round(ro * cosB * 1000) / 1000;
  const yF = Math.round((A + ro * sinB) * 1000) / 1000;

  initalSecondForm.wspolrzednePunktuGranicznegoF = `(${xF}, ${yF})`;

  const DBF =
    Math.round(
      ((Math.atan(Math.atan(Math.tan((yB + A) / xB))) * 180) / Math.PI) * 1000
    ) / 1000;

  initalSecondForm.wartoscKataDBF = DBF.toString();

  return initalSecondForm;
};
