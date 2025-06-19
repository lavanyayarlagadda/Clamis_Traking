import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Collapse, Box, Typography, IconButton
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

type Column<T> = {
  label: string;
  accessor: keyof T | string;
  render?: (row: T) => React.ReactNode;
  align?: 'left' | 'right' | 'center';
};

interface DynamicTableProps<T> {
  columns: Column<T>[];
  data: T[];
  getExpandableContent?: (row: T) => React.ReactNode;
  rowKey: keyof T;
}

export function DynamicTable<T>({
  columns,
  data,
  getExpandableContent,
  rowKey,
}: DynamicTableProps<T>) {
  const [expandedRow, setExpandedRow] = React.useState<null | string>(null);

  const toggleRow = (key: string) => {
    setExpandedRow(prev => (prev === key ? null : key));
  };

  return (
    <TableContainer component={Paper} elevation={1}>
      <Table size="medium">
        <TableHead>
          <TableRow>
            {getExpandableContent && (
              <TableCell />
            )}
            {columns.map((col, idx) => (
              <TableCell key={idx} align={col.align || 'left'}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, rowIndex) => {
            const rowId = String(row[rowKey]);
            const isExpanded = expandedRow === rowId;

            return (
              <React.Fragment key={rowId}>
                <TableRow hover>
                  {getExpandableContent && (
                    <TableCell padding="checkbox">
                      <IconButton size="small" onClick={() => toggleRow(rowId)}>
                        {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                      </IconButton>
                    </TableCell>
                  )}
                  {columns.map((col, colIndex) => (
                    <TableCell key={colIndex} align={col.align || 'left'}>
                      {col.render ? col.render(row) : (row as any)[col.accessor]}
                    </TableCell>
                  ))}
                </TableRow>

                {isExpanded && getExpandableContent && (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1} sx={{ p: 2, bgcolor: '#f9fafb' }}>
                      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <Box>{getExpandableContent(row)}</Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
