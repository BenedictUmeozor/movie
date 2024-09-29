import Container from "../ui/container";
import { Separator } from "../ui/separator";

const Reviews = () => {
  return (
    <div className="my-12">
      <Container>
        <h3 className="mb-8 text-2xl font-bold leading-normal tracking-wide">
          Reviews
        </h3>
        <Separator />
        <span className="text-medium-white">115 reviews</span>
        <div className="mt-8">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index}>
              <header className="flex items-center justify-center"></header>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
export default Reviews;
