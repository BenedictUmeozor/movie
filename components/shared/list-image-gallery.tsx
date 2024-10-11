import { cn } from "@/lib/utils";
import Image from "next/image";

const StackedGallery = ({ images }: { images: string[] }) => {
  const totalImages = images.length;
  const maxOffset = 32; // maximum offset in pixels
  const maxRotation = 5; // maximum rotation in degrees

  return (
    <div
      className={cn(
        "flex aspect-[6/2.5] items-center justify-center overflow-hidden rounded-md",
        {
          "bg-medium-gray": !!totalImages,
          "bg-medium-white": totalImages === 0,
        },
      )}
    >
      {images.map((image, index) => {
        const offset = (index / (totalImages - 1)) * maxOffset;
        const rotation = ((index / (totalImages - 1)) * 2 - 1) * maxRotation;
        const zIndex = totalImages - index;

        return (
          <div
            key={`image-${index}`}
            className="w-44"
            style={{
              top: `${offset}px`,
              left: `${offset}px`,
              zIndex: zIndex,
              transform: `rotate(${rotation}deg)`,
            }}
          >
            <Image
              src={process.env.NEXT_PUBLIC_IMG_URL + image}
              alt={`Image ${index + 1}`}
              height={400}
              width={400}
              className="aspect-[4/6] w-full object-cover"
            />
          </div>
        );
      })}
    </div>
  );
};

export default StackedGallery;
