import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    uid?: string; // UID de Firebase
    user?: {
      uid: string;
      role: string;
    };
  }
}
