import React from "react";

import Card from "./Card";

const List = ({ movies }) => (
  <div className="m-5">
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {movies.map(({ imdbID, Poster, Type, Year, Title }) => (
        <Card
          key={imdbID}
          {...{ imdbID }}
          poster={Poster}
          title={Title}
          type={Type}
          year={Year}
        />
      ))}
    </div>
  </div>
);
export default List;
