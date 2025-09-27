import { InfoCard } from '@/components/cards/stat-card'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

const CustomersHeader = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl  font-light tracking-[.1em]">
          Manage Customers
        </h1>
        <Button>
          Download Report <Download />
        </Button>
      </div>

      <div className="mt-[30px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 font-sans">
        <InfoCard title="Total Customers" value="500" />
        <InfoCard title="Active Customers" value="450" />
        <InfoCard title="Pending verifications" value="50" />
      </div>
    </div>
  )
}

export default CustomersHeader
