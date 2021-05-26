import {
  SpringFirstFormSchemaValue,
  SpringFourthFormSchemaValue,
  SpringSecondFormSchemaValue,
  SpringThirdFormSchemaValue,
} from '../../validator/spring/types';

export interface springPropsState {
  firstForm: SpringFirstFormSchemaValue;
  secondForm: SpringSecondFormSchemaValue;
  thirdForm: SpringThirdFormSchemaValue;
  fourthForm: SpringFourthFormSchemaValue;
}

export const initialState: springPropsState = {
  firstForm: {
    przyspieszenieWPunkcieGranicznymF: '',
    przyspieszenieNaWierzcholkuKrzywkiW: '',
    polozenieSrodkaLukuWierzcholkowego: '',
    pochyleniePromieniaRKrzywkiWPktF: '',
    promienLukuWierzcholkowego: '',
    promienPodstawowyKrzywki: '',
    srednicaZewnetrznaStozkaZaworu: '',
    skokZaworu: '',
    masyZastepczeZredukowaneNaOsZaworu: '',
    wspolczynnikDociskuZaworu: '',
    przelozenieDzwigniZaworowej: '',
    stosunekSilSprezynyDoSilBezwladnosci: '',
    stosunekSilWSprezynie: '',
  },
  secondForm: {
    napiecieSprezynyPrzyZamknietymZaworze: '',
    napiecieSprezynyPrzyOtwartymZaworze: '',

    stalaSprezyny: '',
    stosunekSilSprezynyDoSilBezwlandWPktF: '',
    stosunekSilSprezynyDoSilBezwlandWPktW: '',
  },
  thirdForm: {
    predkoscObrotowaSilnika: '',
    liczbaSuwowSilnika: '',
    procentObciazeniaObliczanejSprezyny: '',
    srednicaZewnetrznaSprezynyZWarKonstr: '',
    materialSprezyny: '',
  },
  fourthForm: {
    silaWObliczanejSprezynieS1: '',
    silaWObliczanejSprezynieS2: '',
    stalaDrugiejSprezyny: '',
  },
};
