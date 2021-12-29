import axios from "axios";
import cheerio from "cheerio";
import { API_URL } from "../constants";
import { Movie } from "../types/movie";

export class Movies {
  static async search(searchTerm: string = "") {
    const url = `${API_URL}/films/search?q=${searchTerm}`;
    try {
      const response = await axios(url);
      const html = await response.data;
      const $ = cheerio.load(html);
      const result: Movie[] = [];
      $("#searchResult .hits__item").each(function () {
        const $movie = $(this).find(".filmPreview");

        const id = Number.parseInt($movie.data("id") as string);
        const release = new Date($movie.data("release") as string);
        const title = $movie.find(".filmPreview__title").text();

        const movie: Movie = {
          id,
          release,
          title,
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