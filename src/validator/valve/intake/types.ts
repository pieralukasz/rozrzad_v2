import IntakeSecondForm from '../../../components/Dashboard/Valve/Intake/IntakeSecondForm';

export type IntakeFirstFormSchemaValue = {
  srednicaTloka: string;
  skokTloka: string;
  predkoscObrotowaSilnika: string;
  sredniaPredkoscPrzeplywu: string;
  maksymalneNadcisnienieWCylindrze: string;
  liczbaZaworowNaCylinder: string;
  katPochyleniaPrzylgniZaworowej: string;
};

export type IntakeSecondFormSchemaValue = {
  srednicaKanalu: string;
  srednicaTrzonkuZaworu: string;
  srednicaWewnetrznaPrzylgni: string;
  srednicaZewnetrznaPrzylgni: string;
  srednicaWewnetrznaGrzybkaZaworu: string;
  srednicaZewnetrznaGrzybkaZaworu: string;
  gruboscGrzybkaZaworu: string;
  wzniosZaworu: string;
  naprezeniaWGrzybkuZaworu: string;
  szerokoscPrzylgniZaworowej: string;
};

export type IntakeFormSchemaValue = IntakeFirstFormSchemaValue &
  IntakeSecondFormSchemaValue;

export type IntakeFormSchemaType =
  | IntakeFirstFormSchemaValue
  | IntakeSecondFormSchemaValue
  | IntakeFormSchemaValue;
