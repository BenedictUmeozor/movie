import { Cast as Castinterface } from "@/types/globals";
import Container from "../ui/container";
import Image from "next/image";

const Cast = ({ cast }: { cast: Castinterface[] }) => {
  const trimmed = cast.filter((person) => !!person.profile_path).slice(0, 12);

  return (
    <div className="my-12">
      <Container>
        <h3 className="mb-8 text-2xl font-bold leading-normal tracking-wide">
          Top Cast
        </h3>
        <div style={{ rowGap: "2rem" }} className="grid grid-cols-4">
          {trimmed.map((person) => (
            <div key={person.id} className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full">
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
