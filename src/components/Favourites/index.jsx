import { prop } from "ramda";
import useMovieStore from "stores/useMovieStore";

import Card from "./Card";

const Favourites = () => {
  const favouriteMovies = useMovieStore(prop("favouriteMovies"));

  return (
    <div className="flex h-full flex-wrap items-center justify-center gap-5 p-10">
      {favouriteMovies.map(({ imdbId, poster, title }) => (
        <Card key={imdbId} {...{ poster, title }} />
      ))}
    </div>
  );
};

export default Favourites;
