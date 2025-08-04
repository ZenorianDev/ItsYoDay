export default function CakeDesign({ formData, setFormData }) {
  const cakeStyles = ["Strawberry", "Chocolate", "Vanilla"];

  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold">🎂 Cake Design</h2>
      <select
        value={formData.cake.style || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            cake: { ...formData.cake, style: e.target.value },
          })
        }
        className="border p-2 rounded"
      >
        <option value="">Choose cake style</option>
        {cakeStyles.map((style) => (
          <option key={style} value={style}>
            {style}
          </option>
        ))}
      </select>
    </section>
  );
}