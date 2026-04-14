import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';
import axiosClient from '../utils/axiosClient';

const DIFF_COLORS = {
  Easy: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
  Medium: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
  Hard: 'text-rose-300 bg-rose-500/10 border-rose-500/30',
};

const Updateproblem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/getAllProblem');
        setProblems(data || []);
      } catch (error) {
        console.error('Error fetching problems:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);


  return (
    <div className="min-h-screen bg-[#0b0f1a] text-gray-100 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Admin · Update</p>
            <h1 className="text-2xl font-semibold text-white">Update Problems</h1>
            <p className="text-sm text-gray-500 mt-1">Choose a problem to update from the platform.</p>
          </div>
          <button
            onClick={() => navigate('/admin')}
            className="px-4 py-2 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-200 transition shadow-md shadow-black/20"
          >
            Back to Admin
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-32 rounded-xl bg-white/5 border border-gray-800 animate-pulse"
              />
            ))}
          </div>
        ) : problems.length === 0 ? (
          <div className="text-gray-400 text-sm bg-white/5 border border-gray-800 rounded-xl p-6">
            No problems found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {problems.map((p) => (
              <div
                key={p._id}
                className="rounded-xl bg-[#0f172a] border border-gray-800 p-4 flex flex-col gap-3 hover:border-gray-600 transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-white line-clamp-2">{p.title}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{p.description}</p>
                  </div>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full border ${DIFF_COLORS[p.difficulty] || 'text-gray-300 border-gray-700 bg-white/5'}`}
                  >
                    {p.difficulty}
                  </span>
                </div>
                <button
                  onClick={() => navigate(`/admin/update/${p._id}`)}
                  className="w-full rounded-lg bg-white text-gray-900 font-semibold py-2.5 text-sm hover:bg-gray-200 transition shadow-md shadow-black/15"
                >
                  UPDATE
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Updateproblem;
