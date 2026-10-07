import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Heart,
  Bookmark,
  BookmarkCheck,
  Share2,
  Copy,
  UserPlus,
  UserCheck,
  Sparkles,
  Tag,
  ArrowRight
} from 'lucide-react';
import { TwitterIcon, LinkedinIcon, FacebookIcon } from '../common/SocialIcons';
import CommentSection from './CommentSection';

export default function BlogDetails() {
  const {
    posts,
    activePostId,
    navigateTo,
    toggleLikePost,
    toggleBookmark,
    isBookmarked,
    followedAuthors,
    toggleFollowUser,
    showToast
  } = useApp();

  const post = posts.find((p) => p.id === activePostId) || posts[0];

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Post not found</h2>
        <button
          onClick={() => navigateTo('home')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const bookmarked = isBookmarked(post.id);
  const isFollowing = followedAuthors.includes(post.author?.id);

  // Related posts (excluding current post)
  const relatedPosts = posts
    .filter((p) => p.id !== post.id && (p.category === post.category || p.categoryId === post.categoryId))
    .slice(0, 3);

  // If not enough in same category, pad with others
  const fallbackRelated = relatedPosts.length >= 3
    ? relatedPosts
    : [...relatedPosts, ...posts.filter((p) => p.id !== post.id && !relatedPosts.includes(p))].slice(0, 3);

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = encodeURIComponent(`Read "${post.title}" on BlogSphere`);
    
    if (platform === 'copy') {
      navigator.clipboard?.writeText(url);
      showToast('Article link copied to clipboard!', 'success');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    }
  };

  // Helper to format content blocks
  const renderFormattedContent = (contentString) => {
    if (!contentString) return null;

    const sections = contentString.split('\n\n');

    return sections.map((sec, idx) => {
      const trimmed = sec.trim();

      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-10 mb-4 tracking-tight">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }

      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-xl sm:text-2xl font-bold text-slate-800 mt-8 mb-3 tracking-tight">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }

      if (trimmed.startsWith('> ')) {
        return (
          <blockquote
            key={idx}
            className="my-6 p-6 rounded-2xl bg-indigo-50/70 border-l-4 border-indigo-600 text-indigo-950 italic text-base sm:text-lg font-medium shadow-xs"
          >
            {trimmed.replace('> ', '')}
          </blockquote>
        );
      }

      if (trimmed.startsWith('```')) {
        const codeLines = trimmed.replace(/```[a-z]*\n/, '').replace(/```$/, '');
        return (
          <div key={idx} className="my-6 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/80 text-xs font-mono text-slate-400 border-b border-slate-700/60">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              </span>
              <span>Code Snippet</span>
            </div>
            <pre className="p-4 sm:p-6 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed">
              <code>{codeLines}</code>
            </pre>
          </div>
        );
      }

      return (
        <p key={idx} className="text-slate-700 text-base sm:text-lg leading-relaxed mb-6 font-normal">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <article className="min-h-screen bg-white pb-20">
      
      {/* Top Floating Navigation Bar */}
      <div className="bg-slate-50/70 border-b border-slate-100 py-3.5 sticky top-16 sm:top-20 z-30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleLikePost(post.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold hover:border-rose-300 transition-colors"
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
              <span>{post.likes || 0}</span>
            </button>

            <button
              onClick={() => toggleBookmark(post.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold hover:border-indigo-300 transition-colors"
            >
              {bookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-indigo-600 fill-indigo-600" />
              ) : (
                <Bookmark className="w-4 h-4 text-slate-500" />
              )}
              <span className="hidden sm:inline">{bookmarked ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        
        {/* Category Pill */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/60">
            <Sparkles className="w-3.5 h-3.5" />
            {post.category}
          </span>
        </div>

        {/* Article Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18] mb-6">
          {post.title}
        </h1>

        {/* Excerpt / Lead */}
        <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed mb-8">
          {post.excerpt}
        </p>

        {/* Author Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-y border-slate-100 mb-8">
          <div className="flex items-center gap-3.5">
            <img
              src={post.author?.avatar}
              alt={post.author?.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">
                  {post.author?.name}
                </span>
                <button
                  onClick={() => toggleFollowUser(post.author?.id)}
                  className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                    isFollowing
                      ? 'bg-slate-100 text-slate-600'
                      : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="w-3 h-3" />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3 h-3" />
                      <span>Follow</span>
                    </>
                  )}
                </button>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readingTime}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {post.views?.toLocaleString()} views
                </span>
              </div>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400 mr-1 hidden sm:inline">
              Share:
            </span>
            <button
              onClick={() => handleShare('copy')}
              className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
              title="Copy link"
              aria-label="Copy link"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="p-2 rounded-xl text-slate-500 hover:text-blue-500 hover:bg-slate-100 transition-colors"
              title="Share on Twitter"
              aria-label="Twitter share"
            >
              <TwitterIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="p-2 rounded-xl text-slate-500 hover:text-blue-700 hover:bg-slate-100 transition-colors"
              title="Share on LinkedIn"
              aria-label="LinkedIn share"
            >
              <LinkedinIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-colors"
              title="Share on Facebook"
              aria-label="Facebook share"
            >
              <FacebookIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Large Cover Image */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-100 mb-10">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full max-h-[500px] object-cover"
          />
        </div>

        {/* Rich Article Body Content */}
        <div className="prose prose-slate max-w-none">
          {renderFormattedContent(post.content)}

          {/* In-article visual image with caption */}
          <figure className="my-10 rounded-2xl overflow-hidden border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
              alt="Engineering collaboration and digital thinking"
              className="w-full h-80 object-cover"
            />
            <figcaption className="p-3 text-xs text-center text-slate-500 bg-slate-50 font-medium">
              Figure 1. Modern collaborative workflows integrate autonomous assistants and engineering telemetry.
            </figcaption>
          </figure>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Tags:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Like & Reaction Banner */}
        <div className="my-10 p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-base font-bold text-slate-900">Did you enjoy this article?</h4>
            <p className="text-xs text-slate-600">Give it a heart to support the author and share your feedback below.</p>
          </div>
          <button
            onClick={() => toggleLikePost(post.id)}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white border border-indigo-200 text-rose-600 hover:bg-rose-50 font-bold text-sm shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <Heart className="w-5 h-5 fill-rose-500" />
            <span>{post.likes || 0} Likes</span>
          </button>
        </div>

        {/* Author Bio Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <img
            src={post.author?.avatar}
            alt={post.author?.name}
            className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-sm shrink-0"
          />
          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div>
                <h4 className="text-base font-bold text-slate-900">{post.author?.name}</h4>
                <p className="text-xs text-indigo-600 font-semibold">{post.author?.role || 'Author'}</p>
              </div>
              <button
                onClick={() => toggleFollowUser(post.author?.id)}
                className={`self-center sm:self-auto px-4 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  isFollowing
                    ? 'bg-slate-200 text-slate-700'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow Author'}
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Contributing writer at BlogSphere. Deeply immersed in high-performance computing, user psychology, and modern web engineering architecture.
            </p>
          </div>
        </div>

        {/* Comment Section */}
        <CommentSection postId={post.id} />

        {/* Related Posts Section */}
        <section className="mt-16 pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Related Articles
            </h3>
            <button
              onClick={() => navigateTo('home')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <span>View all stories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fallbackRelated.map((relPost) => (
              <div
                key={relPost.id}
                onClick={() => navigateTo('blog-detail', { postId: relPost.id })}
                className="group bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-300 shadow-xs hover:shadow-lg transition-all p-4 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-40 rounded-xl overflow-hidden mb-3.5">
                    <img
                      src={relPost.coverImage}
                      alt={relPost.title}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/90 text-indigo-700 backdrop-blur-xs">
                      {relPost.category}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug mb-2">
                    {relPost.title}
                  </h4>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{relPost.author?.name}</span>
                  <span>{relPost.readingTime}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </article>
  );
}
