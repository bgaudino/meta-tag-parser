import { Alert, Typography } from "@mui/material";

export default function Errors({ errors }: any) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Errors
      </Typography>
      {errors.map((error: any, index: number) => (
        <Alert key={index} severity="error">
          <strong>{error.key}:</strong> {error.value}
        </Alert>
      ))}
    </>
  );
}
