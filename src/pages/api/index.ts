import { NextApiHandler } from "next";

const Index: NextApiHandler = (req, res) => {
  res.json({
    movies: {
      search: `${req.url}/movies/search`,
    },
  });
};

export default Index;
