import {
  CamFirstFormSchemaValue,
  CamSecondFormSchemaValue,
} from '../../validator/cam/types';

export interface CamPropsState {
  firstForm: CamFirstFormSchemaValue;
  secondForm: CamSecondFormSchemaValue;
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
};
