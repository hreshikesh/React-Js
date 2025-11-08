import { useEffect,useState } from "react";

function FetchAllGoldDetails(props){
const [goldDetails,setGoldDetails]=useState([]);
useEffect(function(){
    fetch(`http://localhost:8080/api/GoldShop/id/${props.goldId}`).then
    (response=>response.json()).
    then(function(data){
     setGoldDetails(data);
     console.log("data fetched successfully",data);
    }).catch(function(error){
        console.log("error occurred while fetching data",error);
    });
},[props.goldId]);

return(
    <div>
      <h1>Gold Details</h1>
      <ul>
          <li>
            {goldDetails.goldOrnamentName} : {goldDetails.goldPrice}
          </li>
      </ul>
    </div>
)
}

function GetAllGoldBasedOnComapny(props){
    const [goldDetails,setGoldDetails]=useState([]);
    useEffect(function(){
        fetch(`http://localhost:8080/api/GoldShop/company/${props.companyName}`) .then(response=>response.json())
        .then(function(data){
            setGoldDetails(data);
            console.log("data fetched successfully on company",data);
        });
    },[props.companyName]);

    return(
        <div>
            <h1>Gold Details Based on Company {props.companyName}</h1>
            <ul>
                {goldDetails.
                map((gold)=>(
                    <li>
                        {gold.goldOrnamentName} : {gold.goldPrice}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export {FetchAllGoldDetails,GetAllGoldBasedOnComapny};
