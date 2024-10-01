import { Cast as Castinterface } from "@/types/globals";
import Image from "next/image";
import CastSheet from "./cast-sheet";
import Container from "@/components/ui/container";

const Cast = ({ cast, title }: { cast: Castinterface[]; title?: string }) => {
  const trimmed = cast.filter((person) => !!person.profile_path).slice(0, 12);

  return (
    <div className="my-12">
      <Container>
        <h3 className="mb-8 flex items-center gap-2 text-2xl font-bold leading-normal tracking-wide max-lg:text-xl">
          Top Cast <CastSheet cast={cast} title={title} />
        </h3>
        <div
          style={{ rowGap: "2rem" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {trimmed.map((person) => (
            <div key={person.id} className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full md:h-16 md:w-16 lg:h-20 lg:w-20">
                <Image
                  src={process.env.IMG_URL + person.profile_path}
                  alt={person.name}
                  height={112}
                  width={112}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{person.name}</p>
                <p className="text-medium-white">{person.character}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
export default Cast;
