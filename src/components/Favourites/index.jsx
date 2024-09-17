import { prop } from "ramda";
import useMovieStore from "stores/useMovieStore";

import Card from "./Card";

const Favourites = () => {
  const favouriteMovies = useMovieStore(prop("favouriteMovies"));

  return (
    <div className="mt-6 flex h-full flex-col items-center gap-4">
      {favouriteMovies.map(({ imdbId, title, rating }) => (
        <Card key={imdbId} {...{ rating, title }} />
      ))}
    </div>
  );
};

export default Favourites;
