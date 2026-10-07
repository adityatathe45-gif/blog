import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  FileText,
  Users,
  Eye,
  MessageSquare,
  TrendingUp,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Search,
  Layers,
  Filter,
  BarChart3,
  Check,
  X
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    posts,
    users,
    comments,
    categories,
    deletePost,
    navigateTo,
    manageUserStatus,
    changeUserRole,
    deleteComment,
    addCategory,
    deleteCategory,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'posts', 'users', 'comments', 'categories'
  const [postSearch, setPostSearch] = useState('');
  const [newCatName, setNewCatName] = useState('');

  // Aggregations
  const totalPosts = posts.length;
  const totalUsers = users.length;
  const totalViews = posts.reduce((acc, p) => acc + (p.views || 0), 0);
  const totalComments = comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0);

  // Filtered posts for management table
  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(postSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(postSearch.toLowerCase()) ||
      p.author?.name.toLowerCase().includes(postSearch.toLowerCase())
  );

  const handleAddCategorySubmit = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    addCategory(newCatName.trim());
    setNewCatName('');
  };

  // Mock weekly traffic data for SVG chart
  const weeklyData = [
    { day: 'Mon', views: 12400 },
    { day: 'Tue', views: 18200 },
    { day: 'Wed', views: 24500 },
    { day: 'Thu', views: 21900 },
    { day: 'Fri', views: 31000 },
    { day: 'Sat', views: 28400 },
    { day: 'Sun', views: 35800 },
  ];

  const maxViews = Math.max(...weeklyData.map((d) => d.views));

  return (
    <div className="min-h-screen bg-slate-50 py-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Shield className="w-4 h-4" />
              <span>BlogSphere Control Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Admin & Analytics Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Real-time platform metrics, editorial management, user moderation, and categories.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('write-blog')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Article</span>
            </button>
          </div>
        </div>

        {/* 4 Overview Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Posts */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Posts</span>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{totalPosts}</p>
              <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3 h-3" /> +18% this month
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          {/* Total Users */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Users</span>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{totalUsers}</p>
              <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3 h-3" /> +12% this month
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          {/* Total Views */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Views</span>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">
                {totalViews >= 1000 ? (totalViews / 1000).toFixed(1) + 'k' : totalViews}
              </p>
              <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3 h-3" /> +24% traffic growth
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
          </div>

          {/* Total Comments */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Comments</span>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{totalComments}</p>
              <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3 h-3" /> +9% engagement
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 mb-6 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Analytics & Charts
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'posts'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Manage Articles ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'users'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Manage Users ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'comments'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Comments Moderation
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'categories'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Manage Categories ({categories.length})
          </button>
        </div>

        {/* Tab 1: Overview & Interactive Charts */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Weekly Traffic Chart Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Traffic & Views Velocity</h3>
                  <p className="text-xs text-slate-500">Live 7-day aggregate reader telemetry</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                  Live Stream
                </span>
              </div>

              {/* Bar Chart Visualization */}
              <div className="h-64 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-100">
                {weeklyData.map((d) => {
                  const heightPercent = Math.round((d.views / maxViews) * 100);
                  return (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                      <div className="text-[10px] font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        {(d.views / 1000).toFixed(1)}k
                      </div>
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full max-w-[42px] bg-gradient-to-t from-indigo-600 to-indigo-400 group-hover:from-indigo-500 group-hover:to-purple-500 rounded-t-xl transition-all duration-300 shadow-xs"
                      />
                      <span className="text-xs font-semibold text-slate-500 mt-1">{d.day}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4 text-xs text-slate-400">
                <span>Peak Traffic: Sunday (35.8k views)</span>
                <span>Average Daily: 24.8k views</span>
              </div>
            </div>

            {/* Category Distribution Chart */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Category Publication Volume</h3>
                <p className="text-xs text-slate-500 mb-6">Content distribution across key subjects</p>

                <div className="space-y-3.5">
                  {categories.slice(0, 5).map((cat) => {
                    const postCount = posts.filter(
                      (p) => p.category?.toLowerCase() === cat.name.toLowerCase() || p.categoryId === cat.id
                    ).length;
                    const percent = Math.min(100, Math.round((postCount / Math.max(1, posts.length)) * 100));

                    return (
                      <div key={cat.id}>
                        <div className="flex items-center justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-700">{cat.name}</span>
                          <span className="text-slate-400">
                            {postCount} articles ({percent}%)
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${percent}%` }}
                            className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                <span className="text-xs text-slate-500">Need a new subject topic?</span>
                <button
                  onClick={() => setActiveTab('categories')}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
                >
                  Manage Categories →
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Posts Management Table */}
        {activeTab === 'posts' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            {/* Table Search & Filter Bar */}
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={postSearch}
                  onChange={(e) => setPostSearch(e.target.value)}
                  placeholder="Search articles by title, author..."
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <button
                onClick={() => navigateTo('write-blog')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 flex items-center gap-1.5 shrink-0 self-end sm:self-auto cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Article</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-400 uppercase font-semibold border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Article</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Author</th>
                    <th className="py-3 px-4">Views</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-slate-900 max-w-xs">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.coverImage}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover shrink-0"
                          />
                          <div className="truncate">
                            <span className="font-bold hover:text-indigo-600 cursor-pointer" onClick={() => navigateTo('blog-detail', { postId: post.id })}>
                              {post.title}
                            </span>
                            <p className="text-[11px] text-slate-400 truncate">{post.date}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-indigo-700">
                        {post.category}
                      </td>

                      <td className="py-3.5 px-4">
                        {post.author?.name}
                      </td>

                      <td className="py-3.5 px-4 font-medium">
                        {(post.views || 0).toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            post.status === 'Draft'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {post.status || 'Published'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => navigateTo('blog-detail', { postId: post.id })}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 rounded-lg hover:bg-slate-100"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => navigateTo('edit-blog', { postId: post.id })}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 rounded-lg hover:bg-slate-100"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deletePost(post.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Users Management Table */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">User Access & Privileges</h3>
              <span className="text-xs text-slate-400">{users.length} registered accounts</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-400 uppercase font-semibold border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Articles</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-slate-900">
                        <div className="flex items-center gap-3">
                          <img
                            src={u.avatar}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover shrink-0"
                          />
                          <div>
                            <span className="font-bold">{u.name}</span>
                            <p className="text-[10px] text-slate-400">Joined {u.joinedDate}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                        {u.email}
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={u.role}
                          onChange={(e) => changeUserRole(u.id, e.target.value)}
                          className="px-2 py-1 rounded-lg border border-slate-200 bg-white text-xs font-semibold focus:outline-none focus:border-indigo-600 cursor-pointer"
                        >
                          <option value="Admin">Admin</option>
                          <option value="Author">Author</option>
                          <option value="Reader">Reader</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 font-medium">
                        {posts.filter((p) => p.author?.id === u.id || p.author?.name === u.name).length}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            u.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {u.status || 'Active'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => manageUserStatus(u.id, u.status === 'Active' ? 'Suspended' : 'Active')}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                            u.status === 'Active'
                              ? 'text-rose-600 hover:bg-rose-50'
                              : 'text-emerald-600 hover:bg-emerald-50'
                          }`}
                        >
                          {u.status === 'Active' ? 'Suspend' : 'Reactivate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Comments Moderation */}
        {activeTab === 'comments' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Live Comments Moderation</h3>
              <span className="text-xs text-slate-400">Total threads: {comments.length}</span>
            </div>

            <div className="divide-y divide-slate-100">
              {comments.map((comm) => {
                const targetPost = posts.find((p) => p.id === comm.postId);

                return (
                  <div key={comm.id} className="p-5 flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <img
                          src={comm.author.avatar}
                          alt=""
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-xs font-bold text-slate-900">{comm.author.name}</span>
                        <span className="text-[11px] text-slate-400">• {comm.date}</span>
                        {targetPost && (
                          <span
                            onClick={() => navigateTo('blog-detail', { postId: targetPost.id })}
                            className="text-[11px] text-indigo-600 font-medium hover:underline cursor-pointer truncate max-w-xs"
                          >
                            on "{targetPost.title}"
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                        {comm.content}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => showToast('Comment approved by moderator', 'success')}
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                        title="Approve"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteComment(comm.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                        title="Delete comment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 5: Category Manager */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Create Category Form */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm h-fit">
              <h3 className="text-base font-bold text-slate-900 mb-2">Create New Category</h3>
              <p className="text-xs text-slate-500 mb-4">
                Categories help readers filter stories by specific topics and technologies.
              </p>

              <form onSubmit={handleAddCategorySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Category Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="e.g. Cybersecurity"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm"
                >
                  Add Category
                </button>
              </form>
            </div>

            {/* Existing Categories List */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Current Categories</h3>
                <span className="text-xs text-slate-400">{categories.length} total categories</span>
              </div>

              <div className="divide-y divide-slate-100">
                {categories.map((cat) => {
                  const postCount = posts.filter(
                    (p) => p.category?.toLowerCase() === cat.name.toLowerCase() || p.categoryId === cat.id
                  ).length;

                  return (
                    <div key={cat.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                          <Layers className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{cat.name}</h4>
                          <span className="text-xs text-slate-400">{postCount} published articles</span>
                        </div>
                      </div>

                      <button
                        onClick={() => deleteCategory(cat.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Delete category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
