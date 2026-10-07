import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Heart,
  CornerDownRight,
  Trash2,
  Send,
  User,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function CommentSection({ postId }) {
  const {
    comments,
    addComment,
    toggleLikeComment,
    deleteComment,
    currentUser,
    openAuth
  } = useApp();

  const [commentText, setCommentText] = useState('');
  const [replyingToId, setReplyingToId] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Filter comments for this post
  const postComments = comments.filter((c) => c.postId === postId);

  // Count total including replies
  const totalComments = postComments.reduce(
    (acc, c) => acc + 1 + (c.replies?.length || 0),
    0
  );

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(postId, commentText);
    setCommentText('');
  };

  const handlePostReply = (parentId) => {
    if (!replyText.trim()) return;
    addComment(postId, replyText, parentId);
    setReplyText('');
    setReplyingToId(null);
  };

  return (
    <section className="mt-12 pt-10 border-t border-slate-200">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Discussion ({totalComments})
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Join the conversation with authors and readers
            </p>
          </div>
        </div>
      </div>

      {/* New Top-Level Comment Box */}
      <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-6 border border-slate-200/90 mb-10">
        {currentUser ? (
          <form onSubmit={handlePostComment} className="space-y-3">
            <div className="flex items-center gap-3 mb-2">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
              />
              <span className="text-xs font-semibold text-slate-800">
                Commenting as <strong className="text-indigo-600">{currentUser.name}</strong>
              </span>
            </div>

            <textarea
              rows="3"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="What are your thoughts on this story? Be respectful and constructive..."
              className="w-full p-3.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
              required
            />

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-sm shadow-indigo-600/20 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Comment</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6">
            <p className="text-sm font-semibold text-slate-700 mb-2">
              Sign in to share your thoughts and join this discussion.
            </p>
            <button
              onClick={() => openAuth('login')}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs"
            >
              Sign In to Comment
            </button>
          </div>
        )}
      </div>

      {/* Comments List */}
      {postComments.length > 0 ? (
        <div className="space-y-6">
          {postComments.map((comment) => {
            const isMyComment = currentUser && currentUser.id === comment.author.id;
            const isAdmin = currentUser && currentUser.role === 'Admin';
            const canDelete = isMyComment || isAdmin;

            return (
              <div
                key={comment.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={comment.author.avatar}
                      alt={comment.author.name}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">
                          {comment.author.name}
                        </h4>
                        {comment.author.role === 'Admin' && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 uppercase">
                            Admin
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400">{comment.date}</span>
                    </div>
                  </div>

                  {canDelete && (
                    <button
                      onClick={() => deleteComment(comment.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Delete comment"
                      aria-label="Delete comment"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Comment Text */}
                <p className="text-sm text-slate-700 leading-relaxed">
                  {comment.content}
                </p>

                {/* Action buttons (Like & Reply) */}
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => toggleLikeComment(comment.id)}
                    className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                      comment.likedByMe
                        ? 'text-rose-600 font-bold'
                        : 'hover:text-rose-600'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        comment.likedByMe ? 'fill-rose-600 text-rose-600' : ''
                      }`}
                    />
                    <span>{comment.likes || 0}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (!currentUser) {
                        openAuth('login');
                      } else {
                        setReplyingToId(replyingToId === comment.id ? null : comment.id);
                      }
                    }}
                    className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    <CornerDownRight className="w-4 h-4" />
                    <span>Reply</span>
                  </button>
                </div>

                {/* Nested Reply Form */}
                {replyingToId === comment.id && (
                  <div className="mt-4 pt-4 border-t border-slate-100 pl-4 sm:pl-8">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={`Replying to ${comment.author.name}...`}
                        className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600"
                        autoFocus
                      />
                      <button
                        onClick={() => handlePostReply(comment.id)}
                        disabled={!replyText.trim()}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 disabled:opacity-50"
                      >
                        Send
                      </button>
                      <button
                        onClick={() => {
                          setReplyingToId(null);
                          setReplyText('');
                        }}
                        className="px-3 py-2 text-xs text-slate-500 hover:text-slate-800"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Threaded Replies List */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 pl-4 sm:pl-8 border-l-2 border-indigo-100 space-y-3">
                    {comment.replies.map((reply) => {
                      const isMyReply = currentUser && currentUser.id === reply.author.id;
                      const canDeleteReply = isMyReply || isAdmin;

                      return (
                        <div
                          key={reply.id}
                          className="bg-slate-50/70 rounded-xl p-3.5 border border-slate-100"
                        >
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <div className="flex items-center gap-2">
                              <img
                                src={reply.author.avatar}
                                alt={reply.author.name}
                                className="w-7 h-7 rounded-full object-cover"
                              />
                              <h5 className="text-xs font-bold text-slate-900">
                                {reply.author.name}
                              </h5>
                              <span className="text-[11px] text-slate-400">
                                • {reply.date}
                              </span>
                            </div>

                            {canDeleteReply && (
                              <button
                                onClick={() => deleteComment(reply.id, comment.id)}
                                className="p-1 text-slate-400 hover:text-rose-600"
                                title="Delete reply"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>

                          <p className="text-xs sm:text-sm text-slate-700 mb-2 leading-relaxed">
                            {reply.content}
                          </p>

                          <button
                            onClick={() => toggleLikeComment(reply.id, comment.id)}
                            className={`flex items-center gap-1 text-[11px] font-semibold cursor-pointer ${
                              reply.likedByMe
                                ? 'text-rose-600'
                                : 'text-slate-400 hover:text-rose-600'
                            }`}
                          >
                            <Heart
                              className={`w-3.5 h-3.5 ${
                                reply.likedByMe ? 'fill-rose-600 text-rose-600' : ''
                              }`}
                            />
                            <span>{reply.likes || 0}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10 bg-slate-50/60 rounded-2xl border border-dashed border-slate-200">
          <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-600">No comments yet</p>
          <p className="text-xs text-slate-400">Be the first to share your thoughts on this story!</p>
        </div>
      )}
    </section>
  );
}
