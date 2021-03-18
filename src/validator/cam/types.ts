export type CamFirstFormSchemaValue = {
  katOtwarciaZaworuPrzedDMP: string;
  katZamknieciaZaworuPoDMP: string;
  srednicaCylindra: string;
  srednicaWaluRozrzadu: string;
  promienPodstawowyKrzywki: string;
  skokZaworu: string;
  przelozenieDzwigienki?: string;
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

export type CamFormSchemaValue = CamFirstFormSchemaValue &
  CamSecondFormSchemaValue;

export type CamFormSchemaType =
  | CamFirstFormSchemaValue
  | CamSecondFormSchemaValue
  | CamFormSchemaValue;
