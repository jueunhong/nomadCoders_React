import { useParams } from "react-router-dom";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./Detail.module.css";

function Detail() {
    const {id} = useParams();
    const [movie, setMovie ] = useState([]);
    const [loading, setLoading] = useState(true);
    const getMovie = useCallback(async() => {
        const json = await( 
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setMovie(json.data.movie);
        setLoading(false);
    },[id]);
    useEffect(()=>{
     getMovie();   
    }, [getMovie]);
    return (<div className={styles.container}>
            {loading ? (<div className={styles.loader}>
            <span>Loading...</span>
            </div>): <div className={styles.detail_movie}>
            <img className={styles.bg_image} src={movie.background_image} alt=""/>
            <div className={styles.detail_title}>
                <img className={styles.detail_movie_img} src={movie.medium_cover_image} alt=""/>
                <div className={styles.detail_movie_title}>
                    <h2>{movie.title}</h2>
                    <div className={styles.detail_movie_info}>
                        <span>{movie.year} 년 | {movie.runtime}분</span>
                    </div>
                </div>
            </div>
            <div className={styles.detail_rate}>
                <span>rate: {movie.rating} | download: {movie.download_count}</span>
            </div>
            <div className={styles.detail_description}>
                <p>{movie.description_full}</p>
                <ul>
                    {movie.genres.map((g) => (
                        <li key={g}>{g}</li>
                    ))}
                </ul>
            </div>
        </div>}
        </div>)
    
}

export default Detail; 