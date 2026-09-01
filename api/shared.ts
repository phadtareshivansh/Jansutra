export type Response = {
  status: (code: number) => { json: (body: unknown) => void };
};

export function ok(body: unknown, res: Response): void {
  res.status(200).json(body);
}
