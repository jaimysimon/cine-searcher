import { useState, useRef } from "react";

import { useFetchMovies } from "hooks/reactQuery/useMoviesApi";
import useDebounce from "hooks/useDebounce";
import useQueryParams from "hooks/useQueryParams";
import { Search, Filter } from "neetoicons";
import { Input, Button } from "neetoui";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import FilterModal from "./FilterModal";
import List from "./List";

const MovieLookup = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [year, setYear] = useState("");
  const [type, setType] = useState([]);
  const buttonRef = useRef(null);

  const { t } = useTranslation();

  const history = useHistory();

  const queryParams = useQueryParams();

  const { searchTerm = "" } = queryParams;

  const [searchInputValue, setSearchInputValue] = useState(searchTerm);

  const debouncedSearchTerm = useDebounce(searchInputValue);
  const { data: { Search: movies = [] } = {} } = useFetchMovies(
    debouncedSearchTerm,
    year,
    type
  );

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
      <div className="flex flex-row">
        <Input
          placeholder={t("placeholders.searchForMoviesOrSeries")}
          prefix={<Search />}
          type="search"
          value={searchInputValue}
          onChange={({ target: { value } }) => handleChange(value)}
        />
        <Button
          className="outline-none -mr-5 bg-transparent"
          icon={() => <Filter className="neeto-ui-text-gray-800" size={20} />}
          ref={buttonRef}
          size="large"
          style="text"
          onClick={() => setIsFilterModalOpen(prev => !prev)}
        />
      </div>
      {isFilterModalOpen &&
        createPortal(
          <FilterModal
            {...{ setType, setYear, type, year }}
            anchorRef={buttonRef}
            isOpen={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
          />,
          document.body
        )}
      <List movies={limitedMovies} />
    </div>
  );
};

export default MovieLookup;
