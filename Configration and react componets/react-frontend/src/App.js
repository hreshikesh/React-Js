
import './App.css';
import MyMessage from './Message';
import { useState } from 'react';

function MySampleComponemt(){
  return(
    <div>
      <button>This is a sample component</button>
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



function Counter(){
  const [count, setCount] = useState(0);
  return(
    <div>
      <h1>Counter App</h1>
      <h3>count:{count}</h3>
      <button onClick={function(){setCount(count+1)}}>increase count</button>
      <button onClick={function(){setCount(count-1)}}>decrease count</button>
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
    <Counter/>
    </>
  );
}
