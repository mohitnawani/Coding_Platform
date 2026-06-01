import React from 'react';

const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return (
      <div className="text-gray-400 text-sm">
        No comments yet.
      </div>
    );
  }

return (
  <div className="space-y-5">
    {comments.map((comment) => (
      <div
        key={comment._id || comment.id}
        className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-md hover:border-blue-500 hover:shadow-lg transition-all duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
              {(comment.userName || "A")[0].toUpperCase()}
            </div>

            <div>
              <h4 className="text-white font-semibold">
                {comment.userName || "Anonymous"}
              </h4>

              {comment.createdAt && (
                <p className="text-xs text-gray-400">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Comment Content */}
        <div className="mt-4 text-gray-200 leading-relaxed whitespace-pre-wrap">
          {comment.content || "No content"}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-[#30363d] flex items-center gap-4 text-sm text-gray-400">
          <button className="hover:text-blue-400 transition-colors">
            👍 Like
          </button>

          <button className="hover:text-green-400 transition-colors">
            💬 Reply
          </button>
        </div>
      </div>
    ))}
  </div>
);
};

export default CommentList;
