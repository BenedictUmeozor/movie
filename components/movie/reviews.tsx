import { getMovieReviews } from "@/server/database/reviews";
import Container from "../ui/container";
import { Separator } from "../ui/separator";
import AddReviewForm from "./add-review-form";
import Review from "./review";
import { validateRequest } from "@/lib/auth";

const Reviews = async ({ tmdbId }: { tmdbId: number }) => {
  const reviews = await getMovieReviews(tmdbId);

  const { session } = await validateRequest();

  const userHasReviewed =
    !!session && reviews.some((review) => review.user._id === session.userId);

  return (
    <div className="my-12">
      <Container>
        <h3 className="mb-6 text-2xl font-bold leading-normal tracking-wide max-lg:text-xl">
          Reviews
        </h3>
        <Separator />
        <p className="my-4 text-medium-white">{reviews.length} reviews</p>
        {!!session && !userHasReviewed && <AddReviewForm />}
        <div className="mt-8 space-y-4">
          {reviews.map((review) => (
            <Review key={review._id} review={review} />
          ))}
        </div>
      </Container>
    </div>
  );
};
export default Reviews;
