import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {useDispatch,useSelector} from 'react-redux'
import {useEffect} from 'react'

const {isAuthenticated} = useSelector((state) => state.auth);
const dispatch=useDispatch();

useEffect(()=>{
  dispatch(checkAuth())
},[]);

function App() {
  return (
      <Routes>
        <Route path="/" element={isAuthenticated?<Homepage />:<Navigate to="/signup" />} />
        <Route path="/login" element={isAuthenticated?<Navigate to="/"/>:<Login />} />
        <Route path="/signup" element={isAuthenticated?<Navigate to="/"/>:<Signup />} />
      </Routes>
  );
}

export default App;


// import { Router, Route } from "react-router"
// import {Homepage} from "./pages/Homepage"
// import {Login} from "./pages/Login"
// import {Signup} from "./pages/Signup"

// function App()
// {
//   return(
//     <Router>
//       <Route path="./" element={<Homepage></Homepage>}></Route>
//       <Route path="./Login" element={<Login></Login>}></Route>   
//       <Route path="./Signup" element={<Signup></Signup>}></Route>           
//     </Router>
//   )
// }

// export default App
