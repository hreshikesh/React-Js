import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMasksTheater } from '@fortawesome/free-solid-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';


export default function Home() {
    const navigate = useNavigate();

    const gotoAdminLogin = () => {
        navigate('/admin-login');
    }

    return (
        <div className="min-h-screen bg-black">
            <nav className="bg-orange-950 p-3 flex justify-between items-center">
                <h1 className="text-2xl ps-9 font-bold text-yellow-700 almendra-sc-regular "><FontAwesomeIcon icon={faMasksTheater} className="me-2" />Cinexa</h1>
                <div className='justify-center items-center flex '>
                    <button className="transition-all ease-in-out duration-300 rounded-full p-2 bg-amber-950 text-yellow-700 hover:scale-110 hover:bg-yellow-700 hover:text-slate-950 " onClick={gotoAdminLogin}><FontAwesomeIcon icon={faUserTie} className='me-2' />Admin Login</button>
                </div>
            </nav>

            <div className='container bg-black text-white flex flex-col justify-center items-center'>
                <h1 className='text-4xl font-bold mt-20 mb-5 bungee-spice-regular'>Welcome to Cinexa</h1>
                <p className='text-lg mb-10 px-5 text-center audiowide-regular'>Your ultimate destination for booking movie tickets online. Experience the magic of cinema with just a few clicks!</p>

            </div>
            <div className='m-6 border-r-amber-400 opacity-60'>
                <marquee behavior="scroll" direction="left" className='flex gap-6  justify-center items-center '>
                    <div className='flex gap-6 items-center'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTTzM7kFNFPQ_uuLXIi_j45pb8JcgunTfjTw&s"
                            alt="Cinema"
                            className='rounded-lg shadow-lg w-40 h-40 flex-shrink-0 object-cover hover:border-amber-400 hover:border-4 hover:animate-pulse' />

                        <img src="https://preview.redd.it/really-confused-about-reviews-for-lokah-v0-1wrclww0u6mf1.jpeg?auto=webp&s=1b86ce2766743abeab98466c9039b6838f40dc9e"
                            alt="Cinema"
                            className='rounded-lg shadow-lg w-40 h-40 flex-shrink-0 object-cover hover:border-amber-400 hover:border-4 hover:animate-pulse' />

                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Baahubali_%E2%80%93_The_Epic.jpg/250px-Baahubali_%E2%80%93_The_Epic.jpg"
                            alt="Cinema"
                            className='rounded-lg shadow-lg w-40 h-40 flex-shrink-0 object-cover hover:border-amber-400 hover:border-4 hover:animate-pulse' />

                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdb9nQGH6Ys1JOG3HefTb2fudDo5fZI4PJBw&s"
                            alt="Cinema"
                            className='rounded-lg shadow-lg w-40 h-40 flex-shrink-0 object-cover hover:border-amber-400 hover:border-4 hover:animate-pulse' />

                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJjG0BIwZkhwTUR-6PwqFwuZkc6SNtHNHMQw&s"
                            alt="Cinema"
                            className='rounded-lg shadow-lg w-40 h-40 flex-shrink-0 object-cover hover:border-amber-400 hover:border-4 hover:animate-pulse' />
                    </div>
                </marquee>



            </div>

        </div >

    );
}