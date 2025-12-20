import React from "react";
import FinanceCard from "./finance-card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
export const description = "A line chart";
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const BookingRevenue = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-8">
        <FinanceCard title="Total Booking Revenue" value="0" />
        <FinanceCard title="MoM % Change" value="0" />
        <FinanceCard title="Average Order Value" value="0" />
        <FinanceCard title="Average Profit per Order" value="0" />
      </div>

      <div className="bg-white shadow-[0px_4px_10px_0px_#0000001A] p-5 rounded-lg space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl ">Booking Revenue</h1>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Weekly</SelectItem>
                <SelectItem value="banana">Monthly</SelectItem>
                <SelectItem value="blueberry">Yearly</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Card className="h-[400px]">
            <CardContent className="h-full">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="desktop"
                    type="natural"
                    stroke="#891d33"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingRevenue;
