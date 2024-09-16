import { QUERY_KEYS } from "constants/query";

import moviesApi from "apis/movies";
import { Toastr } from "neetoui";
import { useQuery } from "react-query";

export const useFetchMovies = searchTerm =>
  useQuery({
    queryKey: [QUERY_KEYS.MOVIES, searchTerm],
    queryFn: async () => {
      const params = { s: searchTerm };
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
