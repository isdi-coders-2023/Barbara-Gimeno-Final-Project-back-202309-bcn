import type { Request, Response } from "express";

export class PingController {
  public getPong(_req: Request, res: Response) {
    res.status(200).json({ message: "🏓" });
  }
}
