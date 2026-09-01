import { getFirebaseAuth } from "./firebase";

/**
 * Perform a fetch to the backend API, attaching the Firebase ID token as a
 * Bearer token in the Authorization header when the user is signed in.
 * When not signed in (or Firebase disabled), the request goes out without
 * auth so the backend's dev-mode bypass still works.
 */
export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = new Headers(options.headers);

  const auth = getFirebaseAuth();
  const currentUser = auth?.currentUser;
  if (currentUser) {
    try {
      const token = await currentUser.getIdToken();
      if (token) headers.set("Authorization", `Bearer ${token}`);
    } catch {
      // ignore — send unauthenticated
    }
  }

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(path, { ...options, headers });

  if (!res.ok) {
    const text = await res.text();
    let message = text;
    try {
      message = JSON.parse(text).error ?? text;
    } catch {
      // not JSON — use raw text
    }
    throw new Error(message);
  }

  return (await res.json()) as T;
}
