import { useEffect, useState } from "react";

function App() {
  const [ping, setPing] = useState<{ ok: boolean; timestamp: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/ping")
      .then((res) => res.json())
      .then(setPing)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container">
      <h1>PromptWars</h1>
      <p className="subtitle">Hackathon Starter Shell</p>

      <div className="card">
        <h2>Backend Status</h2>
        {error && <p className="error">Error: {error}</p>}
        {ping && (
          <p className="success">
            {ping.ok ? "Connected" : "Error"} — {new Date(ping.timestamp).toLocaleTimeString()}
          </p>
        )}
        {!ping && !error && <p className="loading">Connecting...</p>}
      </div>
    </div>
  );
}

export default App;
