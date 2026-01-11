import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMasksTheater } from '@fortawesome/free-solid-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const AdminLoginNavBar = () => {
     const navigate = useNavigate();
    return (
        <div>
            <nav className="bg-orange-950 p-3 flex justify-between items-center">
                <h1 className="text-2xl ps-9 font-bold text-yellow-700 almendra-sc-regular "><FontAwesomeIcon icon={faMasksTheater} className="me-2" />Cinexa</h1>
                <div className='justify-center items-center flex '>
                    <button className="transition-all ease-in-out duration-300 rounded-full p-2 bg-amber-950 text-yellow-700 hover:scale-110 hover:bg-yellow-700 hover:text-slate-950" onClick={() => { navigate('/'); }}>Home</button>
                </div>
            </nav>
        </div>
    )
}

export default AdminLoginNavBar;