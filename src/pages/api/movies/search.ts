import { NextApiHandler } from "next";
import { cache, withCache } from "src/middlewares/with-cache";
import { withCors } from "src/middlewares/with-cors";
import { Movies } from "src/models";

const searchHandler: NextApiHandler = async ({ url, query }, res) => {
  const { q } = query;
  const movies = await Movies.search(q as string | undefined);
  cache.set(url!, movies);
  res.status(200).json(movies);
};

export default withCors(withCache(searchHandler));
