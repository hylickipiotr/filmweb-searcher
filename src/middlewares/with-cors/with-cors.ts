import { NextApiHandler } from "next";
import NextCors from "nextjs-cors";

const withCors =
  (handler: NextApiHandler): NextApiHandler =>
  async (req, res) => {
    await NextCors(req, res, {
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      origin: "*",
      optionsSuccessStatus: 200,
    });

    return handler(req, res);
  };

export { withCors };
