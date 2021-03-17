import { BaseFormControlType } from '../types';

export const camFirstFormSchemaIntake: BaseFormControlType[] = [
  {
    inputLabel: 'Kąt otwarcia zaworu przed DMP',
    formHelperText: 'kat_O [deg]',
    name: 'katOtwarciaZaworuPrzedDMP',
    required: true,
    min: -10,
    max: 30,
    additionalHelperItem: '-10 <= kat_O <= 30',
  },
  {
    inputLabel: 'Kąt zamknięcia zaworu po DMP',
    formHelperText: 'kat_Z [deg]',
    name: 'katZamknieciaZaworuPoDMP',
    required: true,
    min: 25,
    max: 60,
    additionalHelperItem: '25 <= kat_Z <= 60',
  },
  {
    inputLabel: 'Średnica Cylindra',
    formHelperText: 'D [mm]',
    name: 'srednicaCylindra',
    required: true,
  },
  {
    inputLabel: 'Średnica wału rozrządu',
    formHelperText: 'd [mm]',
    name: 'srednicaWaluRozrzadu',
    required: true,
  },
  {
    inputLabel: 'Promień podstawowy krzywki',
    formHelperText: 'r [mm]',
    name: 'promienPodstawowyKrzywki',
    required: true,
    additionalHelperItem: 'Wprowadź średnice wału rozrządu d.',
  },
  {
    inputLabel: 'Skok zaworu',
    formHelperText: 'Hz [mm]',
    name: 'skokZaworu',
    required: true,
  },
  {
    inputLabel: 'Przełożenie dźwigienki',
    formHelperText: 'ez / ep = Hz / Hk [-]',
    name: 'przelozenieDzwigienki',
    required: false,
  },
  {
    inputLabel: 'Promień łuku wierzchołkowego',
    formHelperText: 'ro [mm]',
    name: 'promienLukuWierzcholkowego',
    required: true,
  },
];

export const camSecondFormSchemaIntake: BaseFormControlType[] = [
  {
    inputLabel: 'Skok krzywki',
    formHelperText: 'Hk [mm]',
    name: 'skokKrzywki',
    required: true,
  },
  {
    inputLabel: 'Promień łuku bocznego',
    formHelperText: 'R [mm]',
    name: 'promienLukuBocznego',
    required: true,
  },
  {
    inputLabel: 'Położenie środka łuku wierzchołkowego',
    formHelperText: 'A [mm]',
    name: 'polozenieSrodkaLukuWierzcholkowego',
    required: true,
  },
  {
    inputLabel: 'Współrzędne punktu granicznego E',
    formHelperText: 'xE, yE [mm]',
    name: 'wspolrzednePunktuGranicznegoE',
    required: true,
  },
  {
    inputLabel: 'Współrzędne środka promienia łuku R',
    formHelperText: 'xB, yB [mm]',
    name: 'wspolrzedneSrodkaPromieniaLukuR',
    required: true,
  },
  {
    inputLabel: 'Współrzędne punktu granicznego F',
    formHelperText: 'xF, yF [mm]',
    name: 'wspolrzednePunktuGranicznegoF',
    required: true,
  },
  {
    inputLabel: 'Wartość kąta DBF',
    formHelperText: 'beta [deg]',
    name: 'wartoscKataDBF',
    required: true,
  },
];
