import React, { useRef, useEffect } from "react";

import classNames from "classnames";
import { Delete } from "neetoicons";
import { Typography, Button } from "neetoui";
import { isEmpty, prop } from "ramda";
import { useTranslation } from "react-i18next";
import useMovieStore from "stores/useMovieStore";

const History = () => {
  const lastSelectedMovieId = useMovieStore(prop("lastSelectedMovieId"));
  const clickedMovies = useMovieStore(prop("clickedMovies"));
  const removeMovieFromHistory = useMovieStore(prop("removeMovieFromHistory"));
  const clearHistory = useMovieStore(prop("clearHistory"));

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
          <div className="flex items-center justify-between">
            <Typography
              className="ml-4 mt-1 text-center"
              style="body1"
              weight="semibold"
            >
              {t("headings.viewHistory")}
            </Typography>
            <Button
              className="outline-none items-end bg-transparent"
              label={t("label.clearAll")}
              size="small"
              style="danger-text"
              tooltipProps={{
                content: t("tooltips.deleteFromHistory"),
              }}
              onClick={clearHistory}
            />
          </div>
          <div className="mt-4 h-full flex-grow overflow-y-auto ">
            {clickedMovies.map(({ imdbId, title }) => {
              const movieClass = classNames(
                "neeto-ui-rounded-lg m-2 p-2 font-medium flex items-center justify-between",
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
                  <Typography
                    className="ml-2 items-center text-center"
                    style="body3"
                  >
                    {title}
                  </Typography>
                  <Button
                    className="outline-none items-end bg-transparent"
                    size="large"
                    style="text"
                    icon={() => (
                      <Delete className="neeto-ui-text-gray-800" size={15} />
                    )}
                    tooltipProps={{
                      content: t("tooltips.deleteFromHistory"),
                    }}
                    onClick={() => removeMovieFromHistory(imdbId)}
                  />
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
