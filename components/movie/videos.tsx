import Container from "@/components/ui/container";
import { VideoResponse } from "@/types/globals";
import VideoPlayer from "../shared/video-player";

const getVideos = async (movieId: string): Promise<VideoResponse> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/movie/${movieId}/videos?api_key=${process.env.API_KEY}`,
  );

  return response.json();
};

const Videos = async ({ movieId }: { movieId: string }) => {
  const { results } = await getVideos(movieId);

  if (!results || !results.length) {
    return null;
  }

  const filtered = results.filter((vid) => vid.site === "YouTube");

  return (
    <div className="my-12">
      <Container>
        <h3 className="mb-6 text-2xl font-bold leading-normal tracking-wide max-lg:text-xl">
          Videos
        </h3>
        <VideoPlayer videos={filtered} />
      </Container>
    </div>
  );
};
export default Videos;
