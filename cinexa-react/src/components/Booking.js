import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Booking = () => {
    const { movieId } = useParams();

    const [movieDetails, setMovieDetails] = useState({});
    const [error, setError] = useState("");
    const [bookingDate, setBookingDate] = useState("");
    const [dateError, setDateError] = useState("");
    const [step, setStep] = useState(1);
    const [seats, setSeats] = useState([]);
    const [luxurySeats, setLuxurySeats] = useState([]);
    const [regularSeats, setRegularSeats] = useState([]);
    const [generalSeats, setGeneralSeats] = useState([]);


    

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/movie/getMovieById/${movieId}`)
            .then((res) => setMovieDetails(res.data))
            .catch((err) => setError(err.message));
    }, [movieId]);




    const handleSubmit=(e)=>{
        e.preventDefault();
    }

    const fetchSeats = () => {
        axios.get("http://localhost:8080/api/seat/getSeat")
            .then((res) => setSeats(res.data))
            .catch((err) => setError(err.message));
    }


    useEffect(() => {
        if (seats.length > 0) {
            SeatFilter();
        }
    },[seats]);

    const validateDate = (date) => {
        const selectedDate = new Date(date);
        const today = new Date();

        return selectedDate >= today;
    };

    const handleNext = () => {
        if (!bookingDate || !validateDate(bookingDate)) {
            setDateError("Please select a valid date (today or future).");
            return;
        }
        setDateError("");
        setStep(2);
        fetchSeats();
    };


    const SeatFilter = () => {
        console.log("All Seats:", seats.map(seat => seat.seatName));
        const luxury = seats.filter((seat) => seat.seatName.includes('L'));
        setLuxurySeats(luxury);
        console.log("Luxury Seats:", luxury);
        const regular = seats.filter((seat) => seat.seatName.startsWith('M'));
        setRegularSeats(regular);
        const general = seats.filter((seat) => seat.seatName.startsWith('G'));
        setGeneralSeats(general);
    }


    const seatPrice={

    }



    return (
        <div className="min-h-screen bg-gradient-to-br from-[#040C18] to-[#020617] text-white p-6">
            <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">


                <h1 className="text-3xl font-bold mb-6 text-center">
                    Booking for {movieDetails.movieName}
                </h1>

                {error && (
                    <p className="text-red-400 text-center mb-4">
                        Error: {error}
                    </p>
                )}


                <div className="w-full h-64 mb-6 flex items-center justify-center bg-black/30 rounded-2xl overflow-hidden">
                    <img
                        src={`http://localhost:8080/api/movie/movieImage/${movieDetails.imageName}`}
                        alt={movieDetails.movieName}
                        className="max-h-full max-w-full object-contain"
                    />
                </div>


                <div className="flex justify-center gap-4 mb-8">
                    <div className={`px-4 py-2 rounded-full ${step === 1 ? "bg-blue-600" : "bg-white/20"}`}>
                        Date
                    </div>
                    <div className={`px-4 py-2 rounded-full ${step === 2 ? "bg-blue-600" : "bg-white/20"}`}>
                        Seat
                    </div>
                </div>


                {step === 1 && (
                    <div className="space-y-4">
                        <label className="block text-lg">Select Date</label>
                        <input
                            type="date"
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white"
                        />
                        {dateError && (
                            <p className="text-red-400">{dateError}</p>
                        )}

                        <button
                            type="button"
                            onClick={handleNext}
                            className="w-full mt-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
                        >
                            Next
                        </button>
                    </div>
                )}


                {step === 2 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-center">
                            Select Your Seat
                        </h2>

                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <h3 className="text-lg font-semibold mb-2">General Seats</h3>
                                    <span className="text-emerald-600">Price:{movieDetails.moviePrice}</span>
                                </div>
                                <div className="flex flex-wrap justify-center gap-6">
                                    {generalSeats.map((seat) => (
                                        <button
                                            key={seat.id}
                                            type="button"
                                            className={`w-14 h-14 rounded-lg bg-white/20 ${seat.seatStatus==="BOOKED" ? "bg-red-500 cursor-not-allowed" : "hover:bg-green-500"} transition`}
                                        >
                                            {seat.seatName}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="flex gap-3">
                                    <h3 className="text-lg font-semibold mb-2">Regular Seats</h3>
                                    <span className="text-emerald-600">Price:{movieDetails.moviePrice + 50}</span>
                                </div>
                                <div className="flex flex-wrap justify-center gap-6">
                                    {regularSeats.map((seat) => (
                                        <button
                                            key={seat.id}
                                            type="button"
                                            className={`w-14 h-14 rounded-lg bg-white/20 ${seat.seatStatus==="BOOKED" ? "bg-red-500" : "hover:bg-green-500"} transition`}
                                        >
                                            {seat.seatName}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex gap-3">
                                    <h3 className="text-lg font-semibold mb-2">Luxury Seats</h3>
                                    <span className="text-emerald-600">Price:{movieDetails.moviePrice + 120}</span>
                                </div>
                                <div className="flex flex-wrap justify-center gap-6">
                                    {luxurySeats.map((seat) => (
                                        <button
                                            key={seat.id}
                                            type="button"
                                            className={`w-14 h-14 rounded-lg bg-white/20 ${seat.seatStatus==="BOOKED" ? "bg-red-500" : "hover:bg-green-500"} transition`}
                                        >
                                            {seat.seatName}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between mt-8">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="px-6 py-3 rounded-xl bg-gray-500 hover:bg-gray-600"
                            >
                                Previous
                            </button>

                            <button
                                type="button"
                                onClick={() => alert("Booking Confirmed!")}
                                className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700"
                            >
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Booking;
