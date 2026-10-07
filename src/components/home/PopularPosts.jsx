import React from 'react';
import { useApp } from '../../context/AppContext';
import { TrendingUp, Eye, Calendar, Clock, ArrowRight } from 'lucide-react';

export default function PopularPosts() {
  const { posts, navigateTo } = useApp();

  // Sort by views descending and take top 5
  const popularPosts = [...posts]
    .filter((p) => p.status !== 'Draft')
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);

  const formatViews = (views = 0) => {
    if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'k';
    }
    return views;
  };

  return (
    <section id="popular-posts" className="py-12 md:py-16 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>Leaderboard</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Posts
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              The most-read, high-impact stories capturing our community's curiosity
            </p>
          </div>
        </div>

        {/* Popular Posts List / Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Top #1 Highlight Card */}
          {popularPosts[0] && (
            <div
              onClick={() => navigateTo('blog-detail', { postId: popularPosts[0].id })}
              className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 hover:border-indigo-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative h-56 rounded-2xl overflow-hidden mb-5">
                  <img
                    src={popularPosts[0].coverImage}
                    alt={popularPosts[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Rank badge */}
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-slate-900/90 backdrop-blur-sm text-white flex items-center justify-center font-extrabold text-lg shadow-md">
                    #1
                  </div>
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-indigo-700">
                    {popularPosts[0].category}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                  <span className="flex items-center gap-1 font-semibold text-indigo-600">
                    <Eye className="w-3.5 h-3.5" />
                    {formatViews(popularPosts[0].views)} views
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {popularPosts[0].date}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug mb-2">
                  {popularPosts[0].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                  {popularPosts[0].excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={popularPosts[0].author.avatar}
                    alt={popularPosts[0].author.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="text-xs font-semibold text-slate-700">
                    {popularPosts[0].author.name}
                  </span>
                </div>
                <span className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                  Read article <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          )}

          {/* Ranked List #2 - #5 */}
          <div className="lg:col-span-7 flex flex-col gap-3.5 justify-between">
            {popularPosts.slice(1, 5).map((post, idx) => {
              const rankNumber = idx + 2;

              return (
                <div
                  key={post.id}
                  onClick={() => navigateTo('blog-detail', { postId: post.id })}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all duration-200 flex items-center gap-4 sm:gap-5 group cursor-pointer"
                >
                  {/* Ranking Number */}
                  <div className="w-10 text-center shrink-0">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-300 group-hover:text-indigo-600 transition-colors">
                      #{rankNumber < 10 ? `0${rankNumber}` : rankNumber}
                    </span>
                  </div>

                  {/* Thumbnail */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded-md">
                        {post.category}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readingTime}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-1.5">
                      {post.title}
                    </h4>

                    {/* Views & Date */}
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-semibold text-slate-700">
                        <Eye className="w-3.5 h-3.5 text-indigo-500" />
                        {formatViews(post.views)} views
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
