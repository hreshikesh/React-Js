import { useEffect, useState } from "react";
import axios from "axios";
const MovieCount = () => {
    const [movieCount, setMovieCount] = useState(0);
    useEffect(() => {
        axios.get('http://localhost:8080/api/movie/countMovies')
            .then(response => {
                setMovieCount(response.data);
            })
    }, [])
    return (
        <div className="flex items-center bg-pink-950 text-yellow-700 rounded-full p-4 font-bold m-10">
            {movieCount > 0 && <h2 className="text-xl font-semibold  p-2">Total Movies: {movieCount}</h2>}
            {movieCount === 0 && <h2 className="text-xl font-semibold">No movies available. Please add movies.</h2>}
        </div>

    )
}

export default MovieCount;