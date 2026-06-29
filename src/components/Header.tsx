"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Logo } from "@/components/Logo";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="glass-header sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href={session ? "/dashboard" : "/"}>
          <Logo />
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          {!session && (
            <Link
              href="/earn"
              className="hidden text-sm font-medium text-slate-600 hover:text-violet-600 sm:inline"
            >
              Get paid
            </Link>
          )}
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Dashboard
              </Link>
              <Link href="/proposals/new" className="btn-primary px-3 py-2">
                New proposal
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm font-medium text-slate-500 hover:text-slate-800"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Log in
              </Link>
              <Link href="/signup" className="btn-primary px-3 py-2">
                Start free
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
