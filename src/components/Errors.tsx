import { Alert, Typography } from "@mui/material";

interface ErrorProps {
  error: {
    code: string;
    msg: string;
    line?: number;
    column?: number;
  };
}

export default function Errors({ error }: ErrorProps) {
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
