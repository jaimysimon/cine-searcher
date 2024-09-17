import { useShowMovie } from "hooks/reactQuery/useMoviesApi";
import { existsBy } from "neetocist";
import { isNotEmpty } from "neetocommons/pure";
import { Rating, RatingFilled } from "neetoicons";
import {
  Modal as NeetoUIModal,
  Typography,
  Spinner,
  Tag,
  Button,
} from "neetoui";
import { prop } from "ramda";
import { useTranslation } from "react-i18next";
import useMovieStore from "stores/useMovieStore";

import LabeledDetail from "../commons/LabeledDetail";

const Modal = ({ isOpen, onClose, imdbID }) => {
  const { t } = useTranslation();

  const { Header, Body } = NeetoUIModal;

  const { isLoading, data: movie = {} } = useShowMovie(imdbID);
  const {
    Title,
    Year,
    Genre,
    Poster,
    Plot,
    Actors,
    Director,
    BoxOffice,
    Runtime,
    Language,
    Rated,
    imdbRating,
  } = movie;

  const genres = Genre ? Genre.split(", ") : [];
  const addMovieToFavourites = useMovieStore(prop("addMovieToFavourites"));
  const removeMovieFromFavourites = useMovieStore(
    prop("removeMovieFromFavourites")
  );
  const favouriteMovies = useMovieStore(prop("favouriteMovies"));

  return (
    <NeetoUIModal size="large" {...{ isOpen, onClose }}>
      <Header>
        {isNotEmpty(movie) && (
          <Typography style="h2" weight="bold">
            {Title}
            {existsBy({ imdbId: imdbID }, favouriteMovies) ? (
              <Button
                className="outline-none bg-transparent"
                size="large"
                style="text"
                tooltipProps={{ content: t("tooltips.unStar") }}
                icon={() => (
                  <RatingFilled className="neeto-ui-text-gray-800" size={15} />
                )}
                onClick={() => removeMovieFromFavourites(imdbID)}
              />
            ) : (
              <Button
                className="outline-none bg-transparent"
                icon={() => <Rating className="cursor-pointer" size={15} />}
                size="large"
                style="text"
                tooltipProps={{ content: t("tooltips.star") }}
                onClick={() =>
                  addMovieToFavourites({
                    imdbId: imdbID,
                    title: Title,
                    rating: imdbRating,
                  })
                }
              />
            )}
          </Typography>
        )}
        {isNotEmpty(genres) &&
          genres.map(genre => (
            <Tag className="my-3 mr-2" key={genre} type="solid">
              {genre}
            </Tag>
          ))}
      </Header>
      <Body>
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex h-full">
            <div className="w-1/3 p-1">
              <img
                alt={Title}
                className="neeto-ui-rounded-lg object-contain"
                src={Poster}
              />
            </div>
            <div className="ml-10 w-2/3 space-y-4 p-4">
              <Typography component="i" style="body2" weight="light">
                {Plot}
              </Typography>
              <div className="space-y-2">
                <LabeledDetail i18nKey="label.director" value={Director} />
                <LabeledDetail i18nKey="label.actors" value={Actors} />
                <LabeledDetail i18nKey="label.boxOffice" value={BoxOffice} />
                <LabeledDetail i18nKey="label.year" value={Year} />
                <LabeledDetail i18nKey="label.runtime" value={Runtime} />
                <LabeledDetail i18nKey="label.language" value={Language} />
                <LabeledDetail i18nKey="label.rated" value={Rated} />
              </div>
            </div>
          </div>
        )}
      </Body>
    </NeetoUIModal>
  );
};

export default Modal;
