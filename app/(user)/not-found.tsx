import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-24 lg:px-8 lg:pb-40 lg:pt-32">
      <h1 className="text-6xl font-extrabold tracking-tight text-white sm:text-8xl">
        404
      </h1>
      <p className="mx-auto mt-4 max-w-md text-center text-xl text-gray-300">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Link
        href="/"
        className="mt-8 flex w-full items-center justify-center rounded-md border border-primary-blue bg-primary-blue px-8 py-3 text-base font-medium text-white hover:bg-transparent hover:text-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 sm:w-auto"
      >
        Go back home
      </Link>
    </main>
  );
}
