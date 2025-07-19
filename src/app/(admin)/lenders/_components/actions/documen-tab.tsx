import { Card } from "@/components/ui/card";
import { LenderProfile } from "@/types/lender";

interface Props {
  data: LenderProfile;
}
const DocumentsTab = ({}: Props) => {
  return (
    <div className="space-y-6">
      <Card className="shadow-none rounded-[6px]">
        <div className="p-4">
          <h2 className="text-lg font-semibold">Documents</h2>
          <p className="text-sm text-gray-600">
            This section will display various metrics related to the
            lender&apos;s performance.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default DocumentsTab;
