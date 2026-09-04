export const site = {
  name: "Yash Rane",
  handle: "yash-flix",
  role: "AI Engineer & Business Operations",
  location: "Mumbai, India",
  email: "yash.tushar13@gmail.com",
  motto: "Life rewards action.",
  url: "https://yashrane.dev",
};

export const socials = [
  { label: "GitHub", handle: "yash-flix", href: "https://github.com/yash-flix" },
  { label: "X / Twitter", handle: "@yash_ranee", href: "https://x.com/yash_ranee" },
  { label: "LinkedIn", handle: "yash-rane1308", href: "https://www.linkedin.com/in/yash-rane1308" },
  { label: "Email", handle: "yash.tushar13@gmail.com", href: "mailto:yash.tushar13@gmail.com" },
];

export const marqueeItems = [
  "LangGraph", "AWS Bedrock AgentCore", "RAG", "FAISS", "ChromaDB", "LangChain", "OpenTelemetry", "Langfuse",
  "Next.js", "React", "Node.js", "MongoDB", "PostgreSQL", "Docker", "Kubernetes",
  "Python", "TypeScript", "System design", "First principles", "Neuroscience",
];

export type Stat = { value: number; prefix?: string; suffix?: string; label: string; sub: string };
export const stats: Stat[] = [
  { value: 250, suffix: "+", label: "leads warmed", sub: "cold → warm, WhatsApp agent" },
  { value: 92, suffix: "%", label: "retrieval accuracy", sub: "agentic RAG on Bedrock" },
  { value: 40, prefix: "−", suffix: "%", label: "hallucination rate", sub: "LangGraph query rewriting" },
  { value: 500, suffix: "+", label: "concurrent requests", sub: "freelance backends on AWS" },
  { value: 2, prefix: "<", suffix: "s", label: "RAG latency", sub: "multi-PDF, end to end" },
  { value: 46, label: "public repos", sub: "since July 2024" },
];

export type Project = {
  index: string;
  slug: string;
  title: string;
  kicker: string;
  oneLiner: string;
  description: string;
  metrics: { value: string; label: string }[];
  stack: string[];
  pipeline: string[];
  href?: string;
  badge?: string;
  tone: string;
};

export const projects: Project[] = [
  {
    index: "01",
    slug: "researchops",
    title: "ResearchOps-AI",
    kicker: "Multi-agent research orchestration",
    oneLiner: "A research team made of agents, with a judge in the room.",
    description:
      "Planner, researcher and critic agents split a question, run it in parallel and hand results to an LLM-as-a-Judge that scores every output against a rubric. Structured outputs are validated before they move on, and every stage checkpoints, so a failed step resumes instead of restarting the whole run.",
    metrics: [
      { value: "3", label: "agent roles" },
      { value: "Judge", label: "scored outputs" },
      { value: "Resume", label: "from checkpoint" },
    ],
    stack: ["Python", "LangGraph", "LLM-as-a-Judge", "Pydantic", "Checkpointing"],
    pipeline: ["question", "plan", "parallel research", "structured validation", "LLM judge", "checkpoint", "report"],
    href: "https://github.com/yash-flix/ResearchOps-Ai",
    tone: "#0d0d0d",
  },
  {
    index: "02",
    slug: "docmind",
    title: "DocMind",
    kicker: "Multi-document RAG assistant",
    oneLiner: "Ask a question across a pile of PDFs and get one grounded answer.",
    description:
      "Multiple PDFs are chunked at 1000 tokens into ChromaDB, retrieved, then reranked with a Cross-Encoder. A LangGraph state machine rewrites weak queries before answering, which cut hallucinations by 40% across 200+ test queries and beat a BM25 baseline on relevance by 28%. Ships on Streamlit with sub-2s end-to-end latency.",
    metrics: [
      { value: "−40%", label: "hallucination" },
      { value: "+28%", label: "vs BM25 relevance" },
      { value: "<2s", label: "end to end" },
    ],
    stack: ["LangGraph", "ChromaDB", "Cross-Encoder", "HuggingFace", "Groq", "Streamlit"],
    pipeline: ["PDFs", "1000-token chunks", "ChromaDB", "retrieve", "cross-encoder rerank", "query rewrite", "answer"],
    href: "https://github.com/yash-flix/DocMind",
    tone: "#111111",
  },
  {
    index: "03",
    slug: "care-agent",
    title: "Customer Care Agent",
    kicker: "Agentic RAG on AWS Bedrock",
    oneLiner: "Support that remembers the conversation and calls tools when it needs to.",
    description:
      "An agentic RAG pipeline over 500+ FAQ entries using Amazon Titan Embeddings v2 and FAISS, hitting roughly 92% retrieval accuracy on domain-specific questions. Deployed on Bedrock AgentCore with multi-turn memory, tool-calling workflows and CloudWatch observability. Average query resolution time dropped 35%.",
    metrics: [
      { value: "92%", label: "retrieval accuracy" },
      { value: "−35%", label: "resolution time" },
      { value: "500+", label: "FAQ entries" },
    ],
    stack: ["AWS Bedrock AgentCore", "LangChain", "FAISS", "Titan Embeddings v2", "CloudWatch"],
    pipeline: ["user turn", "memory", "Titan embed", "FAISS search", "tool call?", "Bedrock agent", "reply + trace"],
    href: "https://github.com/yash-flix/Customer_Care_agent",
    tone: "#151515",
  },
  {
    index: "04",
    slug: "proptech",
    title: "Agents for real estate",
    kicker: "Current work · Internovo Ventures · Mumbai",
    oneLiner: "Two agents in production, a search harness underneath, a builder portal in progress.",
    description:
      "A WhatsApp lead-nurture agent that has moved 250+ leads from cold to warm with autonomous follow-ups. A LangGraph property-search agent that reads portals, builder sites and the web, then fills a fixed schema per project: possession, amenities, carpet area, RERA number, builder, location, nearby infrastructure and description, with every fact linked to its source. Both sit on a search harness I built that mixes deterministic steps with tool-calling LLM stages, traced end to end with OpenTelemetry and Langfuse. Currently building a builder-focused portal on top of it, starting with a competitor-analysis agent that maps a builder's rivals and turns the findings into an analytics dashboard.",
    metrics: [
      { value: "250+", label: "leads cold → warm" },
      { value: "8", label: "fields extracted" },
      { value: "Traced", label: "OTel + Langfuse" },
    ],
    stack: ["LangGraph", "WhatsApp API", "Python", "FastAPI", "OpenTelemetry", "Langfuse", "Next.js", "Claude"],
    pipeline: ["query", "deterministic filters", "tool calls", "LLM extract", "cite source", "trace to Langfuse", "portal + competitor dashboard"],
    badge: "Under NDA",
    tone: "#191919",
  },
];

export type ArchiveItem = { name: string; desc: string; tags: string[]; year: string; href: string };
export const archive: ArchiveItem[] = [
  { name: "VeriDocs AI", desc: "Detects forged documents, manipulated images and deepfakes, 94%+ accuracy, JWT + RBAC, 50MB media pipeline.", tags: ["MERN", "HF Transformers", "Multimodal"], year: "2026", href: "https://github.com/yash-flix/VeriDoc-Ai" },
  { name: "CodeEdit", desc: "Collaborative code editor with CRDT state and sub-100ms sync, deployed on AWS with Docker.", tags: ["CRDT", "WebSockets", "AWS"], year: "2026", href: "https://github.com/yash-flix/CodeEdit" },
  { name: "Clarix", desc: "AI ticket management: classify, route and draft replies for support queues.", tags: ["JavaScript", "LLM"], year: "2026", href: "https://github.com/yash-flix/Clarix" },
  { name: "Mail-Chan", desc: "A personal email agent that triages, summarises and drafts replies for everyday inbox work.", tags: ["Python", "Agents"], year: "2026", href: "https://github.com/yash-flix/Yash-s-Mail-Chan" },
  { name: "Lead Qualifier", desc: "Scores inbound leads from conversation signals into hot, warm and cold.", tags: ["Python", "LLM"], year: "2026", href: "https://github.com/yash-flix/Lead-Qualifer-" },
  { name: "Productivity Agent", desc: "An agent that plans the day, chases tasks and reports back.", tags: ["Python", "Agents"], year: "2026", href: "https://github.com/yash-flix/Productivity-Agent" },
  { name: "YERcoin", desc: "A blockchain from scratch: proof-of-work, cryptographic wallets, transaction validation.", tags: ["JavaScript", "Crypto"], year: "2026", href: "https://github.com/yash-flix/YERcoin" },
  { name: "Banking Ledger", desc: "Double-entry banking backend with idempotent transfers and audit trails.", tags: ["Node.js", "Express", "System design"], year: "2026", href: "https://github.com/yash-flix/Banking-ledger" },
  { name: "AD Steels", desc: "The website for my dad's steel business. The most personal thing I've shipped.", tags: ["TypeScript", "Next.js"], year: "2026", href: "https://github.com/yash-flix/AD_Steels" },
  { name: "FinanceQ", desc: "Gamified finance literacy for young people, plus an AI budget planner.", tags: ["TypeScript", "Python"], year: "2025", href: "https://github.com/yash-flix/FiinanceQ" },
  { name: "A-mail", desc: "Email phishing detector trained on message features.", tags: ["Python", "ML"], year: "2025", href: "https://github.com/yash-flix/A-mail" },
  { name: "Voyago", desc: "A travel companion app: itineraries, places, plans.", tags: ["EJS", "Node.js"], year: "2026", href: "https://github.com/yash-flix/Voyago" },
  { name: "notesapp", desc: "Full-stack notes on AWS: Amplify, Lambda, DynamoDB.", tags: ["AWS", "React"], year: "2025", href: "https://github.com/yash-flix/notesapp" },
  { name: "ChatApp", desc: "Real-time chat with Socket.io.", tags: ["Socket.io", "Node.js"], year: "2025", href: "https://github.com/yash-flix/ChatApp" },
];

export const timeline = [
  { year: "2022", title: "HSC, Thakur College of Science and Commerce", body: "Finished school in Mumbai. Started writing code that other people used." },
  { year: "2023", title: "B.Tech, AI & Data Science at VCET", body: "Vidyavardhini's College of Engineering & Technology. CGPA 9.02 so far, graduating 2027." },
  { year: "2024", title: "Web Developer Intern, Acmegrade", body: "Four full-stack apps on React, Express and MongoDB. Cut page load ~30% with query optimisation and code splitting." },
  { year: "2024 →", title: "Freelance full-stack developer", body: "Three-plus client sites on the MERN stack and AWS (S3, EC2, ECS Fargate). Backends handling 500+ concurrent requests." },
  { year: "2026 →", title: "AI Engineer & Business Operations, Internovo Ventures", body: "WhatsApp nurture agent, LangGraph property-search agent, a traced search harness (OpenTelemetry + Langfuse), and a builder portal with a competitor-analysis agent in progress." },
  { year: "2027", title: "Graduate", body: "Open to AI engineering roles where the agents have to work in production, not in a notebook." },
];

export const principles = [
  { n: "01", title: "First principles over pattern matching.", body: "When something breaks I go down to the physics of the problem, not to the last Stack Overflow answer that looked similar." },
  { n: "02", title: "Life rewards action.", body: "Most of what I know came from shipping something too early and fixing it in public." },
  { n: "03", title: "Measure, then talk.", body: "Retrieval accuracy, latency, hallucination rate. If a number can be put on it, I put a number on it." },
  { n: "04", title: "Read outside the field.", body: "The brain solved memory, attention and retrieval long before we did. Neuroscience and psychology are where I steal my best ideas about agents." },
  { n: "05", title: "The body is part of the stack.", body: "Football, badminton, swimming, the gym. Thinking gets better when the machine running it is maintained." },
];

export type MindItem = { label: string; blurb: string };
export type MindGroup = { id: string; label: string; angle: number; items: MindItem[] };
export const mind: MindGroup[] = [
  {
    id: "build", label: "Build", angle: -140,
    items: [
      { label: "Agents", blurb: "LangGraph state machines, tool calling, checkpointing. Agents that recover instead of crashing." },
      { label: "RAG", blurb: "Chunking, hybrid retrieval, reranking, query rewriting. Grounded answers with a source." },
      { label: "AWS", blurb: "Bedrock, Lambda, ECS Fargate, S3, IAM. I like knowing where the bytes actually live." },
      { label: "Full-stack", blurb: "MERN and Next.js. The interface is where an idea meets a real person." },
    ],
  },
  {
    id: "think", label: "Think", angle: -40,
    items: [
      { label: "First principles", blurb: "Break the problem until the pieces are obviously true, then rebuild." },
      { label: "Neuroscience", blurb: "Attention, working memory, prediction. The brain is the best agent architecture I know of." },
      { label: "Psychology", blurb: "How people decide, and why they do not do what they say. Useful for products and for leads." },
      { label: "Reading", blurb: "Wide and slow. Science, biographies, essays, the occasional dense textbook." },
      { label: "Writing", blurb: "Writing is how I find out whether I understood something." },
    ],
  },
  {
    id: "lead", label: "Lead", angle: 40,
    items: [
      { label: "Communication", blurb: "Explaining a RAG pipeline to a sales team is a skill. I enjoy it." },
      { label: "Leadership", blurb: "Owning outcomes, not tasks. Making the team faster than I am alone." },
      { label: "Curiosity", blurb: "The default state. Every system is a question I have not asked yet." },
    ],
  },
  {
    id: "move", label: "Move", angle: 140,
    items: [
      { label: "Football", blurb: "Weekend games. Positioning teaches more about systems than it should." },
      { label: "Badminton", blurb: "Fast, precise, unforgiving. Good for the reflexes." },
      { label: "Swimming", blurb: "The only place my phone cannot follow me." },
      { label: "Gym", blurb: "Reps, progress, discipline. Same loop as shipping." },
    ],
  },
];
