import { useState, useEffect } from "react";
import axios from "axios";
import AddMovieNavBar from "../NavBar/AddMovieNavBar";

const AllMovies = () => {
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

            <div className="max-w-5xl mx-auto mt-24 p-8 bg-slate-500 rounded-2xl shadow-2xl">
                <h1 className="text-4xl font-bold text-center text-gray-800 uppercase mb-8">
                    All Movies
                </h1>

                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <svg
                            aria-hidden="true"
                            className="w-12 h-12 text-gray-300 animate-spin fill-orange-600"
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
                    <p className="text-center text-red-600 font-semibold py-6">
                        Error: {error}
                    </p>
                )}

                {!loading && !error && (
                    <div className="grid gap-6 justify-center items-center sm:grid-cols-2 lg:grid-cols-3">
                        {movies.map((movie) => (
                            <div
                                key={movie.id}
                                className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-5 border border-gray-200"
                            >
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                    {movie.movieName}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Movie ID: {movie.id}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
                <div className="flex justify-center items-center gap-6 mt-10 pb-10">
                    <button
                        disabled={page <= 0}
                        onClick={() => {
                            setPage(page - 1);
                            setLoading(true);
                        }}
                        className="px-6 py-2 rounded-lg font-semibold text-white bg-gray-700 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
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
};

export default AllMovies;
