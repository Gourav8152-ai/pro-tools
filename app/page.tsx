import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-center text-blue-800">
          Welcome to Tool Master (Made By Gorav😎)
        </h1>
        <p className="text-xl mb-8 text-center text-gray-600">
          Your one-stop shop for professional communication and data tools
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ToolCard
            title="Frame a Mail"
            description="Craft professional emails with ease"
            href="/frame-mail"
            color="bg-blue-500"
          />
          <ToolCard
            title="Google Sheet Formula"
            description="Generate powerful spreadsheet formulas"
            href="/sheet-formula"
            color="bg-green-500"
          />
          <ToolCard
            title="Reframe Sentence"
            description="Perfect your grammar and sentence structure"
            href="/reframe-sentence"
            color="bg-purple-500"
          />
          <ToolCard
            title="Offer Maker"
            description="Create compelling offers that convert"
            href="/offer-maker"
            color="bg-red-500"
          />
        </div>
      </div>
    </main>
  );
}

function ToolCard({ title, description, href, color }) {
  return (
    <Link
      href={href}
      className={`${color} hover:opacity-90 text-white rounded-lg p-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg`}
    >
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p>{description}</p>
    </Link>
  );
}
