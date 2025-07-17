import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LenderProfile } from "@/types/lender";

interface Props {
  data: LenderProfile;
}

const LenderAction = ({ data }: Props) => {
  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              View
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[800px]">
            <DialogHeader>
              <DialogTitle>
                Lender Details: {data.fullName} (ID: {data.id})
              </DialogTitle>

              <div></div>
            </DialogHeader>

            <DialogFooter>
              <div className="mr-auto">
                <h1>Action:</h1>
                <div className="space-x-5">
                  <Button variant="outline">Approved</Button>
                  <Button variant="outline">Reject</Button>
                </div>
              </div>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default LenderAction;
