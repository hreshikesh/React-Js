import { useEffect, useState } from "react";
import axios from "axios";

const AddMovie = () => {
  const [step, setStep] = useState(1);
  const [languages, setLanguages] = useState([]);
  const [languageError, setLanguageError] = useState("");
  const [image, setImage] = useState(null);
  const [movie, setMovie] = useState({
    movieName: "",
    movieLanguage: "",
    movieImage: null,
    moviePrice: ""
  });
  const [movieNameError, setMovieNameError] = useState("");
  const [movieLanguageError, setMovieLanguageError] = useState("");
  const [fileError, setFileError] = useState("");
  const [moviePriceError, setMoviePriceError] = useState("");


  const handleInputChange = (event) => {
    setMovie({
      ...movie, [event.target.name]: event.target.value
    })
  };




  useEffect(() => {
    axios.get('http://localhost:8080/api/movie/getAllMoviesLanguages').
      then(response => {
        setLanguages(response.data);
        console.log("Languages fetched successfully:", response.data);
      }).catch(error => {
        console.error("There was an error fetching the languages!", error);
        setLanguageError("Error fetching languages");
      });
  }, []);


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
    if (!movie.movieLanguage || movie.movieLanguage.trim() === "") {
      setMovieLanguageError("Please select a movie language.");
      return false;
    } else {
      setMovieLanguageError("");
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

  function verifyMoviePrice() {
    if (movie.moviePrice < 50 || movie.moviePrice > 300) {
      setMoviePriceError("Price must be between 50 and 300.");
      return false;
    } else {

      setMoviePriceError("");
      return true;
    }
  }

  return (
    <div className="bg-gray-700 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-orange-950 rounded-2xl shadow-2xl p-6">

        <h1 className="text-white text-3xl font-semibold text-center mb-6">
          Add Movie
        </h1>

        <h2 className="text-xl text-orange-300 text-center font-bold mb-4">
          Step {step} of 2
        </h2>

        <form className="space-y-5" encType="multipart/form-data">

          {step === 1 && (
            <>
              <div>
                <label
                  htmlFor="movieNameId"
                  className="block text-white mb-1 font-medium"
                >
                  Movie Name
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
              </div>

              <div>
                <label
                  htmlFor="movieLanguageId"
                  className="block text-white mb-1 font-medium"
                >
                  Language
                </label>

                <select
                  id="movieLanguageId"
                  name="movieLanguage"
                  value={movie.movieLanguage}

                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required

                >


                  <option value={""} selected >Select Language</option>
                  {
                    languages.map((lang) => (
                      <option key={lang.id} value={lang.movieLanguage}>{lang.movieLanguage}</option>
                    ))
                  }


                </select>
                {movieLanguageError && <p className="text-red-500">{movieLanguageError}</p>}
                {languageError && <p className="text-red-500">{languageError}</p>}
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
                  Movie Image
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
                  className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none"
                  onChange={(e) => {
                    handleImageChange(e);
                    handleInputChange(e);
                  }}
                  required
                />
                {fileError && <p className="text-red-500">{fileError}</p>}
              </div>

              <div>
                <label
                  htmlFor="moviePriceId"
                  className="block text-white mb-1 font-medium"
                >
                  Movie Price
                </label>
                <input
                  type="number"
                  id="moviePriceId"
                  name="moviePrice"
                  value={movie.moviePrice}
                  onChange={handleInputChange}
                  onInput={verifyMoviePrice}
                  className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                {moviePriceError && <p className="text-red-500">{moviePriceError}</p>}
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
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
  );
};


export default AddMovie;
