import {
  IntakeFirstFormSchemaValue,
  IntakeSecondFormSchemaValue,
} from '../../validator/valve/intake/types';

export interface valveIntakePropsState {
  firstForm: IntakeFirstFormSchemaValue;
  secondForm: IntakeSecondFormSchemaValue;
  calculatedValue: object;
}

export const initialState: valveIntakePropsState = {
  firstForm: {
    srednicaTloka: '',
    skokTloka: '',
    predkoscObrotowaSilnika: '',
    sredniaPredkoscPrzeplywu: '',
    maksymalneNadcisnienieWCylindrze: '',
    liczbaZaworowNaCylinder: '',
    katPochyleniaPrzylgniZaworowej: '',
  },
  secondForm: {
    srednicaKanalu: '',
    srednicaTrzonkuZaworu: '',
    srednicaWewnetrznaPrzylgni: '',
    srednicaZewnetrznaPrzylgni: '',
    srednicaWewnetrznaGrzybkaZaworu: '',
    srednicaZewnetrznaGrzybkaZaworu: '',
    gruboscGrzybkaZaworu: '',
    wzniosZaworu: '',
    naprezeniaWGrzybkuZaworu: '',
    szerokoscPrzylgniZaworowej: '',
  },
  calculatedValue: {
    srednicaKanalu: '',
  },
};
