import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { JSX } from "react";

export function DynamicTable({
  columns,
  data,
  actions = [],
}: {
  columns: any[];
  data: any[];
  actions?: { label: string; icon: JSX.Element; onClick: (row: any) => void }[];
}) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell key={col.key}>{col.label}</TableCell>
          ))}
          {actions.length > 0 && <TableCell>Actions</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, idx) => (
          <TableRow key={idx} hover>
            {columns.map((col) => (
              <TableCell key={col.key}>
                {col.render ? col.render(row) : row[col.key]}
              </TableCell>
            ))}
            {actions.length > 0 && (
              <TableCell>
                {actions.map((action, i) => (
                  <Button
                    key={i}
                    size="small"
                    variant="outlined"
                    onClick={() => action.onClick(row)}
                    startIcon={action.icon}
                  >
                    {action.label}
                  </Button>
                ))}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}