export interface ProjectLink {
  type: 'github' | 'demo';
  url: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  details: string;
  results: string;
  impact?: string;
  techniques?: string[];
  techStack: string[];
  links: ProjectLink[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'sentiment-classification',
    title: 'Efficient Sentiment Classification',
    tagline: 'GPT-2, LoRA & Knowledge Distillation',
    description: 'Parameter-efficient NLP pipeline combining LoRA with teacher-student knowledge distillation for sentiment classification.',
    problem: 'Designed a parameter-efficient NLP pipeline combining LoRA with teacher-student knowledge distillation for sentiment classification, training only 2.15% of total parameters while retaining competitive performance.',
    details: 'Fine-tuned a full GPT-2 model as teacher, distilled into a LoRA-adapted DistilGPT-2 student using KL-divergence loss with label smoothing and Focal Loss for class imbalance. Engineered a hybrid pooling strategy (80% attention pooling, 20% mean pooling) replacing standard final-token extraction for richer sentence embeddings.',
    results: '0.8962 Macro F1 on IMDB (vs. teacher\'s 0.9245), evaluated further on SST-5 fine-grained 5-class sentiment, demonstrating strong generalization under resource constraints.',
    // TODO: Confirm accuracy with user metrics
    impact: 'Reduced trainable parameters by 97.85% while retaining 96.9% of the full teacher model\'s Macro F1 performance.',
    techniques: ['Mixed Precision Training', 'Gradient Accumulation', 'Gradient Checkpointing', 'Cosine LR Scheduling'],
    techStack: ['Python', 'PyTorch', 'HuggingFace Transformers', 'LoRA (PEFT)'],
    links: [
      // TODO: Replace with real GitHub repository URL
      { type: 'github', url: 'https://github.com/Mohamedislam42/efficient-sentiment-classification', label: 'GitHub Repo' },
      // TODO: Replace with live demo URL if deployed
      { type: 'demo', url: 'https://sentiment-classification-demo.vercel.app', label: 'Live Demo' },
    ],
    featured: true,
  },
  {
    id: 'cairo-transportation',
    title: 'Intelligent Cairo Transportation System',
    tagline: 'ML-Powered Route Optimization & Traffic Planning',
    description: 'Containerized full-stack web application to visualize and compare intelligent transport planning and routing algorithms across Greater Cairo.',
    problem: 'A containerized full-stack web application to visualize and compare intelligent transport planning and routing algorithms across Greater Cairo.',
    details: 'Machine-learning-assisted traffic prediction module (Scikit-Learn, NumPy) powering time-dependent adaptive pathfinding. Advanced graph routing (A*, Dijkstra) and dynamic programming to optimize emergency vehicle routing, bus allocation, and maintenance budgets. RESTful API (Flask) connecting backend optimization logic to an interactive Leaflet map UI.',
    results: 'Full-stack system with real-time route visualization, multi-algorithm comparison, and ML-powered traffic prediction — deployed as a containerized application.',
    // TODO: Confirm accuracy with user metrics
    impact: 'Simulated adaptive vehicle rerouting with dynamic pathfinding, delivering sub-second route calculations across Cairo road network nodes.',
    techniques: ['A* Search', 'Dijkstra\'s Algorithm', 'Dynamic Programming', 'Traffic Prediction ML'],
    techStack: ['Python', 'Scikit-Learn', 'Flask', 'Docker', 'Leaflet.js'],
    links: [
      // TODO: Replace with real GitHub repository URL
      { type: 'github', url: 'https://github.com/Mohamedislam42/cairo-transport-routing', label: 'GitHub Repo' },
      // TODO: Replace with live demo URL if deployed
      { type: 'demo', url: 'https://cairo-transport-demo.vercel.app', label: 'Live Demo' },
    ],
    featured: true,
  },
];
