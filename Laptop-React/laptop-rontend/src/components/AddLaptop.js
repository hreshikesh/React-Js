
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

    const[serverErrorMessage,setServerErrorMessage]=useState({});
    const[laptopNameError,setLaptopnameError]=useState("");
    const[laptopPriceError,setLaptopPriceError]=useState("");
    const[laptopBrandError,setLaptopBrandError]=useState("");
    const[ownerNameError,setOwnerNameError]=useState("");




    function handleChange(event) {
        setLaptop({
            ...laptop,
            [event.target.name]: event.target.value
        });
    }

    function validateLaptopName() {
        const nameRegex = /^[a-zA-Z0-9 ]{3,30}$/;

      
        if(!nameRegex.test(laptop.laptopName)){
            setLaptopnameError("Laptop name must be 3-30 characters long and contain only letters, numbers, and spaces.");
        }else{
            setLaptopnameError("");
        }
    }

    function validateLaptopPrice() {
        const priceRegex = /^[0-9]+$/;

        if(!priceRegex.test(laptop.laptopPrice)){
            setLaptopPriceError("Laptop price must be a valid number.");
        }else{
            setLaptopPriceError("");
        }       
    }
    function validateLaptopBrand() {
        const brandRegex = /^[a-zA-Z0-9 ]{2,30}$/;
        if(!brandRegex.test(laptop.laptopBrand)){
            setLaptopBrandError("Laptop brand must be 2-30 characters long and contain only letters, numbers, and spaces.");
        }else{
            setLaptopBrandError("");
        }
    }
    function validateOwnerName() {
        const nameRegex = /^[a-zA-Z ]{3,30}$/;
        if(!nameRegex.test(laptop.ownerName)){
            setOwnerNameError("Owner name must be 3-30 characters long and contain only letters and spaces.");
        }else{
            setOwnerNameError("");
        }   
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
            .catch((error) => { 
                if(error.response && error.response.data){
                    setServerErrorMessage(error.response.data);
                    setLaptopnameError("");
                    setLaptopPriceError("");
                    setLaptopBrandError("");
                    setOwnerNameError("");
                }else{
                    setServerErrorMessage(["An unexpected error occurred. Please try again later."]);
                        }        alert("Error adding laptop Data")
             })
    }
    return (
        <div className="container mt-5">
            <div className="d-flex justify-contents-center align-items-center">
                <form className="border p-4 bg-light" onSubmit={handleSubmit}>
                    <h3 className="text-center mb-4">Add Laptop</h3>

   

                    <div className="mb-3">
                        <label className="form-label">Laptop Name</label>
                        <input type="text" className="form-control" name="laptopName" value={laptop.laptopName} onChange={handleChange} onInput={validateLaptopName} required />
                    </div>
                    {serverErrorMessage.laptopName && (
                        <div className="text-danger mb-3">{serverErrorMessage.laptopName}</div>
                    )}
                    {laptopNameError && (
                        <div className="text-danger mb-3">{laptopNameError}</div>
                    )}

                    <div className="mb-3">
                        <label className="form-label">Laptop Price</label>
                        <input type="number" className="form-control" name="laptopPrice" value={laptop.laptopPrice} onChange={handleChange} onInput={validateLaptopPrice} required />
                    </div>
                    {serverErrorMessage.laptopPrice && (
                        <div className="text-danger mb-3">{serverErrorMessage.laptopPrice}</div>
                    )}
                    {laptopPriceError && (
                        <div className="text-danger mb-3">{laptopPriceError}</div>
                    )}
                    <div className="mb-3">
                        <label className="form-label">Laptop Brand</label>
                        <input type="text" className="form-control" name="laptopBrand" value={laptop.laptopBrand} onChange={handleChange} onInput={validateLaptopBrand} required />
                    </div>
                    {serverErrorMessage.laptopBrand && (
                        <div className="text-danger mb-3">{serverErrorMessage.laptopBrand}</div>
                    )}
                    {laptopBrandError && (
                        <div className="text-danger mb-3">{laptopBrandError}</div>
                    )}
                    <div className="mb-3">
                        <label className="form-label">Owner Name</label>
                        <input type="text" className="form-control" name="ownerName" value={laptop.ownerName} onChange={handleChange} onInput={validateOwnerName} required />
                    </div>
                    {serverErrorMessage.ownerName && (
                        <div className="text-danger mb-3">{serverErrorMessage.ownerName}</div>
                    )}
                    {ownerNameError && (
                        <div className="text-danger mb-3">{ownerNameError}</div>
                    )}
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Add Laptop</button>
                    </div>

                </form >

            </div >

        </div >

    );

}