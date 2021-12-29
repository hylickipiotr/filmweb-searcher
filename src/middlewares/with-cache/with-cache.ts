import type { NextApiHandler } from "next";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 120 });

const withCache =
  (handler: NextApiHandler): NextApiHandler =>
  (req, res) => {
    try {
      const { url } = req;
      if (cache.has(url!)) {
        return res.status(200).json(cache.get(url!));
      }
      return handler(req, res);
    } catch (err) {
      throw new Error(err as string);
    }
  };

export { cache, withCache };
