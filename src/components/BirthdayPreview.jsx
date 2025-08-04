export default function BirthdayPreview({ formData }) {
  const { name, message, avatar, cake } = formData;

  return (
    <section className="p-4 border rounded bg-gray-50">
      <h2 className="text-xl font-semibold">🎁 Birthday Preview</h2>
      <p className="text-lg">To: <strong>{name}</strong></p>
      <p className="whitespace-pre-wrap">{message}</p>
      <div className="mt-4">
        <p>Avatar: Hair - {avatar.hair}, Shirt - {avatar.shirt}</p>
        <p>Cake: {cake.style}</p>
      </div>
    </section>
  );
}