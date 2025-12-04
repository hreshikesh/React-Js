import { useState } from "react";

const AddMovie = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="bg-gray-700 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-orange-950 rounded-2xl shadow-2xl p-6">

        <h1 className="text-white text-3xl font-semibold text-center mb-6">
          Add Movie
        </h1>

        <h2 className="text-xl text-orange-300 text-center font-bold mb-4">
          Step {step} of 2
        </h2>

        <form className="space-y-5">

          {/* STEP 1 */}
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
                  className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
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
                  className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                >
                  <option value="">Select Language</option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Arabic">Arabic</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 rounded-xl transition-all hover:scale-[1.02]"
              >
                Next →
              </button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div>
                <label
                  htmlFor="movieImage"
                  className="block text-white mb-1 font-medium"
                >
                  Movie Image
                </label>
                <input
                  type="file"
                  id="movieImage"
                  name="movieImage"
                  className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none"
                  required
                />
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
                  className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
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
