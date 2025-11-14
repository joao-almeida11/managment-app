import type { Response } from "express";
import { vi } from "vitest";

export function mockResponse(): Response {
  const res: Partial<Response> = {};
  res.status = vi.fn().mockReturnValue(res as Response);
  res.json = vi.fn().mockReturnValue(res as Response);
  res.send = vi.fn().mockReturnValue(res as Response);
  res.sendStatus = vi.fn().mockReturnValue(res as Response);
  return res as Response;
}
