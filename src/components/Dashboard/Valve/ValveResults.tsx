import React, { useEffect, useState } from 'react';
import { BaseFormControlType } from '../../../validator/types';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import styled from 'styled-components';

type ValveResultsProps = {
  results: BaseFormControlType[];
};

const ValveResults: React.FC<ValveResultsProps> = ({ results }) => {
  function createData(name: string, value: string, unit: string) {
    return { name, value, unit };
  }

  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
    const initial: { name: string; value: string; unit: string }[] = [];

    results.map(item => {
      const D = '[' + item.formHelperText.split('[')[0].trim() + ']';

      initial.push(
        createData(
          `${item.inputLabel} ${D}`,
          item.value as string,
          `[${item.formHelperText.split('[')[1]}`
        )
      );
    });

    setRows(initial);
  }, []);

  return (
    // <ul>
    //   {results
    //     ? results.map(res => {
    //         return (
    //           <li key={res.name}>
    //             {res.inputLabel} {res.formHelperText.split('[')[0]} -{' '}
    //             {res.value} [{res.formHelperText.split('[')[1]}
    //           </li>
    //         );
    //       })
    //     : ''}
    // </ul>
    <TableContainerStyle component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCellHeader>Nazwa</TableCellHeader>
            <TableCellHeader align="center">Wartość</TableCellHeader>
            <TableCellHeader align="center">Jednostka</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow>
              <TableCellBody component="th" scope="row">
                {row.name}
              </TableCellBody>
              <TableCellBody align="center">
                {row.value ? row.value : '---'}
              </TableCellBody>
              <TableCellBody align="center">{row.unit}</TableCellBody>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainerStyle>
  );
};

const TableContainerStyle = styled(Paper)`
  width: 50% !important;
  background-color: #626654 !important;
  color: black !important;
`;

const TableCellHeader = styled(TableCell)`
  font-weight: bold !important;
  border-bottom: 2px solid white !important;
  padding: 8px !important;
`;

const TableCellBody = styled(TableCell)`
  font-weight: bold !important;
  padding: 6px 8px !important;
`;

export default ValveResults;
