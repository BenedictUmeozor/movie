import Container from "./container";
import { Separator } from "./separator";

const Footer = () => {
  return (
    <footer className="pt-4">
      <Container>
        <Separator color="#9f9f9f" />
        <p className="py-4 text-center text-medium-white lg:text-left">
          &copy; {new Date().getFullYear()} Movie Empire
        </p>
      </Container>
    </footer>
  );
};
export default Footer;
