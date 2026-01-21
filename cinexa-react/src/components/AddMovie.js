



import AddMovieBody from "../BodyComponents/AddMovieBody";
import AddMovieNavBar from "../NavBar/AddMovieNavBar";

import { Outlet } from "react-router-dom";

const AddMovie = () => {


  return (
    <div>
    
      <AddMovieNavBar />
      <AddMovieBody />
     
    
    </div>
  );
};


export default AddMovie;
