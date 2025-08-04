import { useSearchParams } from "react-router-dom";

export default function BirthdayCard() {
  const [params] = useSearchParams();

  const name = params.get("name") || "Friend";
  const message = params.get("message") || "Happy Birthday!";
  const hair = params.get("hair");
  const shirt = params.get("shirt");
  const cake = params.get("cake");

  return (
    <main className="p-6 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">🎉 Happy Birthday, {name}! 🎂</h1>
      <p className="text-lg whitespace-pre-wrap mb-6">{message}</p>
      <div className="mb-4">
        <p><strong>Avatar:</strong> Hair - {hair}, Shirt - {shirt}</p>
        <p><strong>Cake:</strong> {cake}</p>
      </div>
    </main>
  );
}