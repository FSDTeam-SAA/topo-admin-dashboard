import { AnimatedTabs } from '@/components/ui/animated-tabs'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DemoCustomerProfile } from './customer-table-column'
import ProfileTab from './actions/profile-tab'
import StatusTab from './actions/status-tab'

// import Image from 'next/image'

interface Props {
  data: DemoCustomerProfile
}

const CustomerAction = ({ data }: Props) => {
  const tabs = [
    { id: 'profile', label: 'Profile', content: <ProfileTab data={data} /> },
    { id: 'status', label: 'Status', content: <StatusTab data={data} /> },
    // { id: 'matrics', label: 'Matrics', content: <MatricsTab data={data} /> },
    // { id: 'listing', label: 'Listing', content: <ListingTab data={data} /> },
    // { id: 'disputes', label: 'Disputes', content: <DisputesTab data={data} /> },
    // {
    //   id: 'documents',
    //   label: 'Documents',
    //   content: <DocumentsTab data={data} />,
    // },
    // { id: 'notes', label: 'Notes', content: <NotesTab data={data} /> },
  ]

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" size="sm">
            View
          </Button>
        </DialogTrigger>

        <DialogContent
          className="
            w-full 
            !max-w-[95vw]    /* override shadcn default */
            md:!max-w-[80vw] /* desktop এ 80% */
            lg:!max-w-[70vw] /* বড়ো স্ক্রিনে 70% */
            h-auto 
            px-4 
            py-2 
            space-y-5 
            overflow-y-auto
          "
        >
          <DialogHeader>
            <DialogTitle>
              {/* <div className="flex justify-center py-4">
                <Image
                  src={'/logo.png'}
                  alt={data.fullName || 'Lender Profile Image'}
                  width={90}
                  height={90}
                  className="rounded-full object-cover"
                />
              </div> */}
              Customer Details: {data.customerName} (ID: {data?.customerId})
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

export default CustomerAction
