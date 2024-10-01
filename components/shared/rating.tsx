import clsx from "clsx";
import { Badge } from "../ui/badge";

const RatingAverage = ({ rating }: { rating: number }) => {
  return (
    <Badge
      className={clsx(
        {
          "bg-teal-500 hover:bg-teal-500": rating >= 9,
        },
        {
          "bg-green-500 hover:bg-green-500": rating >= 8 && rating < 9,
        },
        {
          "bg-lime-500 hover:bg-lime-500": rating >= 7 && rating < 8,
        },
        {
          "bg-yellow-400 hover:bg-yellow-400": rating >= 6 && rating < 7,
        },
        {
          "bg-orange-400 hover:bg-orange-400": rating >= 5 && rating < 6,
        },
        {
          "bg-red-500 hover:bg-red-500": rating < 5,
        },
      )}
    >
      {rating.toFixed(1)}
    </Badge>
  );
};
export default RatingAverage;
