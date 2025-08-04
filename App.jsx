// File: src/App.jsx
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MessageForm from "./components/MessageForm";
import AvatarCustomizer from "./components/AvatarCustomizer";
import CakeDesigner from "./components/CakeDesigner";
import BirthdayPreview from "./components/BirthdayPreview";
import BirthdayCard from "./components/BirthdayCard";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    avatar: {},
    cake: {},
  });

  const generateShareLink = () => {
    const params = new URLSearchParams({
      name: formData.name,
      message: formData.message,
      hair: formData.avatar.hair || "",
      shirt: formData.avatar.shirt || "",
      cake: formData.cake.style || "",
    });
    return `${window.location.origin}/card?${params.toString()}`;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <main className="p-4 max-w-4xl mx-auto space-y-6">
              <h1 className="text-3xl font-bold text-center">🎉 Birthday Creator 🎂</h1>
              <MessageForm formData={formData} setFormData={setFormData} />
              <AvatarCustomizer formData={formData} setFormData={setFormData} />
              <CakeDesigner formData={formData} setFormData={setFormData} />
              <BirthdayPreview formData={formData} />
              <div className="text-center">
                <a
                  href={generateShareLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  🎁 Generate Shareable Birthday Link
                </a>
              </div>
            </main>
          }
        />
        <Route path="/card" element={<BirthdayCard />} />
      </Routes>
    </Router>
  );
}