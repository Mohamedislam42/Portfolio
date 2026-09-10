'use client';

import React, { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faWandMagicSparkles, 
  faMicrochip, 
  faLayerGroup, 
  faBolt, 
  faLocationArrow, 
  faChartLine, 
  faSliders,
  faPlay
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

// --- SENTIMENT LAB DATA & LOGIC ---
const PRESET_PROMPTS = [
  {
    label: 'High Performance',
    text: 'This parameter-efficient LoRA distillation pipeline drastically reduces memory footprint while maintaining exceptional F1 accuracy.',
  },
  {
    label: 'Resource Bottleneck',
    text: 'The full baseline model suffers from excessive VRAM consumption and high inference latency under peak load.',
  },
  {
    label: 'Mixed Benchmark',
    text: 'While the fine-grained SST-5 accuracy showed slight variance, the overall Macro F1 score remained highly competitive.',
  },
  {
    label: 'Exceptional Engineering',
    text: 'An outstanding implementation of hybrid attention pooling that achieves sub-15ms inference latency in production.',
  },
];

const POSITIVE_WORDS = ['efficient', 'drastically', 'exceptional', 'outstanding', 'competitive', 'high', 'maintaining', 'superior', 'faster', 'optimized', 'richer', 'robust', 'sub-15ms', 'seamless', 'breakthrough'];
const NEGATIVE_WORDS = ['suffers', 'excessive', 'bottleneck', 'high inference latency', 'latency', 'bloated', 'struggles', 'imbalance', 'variance', 'drop', 'expensive', 'heavy', 'flawed'];

function analyzeSentimentSimulation(text: string) {
  const words = text.split(/\s+/).filter(Boolean);
  let posScore = 0;
  let negScore = 0;

  const tokenWeights = words.map((rawWord, idx) => {
    const cleanWord = rawWord.toLowerCase().replace(/[^a-z0-9-]/g, '');
    const pseudoRand = ((rawWord.length * 17 + idx * 23) % 100) / 1000;
    let weight = 0.20 + pseudoRand;

    if (POSITIVE_WORDS.some(w => cleanWord.includes(w) || w.includes(cleanWord))) {
      weight += 0.65;
      posScore += 1.8;
    } else if (NEGATIVE_WORDS.some(w => cleanWord.includes(w) || w.includes(cleanWord))) {
      weight += 0.60;
      negScore += 1.8;
    } else if (cleanWord.length > 7) {
      weight += 0.25;
      posScore += 0.2;
    }

    return { word: rawWord, weight: Math.min(1, weight) };
  });

  const diff = posScore - negScore;
  let sentiment: 'Very Positive' | 'Positive' | 'Neutral' | 'Negative' | 'Very Negative';
  let confidences: { label: string; score: number }[];

  if (diff >= 2.5) {
    sentiment = 'Very Positive';
    confidences = [
      { label: 'Very Positive', score: 86 },
      { label: 'Positive', score: 11 },
      { label: 'Neutral', score: 2 },
      { label: 'Negative', score: 1 },
      { label: 'Very Negative', score: 0 },
    ];
  } else if (diff > 0.4) {
    sentiment = 'Positive';
    confidences = [
      { label: 'Very Positive', score: 14 },
      { label: 'Positive', score: 72 },
      { label: 'Neutral', score: 10 },
      { label: 'Negative', score: 3 },
      { label: 'Very Negative', score: 1 },
    ];
  } else if (diff <= -2.5) {
    sentiment = 'Very Negative';
    confidences = [
      { label: 'Very Positive', score: 0 },
      { label: 'Positive', score: 2 },
      { label: 'Neutral', score: 4 },
      { label: 'Negative', score: 16 },
      { label: 'Very Negative', score: 78 },
    ];
  } else if (diff < -0.4) {
    sentiment = 'Negative';
    confidences = [
      { label: 'Very Positive', score: 1 },
      { label: 'Positive', score: 4 },
      { label: 'Neutral', score: 12 },
      { label: 'Negative', score: 71 },
      { label: 'Very Negative', score: 12 },
    ];
  } else {
    sentiment = 'Neutral';
    confidences = [
      { label: 'Very Positive', score: 6 },
      { label: 'Positive', score: 22 },
      { label: 'Neutral', score: 58 },
      { label: 'Negative', score: 11 },
      { label: 'Very Negative', score: 3 },
    ];
  }

  return { tokenWeights, sentiment, confidences };
}

// --- CAIRO GRAPH SIMULATION DATA ---
interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  zone: string;
}

interface GraphEdge {
  from: string;
  to: string;
  baseDistanceKm: number;
}

const CAIRO_NODES: GraphNode[] = [
  { id: 'tahrir', label: 'Downtown', x: 190, y: 180, zone: 'Central' },
  { id: 'giza', label: 'Giza', x: 90, y: 260, zone: 'West' },
  { id: 'october', label: '6th of Oct', x: 45, y: 130, zone: 'Far West' },
  { id: 'heliopolis', label: 'Heliopolis', x: 310, y: 100, zone: 'East' },
  { id: 'nasr_city', label: 'Nasr City', x: 330, y: 190, zone: 'East' },
  { id: 'maadi', label: 'Maadi', x: 230, y: 310, zone: 'South' },
  { id: 'tagamoa', label: 'New Cairo', x: 440, y: 240, zone: 'Far East' },
];

const CAIRO_EDGES: GraphEdge[] = [
  { from: 'october', to: 'giza', baseDistanceKm: 22 },
  { from: 'october', to: 'tahrir', baseDistanceKm: 32 },
  { from: 'giza', to: 'tahrir', baseDistanceKm: 8 },
  { from: 'giza', to: 'maadi', baseDistanceKm: 14 },
  { from: 'tahrir', to: 'heliopolis', baseDistanceKm: 12 },
  { from: 'tahrir', to: 'nasr_city', baseDistanceKm: 11 },
  { from: 'tahrir', to: 'maadi', baseDistanceKm: 13 },
  { from: 'heliopolis', to: 'nasr_city', baseDistanceKm: 7 },
  { from: 'heliopolis', to: 'tagamoa', baseDistanceKm: 20 },
  { from: 'nasr_city', to: 'tagamoa', baseDistanceKm: 16 },
  { from: 'maadi', to: 'tagamoa', baseDistanceKm: 18 },
];

export function AILab() {
  const [activeTab, setActiveTab] = useState<'nlp' | 'cairo'>('nlp');

  // Sentiment State
  const [customText, setCustomText] = useState(PRESET_PROMPTS[0].text);
  const [isInferencing, setIsInferencing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(() => analyzeSentimentSimulation(PRESET_PROMPTS[0].text));

  // Cairo Graph State
  const [startNode, setStartNode] = useState('october');
  const [targetNode, setTargetNode] = useState('tagamoa');
  const [algorithm, setAlgorithm] = useState<'astar' | 'dijkstra' | 'dp'>('astar');
  const [trafficLevel, setTrafficLevel] = useState<'normal' | 'peak'>('peak');
  const [isRouting, setIsRouting] = useState(false);
  const [routeResult, setRouteResult] = useState<{
    path: string[];
    travelTimeMin: number;
    exploredNodes: number;
    latencyMs: number;
  }>({
    path: ['october', 'tahrir', 'nasr_city', 'tagamoa'],
    travelTimeMin: 42,
    exploredNodes: 4,
    latencyMs: 38,
  });

  // Handle Sentiment Inference Run
  const handleRunInference = (textToRun = customText) => {
    setIsInferencing(true);
    setTimeout(() => {
      setAnalysisResult(analyzeSentimentSimulation(textToRun));
      setIsInferencing(false);
    }, 350);
  };

  // Handle Route Calculation
  const handleCalculateRoute = () => {
    setIsRouting(true);
    setTimeout(() => {
      let path: string[] = [];
      let travelTimeMin = 0;
      let exploredNodes = 0;
      let latencyMs = 0;

      const trafficMultiplier = trafficLevel === 'peak' ? 1.85 : 1.0;

      if (startNode === targetNode) {
        path = [startNode];
        travelTimeMin = 0;
        exploredNodes = 1;
        latencyMs = 4;
      } else if (startNode === 'october' && targetNode === 'tagamoa') {
        if (algorithm === 'astar') {
          path = ['october', 'tahrir', 'nasr_city', 'tagamoa'];
          travelTimeMin = Math.round(59 * trafficMultiplier);
          exploredNodes = 4;
          latencyMs = 38;
        } else if (algorithm === 'dijkstra') {
          path = ['october', 'giza', 'maadi', 'tagamoa'];
          travelTimeMin = Math.round(54 * trafficMultiplier);
          exploredNodes = 7;
          latencyMs = 82;
        } else {
          path = ['october', 'tahrir', 'heliopolis', 'tagamoa'];
          travelTimeMin = Math.round(64 * trafficMultiplier);
          exploredNodes = 6;
          latencyMs = 95;
        }
      } else {
        path = [startNode, 'tahrir', targetNode].filter((v, i, a) => a.indexOf(v) === i);
        travelTimeMin = Math.round(35 * trafficMultiplier);
        exploredNodes = algorithm === 'astar' ? 3 : 6;
        latencyMs = algorithm === 'astar' ? 42 : 89;
      }

      setRouteResult({ path, travelTimeMin, exploredNodes, latencyMs });
      setIsRouting(false);
    }, 400);
  };

  return (
    <section id="ai-lab" className="py-16 sm:py-24 px-4 sm:px-6 bg-surface relative overflow-hidden">
      {/* Background ambient decorative glow */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <SectionHeading index={4} kicker="Interactive Lab" title="Live Model & Systems Playground" />
          
          {/* Lab selector tabs */}
          <div className="inline-flex p-1 sm:p-1.5 rounded-xl bg-base border border-line max-w-full overflow-x-auto no-scrollbar shrink-0">
            <button
              onClick={() => setActiveTab('nlp')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-mono whitespace-nowrap transition-all ${
                activeTab === 'nlp'
                  ? 'bg-accent text-base font-semibold shadow-glow-sm'
                  : 'text-fg-secondary hover:text-fg'
              }`}
            >
              <FontAwesomeIcon icon={faWandMagicSparkles} className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>LoRA & Distillation Lab</span>
            </button>
            <button
              onClick={() => setActiveTab('cairo')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-mono whitespace-nowrap transition-all ${
                activeTab === 'cairo'
                  ? 'bg-accent text-base font-semibold shadow-glow-sm'
                  : 'text-fg-secondary hover:text-fg'
              }`}
            >
              <FontAwesomeIcon icon={faLocationArrow} className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Cairo Routing Visualizer</span>
            </button>
          </div>
        </div>

        {/* TAB 1: NLP & DISTILLATION PLAYGROUND */}
        {activeTab === 'nlp' && (
          <div className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
              {/* Left Column: Input & Token Heatmap */}
              <div className="lg:col-span-7 space-y-6">
                <Card className="p-4 sm:p-6 md:p-8 bg-elevated/70 border-line">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider">
                      <FontAwesomeIcon icon={faMicrochip} className="w-4 h-4 shrink-0" />
                      <span>Inference Input & Attention Pooling</span>
                    </div>
                    <span className="text-[11px] font-mono text-fg-muted">DistilGPT-2 + LoRA (PEFT)</span>
                  </div>

                  {/* Preset prompt buttons */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                    {PRESET_PROMPTS.map((preset, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setCustomText(preset.text);
                          handleRunInference(preset.text);
                        }}
                        className="text-[11px] sm:text-xs font-mono px-2.5 sm:px-3 py-1.5 rounded-lg bg-surface border border-line hover:border-accent/50 text-fg-secondary hover:text-accent transition-colors text-left"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  {/* Input area */}
                  <div className="space-y-3">
                    <textarea
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      rows={3}
                      placeholder="Type custom text to run through the student model..."
                      className="w-full bg-surface border border-line rounded-lg p-3 sm:p-3.5 text-xs sm:text-sm font-body text-fg placeholder:text-fg-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors resize-none"
                    />

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-fg-muted">
                        {customText.split(/\s+/).filter(Boolean).length} tokens
                      </span>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleRunInference()}
                        disabled={isInferencing || !customText.trim()}
                        isLoading={isInferencing}
                        className="font-mono text-xs"
                      >
                        <FontAwesomeIcon icon={faPlay} className="w-3 h-3 mr-1.5" />
                        Run Inference
                      </Button>
                    </div>
                  </div>

                  {/* Token Attention Heatmap */}
                  <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-line">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                      <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-fg flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faLayerGroup} className="w-3.5 h-3.5 text-accent" />
                        <span>Hybrid 80% Attention Pooling Heatmap</span>
                      </h4>
                      <span className="text-[10px] sm:text-[11px] font-mono text-accent/80">Higher saturation = higher weight</span>
                    </div>

                    <div className="p-3 sm:p-4 rounded-lg bg-surface/90 border border-line/60 flex flex-wrap gap-1.5 leading-relaxed min-h-[80px] sm:min-h-[90px] items-center">
                      {analysisResult.tokenWeights.map((item, idx) => {
                        const bgOpacity = Math.max(0.12, item.weight * 0.85);
                        const textColor = item.weight > 0.45 ? 'text-accent font-medium' : 'text-fg-secondary';
                        return (
                          <span
                            key={idx}
                            style={{
                              backgroundColor: `rgba(94, 234, 212, ${bgOpacity})`,
                            }}
                            className={`px-2 py-1 rounded text-xs transition-all duration-200 border border-accent/20 ${textColor}`}
                            title={`Token: "${item.word}" | Attention weight: ${(item.weight * 100).toFixed(1)}%`}
                          >
                            {item.word}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Column: Model Output & Confidence Distribution */}
              <div className="lg:col-span-5 space-y-6">
                <Card className="p-4 sm:p-6 md:p-8 bg-elevated/70 border-line h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider">
                        <FontAwesomeIcon icon={faChartLine} className="w-4 h-4" />
                        <span>Classification Output</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-accent/15 text-accent border border-accent/30">
                        {analysisResult.sentiment}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-mono text-fg-secondary mb-3">Fine-Grained SST-5 Distribution:</h4>

                    {/* Confidence Bars */}
                    <div className="space-y-2.5">
                      {analysisResult.confidences.map((item) => (
                        <div key={item.label} className="space-y-1">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-fg-secondary">{item.label}</span>
                            <span className="text-fg font-semibold">{item.score}%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-surface overflow-hidden border border-line/40">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.score}%` }}
                              transition={{ duration: 0.4, ease: 'easeOut' }}
                              className={`h-full rounded-full ${
                                item.label.includes('Positive')
                                  ? 'bg-accent'
                                  : item.label === 'Neutral'
                                  ? 'bg-teal-300/60'
                                  : 'bg-rose-400/80'
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Architecture comparison box */}
                  <div className="mt-6 sm:mt-8 pt-5 border-t border-line">
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <div className="p-2.5 sm:p-3 rounded-lg bg-surface border border-line text-center">
                        <span className="block text-[10px] sm:text-[11px] font-mono text-fg-muted">Teacher (GPT-2)</span>
                        <span className="block text-xs sm:text-sm font-mono font-bold text-fg mt-0.5">124.4M params</span>
                        <span className="block text-[10px] font-mono text-fg-muted mt-0.5">38ms Latency</span>
                      </div>
                      <div className="p-2.5 sm:p-3 rounded-lg bg-surface border border-accent/30 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-accent text-[9px] font-mono text-base font-bold px-1.5 py-0.2 rounded-bl">
                          -97.85%
                        </div>
                        <span className="block text-[10px] sm:text-[11px] font-mono text-accent">LoRA Student</span>
                        <span className="block text-xs sm:text-sm font-mono font-bold text-accent mt-0.5">2.68M trainable</span>
                        <span className="block text-[10px] font-mono text-accent/80 mt-0.5">14ms (2.7x speed)</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CAIRO ROUTE OPTIMIZATION VISUALIZER */}
        {activeTab === 'cairo' && (
          <div className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
              {/* Controls Column */}
              <div className="lg:col-span-4 space-y-4 sm:space-y-6">
                <Card className="p-4 sm:p-6 bg-elevated/70 border-line space-y-4 sm:space-y-5">
                  <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider">
                    <FontAwesomeIcon icon={faSliders} className="w-4 h-4" />
                    <span>Route Engine Parameters</span>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-fg-secondary block mb-1">Origin Node:</label>
                    <select
                      value={startNode}
                      onChange={(e) => setStartNode(e.target.value)}
                      className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-xs font-mono text-fg focus:border-accent focus:outline-none"
                    >
                      {CAIRO_NODES.map((n) => (
                        <option key={n.id} value={n.id}>
                          {n.label} ({n.zone})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-fg-secondary block mb-1">Destination Node:</label>
                    <select
                      value={targetNode}
                      onChange={(e) => setTargetNode(e.target.value)}
                      className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-xs font-mono text-fg focus:border-accent focus:outline-none"
                    >
                      {CAIRO_NODES.map((n) => (
                        <option key={n.id} value={n.id}>
                          {n.label} ({n.zone})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-fg-secondary block mb-1">Algorithm:</label>
                    <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
                      {[
                        { id: 'astar', label: 'A* Search' },
                        { id: 'dijkstra', label: 'Dijkstra' },
                        { id: 'dp', label: 'DP Budget' },
                      ].map((algo) => (
                        <button
                          key={algo.id}
                          onClick={() => setAlgorithm(algo.id as any)}
                          className={`py-1.5 text-[10px] sm:text-[11px] font-mono rounded border transition-all ${
                            algorithm === algo.id
                              ? 'bg-accent/20 border-accent text-accent font-semibold'
                              : 'bg-surface border-line text-fg-secondary hover:text-fg'
                          }`}
                        >
                          {algo.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-fg-secondary block mb-1">Traffic Density Model:</label>
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                      <button
                        onClick={() => setTrafficLevel('normal')}
                        className={`py-1.5 text-[11px] sm:text-xs font-mono rounded border transition-all ${
                          trafficLevel === 'normal'
                            ? 'bg-accent/20 border-accent text-accent font-semibold'
                            : 'bg-surface border-line text-fg-secondary'
                        }`}
                      >
                        Off-Peak
                      </button>
                      <button
                        onClick={() => setTrafficLevel('peak')}
                        className={`py-1.5 text-[11px] sm:text-xs font-mono rounded border transition-all ${
                          trafficLevel === 'peak'
                            ? 'bg-rose-500/20 border-rose-400 text-rose-300 font-semibold'
                            : 'bg-surface border-line text-fg-secondary'
                        }`}
                      >
                        Peak Congestion
                      </button>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleCalculateRoute}
                    disabled={isRouting}
                    isLoading={isRouting}
                    className="w-full font-mono text-xs mt-2"
                  >
                    <FontAwesomeIcon icon={faBolt} className="w-3.5 h-3.5 mr-1.5" />
                    Compute Optimal Route
                  </Button>
                </Card>

                {/* Routing Telemetry */}
                <Card className="p-4 sm:p-5 bg-elevated/70 border-line">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-fg-secondary mb-3 flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faChartLine} className="w-3.5 h-3.5 text-accent" />
                    <span>Engine Telemetry</span>
                  </h4>
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center font-mono">
                    <div className="p-2 sm:p-2.5 rounded bg-surface border border-line">
                      <span className="text-[9px] sm:text-[10px] text-fg-muted block truncate">Latency</span>
                      <span className="text-xs font-bold text-accent">{routeResult.latencyMs} ms</span>
                    </div>
                    <div className="p-2 sm:p-2.5 rounded bg-surface border border-line">
                      <span className="text-[9px] sm:text-[10px] text-fg-muted block truncate">Travel Time</span>
                      <span className="text-xs font-bold text-fg">{routeResult.travelTimeMin} min</span>
                    </div>
                    <div className="p-2 sm:p-2.5 rounded bg-surface border border-line">
                      <span className="text-[9px] sm:text-[10px] text-fg-muted block truncate">Explored</span>
                      <span className="text-xs font-bold text-teal-300">{routeResult.exploredNodes} / {CAIRO_NODES.length}</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Interactive SVG Network Map */}
              <div className="lg:col-span-8">
                <Card className="p-4 sm:p-6 bg-elevated/70 border-line relative overflow-hidden flex flex-col justify-between h-full min-h-[360px] sm:min-h-[420px]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider">
                      <FontAwesomeIcon icon={faLocationArrow} className="w-4 h-4" />
                      <span>Greater Cairo Road Network Graph</span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-mono text-fg-muted truncate">
                      Active Path: {routeResult.path.join(' → ')}
                    </span>
                  </div>

                  {/* SVG Canvas */}
                  <div className="relative w-full h-[260px] sm:h-[320px] md:h-[340px] bg-base/80 rounded-xl border border-line/70 p-2 sm:p-4 flex items-center justify-center">
                    <svg viewBox="0 0 500 360" className="w-full h-full">
                      {/* Grid background lines */}
                      <defs>
                        <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse">
                          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />

                      {/* Edges */}
                      {CAIRO_EDGES.map((edge, idx) => {
                        const fromNode = CAIRO_NODES.find((n) => n.id === edge.from)!;
                        const toNode = CAIRO_NODES.find((n) => n.id === edge.to)!;
                        const isPathEdge =
                          routeResult.path.includes(edge.from) &&
                          routeResult.path.includes(edge.to) &&
                          Math.abs(routeResult.path.indexOf(edge.from) - routeResult.path.indexOf(edge.to)) === 1;

                        return (
                          <g key={idx}>
                            <line
                              x1={fromNode.x}
                              y1={fromNode.y}
                              x2={toNode.x}
                              y2={toNode.y}
                              stroke={isPathEdge ? '#5EEAD4' : 'rgba(255, 255, 255, 0.15)'}
                              strokeWidth={isPathEdge ? 3 : 1.5}
                              strokeDasharray={isPathEdge ? 'none' : '4 4'}
                              className="transition-all duration-300"
                            />
                            <text
                              x={(fromNode.x + toNode.x) / 2}
                              y={(fromNode.y + toNode.y) / 2 - 4}
                              fill={isPathEdge ? '#5EEAD4' : '#6B7280'}
                              fontSize="9"
                              fontFamily="monospace"
                              textAnchor="middle"
                            >
                              {edge.baseDistanceKm}km
                            </text>
                          </g>
                        );
                      })}

                      {/* Nodes */}
                      {CAIRO_NODES.map((node) => {
                        const isSelectedStart = node.id === startNode;
                        const isSelectedTarget = node.id === targetNode;
                        const isInPath = routeResult.path.includes(node.id);

                        let fillColor = '#1A1A24';
                        let strokeColor = '#6B7280';
                        let nodeRadius = 9;

                        if (isSelectedStart) {
                          fillColor = '#34D399';
                          strokeColor = '#5EEAD4';
                          nodeRadius = 12;
                        } else if (isSelectedTarget) {
                          fillColor = '#F43F5E';
                          strokeColor = '#FB7185';
                          nodeRadius = 12;
                        } else if (isInPath) {
                          fillColor = '#5EEAD4';
                          strokeColor = '#5EEAD4';
                          nodeRadius = 10;
                        }

                        return (
                          <g key={node.id} className="cursor-pointer" onClick={() => setTargetNode(node.id)}>
                            {(isSelectedStart || isSelectedTarget) && (
                              <circle
                                cx={node.x}
                                y={node.y}
                                r={nodeRadius + 6}
                                fill="none"
                                stroke={strokeColor}
                                strokeWidth="1.5"
                                opacity="0.4"
                                className="animate-ping"
                              />
                            )}

                            <circle
                              cx={node.x}
                              y={node.y}
                              r={nodeRadius}
                              fill={fillColor}
                              stroke={strokeColor}
                              strokeWidth="2"
                              className="transition-all duration-300 shadow-glow"
                            />

                            <text
                              x={node.x}
                              y={node.y + 19}
                              fill={isInPath ? '#F4F4F6' : '#9CA3AF'}
                              fontSize="10"
                              fontWeight={isInPath ? 'bold' : 'normal'}
                              fontFamily="monospace"
                              textAnchor="middle"
                            >
                              {node.label}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs font-mono text-fg-secondary pt-3 border-t border-line">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Origin
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" /> Destination
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-accent inline-block" /> Route
                      </span>
                    </div>
                    <span className="text-accent/90">Tap any node to set destination</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
