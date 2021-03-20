import {
  CamFifthFormSchemaValue,
  CamFirstFormSchemaValue,
  CamFourthFormSchemaValue,
  CamSecondFormSchemaValue,
  CamSixthFormSchemaValue,
  CamThirdFormSchemaValue,
} from '../../validator/cam/types';

export interface CamPropsState {
  firstForm: CamFirstFormSchemaValue;
  secondForm: CamSecondFormSchemaValue;
  thirdForm: CamThirdFormSchemaValue;
  fourthForm: CamFourthFormSchemaValue;
  fifthForm: CamFifthFormSchemaValue;
  sixForm: CamSixthFormSchemaValue;
}

export const initialState: CamPropsState = {
  firstForm: {
    katOtwarciaZaworuPrzedDMP: '',
    katZamknieciaZaworuPoDMP: '',
    srednicaCylindra: '',
    srednicaWaluRozrzadu: '',
    promienPodstawowyKrzywki: '',
    skokZaworu: '',
    przelozenieDzwigienki: '',
    promienLukuWierzcholkowego: '',
  },
  secondForm: {
    skokKrzywki: '',
    promienLukuBocznego: '',
    polozenieSrodkaLukuWierzcholkowego: '',
    wspolrzednePunktuGranicznegoE: '',
    wspolrzedneSrodkaPromieniaLukuR: '',
    wspolrzednePunktuGranicznegoF: '',
    wartoscKataDBF: '',
  },
  thirdForm: {
    predkoscObrotowaSilnika: '',
    liczbaSuwowSilnika: '',
  },
  fourthForm: {
    najwiekszePrzyspieszenieDodatnie: '',
    przyspieszenieWPunkcieF: '',
    przyspieszenieNaWierzcholkuKrzywki: '',
    ilorazPrzyspieszen: '',
    wskaznikWypelnieniaPolaWzniosow: '',
  },
  fifthForm: {
    luzZaworu: '',
    luzKonstrukcyjnyKrzywki: '',
    katDlaLiniiPrzejściowejDelta: '',
  },
  sixForm: {
    katDlaLiniiPrzejściowejEpsylon: '',
    promienR1DlaLiniiPrzejsciowej: '',
    promienR2DlaLiniiPrzejsciowej: '',
  },
};
