"use client";

import Slider, { Settings } from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "../ui/container";
import { Movie as MovieInterface } from "@/types/globals";
import Movie from "../ui/movie";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const settings: Settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  arrows: false,
  autoplaySpeed: 3000,
  draggable: true,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

const Discover = ({ movies }: { movies: MovieInterface[] }) => {
  return (
    <section className="w-full">
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="px-2 text-2xl font-bold max-md:px-1 max-md:text-xl">
            Discover
          </h2>
          <Button
            size={"icon"}
            className="mr-2 bg-primary-blue hover:bg-blue-900 max-md:mr-1"
            asChild
          >
            <Link href="/movies/discover">
              <ChevronRight size={20} />
            </Link>
          </Button>
        </div>
        <Slider {...settings}>
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default Discover;
