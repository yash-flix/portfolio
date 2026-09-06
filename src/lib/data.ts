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

/** A drawn architecture diagram. Coordinates are absolute inside a `w`×`h`
 *  viewBox, laid out by hand the way these diagrams actually get drawn — every
 *  node is 56 units tall, edges route orthogonally between box edges.
 *    io    = the edge of the system (clients, external services)
 *    core  = something that computes (services, agents, tools)
 *    store = something that persists (indexes, records, checkpoints) */
export type ArchKind = "io" | "core" | "store";
export type ArchSide = "t" | "r" | "b" | "l";
export type ArchNode = { id: string; label: string; note?: string; x: number; y: number; w: number; kind?: ArchKind };
export type ArchEdge = {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
  bothWays?: boolean;
  /** Override the box edge the arrow leaves from / lands on. */
  fromSide?: ArchSide;
  toSide?: ArchSide;
  /** Explicit orthogonal waypoints, for edges that route around the diagram. */
  via?: [number, number][];
  labelAt?: [number, number];
};
export type ArchGroup = { label: string; x: number; y: number; w: number; h: number };
/** `rail` is the cross-cutting concern drawn as a band under the diagram. */
export type Architecture = { w: number; h: number; nodes: ArchNode[]; edges: ArchEdge[]; groups?: ArchGroup[]; rail?: string };

export type Project = {
  index: string;
  slug: string;
  title: string;
  kicker: string;
  oneLiner: string;
  description: string;
  bullets: string[];
  metrics: { value: string; label: string }[];
  stack: string[];
  arch: Architecture;
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
      "Work is split across **specialised agents**, run in parallel, and **graded before any of it is trusted**.",
    bullets: [
      "**Planner, researcher and critic** agents split a question into sub-tasks and run them **in parallel**.",
      "An **LLM-as-a-Judge** scores every output against a **rubric** before it is allowed downstream.",
      "Structured outputs validated with **Pydantic**, so a malformed agent response **fails loudly instead of silently**.",
      "Every stage **checkpoints** — a failed step **resumes from the last good state** instead of restarting the run.",
    ],
    metrics: [
      { value: "3", label: "agent roles" },
      { value: "Judge", label: "scored outputs" },
      { value: "Resume", label: "from checkpoint" },
    ],
    stack: ["Python", "LangGraph", "LLM-as-a-Judge", "Pydantic", "Checkpointing"],
    arch: {
      w: 1080,
      h: 350,
      groups: [{ label: "agent graph", x: 372, y: 26, w: 176, h: 250 }],
      nodes: [
        { id: "q", label: "Research question", x: 8, y: 124, w: 140 },
        { id: "sup", label: "LangGraph supervisor", note: "typed shared state", x: 176, y: 124, w: 170, kind: "core" },
        { id: "ckpt", label: "Checkpoint store", x: 176, y: 224, w: 170, kind: "store" },
        { id: "plan", label: "Planner", x: 382, y: 40, w: 156, kind: "core" },
        { id: "res", label: "Researcher ×N", note: "parallel", x: 382, y: 124, w: 156, kind: "core" },
        { id: "crit", label: "Critic", x: 382, y: 208, w: 156, kind: "core" },
        { id: "gate", label: "Pydantic gate", note: "schema check", x: 580, y: 124, w: 150 },
        { id: "judge", label: "LLM-as-a-Judge", note: "rubric score", x: 762, y: 124, w: 158, kind: "core" },
        { id: "rep", label: "Report", x: 952, y: 124, w: 120, kind: "store" },
      ],
      edges: [
        { from: "q", to: "sup" },
        { from: "sup", to: "plan" },
        { from: "plan", to: "res" },
        { from: "res", to: "crit" },
        { from: "crit", to: "gate" },
        { from: "gate", to: "judge" },
        { from: "judge", to: "rep" },
        { from: "sup", to: "ckpt", dashed: true, bothWays: true },
        { from: "judge", to: "plan", dashed: true, fromSide: "t", toSide: "t", via: [[841, 14], [460, 14]], label: "score below threshold → replan", labelAt: [650, 10] },
      ],
      rail: "state is checkpointed at every node — a crashed run resumes instead of restarting",
    },
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
      "A retrieval stack tuned end to end: chunking, reranking and query rewriting, **measured against a baseline**.",
    bullets: [
      "Ingests multiple PDFs, chunked at ==1000 tokens== and indexed in **ChromaDB**.",
      "Retrieved candidates reranked with a **Cross-Encoder** instead of trusting raw vector similarity.",
      "A LangGraph state machine **rewrites weak queries** before answering — ==40% fewer hallucinations== across 200+ test queries.",
      "Beat a BM25 baseline on relevance by ==28%== on the same query set.",
      "Shipped on Streamlit with ==sub-2s end-to-end latency== on multi-PDF questions.",
    ],
    metrics: [
      { value: "−40%", label: "hallucination" },
      { value: "+28%", label: "vs BM25 relevance" },
      { value: "<2s", label: "end to end" },
    ],
    stack: ["LangGraph", "ChromaDB", "Cross-Encoder", "HuggingFace", "Groq", "Streamlit"],
    arch: {
      w: 1080,
      h: 368,
      groups: [
        { label: "offline ingestion", x: 0, y: 26, w: 516, h: 94 },
        { label: "online query path", x: 0, y: 194, w: 1078, h: 94 },
      ],
      nodes: [
        { id: "pdf", label: "PDF corpus", x: 8, y: 44, w: 140 },
        { id: "chunk", label: "Chunker", note: "1000-token chunks", x: 176, y: 44, w: 150 },
        { id: "embed", label: "Embeddings", x: 362, y: 44, w: 140 },
        { id: "chroma", label: "ChromaDB", note: "vector index", x: 362, y: 128, w: 140, kind: "store" },
        { id: "query", label: "User query", x: 8, y: 212, w: 140 },
        { id: "graph", label: "LangGraph", note: "state machine", x: 176, y: 212, w: 150, kind: "core" },
        { id: "search", label: "Vector search", x: 362, y: 212, w: 140 },
        { id: "rerank", label: "Cross-Encoder", note: "rerank top-k", x: 548, y: 212, w: 150, kind: "core" },
        { id: "llm", label: "Groq LLM", x: 734, y: 212, w: 140, kind: "core" },
        { id: "ans", label: "Answer + sources", x: 920, y: 212, w: 152 },
      ],
      edges: [
        { from: "pdf", to: "chunk" },
        { from: "chunk", to: "embed" },
        { from: "embed", to: "chroma" },
        { from: "chroma", to: "search" },
        { from: "query", to: "graph" },
        { from: "graph", to: "search" },
        { from: "search", to: "rerank" },
        { from: "rerank", to: "llm" },
        { from: "llm", to: "ans" },
        { from: "rerank", to: "graph", dashed: true, fromSide: "b", toSide: "b", via: [[623, 300], [251, 300]], label: "weak match → rewrite the query", labelAt: [437, 296] },
      ],
      rail: "eval harness: 200+ queries scored against a BM25 baseline on every change",
    },
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
      "A production support agent on AWS Bedrock: **retrieval, memory and tools** behind one conversation.",
    bullets: [
      "**Agentic RAG** over ==500+ FAQ entries== using Amazon Titan Embeddings v2 and FAISS.",
      "==~92% retrieval accuracy== on domain-specific questions.",
      "Deployed on **AWS Bedrock AgentCore** with **multi-turn memory** that carries context across a full conversation.",
      "**Tool-calling workflows** for the requests retrieval alone cannot answer.",
      "**CloudWatch observability** on every invocation — average query resolution time ==down 35%==.",
    ],
    metrics: [
      { value: "92%", label: "retrieval accuracy" },
      { value: "−35%", label: "resolution time" },
      { value: "500+", label: "FAQ entries" },
    ],
    stack: ["AWS Bedrock AgentCore", "LangChain", "FAISS", "Titan Embeddings v2", "CloudWatch"],
    arch: {
      w: 1080,
      h: 368,
      groups: [{ label: "tool layer", x: 410, y: 36, w: 420, h: 250 }],
      nodes: [
        { id: "client", label: "Support client", note: "inbound question", x: 8, y: 136, w: 150 },
        { id: "mem", label: "Session memory", note: "multi-turn", x: 190, y: 36, w: 186, kind: "store" },
        { id: "agent", label: "Bedrock AgentCore", note: "plan · route · respond", x: 190, y: 136, w: 186, kind: "core" },
        { id: "retrieve", label: "Retrieval tool", x: 424, y: 56, w: 170, kind: "core" },
        { id: "act", label: "Action tools", note: "business ops", x: 424, y: 204, w: 170, kind: "core" },
        { id: "titan", label: "Titan Embeddings v2", x: 630, y: 56, w: 180 },
        { id: "faiss", label: "FAISS index", note: "500+ FAQ entries", x: 870, y: 56, w: 160, kind: "store" },
        { id: "cw", label: "CloudWatch", note: "traces + metrics", x: 870, y: 204, w: 160, kind: "store" },
      ],
      edges: [
        { from: "client", to: "agent", bothWays: true },
        { from: "agent", to: "mem", dashed: true, bothWays: true, label: "read / write", labelAt: [340, 118] },
        { from: "agent", to: "retrieve" },
        { from: "agent", to: "act" },
        { from: "retrieve", to: "titan" },
        { from: "titan", to: "faiss" },
        { from: "faiss", to: "retrieve", dashed: true, fromSide: "t", toSide: "t", via: [[950, 20], [509, 20]], label: "top-k matches", labelAt: [730, 14] },
        { from: "agent", to: "cw", dashed: true, fromSide: "b", toSide: "b", via: [[283, 306], [950, 306]], label: "spans + latency", labelAt: [616, 302] },
      ],
      rail: "the agent decides per turn: answer from memory, retrieve, or call a tool",
    },
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
      "**Two agents in production**, a traced search harness underneath, and a builder portal being built on top.",
    bullets: [
      "**Architected and designed** the WhatsApp lead-nurture agent across **three phases**, owning the backend design and implementation for all three.",
      "**Phase 1 — inbound:** leads talk to the bot directly from the **company's product website**, where it qualifies intent and captures requirements in the conversation.",
      "**Phase 2 — outbound:** the bot fires **approved WhatsApp templates** at leads as they land in the **CRM**, then holds a live conversation with whoever replies, writing every turn back to the lead record.",
      "**Phase 3 — handoff:** qualified lead details are routed to the **appointed salesperson**, so a human takes over exactly at the point the lead is warm.",
      "==250+ leads== moved from **cold to warm** with autonomous follow-ups.",
      "A **LangGraph property-search agent** that reads portals, builder sites and the open web, then fills a **fixed schema per project** — possession, amenities, carpet area, RERA number, builder, location, nearby infrastructure and description — with **every fact linked back to its source**.",
      "Both agents run on a **search harness I built** that mixes deterministic steps with tool-calling LLM stages, traced end to end with **OpenTelemetry and Langfuse**.",
      "Currently building a builder-focused portal on top of it, starting with a **competitor-analysis agent** that maps a builder's rivals and turns the findings into an analytics dashboard.",
    ],
    metrics: [
      { value: "250+", label: "leads cold → warm" },
      { value: "8", label: "fields extracted" },
      { value: "Traced", label: "OTel + Langfuse" },
    ],
    stack: ["LangGraph", "WhatsApp API", "Python", "FastAPI", "OpenTelemetry", "Langfuse", "Next.js", "Claude"],
    arch: {
      w: 1080,
      h: 392,
      groups: [
        { label: "channels", x: 0, y: 20, w: 184, h: 248 },
        { label: "lead nurture · phases 1–3", x: 408, y: 20, w: 670, h: 88 },
        { label: "property intelligence", x: 408, y: 180, w: 670, h: 88 },
      ],
      nodes: [
        { id: "web", label: "Website widget", note: "phase 1", x: 8, y: 36, w: 168 },
        { id: "wa", label: "WhatsApp Cloud API", note: "phase 2", x: 8, y: 116, w: 168 },
        { id: "crmhook", label: "CRM webhooks", x: 8, y: 196, w: 168 },
        { id: "api", label: "FastAPI services", note: "router · dispatch · state", x: 212, y: 116, w: 178, kind: "core" },
        { id: "nurture", label: "Nurture agent", x: 424, y: 36, w: 170, kind: "core" },
        { id: "qualify", label: "Qualify + follow-up", note: "autonomous", x: 610, y: 36, w: 150 },
        { id: "crm", label: "CRM lead record", x: 782, y: 36, w: 132, kind: "store" },
        { id: "handoff", label: "Sales handoff", note: "phase 3", x: 930, y: 36, w: 142 },
        { id: "psa", label: "Property-search agent", x: 424, y: 196, w: 170, kind: "core" },
        { id: "harness", label: "Search harness", note: "deterministic + tools", x: 610, y: 196, w: 150, kind: "core" },
        { id: "portals", label: "Portals + web", x: 782, y: 196, w: 132 },
        { id: "schema", label: "Project schema", note: "8 fields + source", x: 930, y: 196, w: 142, kind: "store" },
        { id: "portal", label: "Builder portal", note: "competitor dashboard", x: 930, y: 272, w: 142 },
      ],
      edges: [
        { from: "web", to: "api" },
        { from: "wa", to: "api" },
        { from: "crmhook", to: "api" },
        { from: "api", to: "nurture" },
        { from: "api", to: "psa" },
        { from: "nurture", to: "qualify" },
        { from: "qualify", to: "crm" },
        { from: "crm", to: "handoff" },
        { from: "psa", to: "harness" },
        { from: "harness", to: "portals" },
        { from: "portals", to: "schema" },
        { from: "schema", to: "portal" },
        { from: "nurture", to: "harness", dashed: true, fromSide: "b", toSide: "t", label: "shared harness", labelAt: [597, 139] },
        { from: "qualify", to: "nurture", dashed: true, fromSide: "t", toSide: "t", via: [[685, 10], [509, 10]], label: "lead replies → re-qualify", labelAt: [597, 6] },
      ],
      rail: "OpenTelemetry spans from every service and agent stage → Langfuse",
    },
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
