import { IntakeFirstFormSchemaValue } from '../../../../validator/valve/intake/types';

export const calculateSrednicaKanalu = (
  firstFormSchema: IntakeFirstFormSchemaValue
): number | string => {
  const {
    skokTloka,
    predkoscObrotowaSilnika,
    srednicaTloka,
    sredniaPredkoscPrzeplywu,
    srednicaTrzonkuZaworu,
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
      (4 * f) / Math.PI + Math.pow(parseFloat(srednicaTrzonkuZaworu), 2)
    )
  );

  return Dk.toString();
};
