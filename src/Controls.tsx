import { AttachMoney, Percent } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  useTheme,
} from "@mui/material";
import React from "react";

export default function Controls({
  initialDeposit,
  setInitialDeposit,
  contribution,
  setContribution,
  contributionFrequency,
  setContibutionFrequency,
  rateOfReturn,
  setRateOfReturn,
  compoundFrequency,
  setCompoundFrequency,
  yearsOfGrowth,
  setYearsOfGrowth,
}: {
  initialDeposit: number;
  setInitialDeposit: React.Dispatch<React.SetStateAction<number>>;
  contribution: number;
  setContribution: React.Dispatch<React.SetStateAction<number>>;
  contributionFrequency: number;
  setContibutionFrequency: React.Dispatch<React.SetStateAction<number>>;
  rateOfReturn: number;
  setRateOfReturn: React.Dispatch<React.SetStateAction<number>>;
  compoundFrequency: number;
  setCompoundFrequency: React.Dispatch<React.SetStateAction<number>>;
  yearsOfGrowth: number;
  setYearsOfGrowth: React.Dispatch<React.SetStateAction<number>>;
}) {
  const theme = useTheme();

  return (
    <>
      <TextField
        fullWidth
        label="Initial Deposit"
        type="number"
        inputProps={{ step: 100 }}
        InputProps={{
          endAdornment: <AttachMoney fontSize="small" color="disabled" />,
        }}
        defaultValue={initialDeposit}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          let newValue = parseFloat(event.target.value);

          if (newValue) setInitialDeposit(newValue);
          else setInitialDeposit(0);
        }}
        sx={{ mb: theme.spacing(4) }}
      />

      <TextField
        fullWidth
        label="Contribution"
        type="number"
        inputProps={{ step: 50 }}
        InputProps={{
          endAdornment: <AttachMoney fontSize="small" color="disabled" />,
        }}
        defaultValue={contribution}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          let newValue = parseFloat(event.target.value);

          if (newValue) setContribution(newValue);
          else setContribution(0);
        }}
        sx={{ mb: theme.spacing(2) }}
      />
      <FormControl fullWidth sx={{ mb: theme.spacing(4) }}>
        <InputLabel>Contribution Frequency</InputLabel>
        <Select
          label="Contribution Frequency"
          size="small"
          value={contributionFrequency.toString()}
          onChange={(event: SelectChangeEvent) => {
            setContibutionFrequency(parseInt(event.target.value));
          }}
        >
          <MenuItem value={1}>Annually</MenuItem>
          <MenuItem value={2}>Semi-Annually</MenuItem>
          <MenuItem value={4}>Quarterly</MenuItem>
          <MenuItem value={12}>Monthly</MenuItem>
          <MenuItem value={365}>Daily</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Years of Growth"
        type="number"
        value={yearsOfGrowth}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          let newValue = parseInt(event.target.value);

          if (newValue) setYearsOfGrowth(newValue);
          else setYearsOfGrowth(0);
        }}
        sx={{ mb: theme.spacing(4) }}
      />

      <TextField
        fullWidth
        label="Rate of Return"
        type="number"
        InputProps={{
          endAdornment: <Percent fontSize="small" color="disabled" />,
        }}
        value={rateOfReturn}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          let newValue = parseFloat(event.target.value);

          if (newValue) setRateOfReturn(newValue);
          else setRateOfReturn(0);
        }}
        sx={{ mb: theme.spacing(2) }}
      />
      <FormControl fullWidth>
        <InputLabel>Compound Frequency</InputLabel>
        <Select
          label="Compound Frequency"
          size="small"
          value={compoundFrequency.toString()}
          onChange={(event: SelectChangeEvent) => {
            setCompoundFrequency(parseInt(event.target.value));
          }}
        >
          <MenuItem value={1}>Annually</MenuItem>
          <MenuItem value={2}>Semi-Annually</MenuItem>
          <MenuItem value={4}>Quarterly</MenuItem>
          <MenuItem value={12}>Monthly</MenuItem>
          <MenuItem value={365}>Daily</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
