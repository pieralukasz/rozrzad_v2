import { BaseFormControlType } from '../../types';

export const intakeFirstFormSchema: BaseFormControlType[] = [
  {
    inputLabel: 'Średnica Tłoka',
    formHelperText: 'D [mm]',
    name: 'srednicaTloka',
    required: true,
  },
  {
    inputLabel: 'Skok Tłoka',
    formHelperText: 'S [mm]',
    name: 'skokTloka',
    required: true,
  },
  {
    inputLabel: 'Prędkość obrotowa silnika',
    formHelperText: 'n [obr/min]',
    name: 'predkoscObrotowaSilnika',
    required: true,
  },
  {
    inputLabel: 'Średnia prędkość przepływu',
    formHelperText: 'Wsr [m/s]',
    name: 'sredniaPredkoscPrzeplywu',
    required: true,
  },
  {
    inputLabel: 'Średnica trzonku zaworu',
    formHelperText: 'd [mm]',
    name: 'srednicaTrzonkuZaworu',
    required: true,
    value: '10',
  },
  {
    inputLabel: 'Maksymalne nadciśnienie w cylindrze',
    formHelperText: 'pmax [MPa]',
    name: 'maksymalneNadcisnienieWCylindrze',
    required: true,
  },
  {
    inputLabel: 'Liczba zaworów na cylinder',
    formHelperText: 'n [-]',
    name: 'liczbaZaworowNaCylinder',
    required: false,
  },
  {
    inputLabel: 'Kąt pochylenia przylgni zaworowej',
    formHelperText: 'alfa [deg]',
    name: 'katPochyleniaPrzylgniZaworowej',
    required: true,
  },
];

export const intakeSecondFormSchema: BaseFormControlType[] = [
  {
    inputLabel: 'Średnica kanału',
    formHelperText: 'Dk [mm]',
    name: 'srednicaKanalu',
  },
  {
    inputLabel: 'Średnica wewnętrzna przylgni',
    formHelperText: 'Dwp [mm]',
    name: 'srednicaWewnetrznaPrzylgni',
  },
  {
    inputLabel: 'Średnica zewnętrzna przylgni',
    formHelperText: 'Dzp [mm]',
    name: 'srednicaZewnetrznaPrzylgni',
  },
  {
    inputLabel: 'Średnica wewnętrzna grzybka zaworu',
    formHelperText: 'Dwz [mm]',
    name: 'srednicaWewnetrznaGrzybkaZaworu',
  },
  {
    inputLabel: 'Średnica zewnętrzna grzybka zaworu',
    formHelperText: 'Dzz [mm]',
    name: 'srednicaZewnetrznaGrzybkaZaworu',
  },
  {
    inputLabel: 'Grubość grzybka zaworu',
    formHelperText: 'Gg [mm]',
    name: 'gruboscGrzybkaZaworu',
  },
  {
    inputLabel: 'Wznios zaworu',
    formHelperText: 'Hz [mm]',
    name: 'wzniosZaworu',
  },
  {
    inputLabel: 'Naprężenia w grzybku zaworu',
    formHelperText: 'sigma [MPa]',
    name: 'naprezeniaWGrzybkuZaworu',
  },
  {
    inputLabel: 'Szerokość przylgni zaworowej',
    formHelperText: 'Sp [mm]',
    name: 'szerokoscPrzylgniZaworowej',
  },
];
