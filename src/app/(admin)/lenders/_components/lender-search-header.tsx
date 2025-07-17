"use client";
import { Card, CardContent } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import moment from "moment";
import { useLenderSearchStore } from "./state";

const LenderSearchHeader = () => {
  const { value, status, dateRange, setValue, setStatus, setDateRange } =
    useLenderSearchStore();

  return (
    <Card className="">
      <CardContent className="p-5 flex items-center justify-between gap-5">
        <div className="flex items-center gap-5">
          <Input
            placeholder="Search lenders..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px] py-4.5">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DateRangePicker
          initialDateFrom={dateRange.from}
          initialDateTo={dateRange.to}
          onUpdate={(values) =>
            setDateRange({
              from: moment(values.range.from).format("YYYY-MM-DD"),
              to: moment(values.range.to).format("YYYY-MM-DD"),
            })
          }
        />
      </CardContent>
    </Card>
  );
};

export default LenderSearchHeader;
