import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface FilterState {
  category: number;
  sort: Sort;
}

const selectFilterState = (state: RootState): FilterState => state.filter;

export const selectCategory = createSelector(
  [selectFilterState],
  (filter): number => filter.category
);
export const selectSort = createSelector(
  [selectFilterState],
  (filter): FilterState["sort"] => filter.sort
);
