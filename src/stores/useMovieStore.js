import { withImmutableActions } from "neetocommons/react-utils";
import { create } from "zustand";

/** @type {import("neetocommons/react-utils").ZustandStoreHook} */
const useMovieStore = create(
  withImmutableActions(set => ({
    selectedMovieId: "",
    setSelectedMovieId: selectedMovieId => set({ selectedMovieId }),
  }))
);

export default useMovieStore;
