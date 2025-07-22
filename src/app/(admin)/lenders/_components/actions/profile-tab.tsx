import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LenderProfile } from "@/types/lender";
import moment from "moment";

interface Props {
  data: LenderProfile;
}

const ProfileTab = ({ data }: Props) => {
  return (
    <div className="space-y-6">
      <Card className="shadow-none rounded-[6px]">
        <CardHeader>
          <CardTitle className="font-light">Profile Summary</CardTitle>
        </CardHeader>

        <CardContent className="font-light text-[12px]">
          <div className="space-y-2">
            <p>Name: {data.fullName}</p>
            <p>Lender ID: {data._id}</p>
            <p>Email: {data.email}</p>
            <p>Phone: {data.phoneNumber}</p>
            <p>
              Join Date: {moment(data.createdAt).format("MMMM DD, YYYY h:mm A")}
            </p>
            <p>Address: {data.businessAddress}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;
