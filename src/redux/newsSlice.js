import { createSlice } from "@reduxjs/toolkit";

const newsSlice = createSlice({
  name: "news",
  initialState: {
    items: [],
    selected: null,
    search: "",
    sortBy: "asc",
  },
  reducers: {
    setNews: (state, action) => {
      state.items = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setNews, setSelected, setSearch, setSortBy } =
  newsSlice.actions;

export default newsSlice.reducer;
