export interface Certification {
  id: string;
  title: string;
  issuer: string;
  platform: string;
  verifyUrl: string;
}

export const certifications: Certification[] = [
  {
    id: 'neural-networks',
    title: 'Neural Networks and Deep Learning',
    issuer: 'DeepLearning.AI',
    platform: 'Coursera',
    verifyUrl: 'https://coursera.org/verify/H10PV0ENSIYL',
  },
  {
    id: 'nlp-classification',
    title: 'NLP with Classification and Vector Spaces',
    issuer: 'DeepLearning.AI',
    platform: 'Coursera',
    verifyUrl: 'https://coursera.org/verify/27WE0B5L89X0',
  },
  {
    id: 'nlp-tensorflow',
    title: 'NLP in TensorFlow',
    issuer: 'DeepLearning.AI',
    platform: 'Coursera',
    verifyUrl: 'https://coursera.org/verify/SM9I2M78KLMY',
  },
  {
    id: 'multi-agent',
    title: 'Building Multi-Agent Systems',
    issuer: 'Microsoft',
    platform: 'Coursera',
    verifyUrl: 'https://coursera.org/verify/1L0A6BPBW69S',
  },
];
