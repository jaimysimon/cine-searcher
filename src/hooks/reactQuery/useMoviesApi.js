import { QUERY_KEYS } from "constants/query";

import moviesApi from "apis/movies";
import { Toastr } from "neetoui";
import { useQuery } from "react-query";

export const useFetchMovies = (searchTerm, year, types) =>
  useQuery({
    queryKey: [QUERY_KEYS.MOVIES, searchTerm, year, types],
    queryFn: async () => {
      const params = {
        s: searchTerm,
        y: year,
        ...(types && types.length === 1 ? { type: types[0] } : {}),
      };
      const response = await moviesApi.fetch(params);

      const { Response, Error } = response;
      if (Response === "False") {
        Toastr.error(Error);
      }

      return response;
    },
    enabled: !!searchTerm,
  });

export const useShowMovie = imdbId =>
  useQuery({
    queryKey: [QUERY_KEYS.MOVIES, imdbId],
    queryFn: () => moviesApi.show({ i: imdbId }),
    enabled: !!imdbId,
  });
