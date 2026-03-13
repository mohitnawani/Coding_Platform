import { Routes, Route, Navigate, useLocation } from "react-router";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {useDispatch,useSelector} from 'react-redux'
import {useEffect, useRef} from 'react'
import { checkAuth } from "./authSlice";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const didCheckAuth = useRef(false);

  useEffect(() => {
    // Avoid 401 noise on public auth pages and avoid duplicate calls in StrictMode.
    if (didCheckAuth.current) return;
    if (location.pathname === '/login' || location.pathname === '/signup') return;
    didCheckAuth.current = true;
    dispatch(checkAuth());
  }, [dispatch, location.pathname]);

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
