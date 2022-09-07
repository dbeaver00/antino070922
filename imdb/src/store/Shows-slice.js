import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import movie from "../data/top250movies";
// import tvShow from "../data/top250TvShows";
// import popularMovie from "../data/popularMovies";
// import popularTvShow from "../data/popularTvShows";

// https://top-250-movies-api.herokuapp.com/api/v1/movies
// https://imdb-api.com/en/API/Top250Movies/k_0lwph1cq
// https://imdb-api.com/en/API/Top250TVs/k_0lwph1cq
// https://imdb-api.com/en/API/MostPopularMovies/k_0lwph1cq
// https://imdb-api.com/en/API/MostPopularTVs/k_0lwph1cq

export const fetchAllShows = createAsyncThunk(
  "shows/fetchAllShows",
  async () => {
    let movies = fetch("https://imdb-api.com/en/API/Top250Movies/k_0lwph1cq", {
      method: "GET",
    }).then((data) => data.json());
    let tvShows = fetch("https://imdb-api.com/en/API/Top250TVs/k_0lwph1cq", {
      method: "GET",
    }).then((data) => data.json());
    let popularMovies = fetch(
      "https://imdb-api.com/en/API/MostPopularMovies/k_0lwph1cq",
      {
        method: "GET",
      }
    ).then((data) => data.json());
    let popularTvShows = fetch(
      "https://imdb-api.com/en/API/MostPopularTVs/k_0lwph1cq",
      {
        method: "GET",
      }
    ).then((data) => data.json());
    const data = await Promise.all([
      movies,
      tvShows,
      popularMovies,
      popularTvShows,
    ]);
    console.log(data);
    movies = data[0].items;
    tvShows = data[1].items;
    popularMovies = data[2].items;
    popularTvShows = data[3].items;
    return [movies, tvShows, popularMovies, popularTvShows];
  }
);

// https://top-250-movies-api.herokuapp.com/api/v1/search?query=inception
// https://imdb-api.com/en/API/SearchTitle/k_0lwph1cq/${searchItem}

export const searchShows = createAsyncThunk(
  "shows/searchShows",
  async (searchItem) => {
    let shows = await fetch(
      `https://imdb-api.com/en/API/SearchTitle/k_0lwph1cq/${searchItem}`,
      {
        method: "GET",
      }
    ).then((data) => data.json());
    // console.log(shows);
    shows = shows.results;
    const re = new RegExp(`${searchItem}`, "gi");
    shows = shows.filter((show) => {
      // console.log(re.test(show.title));
      return re.test(show.title);
    });
    console.log(shows);
    if (shows.length === 0) {
      return "error";
    }
    return shows;
  }
);

const showsSlice = createSlice({
  name: "shows",
  initialState: {
    topMovies: [],
    topTvShows: [],
    popularMovies: [],
    popularTvShows: [],
    searchItems: [],
    loading: true,
    searchLoading: false,
  },
  reducers: {
    emptySearch(state) {
      state.searchItems = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchShows.fulfilled, (state, action) => {
      state.searchItems = action.payload;
      state.searchLoading = false;
    });
    builder.addCase(searchShows.pending, (state) => {
      state.searchLoading = true;
    });
    builder.addCase(fetchAllShows.fulfilled, (state, action) => {
      const [movies, tvShows, popularMovies, popularTvShows] = action.payload;
      state.topMovies = movies;
      state.topTvShows = tvShows;
      state.popularMovies = popularMovies;
      state.popularTvShows = popularTvShows;
      state.loading = false;
    });
    builder.addCase(fetchAllShows.pending, (state) => {
      state.loading = true;
    });
  },
});

export const showsActions = showsSlice.actions;

export default showsSlice.reducer;
