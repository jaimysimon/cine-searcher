import { useShowMovie } from "hooks/reactQuery/useMoviesApi";
import { isNotEmpty } from "neetocommons/pure";
import { Modal as NeetoUIModal, Typography, Spinner, Tag } from "neetoui";

import LabeledDetail from "../commons/LabeledDetail";

const Modal = ({ isOpen, onClose, imdbID }) => {
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
  } = movie;

  const genres = Genre ? Genre.split(", ") : [];

  return (
    <NeetoUIModal size="large" {...{ isOpen, onClose }}>
      <Header>
        <Typography style="h2" weight="bold">
          {Title}
        </Typography>
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
