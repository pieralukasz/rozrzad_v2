import {
  SpringFirstFormSchemaValue,
  SpringSecondFormSchemaValue,
} from '../../../validator/spring/types';
import { initialState } from '../../../slices/springForm/initialState';

export const calculateS1 = (dps: string, dzs: string) => {
  const dp = Number(dps);
  const dz = Number(dzs);

  return (
    Math.round((((Math.PI / 4) * Math.pow(dz, 2) * dp) / 1000) * 1000) / 1000
  );
};

export const calculateS2 = (
  aw: number,
  ezep: number,
  Mz: number,
  s2pm: number
) => {
  return Math.round(s2pm * aw * ezep * Mz * 1000) / 1000;
};

export const calculateC = (s1: number, s2: number, hz: number) => {
  return Math.round(((s2 - s1) / hz) * 1000) / 1000;
};

export const calculatesF = (
  A: number,
  beta: number,
  ro: number,
  r: number,
  s1: number,
  c: number,
  ezep: number,
  Mz: number,
  a: number
) => {
  const h = A * Math.sin((beta * Math.PI) / 180) + (ro - r);
  const S = s1 + c * ezep * h;

  const P = Mz * ezep * a;

  return Math.round((S / P) * 1000) / 1000;
};

export const calculateW = (
  s1: number,
  c: number,
  Hz: number,
  a: number,
  ezep: number,
  Mz: number
) => {
  const S = s1 + c * Hz;
  const P = a * ezep * Mz;

  return Math.round((S / P) * 1000) / 1000;
};

export const calculateSecondFormSchema = (
  firstFormSchema: SpringFirstFormSchemaValue
): SpringSecondFormSchemaValue => {
  const {
    masyZastepczeZredukowaneNaOsZaworu,
    pochyleniePromieniaRKrzywkiWPktF,
    polozenieSrodkaLukuWierzcholkowego,
    promienLukuWierzcholkowego,
    promienPodstawowyKrzywki,
    przelozenieDzwigniZaworowej,
    przyspieszenieNaWierzcholkuKrzywkiW,
    skokZaworu,
    srednicaZewnetrznaStozkaZaworu,
    stosunekSilSprezynyDoSilBezwladnosci,
    wspolczynnikDociskuZaworu,
    przyspieszenieWPunkcieGranicznymF,
  } = firstFormSchema;

  const initalSecondForm = JSON.parse(JSON.stringify(initialState.secondForm));

  initalSecondForm.napiecieSprezynyPrzyZamknietymZaworze = calculateS1(
    wspolczynnikDociskuZaworu,
    srednicaZewnetrznaStozkaZaworu as string
  );

  initalSecondForm.napiecieSprezynyPrzyOtwartymZaworze = calculateS2(
    Number(przyspieszenieNaWierzcholkuKrzywkiW),
    Number(przelozenieDzwigniZaworowej),
    Number(masyZastepczeZredukowaneNaOsZaworu),
    Number(stosunekSilSprezynyDoSilBezwladnosci)
  );

  initalSecondForm.stosunekSilWSprezynie =
    Math.round(
      (Number(initalSecondForm.napiecieSprezynyPrzyOtwartymZaworze) /
        Number(initalSecondForm.napiecieSprezynyPrzyZamknietymZaworze)) *
        1000
    ) / 1000;

  initalSecondForm.stalaSprezyny = calculateC(
    Number(initalSecondForm.napiecieSprezynyPrzyZamknietymZaworze),
    Number(initalSecondForm.napiecieSprezynyPrzyOtwartymZaworze),
    Number(skokZaworu)
  );

  initalSecondForm.stosunekSilSprezynyDoSilBezwlandWPktF = calculatesF(
    Number(polozenieSrodkaLukuWierzcholkowego),
    Number(pochyleniePromieniaRKrzywkiWPktF),
    Number(promienLukuWierzcholkowego),
    Number(promienPodstawowyKrzywki),
    Number(initalSecondForm.napiecieSprezynyPrzyZamknietymZaworze),
    Number(initalSecondForm.stalaSprezyny),
    Number(przelozenieDzwigniZaworowej),
    Number(masyZastepczeZredukowaneNaOsZaworu),
    Number(przyspieszenieWPunkcieGranicznymF)
  );

  initalSecondForm.stosunekSilSprezynyDoSilBezwlandWPktW = calculateW(
    Number(initalSecondForm.napiecieSprezynyPrzyZamknietymZaworze),
    Number(initalSecondForm.stalaSprezyny),
    Number(skokZaworu),
    Number(przyspieszenieNaWierzcholkuKrzywkiW),
    Number(przelozenieDzwigniZaworowej),
    Number(masyZastepczeZredukowaneNaOsZaworu)
  );

  return initalSecondForm as SpringSecondFormSchemaValue;
};
