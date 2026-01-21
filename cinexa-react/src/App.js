import Home from './components/Home.js'
import Admin from './components/Admin.js'
import AdminDashBoard from './components/AdminDashBoard.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddMovie from './components/AddMovie.js';
import ErrorComponent from './components/ErrorComponent.js';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import AllMovies from './components/AllMovies.js';

const router=createBrowserRouter([
  {
    path: '/',
    element:<Home/>,
   errorElement:<ErrorComponent/>
  },
  {
    path: '/admin-login',
     element: <Admin />
  },
  { 
    path: '/admin-dashboard',
    element: <AdminDashBoard />
  },
  { 
    path: '/save-movie',
    element: <AddMovie />
  },
  {
    path:'/all-movies',
    element:<AllMovies />
  }
   
  
]);


const App=()=>{
  return(
    <>
    <ToastContainer position='bottom-right' theme='dark'/>

    <RouterProvider router={router}/>
    </>
  );


}

  export default App;