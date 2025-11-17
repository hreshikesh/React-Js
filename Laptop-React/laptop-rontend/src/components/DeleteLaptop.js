import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DeleteLaptop() {
    const[laptopId,setLaptopId]=useState("");

  function handleChange(event){
    event.target.name=event.target.value;
    setLaptopId(event.target.value);
  }
   

    function handleSubmit(event){
        event.preventDefault();
        axios.delete(`http://localhost:8080/api/Laptop/deleteLaptop/${laptopId}`)
        .then((response)=>{
            alert("Laptop Deleted Successfully")
            console.log(response);
            setLaptopId("");
        })
        .catch((error)=>{ alert("Error deleting laptop Data") })

    }

    return(
        <div className="container mt-5">
            <div className="d-flex justify-contents-center align-items-center">
                <form className="border p-4 bg-light" onSubmit={handleSubmit}>
                    <h3 className="text-center mb-4">Delete Laptop</h3>
                    <div className="mb-3">
                        <label className="form-label">Laptop ID</label>
                        <input type="text" className="form-control" name="laptopId" value={laptopId} onChange={handleChange} required />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-danger">Delete Laptop</button>
                    </div>
                </form>
            </div>
        </div>
    )

}