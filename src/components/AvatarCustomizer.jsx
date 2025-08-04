export default function AvatarCustomizer({ formData, setFormData }) {
  const options = {
    hair: ["Brown", "Blonde", "Black"],
    shirt: ["Red", "Blue", "Green"],
  };

  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold">🧍 Avatar Customizer</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(options).map(([key, values]) => (
          <select
            key={key}
            value={formData.avatar[key] || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                avatar: { ...formData.avatar, [key]: e.target.value },
              })
            }
            className="border p-2 rounded"
          >
            <option value="">Select {key}</option>
            {values.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        ))}
      </div>
    </section>
  );
}