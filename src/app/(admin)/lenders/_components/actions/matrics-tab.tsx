import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LenderProfile } from "@/types/lender";

interface Props {
  data: LenderProfile;
}
const MatricsTab = ({ data }: Props) => {
  return (
    <div className="space-y-6">
      <Card className="shadow-none rounded-[6px]">
        <CardHeader>
          <CardTitle className="font-light">Profile Summary</CardTitle>
        </CardHeader>

        <CardContent className="font-light text-[12px]">
          <div className="space-y-2">
            <p>Total Bookings: {data.totalbookings}</p>
            <p>Revenue Generated: {data.totalReveneue}</p>
            <p>Average Rating: {data.totalRatting}/5</p>

            <p>Disputes: Not found</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MatricsTab;
