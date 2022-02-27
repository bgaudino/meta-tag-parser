import { Alert, Typography } from "@mui/material";
import { ParserError } from "../types";

export default function Errors({ error }: { error: ParserError }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Error
      </Typography>
      <Alert severity="error">
        <strong>{error.code}:</strong> {error.msg}
      </Alert>
    </>
  );
}
