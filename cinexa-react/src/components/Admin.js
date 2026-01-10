import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMasksTheater } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';


const Admin = () => {
   
    const [adminEmail, setAdminEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [sendButtonShow, setSendButtonShow] = useState(true);
    const [timer, setTimer] = useState(0);


    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);

    }, [timer]);

    function handleChange(event) {
        setAdminEmail(event.target.value);
    }

    async function handleSendOTp() {

        if (!adminEmail) {
            toast.error('Please enter your email address');
            return;
        }
        setOtp('');

        axios.post(`http://localhost:8080/api/Admin/sentOtp/${adminEmail}`)
            .then((response) => {
                const email = document.getElementById('emailId');
                email.readOnly = true;
                setSendButtonShow(false);
                const otpBlock = document.getElementById('otpBlockId');
                otpBlock.classList.remove('hidden');
                toast.success(response.data);
                setTimer(30);
            }).catch((error) => {
                if (error.response) {
                    toast.error(error.response.data);
                } else {
                    toast.error('Error sending OTP. Please try again later.');
                }
            })
    }


    function verifyOtp() {

        if (!otp) {
            toast.error('Please enter the OTP');
            return;
        }
        axios.post(`http://localhost:8080/api/Admin/verifyotp/${adminEmail}/${otp}`)
           .then((response) => {
                let timerInterval;
                let countDown = 5;
                Swal.fire({
                    icon: 'success',
                    title: 'OTP Verified Successfully',
                    showConfirmButton: false,
                    timer: 5000,
                    draggable: false,
                    backdrop: 'rgba(0,0,0,0.5) blur(5px)',
                    timerProgressBar: true,
                    html: "You will redirect to dashboard in <b></b> s",
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup().querySelector("b");
                        timerInterval = setInterval(() => {
                            countDown -= 1;
                            timer.textContent = countDown;
                        }, 1000);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    },
                    customClass: {
                        popup: "border-4 border-orange-500 rounded-xl bg-stone-950 text-yellow-400"
                    }
                })
                setTimeout(() => {
                    navigate('/admin-dashboard');
                }, 5000);
            }).catch((error) => {
                if (error.response) {
                    toast.error(error.response.data);
                } else {
                    toast.error('Error verifying OTP. Please try again later.');
                }
            })
    }


    return (
        <div className="min-h-screen bg-black">
            
            <div className="mt-7 text-yellow-700 flex flex-col items-center justify-center">

                <h1 className="text-4xl font-bold mb-8">Admin Login</h1>
                <form className="bg-orange-950 p-6 rounded-lg shadow-lg w-96">
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor="emailId">AdminEmail</label>
                        <input className="w-full p-2 rounded  text-zinc-800  focus:outline-none focus:ring-2 focus:ring-orange-300" type="email" id="emailId" name="adminEmail"
                            onChange={handleChange} value={adminEmail} placeholder='Enter Your EmailId' required />
                    </div>
                    {sendButtonShow && (<div className='flex justify-center items-center'>
                        <button className="w-50 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4  focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-full hover:scale-110 transition-all ease-in-out duration-300"
                            type="button" onClick={handleSendOTp} id='send-otp-button'>Send OTP</button>
                    </div>)}
                    <div id="otpBlockId" className='hidden'>
                        <label className="block text-gray-300 mb-2 mt-4" htmlFor="otp">Enter OTP</label>
                        <input className="w-full p-2 rounded  text-zinc-800  focus:outline-none focus:ring-2 focus:ring-orange-300" type="text" id="otp" name="otp"
                            onChange={(e) => setOtp(e.target.value)} value={otp} maxLength={6} placeholder='Enter OTP' required />
                        <div className='flex justify-center align-middle'>
                            <button className="w-50 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4  
                        focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-full
                         hover:scale-110 transition-all ease-in-out duration-300 mt-4"
                                type="button" onClick={verifyOtp} >Verify OTP</button>
                        </div>
                        <div className='text-center mt-2'>
                            {timer !== 0 && (<p>You can resend otp in {timer}s</p>)}
                            {timer === 0 && (
                                <p className="text-sm text-gray-600 mt-3">
                                    Didn’t receive the OTP?
                                    <button
                                        type="button"
                                        onClick={handleSendOTp}
                                        className=" text-yellow-600 hover:text-yellow-700 font-medium underline underline-offset-2 
                                         hover:scale-105 transition-all duration-200bg-transparent ml-1 ">
                                        Click here
                                    </button>
                                </p>
                            )}

                        </div>
                    </div>

                </form >


            </div >
        </div >
    );
}

export default Admin;