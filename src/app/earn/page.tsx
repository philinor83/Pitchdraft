import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function EarnPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-violet-600">
          Money playbook
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          How to get paid with PitchDraft (at any age)
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          You don&apos;t need 1,000 customers. You need <strong>one person</strong> who will
          pay you to solve a small problem. Here&apos;s exactly how.
        </p>

        <section className="mt-10 space-y-4">
          <PlaybookCard
            step="Fastest way (this week)"
            title="Sell the service, not the app"
            items={[
              "Pick someone: family friend with a small business, relative starting a project, kid who needs a club fundraiser plan.",
              "Say: “I’ll write you a professional project proposal for $10–20. Takes me about an hour.”",
              "Use PitchDraft to generate the draft, edit it so it sounds good, download or print to PDF.",
              "Send it to them. Get paid through Venmo, Cash App, or cash — with a parent’s okay.",
            ]}
          />

          <PlaybookCard
            step="What to charge"
            title="Start low, raise prices later"
            items={[
              "$10 — first job for someone you know (practice + testimonial)",
              "$15–25 — simple one-page proposal",
              "$40+ — bigger projects (website, event, business plan)",
              "Never work for free twice. Job #1 can be cheap to learn. Job #2 should cost more.",
            ]}
          />

          <PlaybookCard
            step="Copy-paste message"
            title="Text you can send someone"
            items={[
              "Hey! I built a tool that writes professional project proposals really fast. If you ever need a plan for a client, school project, or business idea, I can write one for you for $15. Want to see a sample?",
            ]}
            isQuote
          />

          <PlaybookCard
            step="Who to ask"
            title="Best first customers"
            items={[
              "Parents’ friends who run small businesses",
              "YouTubers / streamers who need sponsor pitch docs",
              "Kids running school clubs or fundraisers",
              "Anyone who said “I need to write this up” out loud near you",
            ]}
          />

          <PlaybookCard
            step="Later (needs a parent)"
            title="When you want real online payments"
            items={[
              "Put the website on the internet (Vercel — free to start)",
              "Add Stripe so people pay with a card (parent must set this up)",
              "Charge $9/month for unlimited proposals OR keep selling one-off services",
            ]}
          />
        </section>

        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="font-bold text-amber-900">Important at 13</h2>
          <ul className="mt-3 space-y-2 text-sm text-amber-900/90">
            <li>• Always tell a parent what you&apos;re doing</li>
            <li>• Use their Venmo/PayPal if you need one</li>
            <li>• Don&apos;t share personal info with strangers online</li>
            <li>• Doing good work for people you know beats chasing random internet users</li>
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/proposals/new" className="btn-primary px-6 py-3">
            Make a practice proposal
          </Link>
          <Link href="/" className="btn-secondary px-6 py-3">
            Back home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function PlaybookCard({
  step,
  title,
  items,
  isQuote,
}: {
  step: string;
  title: string;
  items: string[];
  isQuote?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">{step}</p>
      <h2 className="mt-1 text-lg font-bold text-slate-900">{title}</h2>
      {isQuote ? (
        <blockquote className="mt-4 rounded-xl bg-slate-50 p-4 text-sm italic leading-7 text-slate-700">
          &ldquo;{items[0]}&rdquo;
        </blockquote>
      ) : (
        <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
          {items.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-violet-500">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
