import Container from "../ui/container";
import { Separator } from "../ui/separator";
import AddReviewForm from "./add-review-form";
import Review from "./review";

const Reviews = () => {
  return (
    <div className="my-12">
      <Container>
        <h3 className="mb-6 text-2xl font-bold leading-normal tracking-wide max-lg:text-xl">
          Reviews
        </h3>
        <Separator />
        <p className="my-4 text-medium-white">115 reviews</p>
        <AddReviewForm />
        <div className="mt-8 space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Review key={index} />
          ))}
        </div>
      </Container>
    </div>
  );
};
export default Reviews;
