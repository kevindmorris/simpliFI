import { Container, Paper, TextField, useTheme } from "@mui/material";
import React from "react";
import Chart from "./Chart";

export default function App() {
  const theme = useTheme();

  const [initialDeposit, setInitialDeposit] = React.useState<number>(20000);
  const [yearlyContribution, setYearlyContribution] = React.useState<number>(1000);
  const [yearsOfGrowth, setYearsOfGrowth] = React.useState<number>(10);
  const [rateOfReturn, setRateOfReturn] = React.useState<number>(6);

  return (
    <Container
      style={{
        width: "100vw",
        height: "100vh",
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        display: "flex",
        gap: theme.spacing(6),
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          flex: 1,
          height: "100%",
          padding: theme.spacing(3),
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(3),
        }}
      >
        <TextField
          fullWidth
          label="Initial Deposit"
          type="number"
          value={initialDeposit}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            let newValue = parseFloat(event.target.value);
            setInitialDeposit(newValue);
          }}
        />
        <TextField
          fullWidth
          label="Yearly Contribution"
          type="number"
          value={yearlyContribution}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            let newValue = parseFloat(event.target.value);
            setYearlyContribution(newValue);
          }}
        />
        <TextField
          fullWidth
          label="Years of Growth"
          type="number"
          value={yearsOfGrowth}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            let newValue = parseInt(event.target.value);
            setYearsOfGrowth(newValue);
          }}
        />
        <TextField
          fullWidth
          label="Yearly Rate of Return"
          type="number"
          value={rateOfReturn}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            let newValue = parseFloat(event.target.value);
            setRateOfReturn(newValue);
          }}
        />
      </Paper>
      <Paper variant="outlined" sx={{ flex: 2, height: "100%" }}>
        {initialDeposit &&
        yearlyContribution &&
        rateOfReturn &&
        yearsOfGrowth ? (
          <Chart
            a={initialDeposit}
            p={yearlyContribution}
            r={rateOfReturn / 100}
            t={yearsOfGrowth}
          />
        ) : null}
      </Paper>
    </Container>
  );
}
