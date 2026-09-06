export interface SkillCategory {
  id: string;
  name: string;
  items: string[];
  featured: boolean;
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'concepts',
    name: 'Concepts & Domains',
    items: ['Machine Learning', 'Deep Learning', 'NLP', 'Large Language Models (LLMs)', 'Parameter-Efficient Fine-Tuning (LoRA)', 'Knowledge Distillation', 'LSTM Networks', 'Graph Algorithms (A*, Dijkstra)', 'REST APIs', 'AI Agent Programming', 'Multi-threading', 'Socket Programming', 'OOP'],
    featured: true,
  },
  {
    id: 'languages',
    name: 'Programming Languages',
    items: ['Python', 'Java', 'JavaScript', 'SQL', 'HTML', 'CSS', 'R', 'C#'],
    featured: false,
  },
  {
    id: 'ml-frameworks',
    name: 'ML/AI Frameworks & Libraries',
    items: ['Scikit-Learn', 'PyTorch', 'TensorFlow/Keras', 'HuggingFace Transformers', 'NumPy', 'Pandas', 'Matplotlib', 'NLTK', 'spaCy'],
    featured: false,
  },
  {
    id: 'web-frameworks',
    name: 'Web/App Frameworks',
    items: ['Flask', 'Streamlit', 'JavaFX'],
    featured: false,
  },
  {
    id: 'tools',
    name: 'Tools & Platforms',
    items: ['Docker', 'Git/GitHub', 'VS Code', 'PyCharm', 'IntelliJ IDEA', 'ModelSim', 'Blender', 'Weka', 'RStudio'],
    featured: false,
  },
  {
    id: 'gamedev',
    name: 'Unity / Game Dev',
    items: ['Unity (NavMesh)', 'C#', 'Blender'],
    featured: false,
  },
  {
    id: 'os',
    name: 'Operating Systems',
    items: ['Windows', 'Linux'],
    featured: false,
  },
];
