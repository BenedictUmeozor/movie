import clsx from "clsx";
import { Star } from "lucide-react";

const StarRatingAverage = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      <Star
        fill={clsx(
          { "#14b8a6": rating >= 9 },
          { "#22c55e": rating >= 8 && rating < 9 },
          { "#84cc16": rating >= 7 && rating < 8 },
          { "#facc15": rating >= 6 && rating < 7 },
          { "#fb923c": rating >= 5 && rating < 6 },
          { "#ef4444": rating < 5 },
        )}
        stroke={clsx(
          { "#14b8a6": rating >= 9 },
          { "#22c55e": rating >= 8 && rating < 9 },
          { "#84cc16": rating >= 7 && rating < 8 },
          { "#facc15": rating >= 6 && rating < 7 },
          { "#fb923c": rating >= 5 && rating < 6 },
          { "#ef4444": rating < 5 },
        )}
        size={16}
      />
      <span
        className="text-sm"
        style={{
          color: clsx(
            { "#14b8a6": rating >= 9 },
            { "#22c55e": rating >= 8 && rating < 9 },
            { "#84cc16": rating >= 7 && rating < 8 },
            { "#facc15": rating >= 6 && rating < 7 },
            { "#fb923c": rating >= 5 && rating < 6 },
            { "#ef4444": rating < 5 },
          ),
        }}
      >
        {rating.toFixed(1)}
      </span>
    </div>
  );
};
export default StarRatingAverage;
