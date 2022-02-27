import { useState } from "react";
import { Container, Grid, TextField, Typography } from "@mui/material";
import { parseMetadata } from "./utils/parseXML";
import MetaTagTable from "./components/MetaTagTable";
import Errors from "./components/Errors";

function App() {
  const [xml, setXml] = useState("");
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>([]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setXml(e.target.value);
    const library = parseMetadata(e.target.value);
    setData(library.data);
    setError(library.error);
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
