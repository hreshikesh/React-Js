import SaveLaptop from "./components/AddLaptop";
import ViewAllLaptop from "./components/ViewAllLaptop";
import Home from "./components/Home";
import DeleteLaptop from "./components/DeleteLaptop";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdateLaptop from "./components/UpdateLaptop";
export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/add-laptop" element={<SaveLaptop />} />
          <Route path="/view-laptops" element={<ViewAllLaptop />} />
          <Route path="/delete-laptop" element={<DeleteLaptop />} />
          <Route path="/update-laptop" element={<UpdateLaptop />} />
        </Routes>
      </Router>

    </div>
  );
}