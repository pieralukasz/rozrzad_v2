import {
  SpringFirstFormSchemaValue,
  SpringSecondFormSchemaValue,
} from '../../validator/spring/types';

export interface springPropsState {
  firstForm: SpringFirstFormSchemaValue;
  secondForm: SpringSecondFormSchemaValue;
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
  },
  secondForm: {
    napiecieSprezynyPrzyZamknietymZaworze: '',
    napiecieSprezynyPrzyOtwartymZaworze: '',
    stosunekSilWSprezynie: '',
    stalaSprezyny: '',
    stosunekSilSprezynyDoSilBezwlandWPktF: '',
    stosunekSilSprezynyDoSilBezwlandWPktW: '',
  },
};
