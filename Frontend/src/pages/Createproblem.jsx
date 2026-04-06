import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router";

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
        initialCode: z.string().min(1, "Code is required"), // ✅ changed from code to initialCode
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

function Createproblem() {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      difficulty: "easy",
      tags: "array",
      startCode: [
        { language: "C++", initialCode: "" },         // ✅ changed from code to initialCode
        { language: "Java", initialCode: "" },        // ✅ changed from code to initialCode
        { language: "JavaScript", initialCode: "" },  // ✅ changed from code to initialCode
      ],
      referenceSolution: [
        { language: "C++", completeCode: "" },
        { language: "Java", completeCode: "" },
        { language: "JavaScript", completeCode: "" },
      ],
    },
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

  const onSubmit = async (data) => {
    try {
      console.log("Submitting problem:", data);
      await axiosClient.post("/problem/create", data);
      alert("Problem created successfully!");
      navigate("/");
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="p-10">
      <div className="w-[80%] mx-auto">

        {/* Page Header */}
        <div>
          <p className="font-bold text-3xl font-sans text-white">
            Create New Problem
          </p>
          <p className="text-zinc-500 mt-1">Fill in all sections to publish a coding challenge</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">

          {/* ── Basic Information ── */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
              Basic Information
            </p>

            {/* Title */}
            <div className="pt-1">
              <label className="block text-sm font-medium text-white mb-1">Title</label>
              <input
                {...register("title")}
                type="text"
                placeholder="e.g. Two Sum"
                className={`w-full rounded-lg px-3 py-2 text-sm outline-none bg-zinc-800 border text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-zinc-500 ${
                  errors.title ? "border-red-500 bg-red-950" : "border-zinc-700"
                }`}
              />
              {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title.message}</p>}
            </div>

            {/* Description */}
            <div className="pt-3">
              <label className="block text-sm font-medium text-white mb-1">Description</label>
              <textarea
                {...register("description")}
                placeholder="Describe the problem, constraints, and examples..."
                className={`w-full rounded-lg px-3 py-2 text-sm outline-none bg-zinc-800 border text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-zinc-500 resize-y h-24 ${
                  errors.description ? "border-red-500 bg-red-950" : "border-zinc-700"
                }`}
              />
              {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description.message}</p>}
            </div>

            {/* Difficulty + Tag */}
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
                {errors.difficulty && <p className="text-xs text-red-400 mt-1">{errors.difficulty.message}</p>}
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
                {errors.tags && <p className="text-xs text-red-400 mt-1">{errors.tags.message}</p>}
              </div>
            </div>
          </div>

          {/* ── Visible Test Cases ── */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Visible Test Cases
              </h2>
              <button
                type="button"
                onClick={() => appendVisible({ input: "", output: "", explanation: "" })}
                className="text-sm border border-zinc-700 rounded-lg px-3 py-1.5 text-zinc-300 hover:bg-zinc-800"
              >
                + Add Case
              </button>
            </div>

            {errors.visibleTestCases?.message && (
              <p className="text-xs text-red-400 mb-3">{errors.visibleTestCases.message}</p>
            )}

            {visibleFields.length === 0 && (
              <div className="border border-dashed border-zinc-700 rounded-lg p-6 text-center text-sm text-zinc-600">
                No visible test cases yet. Add at least one.
              </div>
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
                        placeholder="e.g. nums = [2,7,11], target = 9"
                        className={`w-full rounded-lg px-3 py-2 text-sm outline-none bg-zinc-800 border text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-zinc-500 ${
                          errors.visibleTestCases?.[index]?.input ? "border-red-500" : "border-zinc-700"
                        }`}
                      />
                      {errors.visibleTestCases?.[index]?.input && (
                        <p className="text-xs text-red-400 mt-1">{errors.visibleTestCases[index].input.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">Output</label>
                      <input
                        {...register(`visibleTestCases.${index}.output`)}
                        type="text"
                        placeholder="e.g. [0,1]"
                        className={`w-full rounded-lg px-3 py-2 text-sm outline-none bg-zinc-800 border text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-zinc-500 ${
                          errors.visibleTestCases?.[index]?.output ? "border-red-500" : "border-zinc-700"
                        }`}
                      />
                      {errors.visibleTestCases?.[index]?.output && (
                        <p className="text-xs text-red-400 mt-1">{errors.visibleTestCases[index].output.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">Explanation</label>
                    <textarea
                      {...register(`visibleTestCases.${index}.explanation`)}
                      rows={2}
                      placeholder="Explain why this is the correct output..."
                      className={`w-full rounded-lg px-3 py-2 text-sm outline-none bg-zinc-800 border text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-zinc-500 resize-y ${
                        errors.visibleTestCases?.[index]?.explanation ? "border-red-500" : "border-zinc-700"
                      }`}
                    />
                    {errors.visibleTestCases?.[index]?.explanation && (
                      <p className="text-xs text-red-400 mt-1">{errors.visibleTestCases[index].explanation.message}</p>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* ── Hidden Test Cases ── */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Hidden Test Cases
              </h2>
              <button
                type="button"
                onClick={() => appendHidden({ input: "", output: "", explanation: "" })}
                className="text-sm border border-zinc-700 rounded-lg px-3 py-1.5 text-zinc-300 hover:bg-zinc-800"
              >
                + Add Case
              </button>
            </div>

            {errors.hiddenTestCases?.message && (
              <p className="text-xs text-red-400 mb-3">{errors.hiddenTestCases.message}</p>
            )}

            {hiddenFields.length === 0 && (
              <div className="border border-dashed border-zinc-700 rounded-lg p-6 text-center text-sm text-zinc-600">
                No hidden test cases yet. Add at least one.
              </div>
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
                        placeholder="e.g. nums = [3,3], target = 6"
                        className={`w-full rounded-lg px-3 py-2 text-sm outline-none bg-zinc-800 border text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-zinc-500 ${
                          errors.hiddenTestCases?.[index]?.input ? "border-red-500" : "border-zinc-700"
                        }`}
                      />
                      {errors.hiddenTestCases?.[index]?.input && (
                        <p className="text-xs text-red-400 mt-1">{errors.hiddenTestCases[index].input.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">Output</label>
                      <input
                        {...register(`hiddenTestCases.${index}.output`)}
                        type="text"
                        placeholder="e.g. [0,1]"
                        className={`w-full rounded-lg px-3 py-2 text-sm outline-none bg-zinc-800 border text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-zinc-500 ${
                          errors.hiddenTestCases?.[index]?.output ? "border-red-500" : "border-zinc-700"
                        }`}
                      />
                      {errors.hiddenTestCases?.[index]?.output && (
                        <p className="text-xs text-red-400 mt-1">{errors.hiddenTestCases[index].output.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">Explanation</label>
                    <textarea
                      {...register(`hiddenTestCases.${index}.explanation`)}
                      rows={2}
                      placeholder="Explain why this is the correct output..."
                      className={`w-full rounded-lg px-3 py-2 text-sm outline-none bg-zinc-800 border text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-zinc-500 resize-y ${
                        errors.hiddenTestCases?.[index]?.explanation ? "border-red-500" : "border-zinc-700"
                      }`}
                    />
                    {errors.hiddenTestCases?.[index]?.explanation && (
                      <p className="text-xs text-red-400 mt-1">{errors.hiddenTestCases[index].explanation.message}</p>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* ── Code Templates ── */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
              Code Templates
            </h2>

            <div className="space-y-4">
              {LANGUAGES.map((lang, index) => (
                <div key={lang.label} className="border border-zinc-700 rounded-lg overflow-hidden">

                  <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border-b border-zinc-700">
                    <span className={`w-2 h-2 rounded-full ${lang.dot}`} />
                    <span className="text-xs font-semibold text-zinc-300">{lang.label}</span>
                  </div>

                  <div className="grid grid-cols-2 bg-zinc-900">

                    <div className="p-3 border-r border-zinc-700">
                      <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2">
                        Starter Code
                      </label>
                      <textarea
                        {...register(`startCode.${index}.initialCode`)} // ✅ changed from code to initialCode
                        rows={6}
                        placeholder={`// ${lang.label} starter code`}
                        className={`w-full text-xs font-mono bg-transparent outline-none resize-y text-zinc-300 placeholder-zinc-600 ${
                          errors.StartCode?.[index]?.initialCode ? "border border-red-500 rounded p-1" : ""
                        }`}
                      />
                      {errors.StartCode?.[index]?.initialCode && (
                        <p className="text-xs text-red-400 mt-1">{errors.StartCode[index].initialCode.message}</p>
                      )}
                    </div>

                    <div className="p-3">
                      <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2">
                        Reference Solution
                      </label>
                      <textarea
                        {...register(`referenceSolution.${index}.completeCode`)}
                        rows={6}
                        placeholder={`// ${lang.label} solution`}
                        className={`w-full text-xs font-mono bg-transparent outline-none resize-y text-zinc-300 placeholder-zinc-600 ${
                          errors.referenceSolution?.[index]?.completeCode ? "border border-red-500 rounded p-1" : ""
                        }`}
                      />
                      {errors.referenceSolution?.[index]?.completeCode && (
                        <p className="text-xs text-red-400 mt-1">{errors.referenceSolution[index].completeCode.message}</p>
                      )}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Footer Buttons ── */}
          <div className="flex justify-end gap-3 pb-8">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 text-sm border border-zinc-700 rounded-lg text-zinc-300 hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 text-sm font-semibold bg-white text-zinc-900 rounded-lg hover:bg-zinc-200 ${
                isSubmitting ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Publishing..." : "Publish Problem"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Createproblem;
