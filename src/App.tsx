import { useState, useRef } from "react";
import { Container, Grid, TextField, Typography } from "@mui/material";
import { parseMetadata } from "./utils/parseXML";
import MetaTagTable from "./components/MetaTagTable";
import Errors from "./components/Errors";
import { ParserError, Metadata } from "./types";

function App() {
  const [xml, setXml] = useState("");
  const [data, setData] = useState<Metadata[]>([]);
  const [error, setError] = useState<ParserError | null>(null);
  const timeoutRef = useRef<number | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { value } = e.target;
    setXml(value);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    if (!e.target.value) {
      setData([]);
      setError(null);
      return;
    }
    const parsed = parseMetadata(e.target.value);
    setData(parsed.data);
    timeoutRef.current = window.setTimeout(
      () => {
        setError(parsed.error);
      },
      parsed.error ? 300 : 0
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        component="h1"
        variant="h4"
        sx={{ textAlign: "center", mb: 3 }}
      >
        Meta Tag Parser
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            autoFocus
            multiline
            rows={12}
            fullWidth
            label="XML"
            variant="outlined"
            value={xml}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MetaTagTable data={data} />
        </Grid>
        {xml.trim() && error && (
          <Grid item xs={12} md={6}>
            <Errors error={error} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default App;
