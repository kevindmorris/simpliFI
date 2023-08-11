import { Container, Paper, useTheme } from "@mui/material";
import React from "react";
import Controls from "./Controls";
import Graph from "./Graph";

export default function App() {
  const theme = useTheme();

  const [width, setWidth] = React.useState<number>(window.innerWidth);
  React.useEffect(() => {
    setWidth(window.innerWidth);
  }, [window.innerWidth]);

  const [initialDeposit, setInitialDeposit] = React.useState<number>(10000);
  const [contribtution, setContribution] = React.useState<number>(100);
  const [contribtutionFrequency, setContibutionFrequency] =
    React.useState<number>(12);
  const [yearsOfGrowth, setYearsOfGrowth] = React.useState<number>(5);
  const [rateOfReturn, setRateOfReturn] = React.useState<number>(7);
  const [compoundFrequency, setCompoundFrequency] = React.useState<number>(12);

  return (
    <Container
      style={{
        width: "100vw",
        height: "100vh",
        overflowY: "auto",
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        display: "flex",
        flexDirection: width < 1000 ? "column" : "row",
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
        }}
      >
        <Controls
          initialDeposit={initialDeposit}
          setInitialDeposit={setInitialDeposit}
          contribution={contribtution}
          setContribution={setContribution}
          contributionFrequency={contribtutionFrequency}
          setContibutionFrequency={setContibutionFrequency}
          rateOfReturn={rateOfReturn}
          setRateOfReturn={setRateOfReturn}
          compoundFrequency={compoundFrequency}
          setCompoundFrequency={setCompoundFrequency}
          yearsOfGrowth={yearsOfGrowth}
          setYearsOfGrowth={setYearsOfGrowth}
        />
      </Paper>

      <Paper
        variant="outlined"
        sx={{
          flex: 2,
          minHeight: 500,
          height: "100%",
          padding: theme.spacing(3),
        }}
      >
        {initialDeposit !== undefined &&
        contribtution !== undefined &&
        rateOfReturn !== undefined &&
        yearsOfGrowth !== undefined ? (
          <Graph
            initialDeposit={initialDeposit}
            contribution={contribtution}
            contributionFrequency={contribtutionFrequency}
            rateOfReturn={rateOfReturn / 100}
            compoundFrequency={compoundFrequency}
            yearsOfGrowth={yearsOfGrowth}
          />
        ) : null}
      </Paper>
    </Container>
  );
}
