import React from "react";

import History from "./History";
import MovieLookup from "./MovieLookup";

const Home = () => (
  <div className="flex h-full">
    <div className="h-full w-2/3 p-3">
      <MovieLookup />
    </div>
    <div className="flex items-center justify-center">
      <div className="divider neeto-ui-bg-gray-300 w-px" />
    </div>
    <div className="h-full w-1/3 p-3">
      <History />
    </div>
  </div>
);
export default Home;
