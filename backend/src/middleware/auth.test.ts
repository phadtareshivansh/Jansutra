import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response } from "express";

const verifyIdToken = vi.hoisted(() => vi.fn(async () => ({ uid: "user-123" })));

vi.mock("../db", () => ({ getFirebaseApp: vi.fn() }));
vi.mock("firebase-admin/auth", () => ({
  getAuth: vi.fn(() => ({ verifyIdToken })),
}));

import { getFirebaseApp } from "../db";
import { getAuth } from "firebase-admin/auth";
import { authMiddleware } from "./auth";

const mockedGetFirebaseApp = vi.mocked(getFirebaseApp);
const mockedGetAuth = vi.mocked(getAuth);

function mockReq(overrides: Partial<Request> = {}): Request {
  return { headers: {}, ...overrides } as Request;
}

function mockRes() {
  const res: Record<string, unknown> = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.locals = {};
  return res as unknown as Response & {
    status: ReturnType<typeof vi.fn>;
    json: ReturnType<typeof vi.fn>;
    locals: Record<string, unknown>;
  };
}

describe("authMiddleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    verifyIdToken.mockImplementation(async () => ({ uid: "user-123" }));
  });

  it("passes through when Firebase is not configured (dev mode)", async () => {
    mockedGetFirebaseApp.mockReturnValue(null);
    const next = vi.fn();
    const res = mockRes();
    await authMiddleware(mockReq(), res, next);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("rejects requests with no bearer token when Firebase is configured", async () => {
    mockedGetFirebaseApp.mockReturnValue({} as never);
    const next = vi.fn();
    const res = mockRes();
    await authMiddleware(mockReq(), res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized: missing bearer token" });
    expect(next).not.toHaveBeenCalled();
  });

  it("rejects requests with an invalid token", async () => {
    mockedGetFirebaseApp.mockReturnValue({} as never);
    verifyIdToken.mockRejectedValueOnce(new Error("bad token"));
    const next = vi.fn();
    const res = mockRes();
    await authMiddleware(mockReq({ headers: { authorization: "Bearer invalid-token" } }), res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("attaches the decoded user and calls next for a valid token", async () => {
    mockedGetFirebaseApp.mockReturnValue({} as never);
    const next = vi.fn();
    const res = mockRes();
    await authMiddleware(mockReq({ headers: { authorization: "Bearer valid-token" } }), res, next);
    expect(res.locals.user).toEqual({ uid: "user-123" });
    expect(next).toHaveBeenCalled();
  });
});