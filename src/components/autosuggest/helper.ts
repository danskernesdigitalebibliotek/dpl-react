import MaterialType from "../../core/utils/types/material-type";

const AutosuggestCategory = {
  book: MaterialType.book,
  ebook: MaterialType.ebook,
  movie: MaterialType.movie,
  audioBook: MaterialType.audioBook,
  music: MaterialType.music,
  game: MaterialType.game,
  animatedSeries: MaterialType.animatedSeries
} as const;

export default AutosuggestCategory;
