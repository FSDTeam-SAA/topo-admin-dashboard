import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface Props {
  title: string
  value: string
}

export const InfoCard = ({ title, value }: Props) => {
  const isTotalListings =
    title.toLowerCase() === 'total listings' ||
    title.toLowerCase() === 'total admins' ||
    title.toLowerCase() === 'active homepage sections'

  return (
    <Card
      className={
        isTotalListings
          ? 'bg-black text-white scale-105'
          : 'bg-white text-black'
      }
    >
      <CardHeader>
        <CardTitle className="font-light leading-[120%]">{title}</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <CardFooter>
          <h1 className="text-[28px]">{value}</h1>
        </CardFooter>
      </CardContent>
    </Card>
  )
}
