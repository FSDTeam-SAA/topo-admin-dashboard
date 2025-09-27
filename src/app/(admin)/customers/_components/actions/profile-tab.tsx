import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import moment from 'moment'
import { DemoCustomerProfile } from '../customer-table-column'

interface Props {
  data: DemoCustomerProfile
}

const ProfileTab = ({ data }: Props) => {
  return (
    <div className="space-y-6 w-full">
      <Card className="shadow-none rounded-[6px] w-full">
        <CardHeader>
          <CardTitle className="font-light font-sans">
            Profile Summary
          </CardTitle>
        </CardHeader>

        <CardContent className="font-light text-[14px] font-sans">
          <div className="space-y-2">
            <p>Name: {data.customerName}</p>
            <p>Lender ID: {data.customerId}</p>
            <p>Email: {data?.email}</p>
            <p>Phone: {data.phoneNumber}</p>
            <p>
              Join Date: {moment(data.joinedAt).format('MMMM DD, YYYY h:mm A')}
            </p>
            <p>Address: {data.businessAddress}</p>
            <p>Business Address: {data.address}</p>
            <p>Post Code: {data.postCode}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none rounded-[6px] w-full">
        <CardHeader>
          <CardTitle className="font-light font-sans">Actions</CardTitle>
        </CardHeader>

        <CardContent className="font-light text-[12px]">
          <div className="space-y-6">
            <div className=" border-b-2 pb-4 flex items-center gap-4">
              <Button variant="outline">Approve</Button>
              <Button variant="outline">Suspend</Button>
            </div>
            <div className="flex items-center gap-4">
              <Button variant={'default'}>Save Changes</Button>
              <Button variant={'outline'}>Download Report</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* {data.latitude && data.longitude && (
        <Card className="shadow-none rounded-[6px] p-0 ">
          <CardContent className="p-5 pb-0">
            <MapBoxView
              latitude={data.latitude}
              longitude={data.longitude}
              zoom={13}
              className="w-full h-[400px] rounded-lg"
            />
          </CardContent>
        </Card>
      )} */}
    </div>
  )
}

export default ProfileTab
