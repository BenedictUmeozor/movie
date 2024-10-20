import movie_bg from "@/assets/movie_bg.jpg";
import ListPage from "@/components/lists";
import Container from "@/components/ui/container";
import { CSSProperties } from "react";

const style: CSSProperties = {
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('${movie_bg.src}')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

export default function Page() {
  return (
    <main className="space-y-8">
      <section
        style={style}
        className="flex h-screen max-h-[400px] items-center max-lg:justify-center"
      >
        <Container className="space-y-4 max-lg:text-center">
          <h2 className="text-4xl font-bold max-lg:text-3xl max-md:text-2xl">
            Community Lists
          </h2>
          <p className="w-[95%] max-w-2xl max-lg:mx-auto">
            Embark on a cinematic adventure through lists ceated by movie fans
            and uncover your next must-watch masterpiece
          </p>
        </Container>
      </section>
      <ListPage />
    </main>
  );
}
