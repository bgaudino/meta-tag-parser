import { useState } from "react";
import { Container, Grid, TextField, Typography } from "@mui/material";
import { parseXML } from "./utils/parseXML";
import MetaTagTable from "./components/MetaTagTable";
import Errors from "./components/Errors";

function App() {
  const [xml, setXml] = useState("");
  const [data, setData] = useState<any>([]);
  const [errors, setErrors] = useState<any>([]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setXml(e.target.value);
    const parsed = parseXML(e.target.value);
    setData(parsed.data);
    setErrors(parsed.errors);
  }

  return (
    <Container>
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
            rows={10}
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
        {errors.length > 0 && (
          <Grid item xs={12} md={6}>
            <Errors errors={errors} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default App;
