import { Routes, Route, Navigate, useLocation } from "react-router";
import Homepage from "./pages/Homepage";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { checkAuth } from "./authSlice";
import AdminPanel from "./pages/AdminPanel";
import Createproblem from "./pages/Createproblem";
import Deleteproblem from "./pages/Deleteproblem";
import Updateproblem from "./pages/Updateproblem";
import ProblemPage from "./pages/ProblemPage";
import Explore from "./pages/Navbar/Explore";
import Discuss from "./pages/Navbar/Discuss";
import Contest from "./pages/Navbar/Contest";
import LeaderBoard from "./pages/Navbar/LeaderBoard";
import Problems from "./pages/Navbar/Problems";
import Updateproblem_page from "./pages/Updateproblem_page";

function App() {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  // console.log("User in App.jsx:", user);

  const dispatch = useDispatch();
  const location = useLocation();
  const didCheckAuth = useRef(false);
  const [bootstrapped, setBootstrapped] = useState(false);
  const isAdmin = user?.role && typeof user.role === "string" ? user.role.toLowerCase() === "admin" : false;

  useEffect(() => {
    if (didCheckAuth.current) return;
    didCheckAuth.current = true;
    dispatch(checkAuth()).finally(() => setBootstrapped(true));
  }, [dispatch]);

  if (!bootstrapped || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <Routes>
      <Route path='/admin' element={isAuthenticated ? (isAdmin ? <AdminPanel /> : <Navigate to="/" />) : <Navigate to="/login" />} />
      <Route path='/' element={isAuthenticated ? (isAdmin ? <AdminPanel /> : <Homepage />) : <LandingPage />} />
      <Route path='/login' element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
      <Route path='/signup' element={!isAuthenticated ? <Signup /> : <Navigate to="/" />} />
      <Route path='/admin/create' element={isAuthenticated && isAdmin ? <Createproblem /> : <Navigate to="/" />} />
      <Route path='/admin/delete' element={isAuthenticated && isAdmin ? <Deleteproblem /> : <Navigate to="/" />} />
      <Route path='/admin/update' element={isAuthenticated && isAdmin ? <Updateproblem /> : <Navigate to="/" />} />

      <Route path='/admin/update/:id' element={isAuthenticated && isAdmin ? <Updateproblem_page /> : <Navigate to="/" />} />
      <Route path='/problem/:id' element={isAuthenticated ? <ProblemPage /> : <Navigate to="/login" />} />

      


      {/* Navbar routes */}
      <Route path="/explore" element={<Explore />} />
      <Route path="/discuss" element={<Discuss />} />
      <Route path="/contest" element={<Contest />} />
      <Route path="/leaderboard" element={<LeaderBoard />} />
      <Route path="/problems" element={<Problems />} />
    </Routes>
  );
}

export default App;

