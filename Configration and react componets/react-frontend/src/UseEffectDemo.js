import { useEffect, useState } from "react";

function UseEffectExample() {
    const [count, setCount] = useState(0);
        useEffect(function(){
        console.log("use effect called");
        document.title=`You clicked ${count} times`;
        alert(`You clicked ${count} times`);
        },[count]);
    

return (
    <div>
        <h1>count={count}</h1>
        <button onClick={function () { setCount(count + 1) }}>increase count</button>
    </div>
);
}

export default UseEffectExample;