export type Note = {
  slug: string;
  title: string;
  dek: string;
  date: string;
  readingTime: string;
  status: "draft" | "published";
  body: string[]; // paragraphs; lines starting with "## " become headings, "> " become pull quotes
};

export const notes: Note[] = [
  {
    slug: "first-principles-is-a-debugging-tool",
    title: "First principles is a debugging tool, not a philosophy",
    dek: "Everyone quotes it. Almost nobody uses it at 2am when the retrieval pipeline returns garbage.",
    date: "2026-09-01",
    readingTime: "4 min",
    status: "draft",
    body: [
      "People talk about first principles like it is a personality. Something you have, like being tall. I think it is closer to a wrench. You pick it up when the normal tools stop working, and you put it down when the thing is fixed.",
      "Here is when I actually reach for it. DocMind was returning confident, well-written answers that were wrong. Not slightly wrong. Wrong about which document the fact came from. My first instinct was pattern matching: search for 'RAG hallucination fix', try a bigger model, lower the temperature, add a system prompt that says please be accurate. That is not first principles. That is copying the last person who had a problem that looked like mine.",
      "## Break it until the pieces are boring",
      "First principles means asking what has to be true for the answer to be correct, and then checking each of those things separately. For a RAG answer to be right, four things have to hold. The right chunk has to exist in the store. The retriever has to find it. The reranker has to keep it near the top. The model has to use it instead of its own memory.",
      "Once I wrote that down, the problem stopped being 'RAG is hallucinating' and became four small tests. It turned out the chunk existed and the retriever found it, but the query was so vague that six other chunks scored higher and pushed the right one out of the context window. The model never saw it. It was not lying. It was answering the question with what it had.",
      "> The fix was not a better model. It was a state machine that rewrites the query when retrieval confidence is low, then tries again.",
      "That single loop cut the hallucination rate by about 40% across 200 test queries. It came from decomposition, not from cleverness.",
      "## Why it feels slow and is actually fast",
      "First principles feels slow because you are not doing anything visible for the first twenty minutes. You are writing down what must be true. Pattern matching feels fast because you are typing. But pattern matching has a hidden cost: when it fails, you learn nothing, and you have to start again with a new pattern. Decomposition fails informatively. Every test you run either confirms a piece or points at the break.",
      "So I do not think of first principles as a way of seeing the world. I think of it as the thing I do when the world stops making sense and I need to find out which of my assumptions is the broken one. It is a wrench. Use it when you need it, and get good at knowing when that is.",
    ],
  },
  {
    slug: "working-memory-and-context-windows",
    title: "Working memory, context windows, and why my agents checkpoint",
    dek: "The brain has been running a resource-constrained agent for a few hundred thousand years. Some of its tricks port directly.",
    date: "2026-08-24",
    readingTime: "5 min",
    status: "draft",
    body: [
      "I read neuroscience the way some people watch football highlights. Not because I plan to do it professionally, but because it keeps showing me things that are useful somewhere else. Lately, that somewhere else has been agent design.",
      "Start with working memory. Humans hold roughly four chunks of information in active attention at once. Not four facts, four chunks, where a chunk is whatever you have compressed into a single handle. A chess master sees a board position as one chunk. I see it as thirty-two pieces. The capacity is the same, the compression is different.",
      "A context window is working memory with a bigger number attached. And the failure mode is identical. You can stuff a hundred thousand tokens in, but the model attends to a small fraction of it, and what it attends to is decided by salience, not by importance. Long-context benchmarks keep finding this: facts in the middle of a prompt get lost. Neuroscience has a name for the same curve in human recall. It is called the serial position effect, and it was described in 1885.",
      "## Compression beats capacity",
      "The brain's answer to limited working memory is not to grow it. It is to compress aggressively, offload to the environment, and retrieve on demand. You do not remember your friend's phone number, you remember where it is stored. This is retrieval-augmented generation, built by evolution.",
      "So when I build an agent, I stop trying to fit everything in the prompt. I ask what the agent needs to hold right now, and what it can look up. Structured summaries of past turns go into the context. Raw transcripts go into a store with an index. The agent's working memory stays small and legible, which also makes it debuggable.",
      "## Sleep is a checkpoint",
      "The second trick is consolidation. During sleep, the hippocampus replays the day and moves what matters into cortex, where it is cheaper to store and slower to change. If you skip that step, the day is lost. The brain does not keep everything live; it periodically commits.",
      "ResearchOps-AI checkpoints after every stage for the same reason. A multi-agent research run can take minutes and involve dozens of model calls. If the judge stage fails on call forty, I do not want to redo calls one through thirty-nine. Every stage writes its validated output to a store, and the graph resumes from the last good node. It is a mundane engineering pattern, but I only started treating it as non-negotiable after reading about what happens to memory when you skip sleep.",
      "> The brain is not a metaphor for agents. It is the reference implementation, and it has been in production longer than anything I will ever ship.",
      "None of this makes me a neuroscientist. I am an engineering student who reads too much. But I have stopped believing the two fields are far apart. Attention, retrieval, consolidation, prediction error: these are the words in the papers, and they are also the names of the functions in my codebase.",
    ],
  },
  {
    slug: "on-wanting-to-be-a-polymath",
    title: "Notes on wanting to be a polymath in an age of specialists",
    dek: "Football, neuroscience, LangGraph, writing, swimming. The advice says pick one. Here is why I think the advice is slightly wrong.",
    date: "2026-08-10",
    readingTime: "4 min",
    status: "draft",
    body: [
      "The careers advice is consistent. Specialise. Go deep. Be the person who knows one thing better than anyone in the room. It is good advice for a lot of people, and I understand why it exists. Depth is legible. Depth gets hired.",
      "But I keep noticing that the problems I actually enjoy solving sit between fields, and the people who solve them well are the ones who can carry an idea across a border without losing it.",
      "## What a polymath actually is",
      "I do not mean knowing a little about everything. That is a dinner-party skill. I mean being genuinely competent in several unrelated areas, competent enough to notice when a tool from one applies to another. Leonardo drew anatomy because he wanted to paint bodies that were correct. The anatomy was not a hobby; it was infrastructure for the painting.",
      "For me, the infrastructure looks like this. Neuroscience and psychology are how I think about agents and about the people who use them. Writing is how I check whether I understood something, because a confused paragraph is a confused idea. Football and badminton and swimming are how I keep the machine running, and they have taught me more about positioning and pressure than any team offsite. Leadership is what happens when you can explain the thing you built to someone who did not build it.",
      "> The fields do not compete for time. They pay each other.",
      "## The honest cost",
      "There is a cost, and I do not want to pretend otherwise. I will not be the world's best at any one of these things. Someone who only does retrieval systems will know retrieval systems better than I do. That is fine. My bet is that the interesting work over the next decade is integration work: getting an agent to talk to a sales team, getting a research pipeline to produce something a human can act on, getting a real-estate lead to trust a message from a machine. That work needs range as much as depth.",
      "## How I actually do it",
      "Not by spreading thin. By rotating focus. Each month has a main thing, and the main thing gets the mornings. The rest gets the gaps. Right now the main thing is agents in production. The gaps are a neuroscience textbook, a notebook of essay drafts, and Sunday football. Last year the main thing was full-stack, and the gaps were AWS and a blockchain I built to understand what a blockchain is.",
      "The word polymath sounds grand. What it means day to day is refusing to let one field become the only lens, and staying curious enough to keep picking up wrenches that were not made for the job. Life rewards action, and it seems to reward action from several directions at once.",
    ],
  },
];

export function getNote(slug: string) {
  return notes.find((n) => n.slug === slug);
}
