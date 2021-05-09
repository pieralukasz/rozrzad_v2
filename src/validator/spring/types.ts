export type SpringFirstFormSchemaValue = {
  przyspieszenieWPunkcieGranicznymF: string;
  przyspieszenieNaWierzcholkuKrzywkiW: string;
  polozenieSrodkaLukuWierzcholkowego: string;
  pochyleniePromieniaRKrzywkiWPktF: string;
  promienLukuWierzcholkowego: string;
  promienPodstawowyKrzywki: string;
  srednicaZewnetrznaStozkaZaworu?: string;
  skokZaworu: string;
  masyZastepczeZredukowaneNaOsZaworu: string;
  wspolczynnikDociskuZaworu: string;
  przelozenieDzwigniZaworowej: string;
  stosunekSilSprezynyDoSilBezwladnosci: string;
};

export type SpringSecondFormSchemaValue = {
  napiecieSprezynyPrzyZamknietymZaworze: string;
  napiecieSprezynyPrzyOtwartymZaworze: string;
  stosunekSilWSprezynie: string;
  stalaSprezyny: string;
  stosunekSilSprezynyDoSilBezwlandWPktF: string;
  stosunekSilSprezynyDoSilBezwlandWPktW: string;
};

export type SpringFormSchemaValue = SpringFirstFormSchemaValue &
  SpringSecondFormSchemaValue;

export type SpringFormSchemaType =
  | SpringFirstFormSchemaValue
  | SpringSecondFormSchemaValue
  | SpringFormSchemaValue;
