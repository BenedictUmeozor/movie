import { v4 as uuidV4 } from "uuid";

type RatingColorClass =
  | "bg-teal-500"
  | "bg-green-500"
  | "bg-lime-500"
  | "bg-yellow-400"
  | "bg-orange-400"
  | "bg-red-500";

export function getRatingColorClass(rating: number): RatingColorClass {
  if (rating >= 9.0) return "bg-teal-500";
  if (rating >= 8.0) return "bg-green-500";
  if (rating >= 7.0) return "bg-lime-500";
  if (rating >= 6.0) return "bg-yellow-400";
  if (rating >= 5.0) return "bg-orange-400";
  return "bg-red-500";
}

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];
  }

  return shuffledArray;
};

export function generateTimeBasedId(): string {
  const timestamp = new Date().getTime().toString(36); // Convert timestamp to base36
  const randomPart = uuidV4().split("-")[0]; // Take the first part of a UUID
  return `${timestamp}-${randomPart}`;
}

export function formatNumberWithCommas(number: number): string {
  return number.toLocaleString("en-US");
}
