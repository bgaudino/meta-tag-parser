import { Container, Grid, TextField, Typography } from "@mui/material";
import MetaTagTable from "./components/MetaTagTable";

function App() {
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
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MetaTagTable />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
