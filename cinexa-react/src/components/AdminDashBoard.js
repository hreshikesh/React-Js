import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMasksTheater } from '@fortawesome/free-solid-svg-icons';


const AdminDashBoard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.post('http://localhost:8080/api/cinexa/logout');
        navigate('/');
    }

    return (
        <div className=" bg-gray-900 text-white">
            <nav className="bg-orange-950 p-3 flex justify-between items-center sticky top-0 ">
                <h1 className="text-2xl ps-9 font-bold text-yellow-700 almendra-sc-regular "><FontAwesomeIcon icon={faMasksTheater} className="me-2" />Cinexa</h1>
                <div className='justify-center items-center flex '>
                    <button className="transition-all ease-in-out duration-300 rounded-full p-2 bg-amber-950 text-yellow-700 hover:scale-110 hover:bg-yellow-700 hover:text-slate-950" onClick={handleLogout}>Logout</button>
                </div>
            </nav>
            <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
                <FontAwesomeIcon icon={faMasksTheater} className="text-yellow-500 text-6xl mb-4" />
                <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-lg text-gray-300 mb-6">Welcome to the Admin Dashboard</p>
                <div className="bg-orange-950 p-6 justify-center items-center rounded-lg shadow-lg w-full max-w-4xl">
                    <div className='text-center'>
                    <h2 className="text-2xl font-bold mb-4">Manage Cinema Operations</h2>
                    <p className="text-gray-300">Here you can manage movies, view bookings, and handle other administrative tasks.</p>
                    </div>
                    <div className='grid grid-cols-2 mt-4 bg-red-950 gap-4 mt-6 p-4 rounded-lg'>
                        <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full w-full hover:scale-105 transition-all duration-200">Add Movies</button>
                        <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full w-full hover:scale-105 transition-all duration-200">Update Movie</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default  AdminDashBoard;