import ShowCard from "./ShowCard";

import styles from "./ShowsUI.module.css";

const ShowsUI = (props) => {
  // console.log(props.shows);
  return (
    <div className={styles.showsCard}>
      {props.shows.map((show) => (
        <ShowCard
          key={show.id}
          title={show.title}
          crew={show.crew}
          year={show.year}
          image={show.image}
          rating={show.imDbRating}
          rank={show.rank}
          data={props.data}
        />
      ))}
    </div>
  );
};

export default ShowsUI;
