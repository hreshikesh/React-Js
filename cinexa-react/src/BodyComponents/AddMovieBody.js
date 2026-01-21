import { useState, useEffect} from "react";

import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";


const AddMovieBody = () => {

    const [step, setStep] = useState(1);
    const [languages, setLanguages] = useState([]);
    const [languageError, setLanguageError] = useState("");//this error if nomleng in db
    const [image, setImage] = useState(null);
    const [movie, setMovie] = useState({
        movieName: "",
        movieLanguage: [],
        movieImage: null,
        moviePrice: 0,
    });
    const [movieNameError, setMovieNameError] = useState("");
    const [movieLanguageError, setMovieLanguageError] = useState("");
    const [fileError, setFileError] = useState("");
    const [moviePriceError, setMoviePriceError] = useState("");
    const [serverSideError, setServerSideError] = useState([]);


    const handleInputChange = (event) => {
        setMovie({
            ...movie, [event.target.name]: event.target.value
        })
    };

    useEffect(() => {
        axios.get('http://localhost:8080/api/movie/getAllMoviesLanguages')
            .then(response => {
                setLanguages(response.data);
                console.log("Languages fetched successfully:", response.data);
            }).catch(error => {
                console.error("There was an error fetching the languages!", error);
                setLanguageError("Error fetching languages");
            });
    }, []);


    const handleLanguageChange = (selectedOptions) => {
        setMovie(movie => ({
            ...movie,
            movieLanguage: selectedOptions.map(opt => opt.value)
        }));
    };


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setImage(null);
                setFileError("File size must be less than 2MB!");
                event.target.value = "";
                return false;
            } else {
                setFileError("");
                setMovie(movie => ({
                    ...movie,
                    movieImage: file
                }));
                setImage(URL.createObjectURL(file));
                return true;
            }
        }
    };


    function verifyMovieName() {
        const nameRegex = /^[a-zA-Z ]{3,20}$/;
        if (!nameRegex.test(movie.movieName)) {
            setMovieNameError("Movie name must be 3-20 characters long and contain only letters, and spaces.");
            return false;
        } else {
            setMovieNameError("");
            return true;
        }
    }

    function verifyMovieLanguage() {
        if (!movie.movieLanguage || movie.movieLanguage.length === 0) {
            setMovieLanguageError("Please select at least one movie language.");
            return false;
        } else {
            setMovieLanguageError("");
            return true;
        }
    }



    function verifyMoviePrice() {
        const price = Number(movie.moviePrice);
        console.log("Verifying movie price:", price);
        if (price < 50 || price > 300) {
            setMoviePriceError("Movie price must be between 50 and 300.");
            return false;
        } else {
            setMoviePriceError("");
            console.log("Movie price is valid:", price);
            return true;
        }
    }


    const handleNextStep = () => {
        const isNameValid = verifyMovieName();
        const isLanguageValid = verifyMovieLanguage();
        if (isNameValid && isLanguageValid) {
            setStep(2);
        } else {
            setStep(1);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const isPriceValid = verifyMoviePrice();

        if (!isPriceValid || !image) {
            return;
        } else {
            setMovieNameError("");
            setMoviePriceError("");
            setFileError("");
            setLanguageError("");

            const formData = new FormData();
            formData.append('movieName', movie.movieName);
            formData.append('movieLanguage', movie.movieLanguage);
            formData.append('movieImage', movie.movieImage);
            formData.append('moviePrice', movie.moviePrice);

            console.log("Submitting movie:", movie);
            axios.post('http://localhost:8080/api/movie/saveMovie', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    setMovie({
                        movieName: "",
                        movieLanguage: [],
                        movieImage: null,
                        moviePrice: 0,
                    });
                    setImage(null);
                    toast.success("Movie added successfully!");
                    setStep(1);
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                        setServerSideError(error.response.data);
                    }
                });
        }
    };

    return (
        <div>
            <div className=" bg-gray-900 min-h-screen flex items-center justify-center p-4">

                <div className="w-full max-w-lg bg-orange-950 rounded-2xl shadow-2xl p-4">


                    <h1 className="text-white text-3xl font-semibold text-center mb-6">
                        Add Movie
                    </h1>


                    <h2 className="text-xl text-orange-300 text-center font-bold mb-4">
                        Step {step} of 2
                    </h2>

                    <form className="space-y-5" encType="multipart/form-data" onSubmit={handleSubmit}>

                        {step === 1 && (
                            <>
                                <div>
                                    <label
                                        htmlFor="movieNameId"
                                        className="block text-white mb-1 font-medium"
                                    >
                                        Movie Name<span className="text-orange-300">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        id="movieNameId"
                                        name="movieName"
                                        value={movie.movieName}
                                        onChange={handleInputChange}
                                        onInput={verifyMovieName}
                                        className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        required
                                    />
                                    {movieNameError && <p className="text-red-500">{movieNameError}</p>}
                                    {serverSideError.movieName && <p className="text-red-500">{serverSideError.movieName}</p>}
                                </div>

                                <div>
                                    <label
                                        htmlFor="movieLanguageId"
                                        className="block text-white mb-1 font-medium"
                                    >
                                        Language<span className="text-orange-300">*</span>
                                    </label>


                                    <Select
                                        id="movieLanguageId"
                                        name="movieLanguage"
                                        options={languages.map((lang) => ({
                                            value: lang.movieLanguage,
                                            label: lang.movieLanguage
                                        }))}
                                        isMulti
                                        onChange={handleLanguageChange}
                                        className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        placeholder="Select Language"
                                        value={
                                            languages
                                                .map(l => ({ value: l.movieLanguage, label: l.movieLanguage }))
                                                .filter(opt => movie.movieLanguage.includes(opt.value))
                                        }
                                        required
                                    />
                                    {movieLanguageError && <p className="text-red-500">{movieLanguageError}</p>}
                                    {languageError && <p className="text-red-500">{languageError}</p>}
                                    {serverSideError.movieLanguage && <p className="text-red-500">{serverSideError.movieLanguage}</p>}
                                </div>
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 rounded-xl transition-all hover:scale-[1.02]"
                                >
                                    Next →
                                </button>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <div>
                                    <label
                                        htmlFor="movieImage"
                                        className="block text-white mb-1 font-medium"
                                    >
                                        Movie Image <span className="text-orange-300">*</span>
                                    </label>
                                    {image && (
                                        <div style={{ marginTop: "20px" }}>
                                            <img
                                                src={image}
                                                alt="Preview"
                                                width="250px"
                                                style={{ borderRadius: "10px" }}
                                            />
                                        </div>
                                    )}l̥
                                    <input
                                        type="file"
                                        id="movieImage"
                                        name="movieImage"
                                        accept="image/*"
                                        className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none"
                                        onChange={(e) => {
                                            handleImageChange(e);

                                        }}
                                        required
                                    />
                                    {fileError && <p className="text-red-500">{fileError}</p>}
                                    {serverSideError.movieImage && <p className="text-red-500">{serverSideError.movieImage}</p>}
                                </div>

                                <div>
                                    <label
                                        htmlFor="moviePriceId"
                                        className="block text-white mb-1 font-medium"
                                    >
                                        Movie Price <span className="text-orange-300">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="moviePriceId"
                                        name="moviePrice"
                                        value={movie.moviePrice}
                                        onChange={handleInputChange}
                                        onBlur={verifyMoviePrice}
                                        placeholder="Enter movie price"
                                        className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                    {moviePriceError && <p className="text-red-500">{moviePriceError}</p>}
                                    {serverSideError.moviePrice && <p className="text-red-500">{serverSideError.moviePrice}</p>}
                                </div>

                                <div className="flex gap-4 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setStep(1)
                                            setImage(null);
                                        }
                                        }
                                        className="w-1/2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition-all hover:scale-[1.02]"
                                    >
                                        ← Back
                                    </button>

                                    <button
                                        type="submit"
                                        className="w-1/2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all hover:scale-[1.02]"
                                    >
                                        Submit ✔
                                    </button>
                                </div>
                            </>
                        )}
                    </form>

                </div>
            </div>
        </div>
    )
}

export default AddMovieBody;