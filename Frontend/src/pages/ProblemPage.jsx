import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router';
import axiosClient from "../utils/axiosClient";
import runcode from '../utils/runcode';
import submitcode from '../utils/submitcode';
import Aichat from '../components/Aichat';

const LANGUAGES = [
  { label: 'JavaScript', value: 'javascript', key: 'Javascript' },
  { label: 'C++',        value: 'cpp',        key: 'C++'        },
  { label: 'Java',       value: 'java',       key: 'Java'       },
];

const DIFFICULTY_STYLE = {
  easy:   'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
  medium: 'bg-amber-500/10  text-amber-400  border border-amber-500/30',
  hard:   'bg-rose-500/10   text-rose-400   border border-rose-500/30',
};

function ProblemPage() {
  const { id } = useParams();
  const editorRef = useRef(null);

  const [problem,          setProblem]          = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code,             setCode]             = useState('// Start coding here...');
  const [loading,          setLoading]          = useState(false);
  const [activeLeftTab,    setActiveLeftTab]    = useState('description');
  const [activeTestCase,   setActiveTestCase]   = useState(0);
  const [runResult,        setRunResult]        = useState(null);
  const [runStatus,        setRunStatus]        = useState(null);
  const [runMessage,       setRunMessage]       = useState('');
  const [submitResult,     setSubmitResult]     = useState(null);
  const [submitStatus,     setSubmitStatus]     = useState(null);
  const [submitMessage,    setSubmitMessage]    = useState('');

  /* ── fetch problem ── */
  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`/problem/problemById/${id}`);
        console.log('API response:', response);
        const data = response?.data?.problem ?? response?.data;
        setProblem(data);

        const starter = data?.StartCode?.find((sc) => {
          if (sc.language === 'C++'        && selectedLanguage === 'cpp')        return true;
          if (sc.language === 'Java'       && selectedLanguage === 'java')       return true;
          if (sc.language === 'Javascript' && selectedLanguage === 'javascript') return true;
          return false;
        })?.initialCode;

        if (starter) setCode(starter);
      } catch (err) {
        console.error('Error fetching problem:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [id]);

const runProblem = async () => {
  try {
    setRunStatus('running');
    setRunMessage('Running visible tests...');
    if (!editorRef.current) return;
    const userCode = editorRef.current.getValue();
    console.log('Sending code:', userCode); // check code

    const langForApi = selectedLanguage === 'cpp' ? 'c++' : selectedLanguage;
    const result = await runcode(userCode, langForApi, id);
    setRunResult(result);
    if (result?.status === 'accepted') {
      setRunStatus('success');
      setRunMessage('All visible tests passed');
    } else {
      setRunStatus('error');
      setRunMessage(result?.message || 'Tests failed');
    }
    console.log('Result:', result); // check response

  } catch (err) {
    console.log(err);
    setRunStatus('error');
    setRunMessage(err?.response?.data?.error || err.message || 'Run failed');
  }
}

const submitProblem = async () => {
  try{
      if (!editorRef.current) return;
      const userCode = editorRef.current.getValue();
      console.log('Submitting code:', userCode); // 👈 check code
      const result = await submitcode(userCode, selectedLanguage, id);
      console.log('Submit Result:', result); // 👈 check response
      setSubmitResult(result);
  }

  catch(err)
  {
      console.log(err);
  }
}

  /* ── update code when language changes ── */
  useEffect(() => {
    if (!problem?.StartCode) return;
    const starter = problem.StartCode.find((sc) => {
      if (sc.language === 'C++'        && selectedLanguage === 'cpp')        return true;
      if (sc.language === 'Java'       && selectedLanguage === 'java')       return true;
      if (sc.language === 'Javascript' && selectedLanguage === 'javascript') return true;
      return false;
    })?.initialCode;
    if (starter) setCode(starter);
  }, [selectedLanguage]);

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  /* ── loading screen ── */
  if (loading) return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 font-mono text-sm tracking-widest">LOADING PROBLEM...</p>
      </div>
    </div>
  );

  if (!problem) return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
      <p className="text-rose-400 font-mono">Problem not found.</p>
    </div>
  );

  const visibleCases = problem.visibleTestCases ?? [];

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100 flex flex-col" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>

      {/* ── Top Bar ── */}
      <header className="h-12 bg-[#161b22] border-b border-[#30363d] flex items-center px-6 gap-6 shrink-0">
        <span className="text-cyan-400 font-bold tracking-widest text-sm">⟨/⟩ CODELAB</span>
        <div className="flex-1" />
        <span className={`text-xs px-3 py-1 rounded-full font-semibold capitalize ${DIFFICULTY_STYLE[problem.difficulty] ?? DIFFICULTY_STYLE.easy}`}>
          {problem.difficulty}
        </span>
        <span className="text-xs bg-[#21262d] text-gray-400 px-3 py-1 rounded-full border border-[#30363d]">
          #{problem.tags}
        </span>
      </header>

      {/* ── Main Split ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ════ LEFT PANEL ════ */}
        <div className="w-[42%] flex flex-col border-r border-[#30363d] overflow-scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#30363d]">

          {/* Left Tabs */}
          <div className="flex border-b border-[#30363d] bg-[#161b22] shrink-0">
            {['description', 'testcases', 'solutions', 'ai'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveLeftTab(tab)}
                className={`px-5 py-3 text-xs font-semibold uppercase tracking-widest transition-all ${
                  activeLeftTab === tab
                    ? 'text-cyan-400 border-b-2 border-cyan-400 bg-[#0d1117]'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Left Content */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#30363d]">

            {/* ── Description Tab ── */}
            {activeLeftTab === 'description' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-xl font-bold text-white leading-tight mb-2">{problem.title}</h1>
                  <p className="text-gray-400 text-sm leading-relaxed">{problem.description}</p>
                </div>

                {/* Examples */}
                {visibleCases.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Examples</h3>
                    {visibleCases.map((tc, i) => (
                      <div key={tc._id} className="bg-[#161b22] rounded-xl border border-[#30363d] overflow-hidden">
                        <div className="px-4 py-2 bg-[#21262d] border-b border-[#30363d]">
                          <span className="text-xs text-cyan-400 font-semibold">Example {i + 1}</span>
                        </div>
                        <div className="p-4 space-y-2 text-sm font-mono">
                          <div className="flex gap-3">
                            <span className="text-gray-500 w-20 shrink-0">Input:</span>
                            <span className="text-emerald-400">{tc.input}</span>
                          </div>
                          <div className="flex gap-3">
                            <span className="text-gray-500 w-20 shrink-0">Output:</span>
                            <span className="text-amber-400">{tc.output}</span>
                          </div>
                          {tc.explanation && (
                            <div className="flex gap-3">
                              <span className="text-gray-500 w-20 shrink-0">Note:</span>
                              <span className="text-gray-400 font-sans">{tc.explanation}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Test Cases Tab ── */}
            {activeLeftTab === 'testcases' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Visible Test Cases</h3>

                {/* Tab selectors */}
                <div className="flex gap-2 flex-wrap">
                  {visibleCases.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestCase(i)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        activeTestCase === i
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                          : 'bg-[#21262d] text-gray-400 border border-[#30363d] hover:text-white'
                      }`}
                    >
                      Case {i + 1}
                    </button>
                  ))}
                </div>

                {visibleCases[activeTestCase] && (
                  <div className="space-y-3">
                    <div className="bg-[#161b22] rounded-xl border border-[#30363d] p-4 space-y-3 font-mono text-sm">
                      <div>
                        <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Input</p>
                        <div className="bg-[#0d1117] rounded-lg px-4 py-3 text-emerald-400">
                          {visibleCases[activeTestCase].input}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Expected Output</p>
                        <div className="bg-[#0d1117] rounded-lg px-4 py-3 text-amber-400">
                          {visibleCases[activeTestCase].output}
                        </div>
                      </div>
                      {visibleCases[activeTestCase].explanation && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Explanation</p>
                          <div className="bg-[#0d1117] rounded-lg px-4 py-3 text-gray-300 font-sans text-sm">
                            {visibleCases[activeTestCase].explanation}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Solutions Tab ── */}
            {activeLeftTab === 'solutions' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Reference Solutions</h3>
                {(problem.referenceSolution ?? []).map((sol) => (
                  <div key={sol._id} className="bg-[#161b22] rounded-xl border border-[#30363d] overflow-hidden">
                    <div className="px-4 py-2 bg-[#21262d] border-b border-[#30363d] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      <span className="text-xs text-cyan-400 font-semibold">{sol.language}</span>
                    </div>
                    <pre className="p-4 text-xs text-gray-300 overflow-x-auto leading-relaxed">
                      {sol.completeCode}
                    </pre>
                  </div>
                ))}
              </div>
            )}

            {/* ai tab} */}
            {
              activeLeftTab==='ai' && (
                <Aichat problem={problem}></Aichat>
              )
            }

            

          </div>
        </div>

        {/* ════ RIGHT PANEL ════ */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Editor Toolbar */}
          <div className="h-12 bg-[#161b22] border-b border-[#30363d] flex items-center px-4 gap-3 shrink-0">
            {/* Language Selector */}
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-[#21262d] text-gray-300 text-xs border border-[#30363d] rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              {LANGUAGES.map(l => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>

            <div className="flex-1" />

            {/* Action Buttons */}
            <button
              onClick={runProblem}
              className="flex items-center gap-2 px-4 py-1.5 bg-[#21262d] hover:bg-[#30363d] text-gray-300 hover:text-white text-xs font-semibold rounded-lg border border-[#30363d] transition-all cursor-pointer shadow-sm shadow-[#30363d]/20"
            >
              ▶ Run
            </button>
            <button
              onClick={submitProblem}
              className="flex items-center gap-2 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-emerald-900/40 cursor-pointer"
            >
              ↑ Submit
            </button>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 overflow-hidden max-h-[60vh]">
            <Editor
              height="100%"
              language={selectedLanguage}
              value={code}
              onChange={(val) => setCode(val ?? '')}
              onMount={handleEditorDidMount}
              theme="vs-dark"
              options={{
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontLigatures: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                renderLineHighlight: 'line',
                padding: { top: 16 },
                tabSize: 2,
                wordWrap: 'on',
                smoothScrolling: true,
                cursorBlinking: 'smooth',
                bracketPairColorization: { enabled: true },
              }}
            />
          </div>

        {runResult && !Array.isArray(runResult) && (
          <div className="overflow-auto max-h-48 bg-gray-900 rounded-lg p-4 border border-gray-700 space-y-3">
            <div className={`p-3 rounded border-l-4 ${
              runResult.status === 'accepted'
                ? 'border-emerald-500 bg-emerald-900/20'
                : 'border-red-500 bg-red-900/20'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold text-sm capitalize">{runResult.status?.replace('_',' ')}</span>
                <span className="text-xs text-gray-400">{runResult.passed}/{runResult.total} passed</span>
              </div>
              <p className="text-gray-300 text-xs mt-2">{runResult.message}</p>
              {runResult.failingCase && (
                <div className="mt-3 text-xs text-gray-300 space-y-1">
                  <p className="font-semibold text-red-300">Failing Case #{runResult.failingCase.index}</p>
                  {runResult.failingCase.compile_output && <p>Compile: {runResult.failingCase.compile_output}</p>}
                  {runResult.failingCase.stderr && <p>Stderr: {runResult.failingCase.stderr}</p>}
                  {runResult.failingCase.stdout && <p>Stdout: {runResult.failingCase.stdout}</p>}
                </div>
              )}
            </div>
            {runResult.results && (
              <details className="text-xs text-gray-400">
                <summary className="cursor-pointer text-cyan-400">See raw results</summary>
                <pre className="mt-2 whitespace-pre-wrap text-gray-300 text-[11px] bg-gray-950 p-2 rounded border border-gray-700">
{JSON.stringify(runResult.results, null, 2)}
                </pre>
              </details>
            )}
          </div>
        )}
        {submitResult && !Array.isArray(submitResult) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-lg p-6 w-96 border border-gray-700 max-h-96 overflow-auto">
              {/* Close Button */}
              <button 
                onClick={() => setSubmitResult(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>

              <h2 className="text-white font-bold text-xl mb-4">Submission Result</h2>
              
              <div className={`p-4 rounded-lg mb-4 ${
                submitResult.status === 'accepted' 
                  ? 'bg-green-900/30 border border-green-600' 
                  : 'bg-red-900/30 border border-red-600'
              }`}>
                <p className={`text-lg font-bold ${
                  submitResult.status === 'accepted' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {submitResult.status === 'accepted' ? '✅ Accepted' : '❌ Rejected'}
                </p>
                <p className="text-sm text-gray-300 mt-2">{submitResult.message}</p>
              </div>

              <div className="text-gray-300 space-y-2 text-sm">
                <p><span className="text-gray-400">Passed:</span> {submitResult.passed}/{submitResult.total}</p>
                {submitResult.submission?.runtime !== undefined && (
                  <p><span className="text-gray-400">Runtime:</span> {submitResult.submission.runtime}s</p>
                )}
                {submitResult.submission?.memory !== undefined && (
                  <p><span className="text-gray-400">Memory:</span> {submitResult.submission.memory} KB</p>
                )}
                {submitResult.failingCase && (
                  <div className="text-red-300 text-xs space-y-1">
                    <p className="font-semibold">Failing Case #{submitResult.failingCase.index}</p>
                    {submitResult.failingCase.compile_output && <p>Compile: {submitResult.failingCase.compile_output}</p>}
                    {submitResult.failingCase.stderr && <p>Stderr: {submitResult.failingCase.stderr}</p>}
                    {submitResult.failingCase.stdout && <p>Stdout: {submitResult.failingCase.stdout}</p>}
                  </div>
                )}
              </div>

              <button 
                onClick={() => setSubmitResult(null)}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}


          {/* Bottom Status Bar */}
          <div className="h-7 bg-[#161b22] border-t border-[#30363d] flex items-center px-4 gap-4 shrink-0">
            <span className="text-xs text-gray-600 font-mono">
              {LANGUAGES.find(l => l.value === selectedLanguage)?.label}
            </span>
            <span className="text-xs text-gray-600">•</span>
            <span className="text-xs text-gray-600 font-mono">UTF-8</span>
            <div className="flex-1" />
            <span className="text-xs text-cyan-600 font-mono">{problem.title}</span>
          </div>

        </div>
      </div>
    </div>
  );
}


export default ProblemPage;
