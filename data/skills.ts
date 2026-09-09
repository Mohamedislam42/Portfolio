export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  iconName?: string;
  items: { name: string; level?: 'Core' | 'Proficient' | 'Familiar'; projectRef?: string }[];
  featured: boolean;
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai-nlp',
    name: 'AI, NLP & Deep Learning',
    description: 'Specialized focus in natural language processing, transformer architectures, parameter-efficient fine-tuning, and neural knowledge distillation.',
    iconName: 'Brain',
    featured: true,
    items: [
      { name: 'Natural Language Processing (NLP)', level: 'Core', projectRef: 'sentiment-classification' },
      { name: 'Large Language Models (LLMs)', level: 'Core', projectRef: 'sentiment-classification' },
      { name: 'Parameter-Efficient Fine-Tuning (LoRA / PEFT)', level: 'Core', projectRef: 'sentiment-classification' },
      { name: 'Knowledge Distillation (Teacher-Student)', level: 'Core', projectRef: 'sentiment-classification' },
      { name: 'Hybrid Attention Pooling', level: 'Core', projectRef: 'sentiment-classification' },
      { name: 'Focal Loss & Label Smoothing', level: 'Core', projectRef: 'sentiment-classification' },
      { name: 'Deep Neural Networks (CNN/LSTM)', level: 'Proficient' },
      { name: 'Multi-Agent AI Systems', level: 'Proficient' },
      { name: 'Mixed Precision (FP16/BF16)', level: 'Proficient', projectRef: 'sentiment-classification' },
    ],
  },
  {
    id: 'ml-frameworks',
    name: 'ML Frameworks & Libraries',
    description: 'Production and research frameworks for deep learning, scientific computing, and model evaluation.',
    iconName: 'Cpu',
    featured: false,
    items: [
      { name: 'PyTorch', level: 'Core', projectRef: 'sentiment-classification' },
      { name: 'HuggingFace Transformers & PEFT', level: 'Core', projectRef: 'sentiment-classification' },
      { name: 'Scikit-Learn', level: 'Core', projectRef: 'cairo-transportation' },
      { name: 'TensorFlow / Keras', level: 'Proficient' },
      { name: 'NumPy & Pandas', level: 'Core', projectRef: 'cairo-transportation' },
      { name: 'Matplotlib & Seaborn', level: 'Proficient' },
      { name: 'NLTK & spaCy', level: 'Proficient' },
      { name: 'Weights & Biases (W&B)', level: 'Proficient' },
    ],
  },
  {
    id: 'algorithms-systems',
    name: 'Algorithms & Backend Systems',
    description: 'Graph routing, concurrent network architectures, and containerized backend microservices.',
    iconName: 'GitBranch',
    featured: false,
    items: [
      { name: 'Graph Algorithms (A*, Dijkstra)', level: 'Core', projectRef: 'cairo-transportation' },
      { name: 'Dynamic Programming', level: 'Core', projectRef: 'cairo-transportation' },
      { name: 'RESTful API Development (Flask)', level: 'Core', projectRef: 'cairo-transportation' },
      { name: 'Multi-Threading & Concurrency', level: 'Core', projectRef: 'java-chat-system' },
      { name: 'Socket Programming (TCP/IP)', level: 'Core', projectRef: 'java-chat-system' },
      { name: 'Docker Containerization', level: 'Proficient', projectRef: 'cairo-transportation' },
      { name: 'Object-Oriented Design (OOP)', level: 'Core' },
      { name: 'Data Structures & System Design', level: 'Core' },
    ],
  },
  {
    id: 'languages',
    name: 'Programming Languages',
    description: 'Core languages for AI pipelines, concurrent systems, desktop GUIs, and simulation.',
    iconName: 'Code',
    featured: false,
    items: [
      { name: 'Python', level: 'Core', projectRef: 'sentiment-classification' },
      { name: 'Java', level: 'Core', projectRef: 'java-chat-system' },
      { name: 'C#', level: 'Proficient', projectRef: 'unity-ai-simulation' },
      { name: 'SQL / Relational DBs', level: 'Proficient' },
      { name: 'JavaScript / TypeScript', level: 'Proficient' },
      { name: 'HTML & CSS / Tailwind', level: 'Proficient' },
      { name: 'R', level: 'Familiar' },
    ],
  },
  {
    id: 'simulation-tools',
    name: 'AI Simulation, 3D & Tools',
    description: 'Game AI navigation engines, 3D animation modeling, and developer tooling.',
    iconName: 'Layers',
    featured: false,
    items: [
      { name: 'Unity & NavMesh Pathfinding', level: 'Core', projectRef: 'unity-ai-simulation' },
      { name: 'Blender Skeletal Rigging & IK', level: 'Proficient', projectRef: 'unity-ai-simulation' },
      { name: 'JavaFX & FXML GUI', level: 'Core', projectRef: 'java-chat-system' },
      { name: 'Git & GitHub Workflows', level: 'Core' },
      { name: 'Linux / Bash Scripting', level: 'Proficient' },
      { name: 'VS Code & PyCharm / IntelliJ', level: 'Core' },
    ],
  },
];
