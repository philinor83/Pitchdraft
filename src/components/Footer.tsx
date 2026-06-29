import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Logo size="sm" />
        <div className="flex flex-wrap gap-6 text-sm text-slate-600">
          <Link href="/earn" className="hover:text-violet-600">
            How to get paid
          </Link>
          <Link href="/signup" className="hover:text-violet-600">
            Sign up
          </Link>
        </div>
        <p className="text-sm text-slate-500">Built by you. Ready to earn.</p>
      </div>
    </footer>
  );
}
