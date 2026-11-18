import Link from "next/link";
import { LogoMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center px-5 pt-24 text-center">
      <div>
        <LogoMark className="mx-auto h-28 w-28" animate />
        <h1 className="mt-6 text-5xl font-semibold">Page not found</h1>
        <p className="mt-3 text-muted">The page you are looking for has moved or does not exist.</p>
        <Link href="/" className="btn btn-primary mt-8">Back to home</Link>
      </div>
    </section>
  );
}
