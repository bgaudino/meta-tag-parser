import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  styled,
} from "@mui/material";

interface Metadata {
  tag: string;
  property: string;
  content: string;
}
interface TableProps {
  data: Metadata[];
}

type sortField = "property" | "content";
type sortDirection = "asc" | "desc";
type fields = sortField[];

const headers: fields = ["property", "content"];

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.info.light,
}));

export default function MetaTagTable({ data }: TableProps) {
  const [sortField, setSortField] = useState<sortField>("property");
  const [sortDirection, setSortDirection] = useState<sortDirection>("asc");

  function handleSort(field: sortField) {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  }

  function sortData(data: Metadata[]) {
    const sorted = [...data];
    sorted.sort((a, b) => {
      if (a[sortField]?.toLowerCase() > b[sortField]?.toLowerCase()) {
        return sortDirection === "asc" ? 1 : -1;
      }
      if (a[sortField]?.toLowerCase() < b[sortField]?.toLowerCase()) {
        return sortDirection === "asc" ? -1 : 1;
      }
      return 0;
    });
    return sorted;
  }

  const sortedData = sortData(data);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <StyledTableRow>
            {headers.map((field: sortField) => (
              <TableCell key={field}>
                <TableSortLabel
                  active={sortField === field}
                  direction={sortField === field ? sortDirection : "asc"}
                  onClick={() => handleSort(field)}
                  hideSortIcon={sortField !== field}
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  {field}
                </TableSortLabel>
              </TableCell>
            ))}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row: Metadata) => (
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
