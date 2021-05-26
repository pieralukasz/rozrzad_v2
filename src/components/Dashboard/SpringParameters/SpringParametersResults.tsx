import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import styled from 'styled-components';
import springParameters from '../../../utils/springParameters';

const Rm = 1570;

const SpringParametersResults: React.FC = () => {
  const springForm = useAppSelector(state => state.springForm);
  const [parameters, setParameters] = useState([]);

  const getGohner = useCallback((dd: number) => {
    if (dd <= 0.08) {
      return 1.092;
    } else if (dd <= 0.09) {
      return 1.106;
    } else if (dd <= 0.1) {
      return 1.12;
    } else if (dd <= 0.11) {
      return 1.135;
    } else if (dd <= 0.12) {
      return 1.149;
    } else if (dd <= 0.13) {
      return 1.164;
    } else if (dd <= 0.14) {
      return 1.179;
    } else if (dd <= 0.15) {
      return 1.195;
    } else if (dd <= 0.16) {
      return 1.211;
    } else if (dd <= 0.17) {
      return 1.226;
    } else {
      return 1.226;
    }
  }, []);

  const calculateTau2 = useCallback(
    (gohner: number, D: number, S2: number, d: number) => {
      return (gohner * 2.55 * D * S2) / Math.pow(d, 3);
    },
    []
  );

  const calculateDd = useCallback((D: number, d: number) => {
    return Math.round((d / D) * 1000) / 1000;
  }, []);

  const calculatenm = useCallback((tau: number) => {
    return (0.58 * Rm) / tau;
  }, []);

  const calculateC = useCallback((s1: number, s2: number, Hzd: number) => {
    return Math.round(((s2 - s1) / Hzd) * 10) / 10;
  }, []);

  const calculateIcz = useCallback((d: number, c: number, D: number) => {
    const icz = (81500 * Math.pow(d, 4)) / (8 * c * Math.pow(D, 3));
    const r = icz % 0.5;

    if (r < 0.5) {
      return icz - r;
    } else {
      return icz + r;
    }
  }, []);

  const calculateL1 = useCallback((d: number, icz: number, Hzd: number) => {
    return (
      Math.ceil(((icz + 1.5) * d + (icz + 0.5) * (d * 0.3) + Hzd) * 10) / 10
    );
  }, []);

  const calculateL0 = useCallback((L1: number, S1: number, c: number) => {
    return L1 + S1 / c;
  }, []);

  const calculateS3orT3 = useCallback(
    (S2orT2: number, Lo: number, L2: number, L3: number) => {
      return (S2orT2 * (Lo - L3)) / (Lo - L2);
    },
    []
  );

  const calculateLd = useCallback((D: number, icz: number) => {
    return Math.PI * D * (icz + 2.5);
  }, []);

  const prepareAllParameters = () => {
    const ar = [];

    const {
      przyspieszenieNaWierzcholkuKrzywkiW,
      masyZastepczeZredukowaneNaOsZaworu,
      przelozenieDzwigniZaworowej,
      promienLukuWierzcholkowego,
      stosunekSilWSprezynie,
      skokZaworu,
    } = springForm.firstForm;

    const dD = 3.5 / 37;

    const Pm =
      Math.round(
        +przyspieszenieNaWierzcholkuKrzywkiW *
          +masyZastepczeZredukowaneNaOsZaworu *
          +przelozenieDzwigniZaworowej *
          1000
      ) / 1000;

    let Dd = calculateDd(
      +springForm.thirdForm.srednicaZewnetrznaSprezynyZWarKonstr,
      +promienLukuWierzcholkowego
    );

    let count = 0;

    while (Dd < 0.16) {
      const obj: any = {};
      springParameters.map(item => {
        obj[item.value] = '';
      });

      const srednicaPodzialowa =
        Number(springForm.thirdForm.srednicaZewnetrznaSprezynyZWarKonstr) -
        (count + 1);

      const omega =
        (2 * Math.PI * +springForm.thirdForm.predkoscObrotowaSilnika) / 60;

      const nr =
        +springForm.thirdForm.liczbaSuwowSilnika === 4 ? omega / 2 : omega;

      // stałe wartości`
      obj.srednicaDrutu = String(Number(promienLukuWierzcholkowego).toFixed(3));
      obj.srednicaPodzialowa = srednicaPodzialowa.toFixed(3);
      obj.silaS2 = Number(
        springForm.fourthForm.silaWObliczanejSprezynieS2
      ).toFixed(3);

      obj.dD = calculateDd(
        +srednicaPodzialowa,
        +promienLukuWierzcholkowego
      ).toFixed(3);

      obj.silaS1 = (
        +springForm.secondForm.napiecieSprezynyPrzyOtwartymZaworze /
        (+stosunekSilWSprezynie + (Math.random() * 3) / 10)
      ).toFixed(3);

      const tau2 = calculateTau2(
        getGohner(+obj.dD),
        srednicaPodzialowa,
        +springForm.secondForm.napiecieSprezynyPrzyOtwartymZaworze,
        +promienLukuWierzcholkowego
      );

      obj.wspolczynniknm2 = calculatenm(tau2).toFixed(3);

      obj.stalaSprezyny = calculateC(+obj.silaS1, +obj.silaS2, +skokZaworu);

      obj.liczbaZwojowCzynnych = calculateIcz(
        +obj.srednicaDrutu,
        +obj.stalaSprezyny,
        +obj.srednicaPodzialowa
      );

      obj.dlugoscL1 = calculateL1(
        +obj.liczbaZwojowCzynnych,
        +obj.srednicaDrutu,
        +skokZaworu
      );

      obj.dlugoscLo = calculateL0(
        +obj.dlugoscL1,
        +obj.silaS1,
        +obj.stalaSprezyny
      ).toFixed(2);

      obj.dlugoscL2 = (+obj.dlugoscL1 - +skokZaworu).toFixed(2);

      obj.dlugoscL3 = (
        (+obj.liczbaZwojowCzynnych + 1.5) *
        +obj.srednicaDrutu
      ).toFixed(2);

      obj.silaS3 = calculateS3orT3(
        +obj.silaS2,
        +obj.dlugoscLo,
        +obj.dlugoscL2,
        +obj.dlugoscL3
      ).toFixed(3);

      obj.wspolczynniknm3 = calculatenm(
        calculateS3orT3(tau2, +obj.dlugoscLo, +obj.dlugoscL2, +obj.dlugoscL3)
      ).toFixed(3);

      obj.dlugoscLd = calculateLd(
        +obj.srednicaPodzialowa,
        +obj.liczbaZwojowCzynnych
      ).toFixed(3);

      ar.push(obj);
      count++;
      Dd = +obj.dD;
    }

    setParameters(ar as any);
  };

  useEffect(() => {
    prepareAllParameters();
    console.log(springParameters);
  }, []);

  return (
    <>
      {parameters.map((value, count) => (
        <ParameterContainer
          key={count}
          style={{ marginLeft: count === 0 ? 300 : 30 }}
        >
          {springParameters.map((item, index) => (
            <ParameterItem key={`${count}_${item.value}`}>
              <span>{value[item.value] !== '' ? value[item.value] : '-'}</span>
            </ParameterItem>
          ))}
        </ParameterContainer>
      ))}
    </>
  );
};

export default SpringParametersResults;

const ParameterContainer = styled.ul`
  min-width: 150px;
  height: calc(70% + 50px);
  border: 2px solid white;
  list-style: none;
  padding: 12px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.4);
  margin-left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &:first-child {
    margin-left: 300px;
  }
`;

const ParameterItem = styled.li`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 12px;
`;
