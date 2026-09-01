// @vitest-environment jsdom
import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { I18nProvider } from "./i18n/I18nContext";
import { StatesProvider } from "./context/StatesContext";
import { AuthProvider } from "./context/AuthContext";

afterEach(cleanup);

vi.mock("./lib/apiFetch", () => ({
  apiFetch: vi.fn(async () => {
    throw new Error("network unavailable in test");
  }),
}));

function renderApp(initialPath: string) {
  return render(
    <I18nProvider>
      <StatesProvider>
        <AuthProvider>
          <MemoryRouter initialEntries={[initialPath]}>
            <App />
          </MemoryRouter>
        </AuthProvider>
      </StatesProvider>
    </I18nProvider>
  );
}

describe("routing", () => {
  it("renders the homepage at /", async () => {
    renderApp("/");
    expect(await screen.findByText((t) => t.includes("16th census"))).toBeInTheDocument();
  });

  it("renders the phases page at /phases", async () => {
    renderApp("/phases");
    expect(await screen.findByText(/Houselisting & Housing Census/)).toBeInTheDocument();
    expect(screen.getByText(/Population Enumeration/)).toBeInTheDocument();
  });

  it("renders the self-enumeration page at /self-enumeration", async () => {
    renderApp("/self-enumeration");
    expect(await screen.findByText(/se.census.gov.in/)).toBeInTheDocument();
    expect(screen.getByText(/No documents required/)).toBeInTheDocument();
  });

  it("renders the privacy page at /privacy", async () => {
    renderApp("/privacy");
    expect(await screen.findByText(/How Your Data Is Protected/)).toBeInTheDocument();
    expect(screen.getByText(/Myth vs. Fact/)).toBeInTheDocument();
  });

  it("renders the schedule page at /schedule", async () => {
    renderApp("/schedule");
    expect(await screen.findByText("State-wise Schedule")).toBeInTheDocument();
  });

  it("renders the assistant page at /assistant", async () => {
    renderApp("/assistant");
    expect(await screen.findByText("Ask the Assistant")).toBeInTheDocument();
    expect(screen.getByText(/When is my state's self-enumeration/)).toBeInTheDocument();
  });

  it("navigates between pages when a nav link is clicked", async () => {
    renderApp("/");
    fireEvent.click(screen.getByText("Self-Enumeration"));
    await waitFor(() => {
      expect(screen.getByText(/No documents required/)).toBeInTheDocument();
    });
  });

  it("falls back to homepage for unknown routes", async () => {
    renderApp("/does-not-exist");
    expect(await screen.findByText((t) => t.includes("16th census"))).toBeInTheDocument();
  });

  it("shows the header and footer on every page", async () => {
    renderApp("/privacy");
    expect(await screen.findByText("Jan Sutra")).toBeInTheDocument();
    expect(screen.getByText(/Built for Prompt Wars/)).toBeInTheDocument();
  });
});

describe("page titles", () => {
  it("sets a document title per route", async () => {
    renderApp("/phases");
    await waitFor(() => {
      expect(document.title).toContain("Phases");
    });
  });
});