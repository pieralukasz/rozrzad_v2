import { BaseFormControlType } from '../types';
import { camSecondFormSchemaIntake } from './intakeSchema';

export const camFirstFormSchemaOutlet: BaseFormControlType[] = [
  {
    inputLabel: 'Kąt otwarcia zaworu przed DMP',
    formHelperText: 'kat_O [deg]',
    name: 'katOtwarciaZaworuPrzedDMP',
    required: true,
    min: 30,
    max: 70,
    additionalHelperItem: '30 <= kat_O <= 70',
  },
  {
    inputLabel: 'Kąt zamknięcia zaworu po DMP',
    formHelperText: 'kat_Z [deg]',
    name: 'katZamknieciaZaworuPoDMP',
    required: true,
    min: 5,
    max: 25,
    additionalHelperItem: '5 <= kat_Z <= 25',
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
    additionalHelperItem: 'Wprowadź średnice wału rozrządu d.',
  },
  {
    inputLabel: 'Promień podstawowy krzywki',
    formHelperText: 'r [mm]',
    name: 'promienPodstawowyKrzywki',
    required: true,
    additionalHelperItem: '',
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

export const camSecondFormSchemaOutlet = camSecondFormSchemaIntake;
