import { useParams } from "react-router-dom";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

function Detail() {
    const {id} = useParams();
    const [movie, setMovie ] = useState([]);
    const getMovie = useCallback(async() => {
        const json = await( 
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setMovie(json.data.movie)
    },[id])
    useEffect(()=>{
     getMovie();   
    }, []);
    return <h1>Detail</h1>;
}

export default Detail; 