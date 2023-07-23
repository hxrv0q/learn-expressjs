import { SessionData } from "express-session";

declare module "express-session" {
  interface SessionData {
    cart: {
      items: Array<{ item: string; quantity: number }>;
    };
    user: {
      username: string;
    };
  }
}
