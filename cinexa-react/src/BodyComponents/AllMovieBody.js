import { useState, useEffect } from "react";
import axios from "axios";
import AddMovieNavBar from "../NavBar/AddMovieNavBar";
import { Link } from "react-router-dom";

const AllMovieBody=()=>{
     const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [totalSize, setTotalSize] = useState(0);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/movie/getAllMovies?page=${page}&size=5`)
            .then((res) => {
                setMovies(res.data.content);
                setTotalSize(res.data.totalPages);
                setTimeout(() => setLoading(false), 1000);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [page]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-red-950">
            <AddMovieNavBar />

            <div className="max-w-6xl mx-auto mt-24 p-10 bg-slate-700/30 rounded-3xl shadow-2xl backdrop-blur-md">
                <h1 className="text-4xl font-extrabold text-center text-white uppercase mb-12 tracking-wide">
                    All Movies
                </h1>

                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <svg
                            aria-hidden="true"
                            className="w-12 h-12 text-gray-300 animate-spin fill-orange-500"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348"
                                fill="currentFill"
                            />
                        </svg>
                    </div>
                )}

                {error && (
                    <p className="text-center text-red-400 font-semibold py-8 text-lg">
                        Error: {error}
                    </p>
                )}

                {!loading && !error && (
                    <div className="flex flex-wrap justify-center gap-10 px-4">
                        {movies.map((movie) => (
                            <div
                                key={movie.id}
                                className="group flex flex-col bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 p-6 w-[260px]"
                            >

                                <div className="w-full h-56 mb-5 flex items-center justify-center bg-black/20 rounded-2xl overflow-hidden">
                                    <img
                                        src={
                                            "http://localhost:8080/api/movie/movieImage/" +
                                            movie.imageName
                                        }
                                        alt={movie.movieName}
                                        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>

                                <h2 className="text-2xl font-semibold text-white text-center mb-3">
                                    {movie.movieName}
                                </h2>

                                <div className="flex flex-wrap justify-center gap-2 mb-4">
                                    {movie.movieLanguage.map((lang, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 text-xs font-medium rounded-full bg-white/20 text-white backdrop-blur-md"
                                        >
                                            {lang}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-center text-lg font-bold text-emerald-400 mb-6">
                                    {movie.moviePrice}/-
                                </p>
                                

                               <Link to={`/booking/${movie.id}`}>
                                    <button className="mt-auto w-full py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-orange-500/30">
                                        Book Now
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>

                )}

                <div className="flex justify-center items-center gap-6 mt-12 pb-10">
                    <button
                        disabled={page <= 0}
                        onClick={() => {
                            setPage(page - 1);
                            setLoading(true);
                        }}
                        className="px-6 py-2 rounded-lg font-semibold text-white bg-gray-700 hover:bg-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                        Previous
                    </button>

                    <span className="text-lg font-semibold text-white">
                        Page {page + 1} of {totalSize}
                    </span>

                    <button
                        disabled={page >= totalSize - 1}
                        onClick={() => {
                            setPage(page + 1);
                            setLoading(true);
                        }}
                        className="px-6 py-2 rounded-lg font-semibold text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );

}

export default AllMovieBody;

