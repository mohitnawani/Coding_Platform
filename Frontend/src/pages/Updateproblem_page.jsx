import { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";
import axiosClient from "../utils/axiosClient";

const problemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  tags: z.enum([
    "array", "linkedList", "graph", "dp", "math", "tree",
    "stack", "queue", "string", "sorting", "searching", "greedy",
    "bitManipulation", "recursion", "design", "heap", "hashTable",
    "slidingWindow", "twoPointers", "unionFind", "backtracking"
  ]),
  visibleTestCases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Output is required"),
        explanation: z.string().min(1, "Explanation is required"),
      })
    )
    .min(1, "At least one visible test case required"),
  hiddenTestCases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Output is required"),
        explanation: z.string().min(1, "Explanation is required"),
      })
    )
    .min(1, "At least one hidden test case required"),
  startCode: z
    .array(
      z.object({
        language: z.string().min(1, "Language is required"),
        initialCode: z.string().min(1, "Code is required"),
      })
    )
    .length(3, "All three languages required"),
  referenceSolution: z
    .array(
      z.object({
        language: z.enum(["C++", "Java", "JavaScript"]),
        completeCode: z.string().min(1, "Complete code is required"),
      })
    )
    .length(3, "All three languages required"),
});

const LANGUAGES = [
  { label: "C++", dot: "bg-blue-400" },
  { label: "Java", dot: "bg-pink-400" },
  { label: "JavaScript", dot: "bg-yellow-400" },
];

const EMPTY_TEST = { input: "", output: "", explanation: "" };

function Updateproblem_page() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitState, setSubmitState] = useState({ saving: false, error: "" });

  const defaultValues = useMemo(
    () => ({
      title: "",
      description: "",
      difficulty: "easy",
      tags: "array",
      visibleTestCases: [EMPTY_TEST],
      hiddenTestCases: [EMPTY_TEST],
      startCode: [
        { language: "C++", initialCode: "" },
        { language: "Java", initialCode: "" },
        { language: "JavaScript", initialCode: "" },
      ],
      referenceSolution: [
        { language: "C++", completeCode: "" },
        { language: "Java", completeCode: "" },
        { language: "JavaScript", completeCode: "" },
      ],
    }),
    []
  );

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues,
  });

  const {
    fields: visibleFields,
    append: appendVisible,
    remove: removeVisible,
  } = useFieldArray({ control, name: "visibleTestCases" });

  const {
    fields: hiddenFields,
    append: appendHidden,
    remove: removeHidden,
  } = useFieldArray({ control, name: "hiddenTestCases" });

  useEffect(() => {
    const loadProblem = async () => {
      try {
        const { data } = await axiosClient.get(`/problem/problemById/${id}`);
        const problem = data?.problem;
        if (!problem) throw new Error("Problem not found");

        const mappedStart = LANGUAGES.map((lang, idx) => {
          const fromApi = problem.StartCode?.[idx];
          return {
            language: fromApi?.language ?? lang.label,
            initialCode: fromApi?.code ?? fromApi?.initialCode ?? "",
          };
        });

        const mappedRef = LANGUAGES.map((lang, idx) => {
          const fromApi = problem.referenceSolution?.[idx];
          return {
            language: fromApi?.language ?? lang.label,
            completeCode: fromApi?.completeCode ?? "",
          };
        });

        reset({
          title: problem.title ?? "",
          description: problem.description ?? "",
          difficulty: problem.difficulty?.toLowerCase?.() ?? "easy",
          tags: problem.tags ?? "array",
          visibleTestCases: problem.visibleTestCases?.length
            ? problem.visibleTestCases
            : [EMPTY_TEST],
          hiddenTestCases: problem.HiddenTestCases?.length
            ? problem.HiddenTestCases
            : [EMPTY_TEST],
          startCode: mappedStart,
          referenceSolution: mappedRef,
        });
      } catch (error) {
        console.error(error);
        setSubmitState((s) => ({ ...s, error: error.message || "Failed to load problem" }));
      } finally {
        setLoading(false);
      }
    };

    loadProblem();
  }, [id, reset]);

  const onSubmit = async (data) => {
    setSubmitState({ saving: true, error: "" });
    try {
      const payload = {
        ...data,
        startCode: data.startCode.map(({ language, initialCode }) => ({
          language,
          code: initialCode,
        })),
      };
      await axiosClient.put(`/problem/update/${id}`, payload);
      alert("Problem updated successfully");
      navigate("/admin/update");
    } catch (error) {
      setSubmitState({
        saving: false,
        error: error.response?.data?.message || error.message || "Update failed",
      });
      return;
    }
    setSubmitState({ saving: false, error: "" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f1a] text-gray-100 flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading problem...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-gray-100 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="w-[80%] mx-auto relative z-10 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-bold text-3xl font-sans text-white">Update Problem</p>
            <p className="text-zinc-500 mt-1">
              Modify fields and save changes for the selected problem
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/update")}
            className="px-4 py-2 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-200 transition shadow-md shadow-black/20"
          >
            Back
          </button>
        </div>

        {submitState.error && (
          <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 text-red-200 px-3 py-2 text-sm">
            {submitState.error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
              Basic Information
            </p>

            <div className="pt-1">
              <label className="block text-sm font-medium text-white mb-1">Title</label>
              <input
                {...register("title")}
                type="text"
                className={`w-full rounded-lg px-3 py-2 text-sm outline-none bg-zinc-800 border text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-zinc-500 ${
                  errors.title ? "border-red-500 bg-red-950" : "border-zinc-700"
                }`}
              />
              {errors.title && (
                <p className="text-xs text-red-400 mt-1">{errors.title.message}</p>
              )}
            </div>

            <div className="pt-3">
              <label className="block text-sm font-medium text-white mb-1">Description</label>
              <textarea
                {...register("description")}
                className={`w-full rounded-lg px-3 py-2 text-sm outline-none bg-zinc-800 border text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-zinc-500 resize-y h-24 ${
                  errors.description ? "border-red-500 bg-red-950" : "border-zinc-700"
                }`}
              />
              {errors.description && (
                <p className="text-xs text-red-400 mt-1">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-3">
              <div>
                <label className="block text-sm font-medium text-white mb-1">Difficulty</label>
                <select
                  {...register("difficulty")}
                  className={`w-full rounded-lg px-3 py-2 text-sm outline-none bg-zinc-800 border text-zinc-100 focus:ring-2 focus:ring-zinc-500 ${
                    errors.difficulty ? "border-red-500" : "border-zinc-700"
                  }`}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                {errors.difficulty && (
                  <p className="text-xs text-red-400 mt-1">{errors.difficulty.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">Tag</label>
                <select
                  {...register("tags")}
                  className={`w-full rounded-lg px-3 py-2 text-sm outline-none bg-zinc-800 border text-zinc-100 focus:ring-2 focus:ring-zinc-500 ${
                    errors.tags ? "border-red-500" : "border-zinc-700"
                  }`}
                >
                  <option value="array">Array</option>
                  <option value="linkedList">Linked List</option>
                  <option value="graph">Graph</option>
                  <option value="dp">DP</option>
                  <option value="math">Math</option>
                  <option value="tree">Tree</option>
                  <option value="stack">Stack</option>
                  <option value="queue">Queue</option>
                  <option value="string">String</option>
                  <option value="sorting">Sorting</option>
                  <option value="searching">Searching</option>
                  <option value="greedy">Greedy</option>
                  <option value="bitManipulation">Bit Manipulation</option>
                  <option value="recursion">Recursion</option>
                  <option value="design">Design</option>
                  <option value="heap">Heap</option>
                  <option value="hashTable">Hash Table</option>
                  <option value="slidingWindow">Sliding Window</option>
                  <option value="twoPointers">Two Pointers</option>
                  <option value="unionFind">Union Find</option>
                  <option value="backtracking">Backtracking</option>
                </select>
                {errors.tags && (
                  <p className="text-xs text-red-400 mt-1">{errors.tags.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Visible Test Cases
              </h2>
              <button
                type="button"
                onClick={() => appendVisible({ ...EMPTY_TEST })}
                className="text-sm border border-zinc-700 rounded-lg px-3 py-1.5 text-zinc-300 hover:bg-zinc-800"
              >
                + Add Case
              </button>
            </div>

            {errors.visibleTestCases?.message && (
              <p className="text-xs text-red-400 mb-3">{errors.visibleTestCases.message}</p>
            )}

            <div className="space-y-3">
              {visibleFields.map((field, index) => (
                <div key={field.id} className="border border-zinc-700 rounded-lg p-4 space-y-3 bg-zinc-800/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                      Case {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeVisible(index)}
                      className="text-xs text-red-400 border border-red-900 rounded px-2 py-1 hover:bg-red-950"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">Input</label>
                      <input
                        {...register(`visibleTestCases.${index}.input`)}
                        type="text"
                        className={`w-full rounded-lg px-3 py-2 text-sm outline-none bg-zinc-800 border text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-zinc-500 ${
                          errors.visibleTestCases?.[index]?.input ? "border-red-500" : "border-zinc-700"
                        }`}
                      />
                      {errors.visibleTestCases?.[index]?.input && (
                        <p className="text-xs text-red-400 mt-1">
                          {errors.visibleTestCases[index].input.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">Output</label>
                      <input
                        {...register(`visibleTestCases.${index}.output`)}
                        type="text"
                        className={`w-full rounded-lg px-3 py-2 text-sm outline-none bg-zinc-800 border text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-zinc-500 ${
                          errors.visibleTestCases?.[index]?.output ? "border-red-500" : "border-zinc-700"
                        }`}
                      />
                      {errors.visibleTestCases?.[index]?.output && (
                        <p className="text-xs text-red-400 mt-1">
                          {errors.visibleTestCases[index].output.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">Explanation</label>
                    <textarea
                      {...register(`visibleTestCases.${index}.explanation`)}
                      rows={2}
                      className={`w-full rounded-lg px-3 py-2 text-sm outline-none bg-zinc-800 border text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-zinc-500 resize-y ${
                        errors.visibleTestCases?.[index]?.explanation ? "border-red-500" : "border-zinc-700"
                      }`}
                    />
                    {errors.visibleTestCases?.[index]?.explanation && (
                      <p className="text-xs text-red-400 mt-1">
                        {errors.visibleTestCases[index].explanation.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Hidden Test Cases
              </h2>
              <button
                type="button"
                onClick={() => appendHidden({ ...EMPTY_TEST })}
                className="text-sm border border-zinc-700 rounded-lg px-3 py-1.5 text-zinc-300 hover:bg-zinc-800"
              >
                + Add Case
              </button>
            </div>

            {errors.hiddenTestCases?.message && (
              <p className="text-xs text-red-400 mb-3">{errors.hiddenTestCases.message}</p>
            )}

            <div className="space-y-3">
              {hiddenFields.map((field, index) => (
                <div key={field.id} className="border border-zinc-700 rounded-lg p-4 space-y-3 bg-zinc-800/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                      Case {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeHidden(index)}
                      className="text-xs text-red-400 border border-red-900 rounded px-2 py-1 hover:bg-red-950"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">Input</label>
                      <input
                        {...register(`hiddenTestCases.${index}.input`)}
                        type="text"
                        className={`w-full rounded-lg px-3 py-2 text-sm outline-none bg-zinc-800 border text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-zinc-500 ${
                          errors.hiddenTestCases?.[index]?.input ? "border-red-500" : "border-zinc-700"
                        }`}
                      />
                      {errors.hiddenTestCases?.[index]?.input && (
                        <p className="text-xs text-red-400 mt-1">
                          {errors.hiddenTestCases[index].input.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">Output</label>
                      <input
                        {...register(`hiddenTestCases.${index}.output`)}
                        type="text"
                        className={`w-full rounded-lg px-3 py-2 text-sm outline-none bg-zinc-800 border text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-zinc-500 ${
                          errors.hiddenTestCases?.[index]?.output ? "border-red-500" : "border-zinc-700"
                        }`}
                      />
                      {errors.hiddenTestCases?.[index]?.output && (
                        <p className="text-xs text-red-400 mt-1">
                          {errors.hiddenTestCases[index].output.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">Explanation</label>
                    <textarea
                      {...register(`hiddenTestCases.${index}.explanation`)}
                      rows={2}
                      className={`w-full rounded-lg px-3 py-2 text-sm outline-none bg-zinc-800 border text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-zinc-500 resize-y ${
                        errors.hiddenTestCases?.[index]?.explanation ? "border-red-500" : "border-zinc-700"
                      }`}
                    />
                    {errors.hiddenTestCases?.[index]?.explanation && (
                      <p className="text-xs text-red-400 mt-1">
                        {errors.hiddenTestCases[index].explanation.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Starter Code (per language)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {LANGUAGES.map((lang, idx) => (
                <div key={lang.label} className="border border-zinc-800 rounded-lg p-3 bg-zinc-800/40">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${lang.dot}`} />
                    <p className="text-sm text-white">{lang.label}</p>
                  </div>
                  <textarea
                    {...register(`startCode.${idx}.initialCode`)}
                    rows={6}
                    className={`w-full rounded-lg px-3 py-2 text-sm outline-none bg-zinc-900 border text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-zinc-500 resize-y ${
                      errors.startCode?.[idx]?.initialCode ? "border-red-500" : "border-zinc-700"
                    }`}
                    placeholder={`Write starter ${lang.label} code`}
                  />
                  <input
                    type="hidden"
                    value={lang.label}
                    {...register(`startCode.${idx}.language`)}
                  />
                  {errors.startCode?.[idx]?.initialCode && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.startCode[idx].initialCode.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Reference Solutions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {LANGUAGES.map((lang, idx) => (
                <div key={lang.label} className="border border-zinc-800 rounded-lg p-3 bg-zinc-800/40">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${lang.dot}`} />
                    <p className="text-sm text-white">{lang.label}</p>
                  </div>
                  <textarea
                    {...register(`referenceSolution.${idx}.completeCode`)}
                    rows={8}
                    className={`w-full rounded-lg px-3 py-2 text-sm outline-none bg-zinc-900 border text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-zinc-500 resize-y ${
                      errors.referenceSolution?.[idx]?.completeCode ? "border-red-500" : "border-zinc-700"
                    }`}
                    placeholder={`Full ${lang.label} solution`}
                  />
                  <input
                    type="hidden"
                    value={lang.label}
                    {...register(`referenceSolution.${idx}.language`)}
                  />
                  {errors.referenceSolution?.[idx]?.completeCode && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.referenceSolution[idx].completeCode.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pb-8">
            <button
              type="button"
              onClick={() => navigate("/admin/update")}
              className="px-4 py-2 rounded-lg border border-zinc-700 text-zinc-200 hover:bg-zinc-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitState.saving}
              className="px-5 py-2 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-200 transition shadow-md shadow-black/15 disabled:opacity-60"
            >
              {submitState.saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Updateproblem_page;
