
import './App.css';
import MyMessage from './Message';
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function MySampleComponemt(){
  return(
    <div className='container-fluid justify-content-center text-center mt-5'>
      <button type='submit' className='btn btn-success p-3'>This is a sample component</button>
    </div>
  )
}

function Welcome(props){
  return(
    <div>
    <p>Hello {props.name} welcome to React Project</p>
    <p>Your Age is {props.age}</p>
    </div>
  );
}



function Counter(props){
  const [count, setCount] = useState(props.initalValue);
  return(
    <div className='row container-fluid d-flex justify-content-center text-center mt-5'>
    <div class="card w-25 bg-success-subtle" >
  <div class="card-body">
    <h5 class="card-title">Counter App for {props.name}</h5>
    <h3>count:{count}</h3>
      <button onClick={function(){setCount(count+1)}} className='btn btn-outline-warning'>increase count</button>
      <button onClick={function(){setCount(count-1)}}className='btn btn-outline-danger'>decrease count</button>
  </div>
   </div>
   </div>
  )
}

function InputApp(){
  const[input,setInput]=useState("");
  return(
    <div>
      <h1>Input name</h1>
      <input type="text" value={input} onInput={function(e){setInput(e.target.value)}} / >
      <h2>Your name is:{input}</h2>
    </div>
  )

}

export default function myFunction(){
  return(
    <>
    <MySampleComponemt />
    <Welcome name="Rishi" age="25"/>
    <Welcome name="Ajay" age="24"/>
    <MyMessage />
    <Counter name="Rishi" initalValue={3}/>
    <Counter name="Ajay" initalValue={7}/>
    <InputApp />
    </>
  );
}
