import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

export default function UpdateLaptop() {

    const navigate = useNavigate();

    const [laptop, setLaptop] = useState({
        laptopId: "",
        laptopName: "",
        laptopPrice: "",
        laptopBrand: "",
        ownerName: ""
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/api/Laptop/getById/2`)
            .then((response) => {
                setLaptop(response.data);
            })
            .catch((error) => { 
                alert("Error fetching laptop data...Please Save the Laptop to update")

            })


    }, [laptop.laptopId]);

    function handleChange(event) {
        setLaptop({ ...laptop, [event.target.name]: event.target.value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.put("http://localhost:8080/api/Laptop/updateLaptop", laptop)
            .then((response) => {
                alert("Laptop Updated Successfully")
                navigate("/view-laptops")
                console.log(response);
            })
            .catch((error) => { alert("Error updating laptop Data") });
    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-contents-center align-items-center">
                <form className="border p-4 bg-light" onSubmit={handleSubmit}>
                    <h3 className="text-center mb-4">Update the Laptop Details</h3>
                    <div className="mb-3">
                        <label className="form-label">Laptop Name</label>
                        <input type="text" className="form-control" name="laptopName" value={laptop.laptopName} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Laptop Price</label>
                        <input type="number" className="form-control" name="laptopPrice" value={laptop.laptopPrice} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Laptop Brand</label>
                        <input type="text" className="form-control" name="laptopBrand" value={laptop.laptopBrand} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Owner Name</label>
                        <input type="text" className="form-control" name="ownerName" value={laptop.ownerName} onChange={handleChange} required />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Update Laptop</button>
                    </div>

                </form >

            </div >

        </div >
    );
}