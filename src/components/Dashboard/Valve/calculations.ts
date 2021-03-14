import {
  ValveFirstFormSchemaValue,
  ValveSecondFormSchemaValue,
} from '../../../validator/valve/types';

export const calculateSrednicaKanalu = (
  firstFormSchema: ValveFirstFormSchemaValue
): number | string => {
  const {
    skokTloka,
    predkoscObrotowaSilnika,
    srednicaTloka,
    sredniaPredkoscPrzeplywu,
    srednicaTrzonkaZaworu,
  } = firstFormSchema;

  // średnia prędkość tłoka
  const csr =
    (parseFloat(skokTloka) * parseFloat(predkoscObrotowaSilnika)) / 30000;

  const promienTloka = parseFloat(srednicaTloka) / 2;

  // najmniejsze pole przekroju poprzecznego kanalu
  const f =
    (Math.pow(promienTloka, 2) * Math.PI * csr) /
    parseFloat(sredniaPredkoscPrzeplywu);

  // średnica kanału
  const Dk = Math.round(
    Math.sqrt(
      (4 * f) / Math.PI + Math.pow(parseFloat(srednicaTrzonkaZaworu), 2)
    )
  );

  return Dk.toString();
};

export const calculateNaprezeniaWGrzybkuZaworu = (
  firstFormSchema: ValveFirstFormSchemaValue,
  secondFormSchema: ValveSecondFormSchemaValue
): string => {
  const { maksymalneNadcisnienieWCylindrze } = firstFormSchema;

  const {
    srednicaWewnetrznaPrzylgni,
    srednicaZewnetrznaPrzylgni,
    gruboscGrzybkaZaworu,
  } = secondFormSchema;

  // sredni promien podparcia zaworu
  const r =
    (parseFloat(srednicaWewnetrznaPrzylgni) +
      parseFloat(srednicaZewnetrznaPrzylgni)) /
    2;

  // obliczeniowa grubosc grzybka
  const ogg = 1.3 * parseFloat(gruboscGrzybkaZaworu);

  const sigma =
    Math.pow(r / ogg, 2) * parseFloat(maksymalneNadcisnienieWCylindrze);

  return sigma.toString();
};
