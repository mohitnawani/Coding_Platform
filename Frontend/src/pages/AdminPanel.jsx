import { useNavigate } from 'react-router';

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen border-y-gray-800 text-zinc-100">

      {/* ── Navbar ── */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center">
              <span className="text-zinc-900 text-xs font-bold">A</span>
            </div>
            <span className="text-sm font-semibold text-zinc-100">Admin Panel</span>
          </div>
          <span className="text-xs bg-zinc-800 border border-zinc-700 text-zinc-400 px-3 py-1 rounded-full">
            Admin
          </span>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">

        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100">Problem Management</h1>
          <p className="text-sm text-zinc-500 mt-1">Create, update, or delete coding problems</p>
        </div>

        {/* ── Action Cards ── */}
        <div className="grid grid-cols-1 gap-4">

          {/* Create */}
          <button
            onClick={() => navigate('/admin/create')}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-left hover:border-zinc-600 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-green-950 border border-green-900 flex items-center justify-center shrink-0">
                <span className="text-green-400 text-xl font-light">+</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-zinc-100 mb-0.5">Create problem</div>
                <div className="text-xs text-zinc-500">Add a new coding challenge with test cases and solutions</div>
              </div>
              <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors text-lg">→</span>
            </div>
          </button>

          {/* Delete */}
          <button
            onClick={() => navigate('/admin/delete')}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-left hover:border-zinc-600 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-950 border border-red-900 flex items-center justify-center shrink-0">
                <span className="text-red-400 text-xl font-light">−</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-zinc-100 mb-0.5">Delete problem</div>
                <div className="text-xs text-zinc-500">Remove an existing problem permanently from the platform</div>
              </div>
              <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors text-lg">→</span>
            </div>
          </button>

          {/* Update */}
          <button
            onClick={() => navigate('/admin/update')}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-left hover:border-zinc-600 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-950 border border-blue-900 flex items-center justify-center shrink-0">
                <span className="text-blue-400 text-xl font-light">✎</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-zinc-100 mb-0.5">Update problem</div>
                <div className="text-xs text-zinc-500">Edit title, description, test cases or solution for any problem</div>
              </div>
              <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors text-lg">→</span>
            </div>
          </button>

        </div>

        {/* ── Info Cards ── */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="text-xs text-zinc-500 mb-1">Total Problems</div>
            <div className="text-2xl font-semibold text-zinc-100">24</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="text-xs text-zinc-500 mb-1">This Month</div>
            <div className="text-2xl font-semibold text-zinc-100">6</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="text-xs text-zinc-500 mb-1">Difficulty Split</div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-950 text-green-400 border border-green-900">E</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-950 text-yellow-400 border border-yellow-900">M</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-900">H</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}