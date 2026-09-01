import { useState, useRef, useEffect } from "react";
import { useI18n } from "../i18n/I18nContext";
import type { TranslationKey } from "../i18n/translations";
import { apiFetch } from "../lib/apiFetch";
import Section from "./Section";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS: TranslationKey[] = [
  "assistant.suggested1",
  "assistant.suggested2",
  "assistant.suggested3",
  "assistant.suggested4",
];

export default function Assistant() {
  const { t } = useI18n();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function ask(rawQ: string) {
    const q = rawQ.trim();
    if (!q || loading) return;
    const userMsg: Message = { role: "user", content: q };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch<{ answer: string }>("/api/ask", {
        method: "POST",
        body: JSON.stringify({ question: q }),
      });
      setMessages((prev) => [...prev, { role: "assistant", content: res.answer }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : t("assistant.error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section id="assistant" title={t("assistant.title")} subtitle={t("assistant.subtitle")}>
      <div className="chat">
        <div className="chat-log" ref={scrollRef}>
          {messages.length === 0 && !loading && (
            <div className="chat-empty">
              <span className="chat-empty-icon">💬</span>
              <p>{t("assistant.placeholder")}</p>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`chat-row ${m.role}`}>
              <span className="chat-bubble">
                {m.content}
              </span>
            </div>
          ))}

          {loading && (
            <div className="chat-row assistant">
              <span className="chat-bubble typing">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </span>
              <span className="chat-label">{t("assistant.typing")}</span>
            </div>
          )}
        </div>

        {messages.length === 0 && !loading && (
          <div className="chat-suggestions">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                className="chat-chip"
                onClick={() => ask(t(s))}
                disabled={loading}
              >
                {t(s)}
              </button>
            ))}
          </div>
        )}

        {error && <p className="error">{error}</p>}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
          className="chat-form"
        >
          <input
            className="assistant-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("assistant.placeholder")}
            disabled={loading}
          />
          <button type="submit" className="btn-primary" disabled={loading || !input.trim()}>
            {t("assistant.ask")}
          </button>
        </form>
      </div>
    </Section>
  );
}
