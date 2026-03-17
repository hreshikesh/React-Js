import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BookingNavBar from "../NavBar/BookingNavBar";

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
    const [userEmail, setUserEmail] = useState("");
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [fetchedSeat, setFetchedSeats] = useState([]);




    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/movie/getMovieById/${movieId}`)
            .then((res) => setMovieDetails(res.data))
            .catch((err) => setError(err.message));
    }, [movieId]);

    const fetchBookedSeats = () => {
        console.log("Fetching booked seats for date:", bookingDate, "and movieId:", movieId);
        axios.get(`http://localhost:8080/api/booking/getAllBookedSeats/${bookingDate}/${movieId}`)
            .then((response) => {
                setFetchedSeats(response.data)
                console.log("Booked Seats:", response.data)
            })

            .catch((err) => {
                console.error("Error fetching booked seats:", err);
            })
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            movieId: movieId,
            userEmail: userEmail,
            bookingDate: bookingDate,
            selectedSeats: selectedSeats,
            price: totalPrice
        };
        axios.post("http://localhost:8080/api/booking/createBooking", data)
            .then((res) => {
                setStep(3);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    const fetchSeats = () => {

        axios.get("http://localhost:8080/api/seat/getSeat")
            .then((res) => setSeats(res.data))
            .catch((err) => setError(err.message));
    }


    useEffect(() => {
        if (seats.length > 0) {
            SeatFilter();
        }
    }, [seats]);

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

        fetchBookedSeats();
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





    return (
        <div>
            <BookingNavBar />

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

                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div className="space-y-4">
                                <label className="block text-lg">UserEmail</label>
                                <input
                                    type="email"
                                    value={userEmail}
                                    required
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white"
                                />
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

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Selected Seats:</h3>
                                    <div className="flex flex-wrap gap-4">
                                        {selectedSeats.map((seat, index) => (
                                            <span key={index} className="px-3 py-1 bg-blue-600 rounded-full">
                                                {seat}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-lg font-semibold">Total Price: <span className="text-emerald-400">{totalPrice}</span></h3>
                                    </div>
                                </div>
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
                                                    disabled={selectedSeats.includes(seat.seatName) || fetchedSeat.includes(seat.seatName)}
                                                    className={`w-14 h-14 rounded-lg bg-white/20 ${selectedSeats.includes(seat.seatName) ? "disabled:bg-emerald-500 cursor-not-allowed outline-purple-100" : "hover:bg-green-500"} ${fetchedSeat.includes(seat.seatName) ? "disabled:bg-red-700" : "hover:bg-green-500"} transition`}
                                                    onClick={() => {
                                                        setSelectedSeats([...selectedSeats, seat.seatName]);
                                                        setTotalPrice(totalPrice + movieDetails.moviePrice + 50);
                                                    }}
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
                                                    disabled={selectedSeats.includes(seat.seatName) || fetchedSeat.includes(seat.seatName)}
                                                    className={`w-14 h-14 rounded-lg bg-white/20 ${selectedSeats.includes(seat.seatName) ? "disabled:bg-emerald-500 cursor-not-allowed outline-purple-100" : "hover:bg-green-500"} ${fetchedSeat.includes(seat.seatName) ? "disabled:bg-red-700" : "hover:bg-green-500"} transition`}
                                                    onClick={() => {
                                                        setSelectedSeats([...selectedSeats, seat.seatName]);
                                                        setTotalPrice(totalPrice + movieDetails.moviePrice + 50);
                                                    }}
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
                                                    disabled={selectedSeats.includes(seat.seatName) || fetchedSeat.includes(seat.seatName)}
                                                    className={`w-14 h-14 rounded-lg bg-white/20 ${selectedSeats.includes(seat.seatName) ? "disabled:bg-emerald-500 cursor-not-allowed outline-purple-100" : "hover:bg-green-500"} ${fetchedSeat.includes(seat.seatName) ? "disabled:bg-red-700" : "hover:bg-green-500"} transition`}
                                                    onClick={() => {
                                                        setSelectedSeats([...selectedSeats, seat.seatName]);
                                                        setTotalPrice(totalPrice + movieDetails.moviePrice + 120);
                                                    }}
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
                                        type="submit"
                                        className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700"
                                    >
                                        Confirm Booking
                                    </button>
                                </div>
                            </div>

                        )}
                    </form>

                    {step === 3 && (
                        <div className="text-center mt-8">
                            <h2 className="text-2xl font-bold mb-4">Booking Successful!</h2>
                            <p className="text-lg">Thank you for booking with us. Enjoy your movie!</p>
                            <div className="mt-6">
                                <Link to="/all-movies" className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700">
                                    Book Another Movie
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Booking;
