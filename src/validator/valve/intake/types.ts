export type IntakeFirstFormSchemaValue = {
  srednicaTloka: string;
  skokTloka: string;
  predkoscObrotowaSilnika: string;
  sredniaPredkoscPrzeplywu: string;
  srednicaTrzonkuZaworu: string;
  maksymalneNadcisnienieWCylindrze: string;
  liczbaZaworowNaCylinder?: string;
  katPochyleniaPrzylgniZaworowej: string;
};

export type IntakeSecondFormSchemaValue = {
  srednicaKanalu: string;
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
