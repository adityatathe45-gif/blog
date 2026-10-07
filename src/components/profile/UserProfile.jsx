import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Edit2,
  Bookmark,
  FileText,
  Calendar,
  Clock,
  Trash2,
  PenSquare,
  Eye,
  Heart,
  ArrowRight,
  Shield,
  Check,
  X,
  Sparkles
} from 'lucide-react';

export default function UserProfile({ initialTab = 'articles' }) {
  const {
    currentUser,
    updateUserProfile,
    posts,
    deletePost,
    navigateTo,
    bookmarks,
    toggleBookmark,
    openAuth
  } = useApp();

  const [activeTab, setActiveTab] = useState(initialTab); // 'articles', 'saved', 'drafts'
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editedName, setEditedName] = useState(currentUser?.name || '');
  const [editedBio, setEditedBio] = useState(currentUser?.bio || '');

  if (!currentUser) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <User className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Sign in to view profile</h2>
        <p className="text-sm text-slate-500 mb-6">
          You need to be signed in to see your published articles, drafts, and saved bookmarks.
        </p>
        <button
          onClick={() => openAuth('login')}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 shadow-sm"
        >
          Sign In
        </button>
      </div>
    );
  }

  // Filter posts created by current user
  const userPublishedPosts = posts.filter(
    (p) => (p.author?.id === currentUser.id || p.author?.name === currentUser.name) && p.status !== 'Draft'
  );

  const userDrafts = posts.filter(
    (p) => (p.author?.id === currentUser.id || p.author?.name === currentUser.name) && p.status === 'Draft'
  );

  // Filter saved/bookmarked articles
  const savedPosts = posts.filter((p) => bookmarks.includes(p.id));

  // Calculate total stats
  const totalViews = userPublishedPosts.reduce((acc, p) => acc + (p.views || 0), 0);
  const totalLikes = userPublishedPosts.reduce((acc, p) => acc + (p.likes || 0), 0);

  const handleSaveProfile = () => {
    updateUserProfile({
      name: editedName.trim() || currentUser.name,
      bio: editedBio.trim() || currentUser.bio
    });
    setIsEditingBio(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Profile Header Banner Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden mb-8">
          
          {/* Decorative Cover Gradient */}
          <div className="h-32 sm:h-44 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 relative">
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>{currentUser.role} Account</span>
            </div>
          </div>

          {/* Profile Details Container */}
          <div className="px-6 sm:px-8 pb-8 pt-0 relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-6">
              
              {/* Avatar & Basic Info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-white shadow-lg bg-white"
                />
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                    {currentUser.name}
                  </h1>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {currentUser.email} • Joined {currentUser.joinedDate || '2024'}
                  </p>
                </div>
              </div>

              {/* Edit Profile Button / Actions */}
              <div className="flex items-center gap-2">
                {isEditingBio ? (
                  <>
                    <button
                      onClick={handleSaveProfile}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" /> Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditingBio(false)}
                      className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setEditedName(currentUser.name);
                      setEditedBio(currentUser.bio);
                      setIsEditingBio(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Edit Profile</span>
                  </button>
                )}
                
                <button
                  onClick={() => navigateTo('write-blog')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <PenSquare className="w-3.5 h-3.5" />
                  <span>Write Article</span>
                </button>
              </div>

            </div>

            {/* Bio Section */}
            {isEditingBio ? (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Name</label>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full mt-1 p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Bio</label>
                  <textarea
                    rows="3"
                    value={editedBio}
                    onChange={(e) => setEditedBio(e.target.value)}
                    className="w-full mt-1 p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>
            ) : (
              <p className="text-slate-600 text-sm leading-relaxed max-w-3xl mb-6">
                {currentUser.bio}
              </p>
            )}

            {/* Stats Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center sm:text-left">
                <span className="text-xs text-slate-400 font-medium">Published Articles</span>
                <p className="text-xl font-extrabold text-slate-900 mt-0.5">{userPublishedPosts.length}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center sm:text-left">
                <span className="text-xs text-slate-400 font-medium">Followers</span>
                <p className="text-xl font-extrabold text-slate-900 mt-0.5">
                  {(currentUser.followers || 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center sm:text-left">
                <span className="text-xs text-slate-400 font-medium">Total Article Views</span>
                <p className="text-xl font-extrabold text-slate-900 mt-0.5">{totalViews.toLocaleString()}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center sm:text-left">
                <span className="text-xs text-slate-400 font-medium">Saved Articles</span>
                <p className="text-xl font-extrabold text-slate-900 mt-0.5">{savedPosts.length}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 mb-6 pb-2">
          <button
            onClick={() => setActiveTab('articles')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'articles'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>My Articles ({userPublishedPosts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Articles ({savedPosts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('drafts')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'drafts'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <PenSquare className="w-3.5 h-3.5" />
            <span>Drafts ({userDrafts.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'articles' && (
          <div className="space-y-4">
            {userPublishedPosts.length > 0 ? (
              userPublishedPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 cursor-pointer"
                      onClick={() => navigateTo('blog-detail', { postId: post.id })}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded-md">
                          {post.category}
                        </span>
                        <span className="text-xs text-slate-400">• {post.date}</span>
                      </div>
                      <h3
                        onClick={() => navigateTo('blog-detail', { postId: post.id })}
                        className="text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer truncate"
                      >
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" /> {post.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5" /> {post.likes} likes
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => navigateTo('edit-blog', { postId: post.id })}
                      className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors"
                      title="Edit article"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      title="Delete article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigateTo('blog-detail', { postId: post.id })}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-xl text-xs font-bold transition-colors"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
                <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h3 className="text-base font-bold text-slate-800">No published articles yet</h3>
                <p className="text-xs text-slate-500 mb-4">Start writing your first story to share with readers.</p>
                <button
                  onClick={() => navigateTo('write-blog')}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Write Your First Article
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="space-y-4">
            {savedPosts.length > 0 ? (
              savedPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-all flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 cursor-pointer"
                      onClick={() => navigateTo('blog-detail', { postId: post.id })}
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded-md">
                        {post.category}
                      </span>
                      <h3
                        onClick={() => navigateTo('blog-detail', { postId: post.id })}
                        className="text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer truncate mt-1"
                      >
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">By {post.author?.name} • {post.readingTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleBookmark(post.id)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl text-xs font-semibold"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigateTo('blog-detail', { postId: post.id })}
                      className="px-3.5 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700"
                    >
                      Read
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
                <Bookmark className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h3 className="text-base font-bold text-slate-800">No saved articles yet</h3>
                <p className="text-xs text-slate-500 mb-4">Click the bookmark icon on any article to save it for later.</p>
                <button
                  onClick={() => navigateTo('home')}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Explore Blogs
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'drafts' && (
          <div className="space-y-4">
            {userDrafts.length > 0 ? (
              userDrafts.map((draft) => (
                <div
                  key={draft.id}
                  className="bg-white rounded-2xl p-5 border border-dashed border-slate-300 shadow-xs flex items-center justify-between gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-amber-700 uppercase bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        Draft
                      </span>
                      <span className="text-xs text-slate-400">• Last modified {draft.date}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 truncate">
                      {draft.title || 'Untitled Draft'}
                    </h3>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{draft.excerpt || 'No description yet'}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => navigateTo('edit-blog', { postId: draft.id })}
                      className="px-3.5 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700"
                    >
                      Resume Editing
                    </button>
                    <button
                      onClick={() => deletePost(draft.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl"
                      title="Delete draft"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
                <PenSquare className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h3 className="text-base font-bold text-slate-800">No drafts in progress</h3>
                <p className="text-xs text-slate-500 mb-4">You have published all your work or have not started a draft yet.</p>
                <button
                  onClick={() => navigateTo('write-blog')}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Start Writing
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
