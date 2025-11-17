import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css";

export default function Home() {
    const navigate = useNavigate();

    function gotoSaveLaptop() {
        navigate("/add-laptop");
    }

    function gotoViewAllLaptop() {
        navigate("/view-laptops");
    }

    function gotoDeleteLaptop() {
        navigate("/delete-laptop");
    }

    function gotoUpdateLaptop() {
        navigate("/update-laptop");
    }


    return (
        <div>
            <nav className="flex justify-center space-x-4">
                <a href="/dashboard" className="font-medium rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                    Home
                </a>
                <a href="/team" className="font-medium rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                    Team
                </a>
                <a href="/projects" className="font-medium rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                    Projects
                </a>
                <a href="/reports" className="font-medium rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                    Reports
                </a>
            </nav>


            <div className="container mt-5">
                <div className="d-flex justify-contents-center align-items-center">
                    <div className="border p-4 bg-light w-100 text-center">
                        <h3 className="mb-4">Welcome to Laptop Management System</h3>
                        <button className="btn btn-primary m-2" onClick={gotoSaveLaptop}>Add Laptop</button>
                        <button className="btn btn-secondary m-2" onClick={gotoViewAllLaptop}>View All Laptops</button>
                        <button className="btn btn-secondary m-2" onClick={gotoDeleteLaptop}>Delete Laptop</button>
                        <button className="btn btn-secondary m-2" onClick={gotoUpdateLaptop}>Update Laptop</button>
                    </div>
                </div>
            </div>
        </div>
    )
}