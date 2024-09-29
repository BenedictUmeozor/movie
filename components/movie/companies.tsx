import { ProductionCompany } from "@/types/globals";
import Image from "next/image";
import Container from "../ui/container";

const Companies = ({ companies }: { companies: ProductionCompany[] }) => {
  const trimmed = companies.filter((company) => !!company.logo_path);

  if (trimmed.length === 0) {
    return null;
  }
  return (
    <Container className="my-12">
      <h3 className="mb-8 text-2xl font-bold leading-normal tracking-wide">
        Production Companies
      </h3>
      <div className="grid grid-cols-8 gap-4">
        {trimmed.map((company) => (
          <div key={company.id} className="space-y-2 rounded bg-gray-50 p-2">
            <div>
              <Image
                src={process.env.IMG_URL + company.logo_path}
                alt={company.name}
                width={100}
                height={100}
                className="mx-auto w-[90%] object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};
export default Companies;
