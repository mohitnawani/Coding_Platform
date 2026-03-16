import { Routes, Route, Navigate, useLocation } from "react-router";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {useDispatch,useSelector} from 'react-redux'
import {useEffect, useRef} from 'react'
import { checkAuth } from "./authSlice";
import AdminPanel from "./pages/AdminPanel";
import Createproblem from "./pages/Createproblem";
import Deleteproblem from "./pages/Deleteproblem";
import Updateproblem from "./pages/Updateproblem";

function App() {
  const { isAuthenticated,user,loading} = useSelector((state) => state.auth);
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

        {/* <Route path="/admin" element={isAuthenticated && user.role === 'admin' ? <AdminPanel /> : <Navigate to="/" /> } /> */}

        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/create"  element={<Createproblem />} />       {/* your existing create form */}
        <Route path="/admin/delete"  element={<Deleteproblem />} />   {/* delete list page */}
        <Route path="/admin/update"  element={<Updateproblem />} />   {/* update list page */}

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
