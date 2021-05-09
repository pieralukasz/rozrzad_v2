import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import styled from 'styled-components';
import springParameters from '../../../utils/springParameters';
import { calculateS1 } from '../Spring/calculations';

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

  const calculatenm2 = useCallback((tau2: number) => {
    return (0.58 * Rm) / tau2;
  }, []);

  const prepareAllParameters = () => {
    const ar = [];

    const {
      przyspieszenieNaWierzcholkuKrzywkiW,
      masyZastepczeZredukowaneNaOsZaworu,
      przelozenieDzwigniZaworowej,
      promienLukuWierzcholkowego,
    } = springForm.firstForm;

    const dD = 3.5 / 37;

    const Pm =
      Math.round(
        +przyspieszenieNaWierzcholkuKrzywkiW *
          +masyZastepczeZredukowaneNaOsZaworu *
          +przelozenieDzwigniZaworowej *
          1000
      ) / 1000;

    console.log(Pm * 1.5);

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

      console.log(nr);

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

      obj.wspolczynniknm2 = calculatenm2(
        calculateTau2(
          getGohner(+obj.dD),
          srednicaPodzialowa,
          +springForm.secondForm.napiecieSprezynyPrzyOtwartymZaworze,
          +promienLukuWierzcholkowego
        )
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
