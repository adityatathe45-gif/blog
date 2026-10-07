import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CATEGORIES, INITIAL_USERS, INITIAL_POSTS, INITIAL_COMMENTS } from '../data/initialData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // 1. Posts State
  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('blogsphere_posts');
      return saved ? JSON.parse(saved) : INITIAL_POSTS;
    } catch {
      return INITIAL_POSTS;
    }
  });

  // 2. Categories State
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('blogsphere_categories');
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  // 3. Users State
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('blogsphere_users');
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  // Current logged in user (defaults to Elena Vance for quick full testing)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('blogsphere_current_user');
      return saved ? JSON.parse(saved) : INITIAL_USERS[0];
    } catch {
      return INITIAL_USERS[0];
    }
  });

  // 4. Comments State
  const [comments, setComments] = useState(() => {
    try {
      const saved = localStorage.getItem('blogsphere_comments');
      return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
    } catch {
      return INITIAL_COMMENTS;
    }
  });

  // 5. Bookmarks State (post IDs)
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('blogsphere_bookmarks');
      return saved ? JSON.parse(saved) : ['post-1', 'post-3'];
    } catch {
      return ['post-1', 'post-3'];
    }
  });

  // 6. Navigation / Active View State
  const [currentView, setCurrentView] = useState('home'); // 'home', 'blog-detail', 'write-blog', 'edit-blog', 'profile', 'admin', 'about', 'contact'
  const [activePostId, setActivePostId] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // null means All

  // 7. Search Modal State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 8. Auth Modal State
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup' | 'forgot'

  // 9. Toast Notification System
  const [toasts, setToasts] = useState([]);

  // 10. Followed authors
  const [followedAuthors, setFollowedAuthors] = useState(['user-marcus']);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('blogsphere_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('blogsphere_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('blogsphere_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('blogsphere_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('blogsphere_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('blogsphere_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('blogsphere_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Toast Helper
  const showToast = (message, type = 'success', title = '') => {
    const id = Date.now() + Math.random().toString();
    const newToast = { id, message, type, title };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation Helper
  const navigateTo = (view, extra = {}) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (view === 'blog-detail' && extra.postId) {
      setActivePostId(extra.postId);
      recordView(extra.postId);
    }
    if (view === 'edit-blog' && extra.postId) {
      setEditingPostId(extra.postId);
    }
    if (extra.category !== undefined) {
      setSelectedCategory(extra.category);
    }
    setCurrentView(view);
  };

  // Post Actions
  const addPost = (newPostData) => {
    const id = 'post-' + Date.now();
    const newPost = {
      ...newPostData,
      id,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      views: 1,
      likes: 0,
      isFeatured: false,
      status: newPostData.status || 'Published'
    };
    setPosts((prev) => [newPost, ...prev]);

    // Update user post count
    if (currentUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === currentUser.id ? { ...u, articlesCount: (u.articlesCount || 0) + 1 } : u))
      );
      setCurrentUser((prev) => (prev ? { ...prev, articlesCount: (prev.articlesCount || 0) + 1 } : prev));
    }

    // Update category post count
    if (newPost.categoryId) {
      setCategories((prev) =>
        prev.map((c) => (c.id === newPost.categoryId ? { ...c, count: c.count + 1 } : c))
      );
    }

    showToast(newPost.status === 'Draft' ? 'Draft saved successfully!' : 'Blog post published successfully!', 'success');
    return newPost;
  };

  const updatePost = (id, updatedData) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, ...updatedData } : post))
    );
    showToast('Blog updated successfully!', 'success');
  };

  const deletePost = (id) => {
    const postToDelete = posts.find((p) => p.id === id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setComments((prev) => prev.filter((c) => c.postId !== id));
    setBookmarks((prev) => prev.filter((bId) => bId !== id));

    if (postToDelete && postToDelete.categoryId) {
      setCategories((prev) =>
        prev.map((c) => (c.id === postToDelete.categoryId ? { ...c, count: Math.max(0, c.count - 1) } : c))
      );
    }

    showToast('Blog post deleted.', 'info');
    if (currentView === 'blog-detail' && activePostId === id) {
      navigateTo('home');
    }
  };

  const toggleLikePost = (postId) => {
    const likedKey = `liked_${postId}`;
    const isAlreadyLiked = localStorage.getItem(likedKey) === 'true';

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            likes: isAlreadyLiked ? Math.max(0, p.likes - 1) : p.likes + 1,
            isLikedByMe: !isAlreadyLiked
          };
        }
        return p;
      })
    );

    if (isAlreadyLiked) {
      localStorage.removeItem(likedKey);
      showToast('Like removed', 'info');
    } else {
      localStorage.setItem(likedKey, 'true');
      showToast('You liked this article!', 'success');
    }
  };

  const recordView = (postId) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, views: p.views + 1 } : p))
    );
  };

  const toggleBookmark = (postId) => {
    setBookmarks((prev) => {
      const exists = prev.includes(postId);
      if (exists) {
        showToast('Article removed from saved list.', 'info');
        return prev.filter((id) => id !== postId);
      } else {
        showToast('Article saved to your library!', 'success');
        return [...prev, postId];
      }
    });
  };

  const isBookmarked = (postId) => bookmarks.includes(postId);

  // Category Actions
  const addCategory = (name, icon = 'Tag') => {
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (categories.some((c) => c.id === id)) {
      showToast('Category already exists.', 'error');
      return;
    }
    const newCat = {
      id,
      name,
      icon,
      color: 'from-indigo-500 to-purple-600',
      bgLight: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      count: 0
    };
    setCategories((prev) => [...prev, newCat]);
    showToast(`Category "${name}" created!`, 'success');
  };

  const deleteCategory = (catId) => {
    setCategories((prev) => prev.filter((c) => c.id !== catId));
    showToast('Category removed.', 'info');
  };

  // Comment Actions
  const addComment = (postId, text, parentId = null) => {
    if (!currentUser) {
      openAuth('login');
      showToast('Please sign in to join the conversation.', 'info');
      return;
    }
    if (!text.trim()) return;

    if (parentId) {
      // Threaded Reply
      const newReply = {
        id: 'reply-' + Date.now(),
        postId,
        author: {
          id: currentUser.id,
          name: currentUser.name,
          avatar: currentUser.avatar
        },
        content: text.trim(),
        date: 'Just now',
        likes: 0,
        likedByMe: false
      };

      setComments((prev) =>
        prev.map((c) => {
          if (c.id === parentId) {
            return {
              ...c,
              replies: [...(c.replies || []), newReply]
            };
          }
          return c;
        })
      );
    } else {
      // Top level comment
      const newComment = {
        id: 'comm-' + Date.now(),
        postId,
        author: {
          id: currentUser.id,
          name: currentUser.name,
          avatar: currentUser.avatar
        },
        content: text.trim(),
        date: 'Just now',
        likes: 0,
        likedByMe: false,
        replies: []
      };
      setComments((prev) => [newComment, ...prev]);
    }

    showToast('Comment posted!', 'success');
  };

  const toggleLikeComment = (commentId, parentId = null) => {
    setComments((prev) =>
      prev.map((c) => {
        if (!parentId && c.id === commentId) {
          const liked = !c.likedByMe;
          return {
            ...c,
            likes: liked ? c.likes + 1 : Math.max(0, c.likes - 1),
            likedByMe: liked
          };
        } else if (parentId && c.id === parentId) {
          return {
            ...c,
            replies: c.replies.map((r) => {
              if (r.id === commentId) {
                const liked = !r.likedByMe;
                return {
                  ...r,
                  likes: liked ? r.likes + 1 : Math.max(0, r.likes - 1),
                  likedByMe: liked
                };
              }
              return r;
            })
          };
        }
        return c;
      })
    );
  };

  const deleteComment = (commentId, parentId = null) => {
    if (parentId) {
      setComments((prev) =>
        prev.map((c) => {
          if (c.id === parentId) {
            return {
              ...c,
              replies: c.replies.filter((r) => r.id !== commentId)
            };
          }
          return c;
        })
      );
    } else {
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    }
    showToast('Comment deleted.', 'info');
  };

  // Auth & User Management
  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
  };

  const login = (email, password) => {
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      if (existing.status === 'Suspended') {
        showToast('Your account is currently suspended.', 'error');
        return false;
      }
      setCurrentUser(existing);
      closeAuth();
      showToast(`Welcome back, ${existing.name}!`, 'success');
      return true;
    } else {
      // Quick create on the fly or reject
      showToast('No account found with this email. Please sign up!', 'error');
      return false;
    }
  };

  const signup = ({ name, email, bio = '' }) => {
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      showToast('An account with this email already exists.', 'error');
      return false;
    }
    const newUser = {
      id: 'user-' + Date.now(),
      name,
      email,
      role: 'Author',
      avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 50)}?auto=format&fit=crop&w=400&q=80`,
      bio: bio || 'Writing thoughts and learning aloud on BlogSphere.',
      followers: 0,
      articlesCount: 0,
      status: 'Active',
      joinedDate: 'Oct 2026'
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    closeAuth();
    showToast(`Welcome to BlogSphere, ${name}!`, 'success');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('You have been logged out.', 'info');
    if (currentView === 'admin' || currentView === 'write-blog' || currentView === 'edit-blog') {
      navigateTo('home');
    }
  };

  const switchDemoUser = (userId) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
      closeAuth();
      showToast(`Switched account to ${user.name} (${user.role})`, 'success');
    }
  };

  const updateUserProfile = (updatedData) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updated : u)));
    showToast('Profile updated successfully!', 'success');
  };

  const toggleFollowUser = (authorId) => {
    setFollowedAuthors((prev) => {
      const isFollowing = prev.includes(authorId);
      if (isFollowing) {
        showToast('Unfollowed author.', 'info');
        return prev.filter((id) => id !== authorId);
      } else {
        showToast('Now following author!', 'success');
        return [...prev, authorId];
      }
    });
  };

  const manageUserStatus = (userId, status) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status } : u)));
    showToast(`User status set to ${status}.`, 'info');
  };

  const changeUserRole = (userId, newRole) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
    if (currentUser && currentUser.id === userId) {
      setCurrentUser((prev) => ({ ...prev, role: newRole }));
    }
    showToast(`User role updated to ${newRole}.`, 'success');
  };

  // Newsletter
  const subscribeNewsletter = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return false;
    }
    showToast('🎉 Thank you for subscribing! Welcome to the BlogSphere digest.', 'success');
    return true;
  };

  // Reset to default sample data
  const resetToDefaultData = () => {
    localStorage.clear();
    setPosts(INITIAL_POSTS);
    setCategories(INITIAL_CATEGORIES);
    setUsers(INITIAL_USERS);
    setCurrentUser(INITIAL_USERS[0]);
    setComments(INITIAL_COMMENTS);
    setBookmarks(['post-1', 'post-3']);
    showToast('Reset sample data back to default!', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        // Posts
        posts,
        addPost,
        updatePost,
        deletePost,
        toggleLikePost,
        recordView,
        // Categories
        categories,
        addCategory,
        deleteCategory,
        selectedCategory,
        setSelectedCategory,
        // Comments
        comments,
        addComment,
        toggleLikeComment,
        deleteComment,
        // Users & Auth
        users,
        currentUser,
        login,
        signup,
        logout,
        switchDemoUser,
        updateUserProfile,
        followedAuthors,
        toggleFollowUser,
        manageUserStatus,
        changeUserRole,
        // Bookmarks
        bookmarks,
        toggleBookmark,
        isBookmarked,
        // Navigation & Views
        currentView,
        activePostId,
        editingPostId,
        navigateTo,
        // Search
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        // Auth Modal
        isAuthOpen,
        authMode,
        openAuth,
        closeAuth,
        // Toasts
        toasts,
        showToast,
        removeToast,
        // Newsletter
        subscribeNewsletter,
        resetToDefaultData
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
