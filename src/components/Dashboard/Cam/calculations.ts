import {
  CamEighthFormSchemaValue,
  CamFifthFormSchemaValue,
  CamFirstFormSchemaValue,
  CamFourthFormSchemaValue,
  CamSecondFormSchemaValue,
  CamSeventhFormSchemaValue,
  CamSixthFormSchemaValue,
  CamThirdFormSchemaValue,
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

export const calculatePrzyspieszenieMaxE = (
  omegar: number,
  R: number,
  r: number
): number => {
  return Math.round(Math.pow(omegar, 2) * (R - r) * 0.001 * 1000) / 1000;
};

export const calculatePrzyspieszenieMinF = (
  omegar: number,
  beta: number,
  A: number
): number => {
  return (
    Math.round(
      -Math.pow(omegar, 2) * A * Math.sin((beta * Math.PI) / 180) * 0.001 * 1000
    ) / 1000
  );
};

export const calculatePrzyspieszenieMinW = (
  omegar: number,
  A: number
): number => {
  return Math.round(-1 * Math.pow(omegar, 2) * A * 0.001 * 1000) / 1000;
};

export const calculateEpsylon = (delta: number, alpha: number): number => {
  const initial = (alpha - delta) / 2;

  return initial + delta;
};

export const calculater1r2 = (
  which: number,
  ad: number,
  ed: number,
  ae: number,
  r: number,
  sk: number
): number => {
  const denominator = ae + ed - ad;

  switch (which) {
    case 1:
      return Math.round((r + (sk * (ad - ed)) / denominator) * 1000) / 1000;
    case 2:
      return Math.round((r - (sk * ed) / denominator) * 1000) / 1000;
    default:
      return 0;
  }
};

export const calculateMinimalnaSrednicaPopychacza = (
  n: number,
  e: number,
  a: number
): number => {
  return (
    Math.round(2 * Math.sqrt(Math.pow(a / 2 + e, 2) + Math.pow(n, 2)) * 100) /
    100
  );
};

export const calculateSecondFormSchema = (
  firstFormSchema: CamFirstFormSchemaValue
): CamSecondFormSchemaValue => {
  const initalSecondForm = JSON.parse(
    JSON.stringify(initialState.secondForm)
  ) as CamSecondFormSchemaValue;

  const skokKrzywki = calculateSkokKrzywki(
    firstFormSchema.przelozenieDzwigienki,
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

export const calculateFourthFormSchema = (
  firstForm: CamFirstFormSchemaValue,
  secondForm: CamSecondFormSchemaValue,
  thirdForm: CamThirdFormSchemaValue
): CamFourthFormSchemaValue => {
  const initialFourthForm = JSON.parse(
    JSON.stringify(initialState.fourthForm)
  ) as CamFourthFormSchemaValue;

  const n = parseFloat(thirdForm.predkoscObrotowaSilnika);
  const tau = parseFloat(thirdForm.liczbaSuwowSilnika);
  const R = parseFloat(secondForm.promienLukuBocznego);
  const r = parseFloat(firstForm.promienPodstawowyKrzywki);
  const beta = parseFloat(secondForm.wartoscKataDBF);
  const A = parseFloat(secondForm.polozenieSrodkaLukuWierzcholkowego);

  const omega = (2 * Math.PI * n) / 60;

  // sprawdzenie suwów dla 4 w/2, a dla 2 w
  const omegar = tau === 4 ? omega / 2 : omega;

  initialFourthForm.najwiekszePrzyspieszenieDodatnie = calculatePrzyspieszenieMaxE(
    omegar,
    R,
    r
  ).toString();

  initialFourthForm.przyspieszenieWPunkcieF = calculatePrzyspieszenieMinF(
    omegar,
    beta,
    A
  ).toString();

  initialFourthForm.przyspieszenieNaWierzcholkuKrzywki = calculatePrzyspieszenieMinW(
    omegar,
    A
  ).toString();

  console.log(
    parseFloat(initialFourthForm.najwiekszePrzyspieszenieDodatnie),
    parseFloat(initialFourthForm.przyspieszenieWPunkcieF)
  );

  initialFourthForm.ilorazPrzyspieszen = Math.abs(
    Math.round(
      (parseFloat(initialFourthForm.najwiekszePrzyspieszenieDodatnie) /
        parseFloat(initialFourthForm.przyspieszenieNaWierzcholkuKrzywki)) *
        1000
    ) / 1000
  ).toString();

  // TODO obliczyc pole wzniosu zaworu

  console.log(initialFourthForm);

  return initialFourthForm;
};

export const calculateSixthFormSchema = (
  firstForm: CamFirstFormSchemaValue,
  secondForm: CamSecondFormSchemaValue,
  thirdForm: CamThirdFormSchemaValue,
  fourthForm: CamFourthFormSchemaValue,
  fifthForm: CamFifthFormSchemaValue
): CamSixthFormSchemaValue => {
  const initialSixthForm = JSON.parse(
    JSON.stringify(initialState.sixForm)
  ) as CamSixthFormSchemaValue;

  const alpha = calculateAlpha(
    firstForm.promienPodstawowyKrzywki,
    firstForm.promienLukuWierzcholkowego,
    secondForm.polozenieSrodkaLukuWierzcholkowego,
    firstForm.katOtwarciaZaworuPrzedDMP,
    firstForm.katZamknieciaZaworuPoDMP
  );

  const r = parseFloat(firstForm.promienPodstawowyKrzywki);

  const sk = parseFloat(fifthForm.luzKonstrukcyjnyKrzywki);

  const delta = parseFloat(fifthForm.katDlaLiniiPrzejsciowejDelta);

  const epsylon = calculateEpsylon(delta, alpha.alpha);

  initialSixthForm.katDlaLiniiPrzejsciowejEpsylon = epsylon.toString();

  const ad = Math.sin(((alpha.alpha - delta) * Math.PI) / 180);
  const ed = Math.sin(((epsylon - delta) * Math.PI) / 180);
  const ae = Math.sin(((alpha.alpha - epsylon) * Math.PI) / 180);

  initialSixthForm.promienR1DlaLiniiPrzejsciowej = calculater1r2(
    1,
    ad,
    ed,
    ae,
    r,
    sk
  ).toString();

  initialSixthForm.promienR2DlaLiniiPrzejsciowej = calculater1r2(
    2,
    ad,
    ed,
    ae,
    r,
    sk
  ).toString();

  return initialSixthForm;
};

export const calculateEighthFormSchema = (
  firstForm: CamFirstFormSchemaValue,
  secondForm: CamSecondFormSchemaValue,
  seventhForm: CamSeventhFormSchemaValue
): CamEighthFormSchemaValue => {
  const initialEighthForm = JSON.parse(
    JSON.stringify(initialState.eightForm)
  ) as CamEighthFormSchemaValue;

  const r = parseFloat(firstForm.promienPodstawowyKrzywki);
  const R = parseFloat(secondForm.promienLukuBocznego);
  const beta = parseFloat(secondForm.wartoscKataDBF);
  const alpha = calculateAlpha(
    firstForm.promienPodstawowyKrzywki,
    firstForm.promienLukuWierzcholkowego,
    secondForm.polozenieSrodkaLukuWierzcholkowego,
    firstForm.katOtwarciaZaworuPrzedDMP,
    firstForm.katZamknieciaZaworuPoDMP
  );

  const dt = parseFloat(seventhForm.srednicaTalerzykaPopychacza);
  const e = parseFloat(seventhForm.przesuniecieOsiPopychacza);
  const a = parseFloat(seventhForm.szerokoscKrzywki);

  const n = (R - r) * Math.sin(((beta - alpha.alpha) * Math.PI) / 180);

  initialEighthForm.minimalnaSrednicaPopychacza = calculateMinimalnaSrednicaPopychacza(
    n,
    e,
    a
  ).toString();

  return initialEighthForm;
};
