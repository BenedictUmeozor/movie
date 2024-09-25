"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import clsx from "clsx";
import { useParams, useSearchParams } from "next/navigation";

const PaginationComponent = ({
  total_pages,
  pathname,
}: {
  total_pages: number;
  pathname: string;
}) => {
  const params = useParams() as { page: string };
  const searchParams = useSearchParams();

  const pageNumber = Number(params.page) || 1;

  const pageNumbers = [];

  for (let i = 1; i <= total_pages; i++) {
    pageNumbers.push(i);
  }

  const maxPageNumberLimit = 5;
  const pageNumLimit = Math.floor(maxPageNumberLimit / 2);

  const activePages = pageNumbers.slice(
    Math.max(0, Number(pageNumber) - 1 - pageNumLimit),
    Math.min(Number(pageNumber) - 1 + pageNumLimit + 1, pageNumbers.length),
  );

  const renderPages = () => {
    const renderedPages = activePages.map((page) => {
      const urlParams = new URLSearchParams(searchParams.toString());
      const newUrl = searchParams.get("genres")
        ? `${pathname}/${page}?${urlParams.toString()}`
        : `${pathname}/${page}`;
      return (
        <PaginationItem key={page}>
          <PaginationLink
            href={newUrl}
            className={clsx(
              "bg-secondary-blue text-white hover:bg-primary-blue hover:text-white",
              {
                "bg-primary-blue":
                  pageNumber === page || (!pageNumber && page === 1),
              },
            )}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    });

    if (activePages[0] > 1) {
      renderedPages.unshift(<PaginationEllipsis key="ellipsis-start" />);
    }

    if (activePages[activePages.length - 1] < pageNumbers.length) {
      renderedPages.push(<PaginationEllipsis key="ellipsis-end" />);
    }

    return renderedPages;
  };

  const previousPageUrl = () => {
    const urlParams = new URLSearchParams(searchParams.toString());
    const newPageNumber = Math.max(1, pageNumber - 1).toString();
    return searchParams.get("genres")
      ? `${pathname}/${newPageNumber}?${urlParams.toString()}`
      : `${pathname}/${newPageNumber}`;
  };

  const nextPageUrl = () => {
    const urlParams = new URLSearchParams(searchParams.toString());
    const newPageNumber = Math.min(pageNumber + 1, total_pages).toString();
    return searchParams.get("genres")
      ? `${pathname}/${newPageNumber}?${urlParams.toString()}`
      : `${pathname}/${newPageNumber}`;
  };

  return (
    <div className="mt-8 grid place-items-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={previousPageUrl()}
              className={clsx(
                "bg-secondary-blue text-white hover:bg-primary-blue hover:text-white",
                {
                  "bg-primary-blue": pageNumber === 1 || !pageNumber,
                },
              )}
            />
          </PaginationItem>
          {renderPages()}
          <PaginationItem>
            <PaginationNext
              href={nextPageUrl()}
              className={clsx(
                "bg-secondary-blue text-white hover:bg-primary-blue hover:text-white",
                {
                  "bg-primary-blue": pageNumber === total_pages,
                },
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default PaginationComponent;
