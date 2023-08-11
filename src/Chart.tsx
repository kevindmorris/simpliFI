import _ from "lodash";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Chart({
  a,
  p,
  r,
  t,
}: {
  a: number;
  p: number;
  r: number;
  t: number;
}) {
  const PV = generateFutureValueWithInterest(a, p, r, t);

  const range = _.range(0, t + 1);

  const data = range.map((d) => ({
    time: d,
    principal: generateFutureValueWithoutInterest(a, p, d),
    interest: generateFutureValueWithInterest(a, p, r, d),
  }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          tickFormatter={(value: any, index: number) => {
            const year = new Date().getFullYear();
            return year + value;
          }}
        />
        <YAxis />
        <Tooltip
          labelFormatter={(label: any, payload: any) => {
            const year = new Date().getFullYear();
            return year + label;
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="interest" stroke="#82ca9d" />
        <Line type="monotone" dataKey="principal" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

function generateFutureValueWithInterest(
  A: number,
  P: number,
  r: number,
  t: number
) {
  const value = A * Math.pow(1 + r, t) + P * ((Math.pow(1 + r, t) - 1) / r);
  return Math.round(value);
}
function generateFutureValueWithoutInterest(A: number, P: number, t: number) {
  const value = A + P * t;
  return Math.round(value);
}
