import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function MetaTagTable() {
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
          <TableRow>
            <TableCell>Content</TableCell>
            <TableCell>Property</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
