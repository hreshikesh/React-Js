import Home from './components/Home.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App=()=>{
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin-login' element={<h1>Admin Login Page</h1>}/>
      </Routes>
    </Router>
  );


}

  export default App;