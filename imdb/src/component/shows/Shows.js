import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Accordion from "../UI/Accordion";
import { fetchAllShows } from "../../store/Shows-slice";
import SearchShow from "./SearchShow";
import MySpinner from "../UI/MySpinner";

const Shows = () => {
  const {
    topMovies,
    topTvShows,
    popularMovies,
    popularTvShows,
    loading: isLoading,
  } = useSelector((state) => state.shows);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllShows());
  }, [dispatch]);
  return (
    <div>
      {isLoading && <MySpinner myClass="main-spinner-container"/>}
      {!isLoading && (
        <Fragment>
          <SearchShow data={false} />
          <Accordion title="Top 250 Movies" shows={topMovies} data={true} />
          <Accordion title="Top 250 Tv Shows" shows={topTvShows} data={true} />
          <Accordion
            title="Popular Movies recently"
            shows={popularMovies}
            data={true}
          />
          <Accordion
            title="Popular Tv Shows recently"
            shows={popularTvShows}
            data={true}
          />
        </Fragment>
      )}
    </div>
  );
};

export default Shows;
