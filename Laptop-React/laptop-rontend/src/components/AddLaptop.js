
import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SaveLaptop() {
    const [laptop, setLaptop] = useState({
        laptopName: "",
        laptopPrice: "",
        laptopBrand: "",
        ownerName: ""
    });

    function handleChange(event) {
        setLaptop({
            ...laptop,
            [event.target.name]: event.target.value
        });
    }


    function handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:8080/api/Laptop/registerLaptop",laptop)
            .then((response) => {
                alert("Laptop Added Successfully")
                console.log(response);
                setLaptop(
                    {
                        laptopName: "",
                        laptopPrice: "",
                        laptopBrand: "",
                        ownerName: ""
                    }
                )
            })
            .catch((error) => { alert("Error adding laptop Data") })
    }
    return (
        <div className="container mt-5">
            <div className="d-flex justify-contents-center align-items-center">
                <form className="border p-4 bg-light" onSubmit={handleSubmit}>
                    <h3 className="text-center mb-4">Add Laptop</h3>
                    <div className="mb-3">
                        <label className="form-label">Laptop Name</label>
                        <input type="text" className="form-control" name="laptopName" value={laptop.laptopName} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Laptop Price</label>
                        <input type="number" className="form-control" name="laptopPrice" value={laptop.laptopPrice} onChange={handleChange}  />
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
                        <button type="submit" className="btn btn-primary">Add Laptop</button>
                    </div>

                </form >

            </div >

        </div >

    );

}