import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[80svh] flex-col items-start justify-center px-5 md:px-8">
      <p className="kicker mb-3">404</p>
      <h1 className="display-lg">
        This page <span className="text-lime">never shipped.</span>
      </h1>
      <Link href="/" className="mt-8 inline-flex h-10 items-center rounded-lg bg-lime px-4 text-sm font-medium text-ink">Back home</Link>
    </section>
  );
}
