export interface ProjectLink {
  type: 'github' | 'demo' | 'paper' | 'colab';
  url: string;
  label: string;
}

export interface BenchmarkRow {
  metric: string;
  baseline?: string;
  teacher?: string;
  student: string;
  delta?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'nlp' | 'systems' | 'ml' | 'gamedev';
  categoryLabel: string;
  description: string;
  problem: string;
  details: string;
  results: string;
  impact?: string;
  architectureHighlights?: string[];
  benchmarks?: BenchmarkRow[];
  techniques?: string[];
  techStack: string[];
  links: ProjectLink[];
  featured: boolean;
  metrics?: { label: string; value: string }[];
}

export const projects: Project[] = [
  {
    id: 'cairo-transportation',
    title: 'Intelligent Cairo Transportation System',
    tagline: 'ML-Powered Route Optimization & Traffic Planning',
    category: 'systems',
    categoryLabel: 'Full-Stack & Graph Optimization',
    description: 'Containerized full-stack web application combining Scikit-Learn traffic prediction models with A*, Dijkstra, and Dynamic Programming algorithms to simulate adaptive routing across Greater Cairo.',
    problem: 'Navigating Greater Cairo requires dynamic route planning that adapts to severe time-dependent traffic congestion, emergency dispatch routing, and municipal transit maintenance budgets across high-density road networks.',
    details: 'Engineered a modular optimization engine featuring A* with Euclidean/Manhattan heuristics, Dijkstra\'s algorithm, and dynamic programming for bus allocation and budget planning. Integrated a Scikit-Learn ML traffic prediction model trained on historical congestion data to dynamically recalculate edge weights in real-time. Wrapped the optimization core in a Flask REST API connected to an interactive Leaflet.js map with Docker containerization.',
    results: 'Sub-second route calculation across dense road graph nodes, real-time multi-algorithm path comparisons, and interactive simulation of adaptive rerouting under sudden peak traffic bursts.',
    impact: 'Delivered sub-second multi-algorithm route computation across Cairo road network nodes with live comparative visualization of computational complexity and travel time.',
    metrics: [
      { label: 'Calculation Latency', value: '< 120ms' },
      { label: 'Algorithms Supported', value: 'A*, Dijkstra, DP' },
      { label: 'Backend Architecture', value: 'Flask REST + Docker' },
      { label: 'Visualization', value: 'Interactive Leaflet' },
    ],
    benchmarks: [
      { metric: 'A* Search Latency (Avg)', student: '42 ms', baseline: '110 ms', delta: '2.6x faster' },
      { metric: 'Dijkstra Latency (Avg)', student: '88 ms', baseline: '195 ms', delta: '2.2x faster' },
      { metric: 'Emergency Rerouting Time', student: '< 65 ms', baseline: '250 ms', delta: '3.8x faster' },
      { metric: 'Container Startup', student: '1.8 s', baseline: '6.5 s', delta: 'Docker optimized' },
    ],
    architectureHighlights: [
      'Time-Dependent Graph Engine with ML Traffic Congestion Edge Weighting',
      'Comparative Multi-Algorithm Pathfinding (A* with custom heuristics vs Dijkstra)',
      'Dynamic Programming Knapsack Optimizer for municipal transit resource allocation',
      'RESTful Flask API with CORS and structured JSON response payloads',
      'Containerized Multi-Stage Docker deployment with Leaflet.js frontend',
    ],
    techniques: [
      'A* Pathfinding',
      'Dijkstra\'s Algorithm',
      'Dynamic Programming',
      'ML Traffic Prediction',
      'REST API Design',
      'Docker Containerization',
    ],
    techStack: ['Python', 'Scikit-Learn', 'Flask', 'Docker', 'Leaflet.js', 'NumPy'],
    links: [
      { type: 'github', url: 'https://github.com/Mohamedislam42/Cairo-Transportation-System', label: 'GitHub Repository' },
      { type: 'demo', url: 'https://intelligent-cairo-transportation-system.vercel.app/', label: 'Live Demo' },
    ],
    featured: true,
  },
  {
    id: 'sentiment-classification',
    title: 'Efficient Sentiment Classification',
    tagline: 'GPT-2, LoRA & Knowledge Distillation',
    category: 'nlp',
    categoryLabel: 'NLP & LLM Optimization',
    description: 'Parameter-efficient NLP pipeline combining LoRA adapter matrices with teacher-student knowledge distillation, training only 2.15% parameters while retaining 96.9% of full teacher F1 performance.',
    problem: 'Standard fine-tuning of large transformer models for domain-specific sentiment classification requires substantial VRAM and compute, resulting in bloated deployment footprints. The challenge was building an ultra-compact student model capable of retaining near-teacher accuracy on both binary (IMDB) and fine-grained 5-class (SST-5) benchmarks under severe compute constraints.',
    details: 'Fine-tuned a full GPT-2 model (124M params) as the teacher, then distilled into a LoRA-adapted DistilGPT-2 student model (2.6M trainable params) using temperature-scaled KL-divergence loss paired with Focal Loss and label smoothing to counter severe class imbalances. Engineered a novel hybrid pooling layer replacing standard final-token extraction with an 80% learned Attention Pooling + 20% Mean Pooling blend for superior contextual representation.',
    results: 'Achieved 0.8962 Macro F1 on IMDB benchmark (compared to the 124M teacher\'s 0.9245 Macro F1) and demonstrated high zero-shot transfer on SST-5 fine-grained sentiment with sub-15ms inference latency on standard hardware.',
    impact: 'Reduced trainable parameters by 97.85% (from 124M down to 2.6M) while retaining 96.9% of the teacher model\'s Macro F1 performance.',
    metrics: [
      { label: 'Param Reduction', value: '97.85%' },
      { label: 'Macro F1 (IMDB)', value: '0.8962' },
      { label: 'Trainable Params', value: '2.6M / 124M' },
      { label: 'Pooling Mechanism', value: '80% Attn / 20% Mean' },
    ],
    benchmarks: [
      { metric: 'Trainable Parameters', baseline: '124.4M (100%)', teacher: '124.4M (100%)', student: '2.68M (2.15%)', delta: '-97.85%' },
      { metric: 'IMDB Macro F1', baseline: '0.8610', teacher: '0.9245', student: '0.8962', delta: '+3.52% vs base' },
      { metric: 'IMDB Accuracy', baseline: '86.4%', teacher: '92.8%', student: '90.1%', delta: '+3.7% vs base' },
      { metric: 'Training VRAM', baseline: '8.4 GB', teacher: '8.4 GB', student: '2.9 GB', delta: '-65.5%' },
      { metric: 'Inference Latency', baseline: '38 ms/batch', teacher: '38 ms/batch', student: '14 ms/batch', delta: '2.7x faster' },
    ],
    architectureHighlights: [
      'Teacher-Student Knowledge Distillation (KL Divergence with T=2.0)',
      'LoRA (Low-Rank Adaptation) Rank=8, Alpha=16 applied to W_q, W_v projections',
      'Hybrid Pooling Layer (0.80 Attention Pool + 0.20 Mean Pool)',
      'Focal Loss with Label Smoothing (\u03b3=2.0, \u03b1=0.25, \u03b5=0.1) for class imbalance',
      'FP16 Mixed Precision & Gradient Checkpointing for low-memory training',
    ],
    techniques: [
      'LoRA (PEFT)',
      'Knowledge Distillation',
      'Hybrid Attention Pooling',
      'Focal Loss & Label Smoothing',
      'Mixed Precision (FP16)',
      'Cosine LR Scheduling',
    ],
    techStack: ['Python', 'PyTorch', 'HuggingFace Transformers', 'LoRA (PEFT)', 'Weights & Biases'],
    links: [
      { type: 'github', url: 'https://github.com/Mohamedislam42/efficient-sentiment-classification', label: 'GitHub Repository' },
      { type: 'demo', url: 'https://sentiment-classification-demo.vercel.app', label: 'Live Demo' },
    ],
    featured: true,
  },
  {
    id: 'multi-agent-research-assistant',
    title: 'Multi-Agent Research Assistant',
    tagline: 'Autonomous Multi-Agent Orchestration & Source Verification',
    category: 'nlp',
    categoryLabel: 'Multi-Agent AI & Verification',
    description: 'A multi-agent AI system where specialized agents (Search, Summarizer, Fact-Checker) collaborate under a Coordinator to research a question, synthesize a cited answer, and fact-check it — producing a grounded, source-verified report. The Fact-Checker agent caught and flagged an unsupported statistic during a live test run, demonstrating real self-verification.',
    problem: 'Standard monolithic LLM queries often suffer from hallucinations, outdated facts, and fabricated citations when answering complex research questions. Without iterative sub-task decomposition and source-level auditing loops, raw LLM outputs cannot be reliably trusted for high-stakes research.',
    details: 'Architected a modular multi-agent pipeline orchestrated by a central Coordinator. The Search Agent decomposes research questions into targeted sub-queries and fetches real-time web results via DuckDuckGo (`ddgs`). The Summarizer Agent aggregates raw search findings into a coherent draft with inline numeric citations. The Fact-Checker Agent systematically audits generated draft claims against cited reference sources, identifying ungrounded claims and flagging statistical anomalies before final Markdown report compilation.',
    results: 'Generated complete, source-grounded research reports with full citation trails. During live validation on LLM hallucination mitigation strategies, the Fact-Checker agent successfully detected and flagged an unsupported statistic cited in prompt mitigation claims, proving autonomous self-verification capabilities.',
    impact: 'Demonstrated robust multi-agent orchestration, live web grounding without paid API requirements, and an autonomous self-verification loop that detects and flags subtle AI hallucinations.',
    metrics: [
      { label: 'Architecture', value: '4 Specialized Agents' },
      { label: 'Search Backend', value: 'DuckDuckGo (ddgs)' },
      { label: 'Inference Engine', value: 'Groq Cloud' },
      { label: 'Self-Audit', value: 'Automated Fact-Check' },
    ],
    architectureHighlights: [
      'Coordinator-driven multi-agent pipeline (Search, Summarizer, Fact-Checker)',
      'Autonomous query decomposition for multi-angle web research coverage',
      'Structured inline numeric citation mapping linked to live web references',
      'Automated claim-by-claim verification pass identifying hallucinated figures',
      'Zero-API-key search engine integration using duckduckgo_search (ddgs)',
    ],
    techniques: [
      'Multi-Agent Orchestration',
      'LangChain Pipeline',
      'Source Grounding & RAG',
      'Automated Fact-Checking',
      'Query Decomposition',
      'Structured Report Synthesis',
    ],
    techStack: ['Python', 'LangChain', 'Groq (LLM inference)', 'DuckDuckGo Search (ddgs)'],
    links: [
      { type: 'github', url: 'https://github.com/Mohamedislam42/multi-agent-research-assistant', label: 'GitHub Repository' },
    ],
    featured: true,
  },
];

