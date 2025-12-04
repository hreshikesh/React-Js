import Home from './components/Home.js'
import Admin from './components/Admin.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashBoard from './components/AdminDashBoard.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddMovie from './components/AddMovie.js';


const App=()=>{
  return(
    <>
    <ToastContainer position='bottom-right' theme='dark'/>

    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin-login' element={<Admin />}/>
        <Route path='/admin-dashboard' element={<AdminDashBoard />}/>
        <Route path='/save-movie' element={<AddMovie />}/>
      </Routes>
    </Router>
    </>
  );


}

  export default App;