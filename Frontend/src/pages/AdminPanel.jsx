import { useNavigate } from 'react-router';
import { logoutUser } from '../authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-gray-100 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Navbar */}
      <div className="bg-[#0d1117]/90 border-b border-gray-800 px-6 py-4 relative z-10 backdrop-blur">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center shadow-sm shadow-black/30">
              <span className="text-gray-900 text-xs font-bold">A</span>
            </div>
            <span className="text-sm font-semibold text-white">Admin Panel</span>
          </div>
          <button
            onClick={() => setShowLogout(true)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-white text-gray-900 font-bold flex items-center justify-center text-sm">
              {user.firstName.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm">{user.firstName}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10 relative z-10">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-white">Problem Management</h1>
          <p className="text-sm text-gray-500 mt-1">Create, update, or delete coding problems</p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => navigate('/admin/create')}
            className="w-full bg-[#0f172a] border border-gray-800 rounded-xl p-6 text-left hover:border-gray-600 hover:-translate-y-0.5 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 border border-gray-700 flex items-center justify-center shrink-0">
                <span className="text-white text-xl font-light">+</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white mb-0.5">Create problem</div>
                <div className="text-xs text-gray-400">Add a new coding challenge with test cases and solutions</div>
              </div>
              <span className="text-gray-500 group-hover:text-white transition-colors text-lg">→</span>
            </div>
          </button>

          <button
            onClick={() => navigate('/admin/delete')}
            className="w-full bg-[#0f172a] border border-gray-800 rounded-xl p-6 text-left hover:border-gray-600 hover:-translate-y-0.5 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 border border-gray-700 flex items-center justify-center shrink-0">
                <span className="text-white text-xl font-light">−</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white mb-0.5">Delete problem</div>
                <div className="text-xs text-gray-400">Remove an existing problem permanently from the platform</div>
              </div>
              <span className="text-gray-500 group-hover:text-white transition-colors text-lg">→</span>
            </div>
          </button>

          <button
            onClick={() => navigate('/admin/update')}
            className="w-full bg-[#0f172a] border border-gray-800 rounded-xl p-6 text-left hover:border-gray-600 hover:-translate-y-0.5 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 border border-gray-700 flex items-center justify-center shrink-0">
                <span className="text-white text-xl font-light">✎</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white mb-0.5">Update problem</div>
                <div className="text-xs text-gray-400">Edit title, description, test cases or solution for any problem</div>
              </div>
              <span className="text-gray-500 group-hover:text-white transition-colors text-lg">→</span>
            </div>
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-4">
            <div className="text-xs text-gray-500 mb-1">Total Problems</div>
            <div className="text-2xl font-semibold text-white">24</div>
          </div>
          <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-4">
            <div className="text-xs text-gray-500 mb-1">This Month</div>
            <div className="text-2xl font-semibold text-white">6</div>
          </div>
          <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-4">
            <div className="text-xs text-gray-500 mb-1">Difficulty Split</div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white border border-gray-700">E</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white border border-gray-700">M</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white border border-gray-700">H</span>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogout && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setShowLogout(false)}
        >
          <div
            className="bg-[#161b22] border border-gray-700/50 rounded-xl p-6 w-72 text-center shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-white/10 border border-gray-600 flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl font-bold">
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
                className="px-4 py-2 rounded-lg bg-white text-gray-900 font-bold hover:bg-gray-200 transition-colors text-sm"
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
