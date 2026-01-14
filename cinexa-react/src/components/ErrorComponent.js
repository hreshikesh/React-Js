import { useRouteError } from "react-router-dom";

const ErrorComponent=()=>{
    const error=useRouteError();
    return(
        <div className="box-content size-32 border-4 p-4 bg-orange-400 text-center m-4">
            <h1 className="text-red-950 text-center">Oops! An Error Occurred</h1>
            <p className="text-red-950 text-center">{error.status} - {error.statusText || error.message}</p>
        </div>
    );
}

export default ErrorComponent;