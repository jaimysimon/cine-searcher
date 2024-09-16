import { useState } from "react";

import { useFetchMovies } from "hooks/reactQuery/useMoviesApi";
import useDebounce from "hooks/useDebounce";
import useQueryParams from "hooks/useQueryParams";
import { Search } from "neetoicons";
import { Input } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import List from "./List";

const MovieLookup = () => {
  const { t } = useTranslation();

  const history = useHistory();

  const queryParams = useQueryParams();

  const { searchTerm = "" } = queryParams;

  const [searchInputValue, setSearchInputValue] = useState(searchTerm);

  const debouncedSearchTerm = useDebounce(searchInputValue);
  const { data: { Search: movies = [] } = {} } =
    useFetchMovies(debouncedSearchTerm);

  const limitedMovies = movies.slice(0, 8);

  const handleChange = searchQuery => {
    const url = searchQuery
      ? buildUrl(routes.root, { searchTerm: searchQuery })
      : routes.root;

    history.replace(url);
    setSearchInputValue(searchQuery);
  };

  return (
    <div className="-mt-4 p-10">
      <Input
        placeholder={t("placeholders.searchForMoviesOrSeries")}
        prefix={<Search />}
        type="search"
        value={searchInputValue}
        onChange={({ target: { value } }) => handleChange(value)}
      />
      <List movies={limitedMovies} />
    </div>
  );
};

export default MovieLookup;
