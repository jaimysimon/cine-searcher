import { existsBy, removeBy } from "neetocist";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useMovieStore = create(
  persist(
    set => ({
      selectedMovieId: "",
      lastSelectedMovieId: "",
      clickedMovies: [],
      favouriteMovies: [],

      setSelectedMovieId: selectedMovieId => set({ selectedMovieId }),
      setLastSelectedMovieId: lastSelectedMovieId =>
        set({ lastSelectedMovieId }),

      addMovieToHistory: ({ imdbId, title }) =>
        set(({ clickedMovies }) => {
          const isMoviePresent = existsBy({ imdbId }, clickedMovies);

          if (!isMoviePresent) {
            return { clickedMovies: [{ imdbId, title }, ...clickedMovies] };
          }

          return { clickedMovies };
        }),

      removeMovieFromHistory: imdbId =>
        set(({ clickedMovies }) => ({
          clickedMovies: removeBy({ imdbId }, clickedMovies),
        })),

      clearHistory: () => set(() => ({ clickedMovies: [] })),

      addMovieToFavourites: ({ imdbId, title, rating }) =>
        set(({ favouriteMovies }) => {
          const isMoviePresent = existsBy({ imdbId }, favouriteMovies);

          if (!isMoviePresent) {
            return {
              favouriteMovies: [{ imdbId, title, rating }, ...favouriteMovies],
            };
          }

          return { favouriteMovies };
        }),
      removeMovieFromFavourites: imdbId =>
        set(({ favouriteMovies }) => ({
          favouriteMovies: removeBy({ imdbId }, favouriteMovies),
        })),
    }),
    { name: "movie-history-store" }
  )
);

export default useMovieStore;
