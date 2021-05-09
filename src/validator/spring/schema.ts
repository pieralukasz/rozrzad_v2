import { BaseFormControlType } from '../types';

export const springFirstFormSchema: BaseFormControlType[] = [
  {
    inputLabel: 'Przyspieszenie w punkcie granicznym F',
    formHelperText: 'aF [m/s^2]',
    name: 'przyspieszenieWPunkcieGranicznymF',
    required: true,
  },
  {
    inputLabel: 'Przyspieszenie na wierzchołku krzywki W',
    formHelperText: 'aW [m/s^2]',
    name: 'przyspieszenieNaWierzcholkuKrzywkiW',
    required: true,
  },
  {
    inputLabel: 'Położenie środka łuku wierzchołkowego',
    formHelperText: 'A [mm]',
    name: 'polozenieSrodkaLukuWierzcholkowego',
    required: true,
  },
  {
    inputLabel: 'Pochylenie promienia R krzywki w pkt. F',
    formHelperText: 'beta [deg]',
    name: 'pochyleniePromieniaRKrzywkiWPktF',
    required: true,
  },
  {
    inputLabel: 'Promień łuku wierzchołkowego',
    formHelperText: 'ro [mm]',
    name: 'promienLukuWierzcholkowego',
    required: true,
  },
  {
    inputLabel: 'Promień podstawowy krzywki',
    formHelperText: 'r [mm]',
    name: 'promienPodstawowyKrzywki',
    required: true,
  },
  {
    inputLabel: 'Średnica zewnętrzna stożka zaworu',
    formHelperText: 'dz [mm]',
    name: 'srednicaZewnetrznaStozkaZaworu',
    required: false,
  },
  {
    inputLabel: 'Skok zaworu',
    formHelperText: 'Hz [mm]',
    name: 'skokZaworu',
    required: true,
  },
  {
    inputLabel: 'Masy zastępcze zredukowane na oś zaworu',
    formHelperText: 'Mz [kg]',
    name: 'masyZastepczeZredukowaneNaOsZaworu',
    required: true,
  },
  {
    inputLabel: 'Współczynnik docisku zaworu',
    formHelperText: 'dp [kPa]',
    name: 'wspolczynnikDociskuZaworu',
    required: true,
  },
  {
    inputLabel: 'Przełożenie dźwigni zaworowej',
    formHelperText: 'ez/ep [-]',
    name: 'przelozenieDzwigniZaworowej',
    required: true,
  },
  {
    inputLabel: 'Stosunek sił sprężyny do sił bezwładnosci',
    formHelperText: 'S2/Pm [-]',
    name: 'stosunekSilSprezynyDoSilBezwladnosci',
    required: true,
  },
];

export const springSecondFormSchema: BaseFormControlType[] = [
  {
    inputLabel: 'Napięcie sprężyny przy zamkniętym zaworze',
    formHelperText: 'S1 [N]',
    name: 'napiecieSprezynyPrzyZamknietymZaworze',
    required: true,
  },
  {
    inputLabel: 'Napięcie sprężyny przy otwartym zaworze',
    formHelperText: 'S2 [N]',
    name: 'napiecieSprezynyPrzyOtwartymZaworze',
    required: true,
  },
  {
    inputLabel: 'Stosunek sił w sprężynie',
    formHelperText: 'S1/S2 [N]',
    name: 'stosunekSilWSprezynie',
    required: true,
  },
  {
    inputLabel: 'Stała sprężyny',
    formHelperText: 'C [N/mm]',
    name: 'stalaSprezyny',
    required: true,
  },
  {
    inputLabel: 'Stosunek sił sprężyny do sił bezwładn. w pkt. F',
    formHelperText: 'sF [N]',
    name: 'stosunekSilSprezynyDoSilBezwlandWPktF',
    required: true,
  },
  {
    inputLabel: 'Stosunek sił sprężyny do sił bezwładn. w pkt. W',
    formHelperText: 'SsW [N]',
    name: 'stosunekSilSprezynyDoSilBezwlandWPktW',
    required: true,
  },
];
