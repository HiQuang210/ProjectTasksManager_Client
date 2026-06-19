import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartData {
  name: string;
  total: number;
}

interface ChartProps {
  data: ChartData[];
}

export const Chart = ({
  data,
}: ChartProps) => {
  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar
          dataKey="total"
          fill="#8884d8"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};