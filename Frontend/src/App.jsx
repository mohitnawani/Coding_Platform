import { Routes, Route, Navigate, useLocation } from "react-router";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {useDispatch,useSelector} from 'react-redux'
import {useEffect, useRef, useState} from 'react'
import { checkAuth } from "./authSlice";
import AdminPanel from "./pages/AdminPanel";
import Createproblem from "./pages/Createproblem";
import Deleteproblem from "./pages/Deleteproblem";
import Updateproblem from "./pages/Updateproblem";
import ProblemPage from "./pages/ProblemPage";


function App() {
  const { isAuthenticated,user,loading} = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();
  const didCheckAuth = useRef(false);
  const [bootstrapped, setBootstrapped] = useState(false);
  const isAdmin = user?.role && typeof user.role === 'string' ? user.role.toLowerCase() === 'admin' : false;

  useEffect(() => {
    if (didCheckAuth.current) return;
    didCheckAuth.current = true;
    dispatch(checkAuth()).finally(() => setBootstrapped(true));
  }, [dispatch]);
  
  if (!bootstrapped || loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }

  return (
    <Routes>

      {/* Public Entry Point */}
      <Route
        path="/"
        element={
          !isAuthenticated
            ? <Login />
            : isAdmin
              ? <Navigate to="/admin" />
              : <Homepage />
        }
      />

      {/* Login */}
      <Route
        path="/login"
        element={
          !isAuthenticated
            ? <Login />
            : isAdmin
              ? <Navigate to="/admin" />
              : <Navigate to="/" />
        }
      />

      {/* Signup */}
      <Route
        path="/signup"
        element={
          !isAuthenticated
            ? <Signup />
            : <Navigate to="/" />
        }
      />

      {/* Admin Routes */}
      <Route path="/admin"         element={isAuthenticated && isAdmin ? <AdminPanel />     : <Navigate to="/login" />} />
      <Route path="/admin/create"  element={isAuthenticated && isAdmin ? <Createproblem />  : <Navigate to="/login" />} />
      <Route path="/admin/delete"  element={isAuthenticated && isAdmin ? <Deleteproblem />  : <Navigate to="/login" />} />
      <Route path="/admin/update"  element={isAuthenticated && isAdmin ? <Updateproblem />  : <Navigate to="/login" />} />

      {/* User Routes */}
      <Route path="/problem/:id" element={isAuthenticated ? <ProblemPage /> : <Navigate to="/login" />} />

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
