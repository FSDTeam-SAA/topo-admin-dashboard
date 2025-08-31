import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LenderProfile } from "@/types/lender";
import DisputesTab from "./disputs-tab";
import DocumentsTab from "./documen-tab";
import ListingTab from "./listing-tab";
import MatricsTab from "./matrics-tab";
import NotesTab from "./notes-tab";
import ProfileTab from "./profile-tab";
import StatusTab from "./status-tab";

interface Props {
  data: LenderProfile;
}

const LenderAction = ({ data }: Props) => {
  console.log(data);
  const tabs = [
    {
      id: "profile",
      label: "Profile",
      content: <ProfileTab data={data} />,
    },
    {
      id: "Status",
      label: "Status",
      content: <StatusTab data={data} />,
    },
    {
      id: "matrics",
      label: "Matrics",
      content: <MatricsTab data={data} />,
    },
    {
      id: "listing",
      label: "Listing",
      content: <ListingTab data={data} />,
    },
    {
      id: "disputes",
      label: "Disputes",
      content: <DisputesTab data={data} />,
    },
    {
      id: "documents",
      label: "Documents",
      content: <DocumentsTab data={data} />,
    },
    {
      id: "notes",
      label: "Notes",
      content: <NotesTab data={data} />,
    },
  ];
  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              View
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[900px] space-y-[20px]">
            <DialogHeader>
              <DialogTitle>
                Lender Details: {data.fullName} (ID: {data._id})
              </DialogTitle>

              <div>
                <AnimatedTabs
                  tabs={tabs}
                  defaultTab="profile"
                  className="bg-white rounded-[15px] shadow-sm "
                  tabClassName="min-w-[80px]"
                  contentClassName=""
                />
              </div>
            </DialogHeader>

            {/* <DialogFooter>
              <div className="mr-auto border p-5 w-full border-[#E6E6E6] rounded-[6px]">
                <h1>Action:</h1>
                <div className="space-x-5 mt-2">
                  <Button variant="outline">Approved</Button>
                  <Button variant="outline">Reject</Button>
                </div>
              </div>
            </DialogFooter> */}
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default LenderAction;
