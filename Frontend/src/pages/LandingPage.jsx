import { NavLink } from "react-router";
import Navbar from "../components/Navbar";

const FEATURES = [
  {
    color: "emerald",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: "3,500+ Problems",
    desc: "Structured by topic, company, and difficulty — from easy warm-ups to hard algorithm challenges.",
  },
  {
    color: "orange",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Live Contests",
    desc: "Compete in weekly contests, earn badges, climb the leaderboard and get noticed by top companies.",
  },
  {
    color: "amber",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "AI Hints",
    desc: "Stuck? Get intelligent, context-aware hints — learn the approach without spoiling the solution.",
  },
  {
    color: "sky",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Progress Tracking",
    desc: "Visual dashboards for your streak, solved problems, and skill ratings across every topic.",
  },
  {
    color: "rose",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
      </svg>
    ),
    title: "Community",
    desc: "Share solutions, discuss approaches, and learn from millions of developers worldwide.",
  },
  {
    color: "violet",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Company Sets",
    desc: "Prep for Google, Meta, Amazon and 500+ top tech companies with curated problem lists.",
  },
];

const colorMap = {
  emerald: { bg: "bg-emerald-400/10", text: "text-emerald-400", border: "hover:border-emerald-400/30" },
  orange:  { bg: "bg-orange-400/10",  text: "text-orange-400",  border: "hover:border-orange-400/30" },
  amber:   { bg: "bg-amber-400/10",   text: "text-amber-400",   border: "hover:border-amber-400/30" },
  sky:     { bg: "bg-sky-400/10",     text: "text-sky-400",     border: "hover:border-sky-400/30" },
  rose:    { bg: "bg-rose-400/10",    text: "text-rose-400",    border: "hover:border-rose-400/30" },
  violet:  { bg: "bg-violet-400/10",  text: "text-violet-400",  border: "hover:border-violet-400/30" },
};

function LandingPage() {
  return (
    <div className="bg-[#0d1117] min-h-screen text-white overflow-x-hidden">

      {/* ── NAVBAR ── */}
    <Navbar/>
      {/* ── HERO ── */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between gap-16 px-8 lg:px-20 pt-24 pb-20 overflow-hidden">

        {/* Grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(55,65,81,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(55,65,81,0.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Glow blobs */}
        <div className="pointer-events-none absolute w-96 h-96 rounded-full opacity-10 bg-orange-400 -top-20 -left-20 blur-[100px]" />
        <div className="pointer-events-none absolute w-72 h-72 rounded-full opacity-10 bg-sky-400 bottom-0 right-1/4 blur-[90px]" />

        {/* Left text */}
        <div className="relative z-10 max-w-lg text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-400/30 bg-orange-400/10 text-orange-400 text-xs font-mono mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            Now with AI-powered hints
          </div>

          <h1 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-5">
            A New Way<br />
            <span className="text-orange-400">to Master Code</span>
          </h1>

          <p className="text-gray-400 text-base leading-relaxed mb-8">
            Coder is the best platform to sharpen your skills, expand your knowledge, and crack technical interviews — one problem at a time.
          </p>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <NavLink
              to="/signup"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-400 text-gray-900 font-bold text-sm hover:bg-orange-300 transition-all no-underline shadow-lg shadow-orange-400/20 hover:-translate-y-0.5"
            >
              Create Account
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NavLink>
            <NavLink
              to="/problems"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-transparent border border-gray-700 text-gray-300 font-semibold text-sm hover:border-gray-500 hover:text-white transition-all no-underline"
            >
              Browse Problems
            </NavLink>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 justify-center lg:justify-start mt-10 pt-8 border-t border-gray-700/50">
            {[
              { val: "3,500+", label: "Problems",   color: "text-orange-400" },
              { val: "2M+",    label: "Developers", color: "text-emerald-400" },
              { val: "50+",    label: "Languages",  color: "text-sky-400" },
            ].map(({ val, label, color }) => (
              <div key={label}>
                <p className={`text-2xl font-black ${color}`}>{val}</p>
                <p className="text-xs text-gray-500 font-mono mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: code card */}
        <div className="relative z-10 hidden lg:block shrink-0">
          <div
            className="w-80 rounded-2xl overflow-hidden border border-gray-700/60 bg-[#161b22] shadow-2xl"
            style={{ transform: "perspective(900px) rotateY(-8deg) rotateX(3deg)" }}
          >
            {/* Window bar */}
            <div className="flex items-center gap-1.5 px-4 py-3 bg-[#1c2333] border-b border-gray-700/50">
              <span className="w-3 h-3 rounded-full bg-rose-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-auto font-mono text-[11px] text-gray-500">two-sum.py</span>
            </div>

            {/* Problem title */}
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <span className="text-sm font-bold text-white">#1 Two Sum</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                Easy
              </span>
            </div>

            {/* Code */}
            <pre className="px-4 pb-4 text-[0.7rem] leading-7 font-mono overflow-x-auto text-gray-400">
              <span className="text-gray-600">1 </span><span className="text-violet-400">class </span><span className="text-sky-300">Solution</span>:{"\n"}
              <span className="text-gray-600">2 </span>{"  "}<span className="text-violet-400">def </span><span className="text-sky-300">twoSum</span>(self, nums, target):{"\n"}
              <span className="text-gray-600">3 </span>{"    "}<span className="text-gray-500"># O(n) hash map</span>{"\n"}
              <span className="text-gray-600">4 </span>{"    "}seen = {"{}"}{"\n"}
              <span className="text-gray-600">5 </span>{"    "}<span className="text-violet-400">for </span>i, n <span className="text-violet-400">in </span><span className="text-sky-300">enumerate</span>(nums):{"\n"}
              <span className="text-gray-600">6 </span>{"      "}diff = target - n{"\n"}
              <span className="text-gray-600">7 </span>{"      "}<span className="text-violet-400">if </span>diff <span className="text-violet-400">in </span>seen:{"\n"}
              <span className="text-gray-600">8 </span>{"        "}<span className="text-violet-400">return </span>[seen[diff], i]{"\n"}
              <span className="text-gray-600">9 </span>{"      "}seen[n] = i<span className="animate-pulse text-white">▌</span>
            </pre>

            {/* Result */}
            <div className="mx-3 mb-3 px-3 py-2.5 rounded-xl border border-gray-700/50 bg-[#0d1117] flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-400/10 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-400 font-mono">Accepted</p>
                <p className="text-[10px] text-gray-600 font-mono">Runtime: 48ms · Beats 96%</p>
              </div>
            </div>
          </div>

          {/* Floating streak badge */}
          <div className="absolute -bottom-4 -left-10 flex items-center gap-2.5 bg-[#1c2333] border border-gray-700/60 rounded-xl px-3.5 py-2.5 shadow-xl">
            <span className="text-xl">🔥</span>
            <div>
              <p className="text-xs font-bold text-white">30-day streak!</p>
              <p className="text-[10px] text-gray-500 font-mono">Keep it up 💪</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 px-8 lg:px-20">
        <div className="text-center mb-12">
          <p className="font-mono text-xs text-orange-400 tracking-widest mb-3 uppercase">What we offer</p>
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight">
            Everything you need to <span className="text-orange-400">level up</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {FEATURES.map(({ color, icon, title, desc }) => {
            const c = colorMap[color];
            return (
              <div
                key={title}
                className={`bg-[#161b22] border border-gray-700/50 ${c.border} rounded-xl p-5 hover:-translate-y-1 transition-all duration-300 group`}
              >
                <div className={`w-10 h-10 rounded-xl ${c.bg} ${c.text} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {icon}
                </div>
                <h3 className="font-bold text-base text-white mb-1.5">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-16 px-8 lg:px-20">
        <div className="max-w-3xl mx-auto rounded-2xl p-12 text-center relative overflow-hidden border border-gray-700/50 bg-[#161b22]">
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(251,146,60,0.12) 0%, transparent 65%)" }}
          />
          <p className="font-mono text-xs text-orange-400 tracking-widest mb-4 uppercase">Start for free</p>
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4">
            Ready to crack your<br />
            <span className="text-orange-400">dream interview?</span>
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm">
            Join 2 million+ developers who use Coder every day to improve and land their next role.
          </p>
          <NavLink
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-orange-400 text-gray-900 font-bold text-sm hover:bg-orange-300 transition-all no-underline shadow-lg shadow-orange-400/20 hover:-translate-y-0.5"
          >
            Create Free Account
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </NavLink>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-700/50 py-6 px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-600 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-orange-400 flex items-center justify-center text-gray-900 text-[9px] font-black">C</div>
          <span>© 2025 Coder. All rights reserved.</span>
        </div>
        <div className="flex gap-4">
          {["Privacy", "Terms", "Contact"].map((l) => (
            <a key={l} href="#" className="hover:text-gray-400 transition-colors no-underline">{l}</a>
          ))}
        </div>
      </footer>

    </div>
  );
}

export default LandingPage;
