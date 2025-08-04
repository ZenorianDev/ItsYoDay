export default function MessageForm({ formData, setFormData }) {
  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold">💌 Birthday Message</h2>
      <input
        type="text"
        placeholder="Recipient's name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="border p-2 w-full rounded"
      />
      <textarea
        placeholder="Write your birthday message here..."
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className="border p-2 w-full rounded"
      />
    </section>
  );
}