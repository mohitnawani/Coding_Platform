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
    "array",
    "linkedList",
    "graph",
    "dp",
    "math",
    "tree",
    "stack",
    "queue",
    "string",
    "sorting",
    "searching",
    "greedy",
    "bitManipulation",
    "recursion",
    "design",
    "heap",
    "hashTable",
    "slidingWindow",
    "twoPointers",
    "unionFind",
    "backtracking",
  ]),

  visibleTestCases: z
    .array(
      z.object({
        input: z.string().min(1, "Input required"),
        output: z.string().min(1, "Output required"),
        explanation: z.string().min(1, "Explanation required"),
      })
    )
    .min(1, "At least one visible test case required"),

  HiddenTestCases: z
    .array(
      z.object({
        input: z.string().min(1, "Input required"),
        output: z.string().min(1, "Output required"),
        explanation: z.string().min(1, "Explanation required"),
      })
    )
    .min(1, "At least one hidden test case required"),

  startCode: z
    .array(
      z.object({
        language: z.string(),
        initialCode: z.string().min(1, "Starter code required"),
      })
    )
    .length(3),

  referenceSolution: z
    .array(
      z.object({
        language: z.enum(["C++", "Java", "JavaScript"]),
        completeCode: z.string().min(1, "Solution required"),
      })
    )
    .length(3),
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
      title: "",
      description: "",
      difficulty: "easy",
      tags: "array",

      visibleTestCases: [
        {
          input: "",
          output: "",
          explanation: "",
        },
      ],

      HiddenTestCases: [
        {
          input: "",
          output: "",
          explanation: "",
        },
      ],

      startCode: [
        {
          language: "C++",
          initialCode: "",
        },
        {
          language: "Java",
          initialCode: "",
        },
        {
          language: "JavaScript",
          initialCode: "",
        },
      ],

      referenceSolution: [
        {
          language: "C++",
          completeCode: "",
        },
        {
          language: "Java",
          completeCode: "",
        },
        {
          language: "JavaScript",
          completeCode: "",
        },
      ],
    },
  });

  const {
    fields: visibleFields,
    append: appendVisible,
    remove: removeVisible,
  } = useFieldArray({
    control,
    name: "visibleTestCases",
  });

  const {
    fields: hiddenFields,
    append: appendHidden,
    remove: removeHidden,
  } = useFieldArray({
    control,
    name: "HiddenTestCases",
  });

  const onSubmit = async (data) => {
    try {
      console.log("FINAL DATA:", data);

      const response = await axiosClient.post(
        "/problem/create",
        data
      );

      console.log(response.data);

      alert("Problem Created Successfully");

      navigate("/");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white py-10">
      <div className="w-[80%] mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            Create Problem
          </h1>

          <button
            onClick={() => navigate("/admin")}
            className="px-4 py-2 bg-white text-black rounded-lg"
          >
            Back
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
        >

          {/* BASIC INFO */}

          <div className="bg-zinc-900 p-6 rounded-xl space-y-4">

            <div>
              <label className="block mb-2">
                Title
              </label>

              <input
                {...register("title")}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3"
              />

              {errors.title && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2">
                Description
              </label>

              <textarea
                rows={5}
                {...register("description")}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3"
              />

              {errors.description && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="block mb-2">
                  Difficulty
                </label>

                <select
                  {...register("difficulty")}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">
                  Tag
                </label>

                <select
                  {...register("tags")}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3"
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
              </div>

            </div>
          </div>

          {/* VISIBLE TEST CASES */}

          <div className="bg-zinc-900 p-6 rounded-xl">

            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-semibold">
                Visible Test Cases
              </h2>

              <button
                type="button"
                onClick={() =>
                  appendVisible({
                    input: "",
                    output: "",
                    explanation: "",
                  })
                }
                className="bg-white text-black px-3 py-2 rounded-lg"
              >
                Add Case
              </button>
            </div>

            <div className="space-y-4">

              {visibleFields.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-zinc-700 p-4 rounded-lg space-y-3"
                >

                  <input
                    {...register(
                      `visibleTestCases.${index}.input`
                    )}
                    placeholder="Input"
                    className="w-full bg-zinc-800 p-3 rounded-lg"
                  />

                  <input
                    {...register(
                      `visibleTestCases.${index}.output`
                    )}
                    placeholder="Output"
                    className="w-full bg-zinc-800 p-3 rounded-lg"
                  />

                  <textarea
                    {...register(
                      `visibleTestCases.${index}.explanation`
                    )}
                    placeholder="Explanation"
                    className="w-full bg-zinc-800 p-3 rounded-lg"
                  />

                  <button
                    type="button"
                    onClick={() => removeVisible(index)}
                    className="bg-red-500 px-3 py-2 rounded-lg"
                  >
                    Remove
                  </button>

                </div>
              ))}

            </div>
          </div>

          {/* HIDDEN TEST CASES */}

          <div className="bg-zinc-900 p-6 rounded-xl">

            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-semibold">
                Hidden Test Cases
              </h2>

              <button
                type="button"
                onClick={() =>
                  appendHidden({
                    input: "",
                    output: "",
                    explanation: "",
                  })
                }
                className="bg-white text-black px-3 py-2 rounded-lg"
              >
                Add Case
              </button>
            </div>

            <div className="space-y-4">

              {hiddenFields.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-zinc-700 p-4 rounded-lg space-y-3"
                >

                  <input
                    {...register(
                      `HiddenTestCases.${index}.input`
                    )}
                    placeholder="Input"
                    className="w-full bg-zinc-800 p-3 rounded-lg"
                  />

                  <input
                    {...register(
                      `HiddenTestCases.${index}.output`
                    )}
                    placeholder="Output"
                    className="w-full bg-zinc-800 p-3 rounded-lg"
                  />

                  <textarea
                    {...register(
                      `HiddenTestCases.${index}.explanation`
                    )}
                    placeholder="Explanation"
                    className="w-full bg-zinc-800 p-3 rounded-lg"
                  />

                  <button
                    type="button"
                    onClick={() => removeHidden(index)}
                    className="bg-red-500 px-3 py-2 rounded-lg"
                  >
                    Remove
                  </button>

                </div>
              ))}

            </div>
          </div>

          {/* CODE SECTION */}

          <div className="bg-zinc-900 p-6 rounded-xl">

            <h2 className="text-2xl font-semibold mb-5">
              Code Templates
            </h2>

            <div className="space-y-6">

              {LANGUAGES.map((lang, index) => (
                <div
                  key={lang.label}
                  className="border border-zinc-700 rounded-xl overflow-hidden"
                >

                  <div className="bg-zinc-800 p-3 font-semibold">
                    {lang.label}
                  </div>

                  <div className="grid grid-cols-2">

                    <div className="p-4 border-r border-zinc-700">
                      <p className="mb-2 text-sm">
                        Starter Code
                      </p>

                      <textarea
                        rows={10}
                        {...register(
                          `startCode.${index}.initialCode`
                        )}
                        className="w-full bg-zinc-950 p-3 rounded-lg font-mono text-sm"
                      />

                      {errors.startCode?.[index]?.initialCode && (
                        <p className="text-red-400 text-sm mt-1">
                          {
                            errors.startCode[index]
                              .initialCode.message
                          }
                        </p>
                      )}
                    </div>

                    <div className="p-4">
                      <p className="mb-2 text-sm">
                        Reference Solution
                      </p>

                      <textarea
                        rows={10}
                        {...register(
                          `referenceSolution.${index}.completeCode`
                        )}
                        className="w-full bg-zinc-950 p-3 rounded-lg font-mono text-sm"
                      />

                      {errors.referenceSolution?.[index]
                        ?.completeCode && (
                        <p className="text-red-400 text-sm mt-1">
                          {
                            errors.referenceSolution[index]
                              .completeCode.message
                          }
                        </p>
                      )}
                    </div>

                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* SUBMIT */}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-black px-6 py-3 rounded-xl font-semibold"
            >
              {isSubmitting
                ? "Publishing..."
                : "Publish Problem"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Createproblem;