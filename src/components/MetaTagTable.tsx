import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface TableRow {
  tag: string;
  property: string;
  content: string;
}
interface TableProps {
  data: TableRow[];
}

export default function MetaTagTable({ data }: TableProps) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Property</TableCell>
            <TableCell>Content</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: TableRow) => (
            <TableRow key={row.property} hover>
              <TableCell>{row.property}</TableCell>
              <TableCell>{row.content}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
