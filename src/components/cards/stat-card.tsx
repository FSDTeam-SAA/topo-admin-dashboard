import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  title: string;
  value: string;
}

export const InfoCard = ({ title, value }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-light leading-[120%]">{title}</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <CardFooter>
          <h1 className="text-[28px]">{value}</h1>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
