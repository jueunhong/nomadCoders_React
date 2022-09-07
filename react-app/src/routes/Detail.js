import { useParams } from "react-router-dom";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

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
    return (<div>{loading ? <h1>Loading...</h1> : <div>
            <h1>Detail</h1>
            <img src={movie.medium_cover_image} alt=""/>
            <h2>{movie.title}</h2>
            <span>{movie.year} 년 | {movie.runtime}분</span>
            <br/>
            <span>rate: {movie.rating} | download: {movie.download_count}</span>
            <p>{movie.description_full}</p>
            <ul>
                {movie.genres.map((g) => (
                    <li key={g}>{g}</li>
                ))}
            </ul>
        </div>}
        </div>)
    
}

export default Detail; 