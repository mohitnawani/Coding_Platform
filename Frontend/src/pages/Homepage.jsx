import { NavLink }  from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../authSlice";
import { useState } from "react";
import { useEffect } from "react";
import axiosClient from "../utils/axiosClient";

const DIFF = {
  Easy: "text-emerald-400",
  Medium: "text-amber-400",
  Hard: "text-rose-400",
};

function Homepage() {
  const [showLogout, setShowLogout] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [Problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [filters, setFilters] = useState({ difficulty: 'all', tag: 'all', status: 'all' });

  const filteredProblems = Problems.filter((p) => {
  const diffMatch = filters.difficulty === 'all' || p.difficulty === filters.difficulty;
  const tagMatch = filters.tag === 'all' || (Array.isArray(p.tags) ? p.tags.includes(filters.tag) : p.tags === filters.tag);
  const statusMatch = filters.status === 'all' ||
    (filters.status === 'solved' && solvedProblems.some((sp) => sp._id === p._id)) ||
    (filters.status === 'unsolved' && !solvedProblems.some((sp) => sp._id === p._id));
  return diffMatch && tagMatch && statusMatch;
});

const allTags = [...new Set(Problems.flatMap((p) => Array.isArray(p.tags) ? p.tags : [p.tags]))];

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/getAllProblem');
        setProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };
    const fetchSolvedProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/problemSolvedByUser');
        setSolvedProblems(data);
      } catch (error) {
        console.error('Error fetching solved problems:', error);
      }
    };

    fetchProblems();
    if (user) fetchSolvedProblems();
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="bg-[#0d1117] min-h-screen text-white">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 h-14 bg-[#0d1117] border-b border-gray-700/50 sticky top-0 z-10 backdrop-blur-sm">
        <a href="/" className="text-xl font-bold tracking-tight">
          <span className="text-orange-400">Leet</span>
          <span className="text-white">Code</span>
        </a>
        <button
          onClick={() => setShowLogout(true)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-orange-400 text-gray-900 font-bold flex items-center justify-center text-sm">
            {user.firstName.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm">{user.firstName}</span>
        </button>
      </nav>

      {/* MAIN */}
      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* Header */}

      <div className="mb-4">
        <h1 className="text-2xl font-bold text-white">Problems</h1>
        <p className="text-gray-500 text-sm mt-1">{filteredProblems.length} of {Problems.length} problems</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-5">

        {/* Status */}
        {['all', 'solved', 'unsolved'].map((s) => (
          <button
            key={s}
            onClick={() => setFilters(f => ({ ...f, status: s }))}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all capitalize
              ${filters.status === s
                ? 'bg-orange-400 text-gray-900 border-orange-400'
                : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500 hover:text-white'}`}
          >
            {s === 'all' ? 'All Problems' : s === 'solved' ? '✓ Solved' : '○ Unsolved'}
          </button>
        ))}

        <div className="w-px bg-gray-700 mx-1" />

        {/* Difficulty */}
        {['all', 'Easy', 'Medium', 'Hard'].map((d) => (
          <button
            key={d}
            onClick={() => setFilters(f => ({ ...f, difficulty: d }))}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
              ${filters.difficulty === d
                ? d === 'Easy' ? 'bg-emerald-400 text-gray-900 border-emerald-400'
                : d === 'Medium' ? 'bg-amber-400 text-gray-900 border-amber-400'
                : d === 'Hard' ? 'bg-rose-400 text-gray-900 border-rose-400'
                : 'bg-orange-400 text-gray-900 border-orange-400'
                : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500 hover:text-white'}`}
          >
            {d === 'all' ? 'All Levels' : d}
          </button>
        ))}

        <div className="w-px bg-gray-700 mx-1" />

        {/* Tags */}
        <select
          value={filters.tag}
          onChange={(e) => setFilters(f => ({ ...f, tag: e.target.value }))}
          className="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-700 bg-[#161b22] text-gray-400 hover:border-gray-500 focus:outline-none focus:border-orange-400 transition-all cursor-pointer"
        >
          <option value="all">All Topics</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>

        {/* Clear */}
        {(filters.difficulty !== 'all' || filters.tag !== 'all' || filters.status !== 'all') && (
          <button
            onClick={() => setFilters({ difficulty: 'all', tag: 'all', status: 'all' })}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-700 text-gray-500 hover:text-white hover:border-gray-500 transition-all"
          >
            ✕ Clear
          </button>
        )}
      </div>

        {/* Column Labels */}
        <div className="flex items-center gap-4 px-4 pb-2 text-xs text-gray-600 uppercase tracking-wider">
          <span className="w-5">#</span>
          <span className="flex-1">Title</span>
          <span className="w-28 text-center">Tags</span>
          <span className="w-14 text-right">Difficulty</span>
        </div>

        {/* Problem Rows */}
        <div className="flex flex-col gap-1.5">
          {filteredProblems.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-[#161b22] hover:bg-[#1c2333] border border-white/5 hover:border-orange-400/20 rounded-lg px-4 py-3 text-sm transition-all duration-150 cursor-pointer group"
            >
              <span className="text-gray-600 w-5 text-xs">{i + 1}</span>

              <NavLink to={`/problem/${p._id}`} className="flex-1 text-gray-200 group-hover:text-white transition-colors font-medium">
                  {p.title}
              </NavLink>

              <div className="flex gap-1.5 w-28 justify-center flex-wrap">
                {(Array.isArray(p.tags) ? p.tags : [p.tags]).map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] bg-gray-700/60 text-gray-400 px-2 py-0.5 rounded-md border border-gray-600/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className={`text-xs font-semibold w-14 text-right ${DIFF[p.difficulty]}`}>
                {p.difficulty}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* Logout Popup */}
      {showLogout && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setShowLogout(false)}
        >
          <div
            className="bg-[#161b22] border border-gray-700/50 rounded-xl p-6 w-72 text-center shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-orange-400/10 border border-orange-400/30 flex items-center justify-center mx-auto mb-4">
              <span className="text-orange-400 text-xl font-bold">
                {user.firstName.charAt(0).toUpperCase()}
              </span>
            </div>
            <p className="text-white font-semibold mb-1">Log out?</p>
            <p className="text-gray-500 text-sm mb-5">See you next time, {user.firstName}!</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowLogout(false)}
                className="px-4 py-2 rounded-lg border border-gray-600 text-gray-400 hover:text-white hover:border-gray-500 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-orange-400 text-gray-900 font-bold hover:bg-orange-500 transition-colors text-sm"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;