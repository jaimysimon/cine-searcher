import { prop } from "ramda";
import useMovieStore from "stores/useMovieStore";

import Card from "./Card";

const Favourites = () => {
  const favouriteMovies = useMovieStore(prop("favouriteMovies"));

  return (
    <div className="mt-6 flex h-full flex-wrap items-center justify-center gap-4">
      {favouriteMovies.map(({ imdbId, poster, title }) => (
        <Card key={imdbId} {...{ poster, title }} />
      ))}
    </div>
  );
};

export default Favourites;
