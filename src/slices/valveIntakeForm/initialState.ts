import {
  IntakeFirstFormSchemaValue,
  IntakeSecondFormSchemaValue,
} from '../../validator/valve/intake/types';

export interface valveIntakePropsState {
  firstForm: IntakeFirstFormSchemaValue;
  secondForm: IntakeSecondFormSchemaValue;
}

export const initialState: valveIntakePropsState = {
  firstForm: {
    srednicaTloka: '',
    skokTloka: '',
    predkoscObrotowaSilnika: '',
    sredniaPredkoscPrzeplywu: '',
    maksymalneNadcisnienieWCylindrze: '',
    srednicaTrzonkuZaworu: '10',
    liczbaZaworowNaCylinder: '',
    katPochyleniaPrzylgniZaworowej: '',
  },
  secondForm: {
    srednicaKanalu: '',
    srednicaWewnetrznaPrzylgni: '',
    srednicaZewnetrznaPrzylgni: '',
    srednicaWewnetrznaGrzybkaZaworu: '',
    srednicaZewnetrznaGrzybkaZaworu: '',
    gruboscGrzybkaZaworu: '',
    wzniosZaworu: '',
    naprezeniaWGrzybkuZaworu: '',
    szerokoscPrzylgniZaworowej: '',
  },
};
