
import MovieCount from '../BodyComponents/MovieCount';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMasksTheater } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const AdminDashBoardBody = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
            <MovieCount />
            <FontAwesomeIcon icon={faMasksTheater} className="text-yellow-500 text-6xl mb-4" />
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-lg text-gray-300 mb-6">Welcome to the Admin Dashboard</p>
            <div className="bg-orange-950 p-6 justify-center items-center rounded-lg shadow-lg w-full max-w-4xl">
                <div className='text-center'>
                    <h2 className="text-2xl font-bold mb-4">Manage Cinema Operations</h2>
                    <p className="text-gray-300">Here you can manage movies, view bookings, and handle other administrative tasks.</p>
                </div>
                <div className='grid grid-cols-2 bg-red-950 gap-4 mt-6 p-4 rounded-lg'>
                    <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full w-full hover:scale-105 transition-all duration-200" onClick={() => { navigate('/save-movie') }}>Add Movies</button>
                    <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full w-full hover:scale-105 transition-all duration-200" onClick={() => { navigate('/all-movies') }}>All Movie</button>
                </div>
            </div>
        </div>
    )
}

export default AdminDashBoardBody;