import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ViewAllLaptop(){
    const [laptops, setLaptops] = useState([]);

    function fetchLaptops() {
        axios.get("http://localhost:8080/api/Laptop/getAllLaptop")
        .then((response)=>{
            setLaptops(response.data);
        }
        )
    .catch((error)=>{
        alert("Error fetching laptop data");
    }
);
}

return(
    <div className="container mt-5">
        <div className="d-flex justify-contents-center align-items-center">
            <div className="border p-4 bg-light w-100">
                <h3 className="text-center mb-4">All Laptops</h3>
                <button className="btn btn-primary mb-3" onClick={fetchLaptops}>Fetch Laptops</button>
               {laptops.length>0 && <table className="table table-bordered">
                    <tr>
                        <th>Laptop Name</th>
                        <th>Laptop Price</th>
                        <th>Laptop Brand</th>
                        <th>Owner Name</th>
                    </tr>
                    <tbody>
                        {laptops.map((laptop)=>
                        <tr>
                            <td>{laptop.laptopName}</td>
                            <td>{laptop.laptopPrice}</td>
                            <td>{laptop.laptopBrand}</td>
                            <td>{laptop.ownerName}</td>
                        </tr>)}
                    </tbody>
                </table>}
            </div>
        </div>
    </div>

)

}