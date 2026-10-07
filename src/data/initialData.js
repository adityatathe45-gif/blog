// Initial realistic dataset for BlogSphere

export const INITIAL_CATEGORIES = [
  { id: 'tech', name: 'Technology', icon: 'Cpu', color: 'from-blue-500 to-cyan-500', bgLight: 'bg-blue-50 text-blue-700 border-blue-200', count: 8 },
  { id: 'ai', name: 'AI & Machine Learning', icon: 'Sparkles', color: 'from-purple-500 to-indigo-600', bgLight: 'bg-purple-50 text-purple-700 border-purple-200', count: 6 },
  { id: 'programming', name: 'Programming', icon: 'Code2', color: 'from-emerald-500 to-teal-600', bgLight: 'bg-emerald-50 text-emerald-700 border-emerald-200', count: 9 },
  { id: 'webdev', name: 'Web Development', icon: 'Globe', color: 'from-indigo-500 to-blue-600', bgLight: 'bg-indigo-50 text-indigo-700 border-indigo-200', count: 7 },
  { id: 'travel', name: 'Travel', icon: 'Compass', color: 'from-amber-500 to-orange-600', bgLight: 'bg-amber-50 text-amber-700 border-amber-200', count: 5 },
  { id: 'education', name: 'Education', icon: 'GraduationCap', color: 'from-rose-500 to-pink-600', bgLight: 'bg-rose-50 text-rose-700 border-rose-200', count: 6 },
  { id: 'lifestyle', name: 'Lifestyle', icon: 'Coffee', color: 'from-teal-500 to-emerald-600', bgLight: 'bg-teal-50 text-teal-700 border-teal-200', count: 4 },
];

export const INITIAL_USERS = [
  {
    id: 'user-admin',
    name: 'Elena Vance',
    email: 'elena@blogsphere.com',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Lead Architect & Editor-in-Chief at BlogSphere. Writing about AI frontiers, distributed systems, and modern digital ecosystems.',
    followers: 1240,
    articlesCount: 5,
    status: 'Active',
    joinedDate: 'Jan 2024'
  },
  {
    id: 'user-marcus',
    name: 'Marcus Sterling',
    email: 'marcus@techpulse.io',
    role: 'Author',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Senior Software Engineer & Tech Columnist. Passionate about TypeScript, React, and developer tooling ergonomics.',
    followers: 890,
    articlesCount: 4,
    status: 'Active',
    joinedDate: 'Mar 2024'
  },
  {
    id: 'user-sarah',
    name: 'Sarah Jenkins',
    email: 'sarah.j@nomadstories.com',
    role: 'Author',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    bio: 'Travel writer, photographer, and minimalist explorer. Documenting budget escapes and cultural immersions across 40+ countries.',
    followers: 654,
    articlesCount: 3,
    status: 'Active',
    joinedDate: 'Apr 2024'
  },
  {
    id: 'user-chloe',
    name: 'Chloe Chen',
    email: 'chloe@learnwell.org',
    role: 'Reader',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    bio: 'EdTech researcher and lifelong learner. Exploring the intersection of cognitive science and self-directed education.',
    followers: 320,
    articlesCount: 1,
    status: 'Active',
    joinedDate: 'Jun 2024'
  }
];

export const INITIAL_POSTS = [
  {
    id: 'post-1',
    isFeatured: true,
    title: 'The Future of Artificial Intelligence: What We Can Expect',
    slug: 'future-of-artificial-intelligence-what-we-can-expect',
    category: 'AI & Machine Learning',
    categoryId: 'ai',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'From generative models revolutionizing creative workflows to autonomous agents and reasoning systems, explore the seismic shifts reshaping humanity\'s digital frontier in 2026 and beyond.',
    author: {
      id: 'user-admin',
      name: 'Elena Vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      role: 'Editor-in-Chief'
    },
    date: 'Oct 04, 2026',
    readingTime: '7 min read',
    views: 34200,
    likes: 1845,
    tags: ['Artificial Intelligence', 'Future Tech', 'Deep Learning', 'Automation'],
    status: 'Published',
    content: `
## The Next Horizon: From Pattern Recognition to Autonomous Reasoning

Artificial Intelligence has transitioned beyond the stage of simple statistical pattern matching. Over the past twenty-four months, foundational model architectures have evolved from basic prompt-response engines into multi-modal cognitive agents capable of multi-step problem solving, formal code verification, and intuitive physical simulation.

As we stand in 2026, the question is no longer whether AI will transform our daily lives, but how fast institutions, creators, and engineers will adapt to these transformative dynamics.

> "The true power of modern intelligence systems lies not in replacing human judgment, but in amplifying human inquiry to solve problems previously deemed intractable."

### Key Trends Dominating the Next Decade

1. **Autonomous Agentic Workflows**
Instead of single-turn conversations, agents are now deployed with execution environments, memory buffers, and programmatic tool interfaces. An agent can research a topic, run tests, verify facts against live databases, and package the solution without micro-supervision.

2. **Edge Intelligence and Low-Power Models**
With innovations in quantization and neural architecture search, 14-billion parameter models now execute locally on modern laptops and smartphones with sub-second latencies, ensuring end-user privacy and zero network reliance.

3. **Multi-Modal Synthesis in Real Time**
Audio, vision, tactile sensory data, and tabular math are no longer siloed modalities. Unified cross-attention networks process live video streams while answering technical questions instantaneously.

\`\`\`python
# Example: Multi-agent reasoning pipeline in 2026
from blogsphere_ai import AgentGroup, ConsensusEngine

researcher = AgentGroup.create(role="Academic Researcher", tools=["arxiv", "web"])
verifier = AgentGroup.create(role="Code Auditor", tools=["sandbox_eval"])

solution = ConsensusEngine.resolve(
    prompt="Design a quantum-resistant cryptographic handshake",
    agents=[researcher, verifier],
    min_confidence=0.98
)
print(solution.verified_report())
\`\`\`

### Societal Implications and Responsible Governance

With capability comes responsibility. The emergence of agentic reasoning requires robust alignment protocols, transparency standards, and open-source benchmarks. As we venture further into synthetic content and automated software synthesis, provenance verification and digital watermarking will remain foundational tenets of the open web.

The journey ahead is extraordinarily bright. By designing systems centered around human empowerment, transparency, and safety, we pave the way for a Renaissance in creative thought and technological discovery.
    `
  },
  {
    id: 'post-2',
    isFeatured: false,
    title: 'How AI Is Changing the Way We Work',
    slug: 'how-ai-is-changing-the-way-we-work',
    category: 'AI & Machine Learning',
    categoryId: 'ai',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Workplaces across the globe are undergoing their greatest transformation since the advent of personal computing. Here is how modern teams collaborate with intelligent tools.',
    author: {
      id: 'user-admin',
      name: 'Elena Vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      role: 'Editor-in-Chief'
    },
    date: 'Oct 02, 2026',
    readingTime: '5 min read',
    views: 28900,
    likes: 1210,
    tags: ['Productivity', 'Workplace', 'AI', 'Future of Work'],
    status: 'Published',
    content: `
## The Modern Workplace: Augmented Human Collaboration

The traditional workplace was built around routine execution: repetitive email drafts, endless spreadsheet consolidation, and painstaking manual summaries. Today, intelligent assistance handles routine chores, freeing knowledge workers to focus on strategic thinking, deep empathy, and novel synthesis.

### 1. Collaborative Pair Thinking
Writing proposals and planning software sprints has evolved into an active dialogue. Team members start with rough outlines, query internal knowledge repositories, and refine proposals in minutes rather than days.

### 2. Eliminating Repetitive Administrative Overhead
From automated meeting transcription with sentiment and action item assignment, to context-aware triage of customer support tickets, operational friction has diminished substantially.

> "Productivity in 2026 is measured by clarity of thought, not hours logged behind a screen."

### 3. Upskilling and Continuous Learning
Every employee now has a personalized tutor capable of explaining complex financial models, writing clean Python scripts, or coaching on negotiation tactics tailored to their unique learning curve.
    `
  },
  {
    id: 'post-3',
    isFeatured: false,
    title: '10 Programming Skills Every Student Should Learn',
    slug: '10-programming-skills-every-student-should-learn',
    category: 'Programming',
    categoryId: 'programming',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Whether you are studying Computer Science or exploring software as a hobby, mastering these ten foundational skills will accelerate your engineering career.',
    author: {
      id: 'user-marcus',
      name: 'Marcus Sterling',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      role: 'Senior Software Engineer'
    },
    date: 'Sep 29, 2026',
    readingTime: '8 min read',
    views: 31200,
    likes: 2430,
    tags: ['Programming', 'Students', 'Career', 'Coding Skills'],
    status: 'Published',
    content: `
## The Essential Software Engineering Toolkit for Modern Learners

Coding has evolved rapidly, but core engineering fundamentals remain evergreen. Below are the 10 crucial skills every student and aspiring developer should focus on:

### 1. Git & Version Control Mastery
Beyond \`git add\` and \`git commit\`, master interactive rebasing, bisecting bugs, writing descriptive commit messages, and managing clean pull request reviews.

### 2. Data Structures & Algorithm Intuition
Knowing how hash tables, balanced trees, and graph traversals work allows you to write performant applications that scale under load.

### 3. Reading and Debugging Code
Eighty percent of your professional career will be spent reading other people's code. Learn to use debuggers, inspect stack traces, and formulate hypotheses systematically.

### 4. API Design and Contract Testing
Understand RESTful conventions, GraphQL schemas, and how to write clear OpenAPI specs that other teams love to consume.

### 5. Writing Resilient Automated Tests
Unit tests, integration tests, and end-to-end tests are your safety net. Practice writing code that is inherently testable with clean dependency injection.

### 6. Modern Type Systems (TypeScript / Rust)
Static types catch runtime errors before your users do. Strong typing turns your editor into a fearless refactoring assistant.

### 7. Asynchronous Programming & Concurrency
Master async/await, event loops, promises, and race condition prevention in modern runtimes.

### 8. Basic Cloud & Containerization
Familiarity with Docker, environment variables, and modern cloud deployment pipelines (Vercel, AWS, Cloudflare) sets you leagues ahead.

### 9. Prompt Engineering & AI-Assisted Tooling
Learn to prompt coding assistants effectively: provide clear constraints, sample inputs/outputs, and verify generated code critically.

### 10. Communication and Documentation
Code is written for humans to read, and only incidentally for computers to execute. Clear documentation and thoughtful empathy will make you an indispensable engineer.
    `
  },
  {
    id: 'post-4',
    isFeatured: false,
    title: 'Best Places to Travel on a Budget in 2026',
    slug: 'best-places-to-travel-on-a-budget',
    category: 'Travel',
    categoryId: 'travel',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'You do not need a fortune to experience breathtaking landscapes, vibrant cultural centers, and world-class street food. Here are our top budget-friendly destinations.',
    author: {
      id: 'user-sarah',
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      role: 'Travel Columnist'
    },
    date: 'Sep 26, 2026',
    readingTime: '6 min read',
    views: 22100,
    likes: 1540,
    tags: ['Travel', 'Budget', 'Nomad', 'Adventure'],
    status: 'Published',
    content: `
## Wanderlust on a Shoestring: Unforgettable Budget Escapes

Exploring the world is one of the most rewarding investments you can make, and you don't need luxury resort budgets to create memories of a lifetime. Here are five phenomenal destinations where your travel dollars stretch furthest.

### 1. Da Nang & Hoi An, Vietnam
With mouth-watering noodle bowls for $1.50, charming boutique hostels, and the scenic marble mountains nearby, Central Vietnam offers unmatched hospitality and scenic beauty.

### 2. Tbilisi & The Caucasus, Georgia
Georgia is a treasure trove of mountain monasteries, sulfur bath traditions, and exquisite cuisine (don't miss the freshly baked khachapuri!). A daily budget of $30-$40 covers comfortable lodging and rich wine tastings.

### 3. Oaxaca, Mexico
Renowned as the culinary capital of Mexico, Oaxaca features vibrant artisan markets, ancient Zapotec ruins at Monte Albán, and world-class mezcal distilleries.

### 4. Krakow, Poland
Steeped in medieval architecture and lively cafes, Krakow is one of Central Europe's most affordable cultural hubs. Walk through the historic Rynek Główny and explore the bohemian Kazimierz district.

### 5. Ella and the Hill Country, Sri Lanka
Iconic train journeys across misty tea plantations, stunning waterfalls, and welcoming homestays make Sri Lanka a dream destination for backpackers and nature enthusiasts alike.

### Practical Budget Travel Tips
- Travel during the shoulder seasons (spring and autumn).
- Dine where locals eat for authentic flavors and lower bills.
- Utilize regional trains and public transit instead of private taxis.
    `
  },
  {
    id: 'post-5',
    isFeatured: false,
    title: 'How to Build Your First Website: A Step-by-Step Guide',
    slug: 'how-to-build-your-first-website',
    category: 'Web Development',
    categoryId: 'webdev',
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'A comprehensive beginner-friendly roadmap covering semantic HTML, responsive CSS, modern JavaScript, and deploying live to the world in under an hour.',
    author: {
      id: 'user-marcus',
      name: 'Marcus Sterling',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      role: 'Senior Software Engineer'
    },
    date: 'Sep 22, 2026',
    readingTime: '9 min read',
    views: 26400,
    likes: 1890,
    tags: ['Web Development', 'Beginners', 'HTML', 'CSS', 'JavaScript'],
    status: 'Published',
    content: `
## Building for the Open Web: Your Step-by-Step Blueprint

Every digital product, SaaS startup, and personal portfolio begins with the foundational trinity of the web: HTML, CSS, and JavaScript. If you've been wondering how to build and launch your very own site, follow this structured guide.

### Step 1: Semantic Structure with HTML5
HTML provides the skeleton of your web page. Always use semantic tags (\`<header>\`, \`<main>\`, \`<section>\`, \`<article>\`, \`<footer>\`) rather than generic \`<div>\` elements. This boosts accessibility for screen readers and search engines.

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Portfolio</title>
</head>
<body>
  <header>
    <h1>Welcome to My Space</h1>
  </header>
  <main>
    <p>Exploring web development with passion.</p>
  </main>
</body>
</html>
\`\`\`

### Step 2: Styling and Responsiveness with Modern CSS
CSS is what transforms raw text into a visually stunning layout. Leverage CSS Grid and Flexbox for rock-solid layouts, and use fluid typography with \`clamp()\` for mobile-first responsiveness.

### Step 3: Interactivity with JavaScript
Add event listeners to handle user interactions—such as toggling dark mode, validating contact forms, or triggering animated scroll reveals.

### Step 4: Free Cloud Deployment
Gone are the days of manual FTP uploads. Push your code to GitHub, connect your repository to Vercel, Netlify, or GitHub Pages, and your site goes live globally in seconds with automatic HTTPS.
    `
  },
  {
    id: 'post-6',
    isFeatured: false,
    title: 'The Future of Web Development: Trends to Watch in 2026',
    slug: 'the-future-of-web-development-trends-to-watch',
    category: 'Technology',
    categoryId: 'tech',
    coverImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Explore edge compute, WebAssembly, server components, and AI-driven compile-time optimizations that are shaping the next generation of web applications.',
    author: {
      id: 'user-admin',
      name: 'Elena Vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      role: 'Editor-in-Chief'
    },
    date: 'Sep 18, 2026',
    readingTime: '7 min read',
    views: 39500,
    likes: 3100,
    tags: ['Technology', 'WebDev', 'WASM', 'Edge Computing', 'React'],
    status: 'Published',
    content: `
## The New Web Paradigm: Speed, Edge Compute, and Zero-JS Baselines

Web development in 2026 has witnessed unprecedented convergence between server performance and client fidelity. Let's examine the architectural innovations setting modern standards.

### 1. Edge-Native Compute & Instant Geodistribution
Applications are no longer pinned to a single origin server in Virginia. Logic executes at hundreds of edge locations worldwide, streaming HTML with sub-20ms Time to First Byte.

### 2. WebAssembly (WASM) Maturation
High-performance workloads like video editing, 3D gaming, CAD modeling, and local LLM inferencing now run inside the browser at near-native speeds through WebAssembly and WebGPU.

### 3. Component-Level Streaming & Islands Architecture
Frameworks have mastered selective hydration. Only the interactive widgets ship JavaScript down the wire, keeping payload sizes negligible and lighthouse scores pristine.
    `
  },
  {
    id: 'post-7',
    isFeatured: false,
    title: 'Tips for Becoming a Better Programmer Every Day',
    slug: 'tips-for-becoming-a-better-programmer',
    category: 'Programming',
    categoryId: 'programming',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Actionable habits, mental models, and deliberate practice techniques that elevate average coders into world-class software engineers.',
    author: {
      id: 'user-marcus',
      name: 'Marcus Sterling',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      role: 'Senior Software Engineer'
    },
    date: 'Sep 12, 2026',
    readingTime: '6 min read',
    views: 29800,
    likes: 2780,
    tags: ['Programming', 'Mindset', 'Growth', 'Habits'],
    status: 'Published',
    content: `
## The Art of Craftsmanship: Deliberate Practice in Code

Great software engineers are not born with special biological gifts; they are forged through deliberate daily habits, curiosity, and systematic reflection.

### 1. Build Toys and Side Projects
Tutorials give the illusion of competence. The true test of mastery is starting with an empty editor and shipping a small project from scratch to production.

### 2. Embrace the "Rubber Duck" Technique
When stuck on an elusive bug, explain your assumptions out loud to an inanimate object or colleague. In eight out of ten cases, the flaw in your mental model becomes immediately obvious.

### 3. Write Self-Documenting Code
Prioritize descriptive variable names over obscure shorthand. Code is read twenty times more often than it is typed. Treat readability as your highest aesthetic principle.
    `
  },
  {
    id: 'post-8',
    isFeatured: false,
    title: 'Lifelong Learning in the Age of Information Abundance',
    slug: 'lifelong-learning-in-the-age-of-information-abundance',
    category: 'Education',
    categoryId: 'education',
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'How to curate signal from noise, construct personal knowledge graphs, and retain critical insights in a hyper-connected world.',
    author: {
      id: 'user-chloe',
      name: 'Chloe Chen',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      role: 'EdTech Specialist'
    },
    date: 'Sep 08, 2026',
    readingTime: '5 min read',
    views: 18400,
    likes: 920,
    tags: ['Education', 'Knowledge', 'Reading', 'Learning'],
    status: 'Published',
    content: `
## Curating Your Mind: Strategies for Modern Learning

We live in an era where virtually all human knowledge is indexed and accessible within seconds. Yet information abundance often leads to cognitive overload rather than wisdom.

### The Power of Spaced Repetition and Active Recall
Passive reading yields fast forgetting curves. Creating flashcards and writing summaries in your own words forces your neural synapses to consolidate long-term memory traces.

### Building Your Second Brain
Use linked note-taking systems to capture quotes, ideas, and reflections. Over time, surprising connections emerge between disparate fields like biology, architecture, and computer science.
    `
  }
];

export const INITIAL_COMMENTS = [
  {
    id: 'comm-1',
    postId: 'post-1',
    author: {
      id: 'user-marcus',
      name: 'Marcus Sterling',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    },
    content: 'Sensational overview Elena! The distinction between pattern recognition and active multi-step reasoning captures exactly what we are seeing in production deployments right now.',
    date: '2 hours ago',
    likes: 14,
    likedByMe: false,
    replies: [
      {
        id: 'comm-1-1',
        postId: 'post-1',
        author: {
          id: 'user-admin',
          name: 'Elena Vance',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
        },
        content: 'Thanks Marcus! The next leap with local quantized models running privately on laptops is going to democratize this even faster.',
        date: '1 hour ago',
        likes: 6,
        likedByMe: true
      }
    ]
  },
  {
    id: 'comm-2',
    postId: 'post-1',
    author: {
      id: 'user-chloe',
      name: 'Chloe Chen',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'
    },
    content: 'Loved the quote on amplifying human inquiry. In education, seeing students pair with AI for Socratic debate has been eye-opening.',
    date: '4 hours ago',
    likes: 9,
    likedByMe: false,
    replies: []
  },
  {
    id: 'comm-3',
    postId: 'post-3',
    author: {
      id: 'user-sarah',
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'
    },
    content: 'Point #3 on reading code is spot on. I wish more universities emphasized code review culture and debugging empathy!',
    date: '1 day ago',
    likes: 18,
    likedByMe: true,
    replies: []
  }
];
