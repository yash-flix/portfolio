import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col items-start justify-center px-5 md:px-8">
      <p className="eyebrow mb-4">404</p>
      <h1 className="display-lg">
        This page <span className="serif-accent text-lime">never shipped.</span>
      </h1>
      <Link href="/" className="mt-8 rounded-full bg-lime px-6 py-3 font-medium text-ink">Back home</Link>
    </section>
  );
}
