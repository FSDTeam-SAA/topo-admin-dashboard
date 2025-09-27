import { AnimatedTabs } from '@/components/ui/animated-tabs'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { LenderProfile } from '@/types/lender'
import DisputesTab from './disputs-tab'
import DocumentsTab from './documen-tab'
import ListingTab from './listing-tab'
import MatricsTab from './matrics-tab'
import NotesTab from './notes-tab'
import ProfileTab from './profile-tab'
import StatusTab from './status-tab'

interface Props {
  data: LenderProfile
}

const LenderAction = ({ data }: Props) => {
  const tabs = [
    { id: 'profile', label: 'Profile', content: <ProfileTab data={data} /> },
    { id: 'status', label: 'Status', content: <StatusTab data={data} /> },
    { id: 'matrics', label: 'Matrics', content: <MatricsTab data={data} /> },
    { id: 'listing', label: 'Listing', content: <ListingTab data={data} /> },
    { id: 'disputes', label: 'Disputes', content: <DisputesTab data={data} /> },
    {
      id: 'documents',
      label: 'Documents',
      content: <DocumentsTab data={data} />,
    },
    { id: 'notes', label: 'Notes', content: <NotesTab data={data} /> },
  ]

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            View
          </Button>
        </DialogTrigger>

        <DialogContent
          className="
            w-full 
            !max-w-[95vw]    /* override shadcn default */
            md:!max-w-[80vw] /* desktop এ 80% */
            lg:!max-w-[70vw] /* বড়ো স্ক্রিনে 70% */
            h-[90vh] 
            px-4 
            py-2 
            space-y-5 
            overflow-y-auto
          "
        >
          <DialogHeader>
            <DialogTitle>
              Lender Details: {data.fullName} (ID: {data._id})
            </DialogTitle>
          </DialogHeader>

          <div>
            <AnimatedTabs
              tabs={tabs}
              defaultTab="profile"
              className="bg-white rounded-[15px] shadow-sm"
              tabClassName="min-w-[80px]"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default LenderAction
