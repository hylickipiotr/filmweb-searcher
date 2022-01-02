import axios from "axios";
import cheerio from "cheerio";
import { API_URL } from "../constants";
import { Movie } from "../types/movie";

export class GlobalSearch {
  static async search(searchTerm: string = "") {
    const url = `${API_URL}/search?q=${searchTerm}`;
    try {
      const response = await axios(url);
      const html = await response.data;
      const $ = cheerio.load(html);
      const result: Movie[] = [];
      $("#searchResult .hits__item").each(function () {
        const $movie = $(this).find(".filmPreview");
        const $rateBox = $movie.find(".filmPreview__rateBox");

        const id = Number.parseInt($movie.data("id") as string);
        const release = new Date($movie.data("release") as string);
        const title = $movie.find(".filmPreview__title").text();
        const rating = Number.parseFloat($rateBox.data("rate") as string);
        const votesCount = Number.parseInt($rateBox.data("count") as string);

        const movie: Movie = {
          id,
          release,
          title,
          rating,
          votesCount,
        };

        result.push(movie);
      });
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
