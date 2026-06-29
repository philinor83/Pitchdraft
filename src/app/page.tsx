import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <section>
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <p className="mb-4 inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet-700">
                Your first side hustle tool
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Write proposals.
                <span className="block bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  Get paid.
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Fill out a short form and PitchDraft builds a professional proposal you can
                send to clients — or sell as a service to people who hate writing them.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/signup" className="btn-primary px-6 py-3">
                  Start free →
                </Link>
                <Link href="/earn" className="btn-secondary px-6 py-3">
                  How to make money
                </Link>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                No credit card. Works on your computer right now.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-violet-500/20 to-indigo-500/20 blur-2xl" />
              <div className="card-shine relative overflow-hidden rounded-2xl border border-slate-200/80 p-6 shadow-2xl shadow-slate-300/30">
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">
                  Sample proposal
                </p>
                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  YouTube Channel Rebrand
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Executive summary, scope, timeline, and pricing — generated from a few
                  questions about the client and project.
                </p>
                <div className="mt-6 space-y-2">
                  <PreviewLine label="Client" value="Alex · Creator Studio" />
                  <PreviewLine label="Timeline" value="2 weeks" />
                  <PreviewLine label="Investment" value="$250 – $400" />
                </div>
                <div className="mt-6 rounded-xl bg-violet-50 px-4 py-3 text-sm font-medium text-violet-800">
                  ✓ Ready to edit, download, and send
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-center text-2xl font-bold text-slate-900">
              Three steps to your first dollar
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <Step
                number="1"
                title="Make a proposal"
                description="Use the app for a fake project first so you know how it works."
              />
              <Step
                number="2"
                title="Offer it to someone"
                description="Tell a family friend or small business: “I’ll write your project plan for $15.”"
              />
              <Step
                number="3"
                title="Get paid"
                description="Use Venmo or Cash App with a parent’s help. Deliver the PDF. Done."
              />
            </div>
            <div className="mt-8 text-center">
              <Link href="/earn" className="text-sm font-semibold text-violet-600 hover:text-violet-700">
                Read the full money guide →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-3 sm:px-6">
            <Feature
              emoji="📝"
              title="Simple form"
              description="Client name, project details, timeline — that’s it."
            />
            <Feature
              emoji="⚡"
              title="Instant draft"
              description="Get a full proposal with sections already laid out."
            />
            <Feature
              emoji="💰"
              title="Sell the service"
              description="You don’t need strangers on the internet. Start with people you know."
            />
          </div>
        </section>

        <section className="bg-slate-900 py-16 text-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-center text-2xl font-bold">When you’re ready to charge online</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-slate-400">
              These are ideas for later — when a parent helps you set up payments and put the
              site on the internet.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <PricingCard
                name="Free"
                price="$0"
                description="Practice and build your portfolio"
                features={["Unlimited demo proposals", "Edit & download", "Learn the tool"]}
                cta="Start free"
                href="/signup"
                highlight={false}
              />
              <PricingCard
                name="Pro"
                price="$9/mo"
                description="When you launch for real users"
                features={["AI-powered writing", "Save all proposals", "Custom branding"]}
                cta="Coming soon"
                href="/signup"
                highlight={true}
              />
              <PricingCard
                name="Service"
                price="$15+"
                description="Per proposal you write for someone"
                features={[
                  "Charge per client",
                  "No app subscription needed",
                  "Fastest way to earn now",
                ]}
                cta="See how"
                href="/earn"
                highlight={false}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-12 text-center text-white sm:px-12">
            <h2 className="text-2xl font-bold sm:text-3xl">Your app works. Now use it.</h2>
            <p className="mx-auto mt-3 max-w-xl text-violet-100">
              Make one practice proposal today. Tomorrow, ask one person if they need help
              writing a project plan.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/proposals/new"
                className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-violet-700 hover:bg-violet-50"
              >
                Create a proposal
              </Link>
              <Link
                href="/earn"
                className="rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Money playbook
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function PreviewLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-800">{value}</span>
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
        {number}
      </span>
      <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

function Feature({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-violet-200 hover:shadow-md">
      <span className="text-2xl">{emoji}</span>
      <h3 className="mt-3 font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

function PricingCard({
  name,
  price,
  description,
  features,
  cta,
  href,
  highlight,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlight: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-6 ${
        highlight
          ? "bg-white text-slate-900 ring-2 ring-violet-400"
          : "bg-slate-800 text-white"
      }`}
    >
      <h3 className="font-semibold">{name}</h3>
      <p className="mt-2 text-3xl font-bold">{price}</p>
      <p className={`mt-1 text-sm ${highlight ? "text-slate-600" : "text-slate-400"}`}>
        {description}
      </p>
      <ul className={`mt-4 space-y-2 text-sm ${highlight ? "text-slate-600" : "text-slate-300"}`}>
        {features.map((f) => (
          <li key={f}>✓ {f}</li>
        ))}
      </ul>
      <Link
        href={href}
        className={`mt-6 inline-block rounded-xl px-4 py-2 text-sm font-semibold ${
          highlight
            ? "bg-violet-600 text-white hover:bg-violet-500"
            : "bg-slate-700 text-white hover:bg-slate-600"
        }`}
      >
        {cta}
      </Link>
    </div>
  );
}
