import styles from "./ShowCard.module.css";

import StarIcon from "@mui/icons-material/Star";

const ShowCard = (props) => {
  return (
    <div className={styles.showCard}>
      <div className={styles.poster}>
        <img src={props.image} alt="show poster" />
        <h5 title={props.title}>{props.title}</h5>
        {/* <h5 className={styles.tooltip}>{props.title}</h5> */}
      </div>
      {props.data && (
        <div className={styles.showDetails}>
          <div className={styles.detail}>
            <p>Crew</p>
            <p className={styles.crew} title={props.crew}>
              {props.crew}
            </p>
            {/* <p className={styles.tooltip}>{props.crew}</p> */}
          </div>
          <div className={styles.detail}>
            <p>Rank</p>
            <p>{props.rank}</p>
          </div>
          <div className={styles.detail}>
            <p>Year</p>
            <p>{props.year}</p>
          </div>
          <div className={styles.detail}>
            <p>Rating </p>
            <p className={styles.rating}>
              {props.rating}
              {<StarIcon />}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowCard;
