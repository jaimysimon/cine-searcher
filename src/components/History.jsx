import React, { useRef, useEffect } from "react";

import classNames from "classnames";
import { Typography } from "neetoui";
import { isEmpty, prop } from "ramda";
import { useTranslation } from "react-i18next";
import useMovieStore from "stores/useMovieStore";

const History = () => {
  const lastSelectedMovieId = useMovieStore(prop("lastSelectedMovieId"));
  const clickedMovies = useMovieStore(prop("clickedMovies"));

  const { t } = useTranslation();

  const highlightedMovieRef = useRef(null);

  useEffect(() => {
    if (lastSelectedMovieId && highlightedMovieRef.current) {
      highlightedMovieRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [lastSelectedMovieId]);

  return (
    <div className="flex h-full flex-col">
      {isEmpty(clickedMovies) ? (
        <div className="flex flex-grow items-center justify-center">
          <Typography className="text-center" style="body1" weight="semibold">
            {t("messages.noHistoryFound")}
          </Typography>
        </div>
      ) : (
        <>
          <Typography
            className=" mt-1 text-center"
            style="body1"
            weight="semibold"
          >
            {t("headings.browsedMoviesOrSeries")}
          </Typography>
          <div className="mt-4 h-full flex-grow overflow-y-auto">
            {clickedMovies.map(({ imdbId, title }) => {
              const movieClass = classNames(
                "neeto-ui-rounded-lg",
                "m-2",
                "p-1",
                "font-medium",
                {
                  "neeto-ui-bg-primary-600 neeto-ui-text-white":
                    imdbId === lastSelectedMovieId,
                  "neeto-ui-bg-primary-100 neeto-ui-text-gray-700":
                    imdbId !== lastSelectedMovieId,
                }
              );

              return (
                <div
                  className={movieClass}
                  key={imdbId}
                  ref={
                    imdbId === lastSelectedMovieId ? highlightedMovieRef : null
                  }
                >
                  <Typography className="text-center" style="body3">
                    {title}
                  </Typography>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default History;
