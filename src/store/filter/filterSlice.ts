import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterParams {
  sort: Sort;
  category?: number;
}

interface FilterState {
  category: number;
  sort: Sort;
}

const initialState: FilterState = {
  category: 0,
  sort: {
    id: 1,
    name: "popularity",
    orderBy: "rating",
    order: "asc",
    alias: "popularity",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.category = action.payload ? action.payload : 0;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterParams>) {
      state.sort = action.payload.sort;
      if (action.payload.category) {
        state.category = action.payload.category;
      } else {
        state.category = 0;
      }
    },
  },
});

export const { setCategoryId, setSort, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
