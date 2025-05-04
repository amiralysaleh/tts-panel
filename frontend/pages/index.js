import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("Alloy");
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const voices = ["Alloy", "Echo", "Fable", "Onyx", "Nova", "Shimmer"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice }),
      });
      const data = await response.json();
      setAudioUrl(data.file_url);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Text-to-Speech Panel</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text"
        />
        <select
          className="w-full p-2 border mt-2"
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
        >
          {voices.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
        <button
          type="submit"
          className="mt-2 p-2 bg-blue-500 text-white"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Speech"}
        </button>
      </form>
      {audioUrl && (
        <div className="mt-4">
          <audio controls src={audioUrl} />
        </div>
      )}
    </div>
  );
}
