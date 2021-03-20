export type CamFirstFormSchemaValue = {
  katOtwarciaZaworuPrzedDMP: string;
  katZamknieciaZaworuPoDMP: string;
  srednicaCylindra: string;
  srednicaWaluRozrzadu: string;
  promienPodstawowyKrzywki: string;
  skokZaworu: string;
  przelozenieDzwigienki: string;
  promienLukuWierzcholkowego: string;
};

export type CamSecondFormSchemaValue = {
  skokKrzywki: string;
  promienLukuBocznego: string;
  polozenieSrodkaLukuWierzcholkowego: string;
  wspolrzednePunktuGranicznegoE: string;
  wspolrzedneSrodkaPromieniaLukuR: string;
  wspolrzednePunktuGranicznegoF: string;
  wartoscKataDBF: string;
};

export type CamThirdFormSchemaValue = {
  predkoscObrotowaSilnika: string;
  liczbaSuwowSilnika: string;
};

export type CamFourthFormSchemaValue = {
  najwiekszePrzyspieszenieDodatnie: string;
  przyspieszenieWPunkcieF: string;
  przyspieszenieNaWierzcholkuKrzywki: string;
  ilorazPrzyspieszen: string;
  wskaznikWypelnieniaPolaWzniosow: string;
};

export type CamFifthFormSchemaValue = {
  luzZaworu: string;
  luzKonstrukcyjnyKrzywki: string;
  katDlaLiniiPrzejściowejDelta: string;
};

export type CamSixthFormSchemaValue = {
  katDlaLiniiPrzejściowejEpsylon: string;
  promienR1DlaLiniiPrzejsciowej: string;
  promienR2DlaLiniiPrzejsciowej: string;
};

export type CamFormSchemaValue = CamFirstFormSchemaValue &
  CamSecondFormSchemaValue &
  CamThirdFormSchemaValue &
  CamFourthFormSchemaValue &
  CamFifthFormSchemaValue &
  CamSixthFormSchemaValue;

export type CamFormSchemaType =
  | CamFirstFormSchemaValue
  | CamSecondFormSchemaValue
  | CamThirdFormSchemaValue
  | CamFourthFormSchemaValue
  | CamFifthFormSchemaValue
  | CamSixthFormSchemaValue
  | CamFormSchemaValue;
