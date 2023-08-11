import { Typography, useTheme } from "@mui/material";
import _, { capitalize } from "lodash";
import moment from "moment";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Graph({
  initialDeposit,
  contribution,
  contributionFrequency,
  rateOfReturn,
  compoundFrequency,
  yearsOfGrowth,
}: {
  initialDeposit: number;
  contribution: number;
  contributionFrequency: number;
  rateOfReturn: number;
  compoundFrequency: number;
  yearsOfGrowth: number;
}) {
  const theme = useTheme();

  const periods = _.range(0, yearsOfGrowth * contributionFrequency + 1);

  const effectiveInterestRate =
    Math.pow(1 + rateOfReturn / compoundFrequency, compoundFrequency) - 1;

  const effectiveInterestRateByContributionFrequency =
    (Math.pow(1 + effectiveInterestRate, 1 / contributionFrequency) - 1) *
    contributionFrequency;

  const i =
    effectiveInterestRateByContributionFrequency / contributionFrequency;

  const data = periods.map((d) => {
    let date = moment()
      .add(d, contributionFrequency === 1 ? "years" : "months")
      .format(contributionFrequency === 1 ? "yyyy" : "yyyy-MMM");
    let principal = initialDeposit + contribution * d;
    let balance =
      initialDeposit * Math.pow(1 + i, d) +
      contribution * ((Math.pow(1 + i, d) - 1) / i);
    let interest = balance - principal;
    return {
      index: d,
      date: date,
      principal: principal,
      balance: balance,
      interest: interest,
    };
  });

  const finalBalance = USDollar.format(data[data.length - 1].balance);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: theme.spacing(1),
        }}
      >
        <Typography variant="h5">Balance:</Typography>
        <Typography
          variant="h5"
          color={theme.palette.success.main}
          textAlign="right"
        >
          {finalBalance}
        </Typography>
      </div>
      <br />
      <div style={{ flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="90%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="90%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" minTickGap={50} />
            <YAxis
              width={10 * finalBalance.length}
              tickFormatter={(value: any, index: number) =>
                USDollar.format(value)
              }
            />
            <Tooltip
              formatter={(
                value: any,
                name: any,
                item: any,
                index: number,
                payload: any
              ) => [USDollar.format(value), capitalize(name)]}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#8884d8"
              dot={false}
              fillOpacity={1}
              fill="url(#colorBalance)"
            />
            <Area
              type="monotone"
              dataKey="principal"
              stroke="#82ca9d"
              dot={false}
              fillOpacity={1}
              fill="url(#colorPrincipal)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
