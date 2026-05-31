import react from "react";
import { useState, useEffect } from "react";
import axiosClient from "../utils/axiosClient";
import { z} from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const CommentForm = ({ problemId }) => {
  const commentSchema = z.object({
    message: z
      .string()
      .min(1, "Comment cannot be empty")
      .max(500, "Comment cannot exceed 500 characters"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      message: "",
    },
  });

const onSubmit = async (data) => {
  try {
    console.log("Comment Data:", data);

    const response = await axiosClient.post("/comment/add", {
      content: data.message,
      problemId: problemId,
    });

    console.log("API Response:", response.data);

    // Update state here if needed
    // setComments((prev) => [...prev, response.data.comment]);

    reset();
  } catch (error) {
    console.error(error);
  }
};
  

return (
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="flex flex-col gap-2"
  >
    <textarea
      {...register("message")}
      placeholder="Write a comment..."
      rows={2}
      className="w-full border rounded-md px-3 py-2 text-sm resize-none"
    />

    {errors.message && (
      <p className="text-red-500 text-xs">
        {errors.message.message}
      </p>
    )}

    <div className="flex justify-end">
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md"
      >
        {isSubmitting ? "Sending..." : "Comment"}
      </button>
    </div>
  </form>
);
};

export default CommentForm;
