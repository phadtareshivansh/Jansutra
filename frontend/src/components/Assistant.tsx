import { useState } from "react";
import { useI18n } from "../i18n/I18nContext";
import { apiFetch } from "../lib/apiFetch";
import Section from "./Section";

export default function Assistant() {
  const { t } = useI18n();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function ask() {
    const q = question.trim();
    if (!q || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch<{ answer: string }>("/api/ask", {
        method: "POST",
        body: JSON.stringify({ question: q }),
      });
      setAnswer(res.answer);
    } catch (e) {
      setError(e instanceof Error ? e.message : t("assistant.error"));
      setAnswer(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section id="assistant" title={t("assistant.title")} subtitle={t("assistant.subtitle")}>
      <div className="assistant">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask();
          }}
          className="assistant-form"
        >
          <input
            className="assistant-input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={t("assistant.placeholder")}
          />
          <button type="submit" className="btn-primary" disabled={loading || !question.trim()}>
            {loading ? t("assistant.typing") : t("assistant.ask")}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        {answer && <div className="assistant-answer">{answer}</div>}
      </div>
    </Section>
  );
}
