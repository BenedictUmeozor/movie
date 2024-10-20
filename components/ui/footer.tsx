import Link from "next/link";
import Container from "./container";
import { Separator } from "./separator";

const Footer = () => {
  return (
    <footer className="pt-4">
      <Container>
        <Separator color="#9f9f9f" />
        <p className="py-4 text-center text-sm text-medium-white lg:text-left">
          &copy; {new Date().getFullYear()} Movie Empire - Made by{" "}
          <Link
            target="_blank"
            href={"https://benedictumeozor.vercel.app/"}
            className="underline hover:text-primary-blue"
          >
            Benedict
          </Link>
        </p>
      </Container>
    </footer>
  );
};
export default Footer;
