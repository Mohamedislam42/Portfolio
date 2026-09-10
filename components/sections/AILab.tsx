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
  faPlay,
  faHospital,
  faBus,
  faTrainSubway,
  faTriangleExclamation,
  faClock,
  faRoute,
  faCar,
  faShieldHalved
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

// --- CAIRO GRAPH SIMULATION DATA & EXPANDED LAB ---
interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  zone: string;
  type: 'residential' | 'business' | 'transit' | 'medical' | 'airport' | 'industrial';
}

interface GraphEdge {
  from: string;
  to: string;
  baseDistanceKm: number;
  isMetro?: boolean;
  isBridge?: boolean;
}

const CAIRO_NODES: GraphNode[] = [
  { id: 'october', label: '6th of October', x: 70, y: 190, zone: 'Far West Hub', type: 'residential' },
  { id: 'giza', label: 'Giza / Pyramids', x: 165, y: 280, zone: 'West Gateway', type: 'transit' },
  { id: 'dokki', label: 'Dokki / Mohandessin', x: 240, y: 195, zone: 'West Central', type: 'business' },
  { id: 'tahrir', label: 'Downtown / Tahrir', x: 320, y: 210, zone: 'Central Hub', type: 'transit' },
  { id: 'ramses', label: 'Ramses Station', x: 350, y: 130, zone: 'Railway & Metro M1/M2', type: 'transit' },
  { id: 'hospital', label: 'Qasr El Aini Hospital', x: 295, y: 295, zone: 'Medical Hub', type: 'medical' },
  { id: 'heliopolis', label: 'Heliopolis', x: 490, y: 110, zone: 'Northeast Gateway', type: 'residential' },
  { id: 'airport', label: 'Cairo Intl Airport', x: 620, y: 70, zone: 'Transit Hub', type: 'airport' },
  { id: 'nasr_city', label: 'Nasr City', x: 505, y: 215, zone: 'East Commercial', type: 'business' },
  { id: 'tagamoa', label: 'New Cairo (Tagamoa)', x: 625, y: 275, zone: 'Far East Tech Hub', type: 'business' },
  { id: 'maadi', label: 'Maadi', x: 350, y: 350, zone: 'South Diplomatic', type: 'residential' },
  { id: 'helwan', label: 'Helwan Metro', x: 350, y: 405, zone: 'South Terminal', type: 'industrial' },
];

const CAIRO_EDGES: GraphEdge[] = [
  { from: 'october', to: 'giza', baseDistanceKm: 22 },
  { from: 'october', to: 'dokki', baseDistanceKm: 26 },
  { from: 'giza', to: 'dokki', baseDistanceKm: 6 },
  { from: 'giza', to: 'hospital', baseDistanceKm: 7 },
  { from: 'giza', to: 'maadi', baseDistanceKm: 15 },
  { from: 'dokki', to: 'tahrir', baseDistanceKm: 4 },
  { from: 'tahrir', to: 'ramses', baseDistanceKm: 3, isMetro: true },
  { from: 'tahrir', to: 'hospital', baseDistanceKm: 3 },
  { from: 'tahrir', to: 'nasr_city', baseDistanceKm: 12, isBridge: true },
  { from: 'ramses', to: 'heliopolis', baseDistanceKm: 10, isMetro: true },
  { from: 'ramses', to: 'nasr_city', baseDistanceKm: 9 },
  { from: 'heliopolis', to: 'airport', baseDistanceKm: 11 },
  { from: 'heliopolis', to: 'nasr_city', baseDistanceKm: 6 },
  { from: 'heliopolis', to: 'tagamoa', baseDistanceKm: 20 },
  { from: 'nasr_city', to: 'tagamoa', baseDistanceKm: 16 },
  { from: 'hospital', to: 'maadi', baseDistanceKm: 10 },
  { from: 'maadi', to: 'helwan', baseDistanceKm: 14, isMetro: true },
  { from: 'maadi', to: 'tagamoa', baseDistanceKm: 18 },
];

export function AILab() {
  const [activeTab, setActiveTab] = useState<'nlp' | 'cairo'>('nlp');

  // Sentiment State
  const [customText, setCustomText] = useState(PRESET_PROMPTS[0].text);
  const [isInferencing, setIsInferencing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(() => analyzeSentimentSimulation(PRESET_PROMPTS[0].text));

  // Cairo Graph & Simulation State
  const [cairoMode, setCairoMode] = useState<'standard' | 'emergency' | 'optimizer'>('standard');
  const [startNode, setStartNode] = useState('october');
  const [targetNode, setTargetNode] = useState('tagamoa');
  const [algorithm, setAlgorithm] = useState<'astar' | 'dijkstra' | 'adaptive'>('astar');
  const [trafficTimeSlot, setTrafficTimeSlot] = useState<'morning' | 'evening' | 'offpeak'>('morning');
  const [isBridgeClosed, setIsBridgeClosed] = useState(false);
  const [isRouting, setIsRouting] = useState(false);

  // Dynamic Route Solver
  const calculateRouteData = React.useCallback((
    start: string, 
    target: string, 
    algo: 'astar' | 'dijkstra' | 'adaptive', 
    timeSlot: 'morning' | 'evening' | 'offpeak',
    bridgeBlocked: boolean,
    mode: 'standard' | 'emergency' | 'optimizer'
  ) => {
    let trafficMultiplier = timeSlot === 'morning' ? 1.85 : timeSlot === 'evening' ? 1.7 : 1.0;
    if (mode === 'emergency') trafficMultiplier = 1.15; // Emergency vehicles bypass severe traffic

    if (start === target) {
      return { 
        path: [start], 
        travelTimeMin: 0, 
        distanceKm: 0,
        exploredNodes: 1, 
        latencyMs: 2,
        recommendedTransit: 'Walking / Local',
        fareEgp: 0,
        transitLine: 'None'
      };
    }

    // Adjacency graph
    const adj: Record<string, { to: string; dist: number; isBridge?: boolean; isMetro?: boolean }[]> = {};
    for (const node of CAIRO_NODES) adj[node.id] = [];
    for (const edge of CAIRO_EDGES) {
      if (bridgeBlocked && edge.isBridge) continue; // Blocked edge
      adj[edge.from]?.push({ to: edge.to, dist: edge.baseDistanceKm, isBridge: edge.isBridge, isMetro: edge.isMetro });
      adj[edge.to]?.push({ to: edge.from, dist: edge.baseDistanceKm, isBridge: edge.isBridge, isMetro: edge.isMetro });
    }

    const distances: Record<string, number> = {};
    const previous: Record<string, string> = {};
    const visited = new Set<string>();
    const pq: { node: string; priority: number; dist: number }[] = [];

    for (const node of CAIRO_NODES) distances[node.id] = Infinity;
    distances[start] = 0;

    const targetNodeObj = CAIRO_NODES.find(n => n.id === target);

    const heuristic = (nodeId: string) => {
      if (algo !== 'astar' || !targetNodeObj) return 0;
      const n = CAIRO_NODES.find(x => x.id === nodeId);
      if (!n) return 0;
      const dx = (n.x - targetNodeObj.x) * 0.08;
      const dy = (n.y - targetNodeObj.y) * 0.08;
      return Math.sqrt(dx * dx + dy * dy);
    };

    pq.push({ node: start, priority: heuristic(start), dist: 0 });
    let exploredCount = 0;

    while (pq.length > 0) {
      pq.sort((a, b) => a.priority - b.priority);
      const { node: curr, dist: currentDist } = pq.shift()!;

      if (visited.has(curr)) continue;
      visited.add(curr);
      exploredCount++;

      if (curr === target) break;

      const neighbors = adj[curr] || [];
      for (const neighbor of neighbors) {
        if (visited.has(neighbor.to)) continue;

        let edgeWeight = neighbor.dist * trafficMultiplier;
        if (algo === 'adaptive' && (curr === 'tahrir' || neighbor.to === 'tahrir')) {
          edgeWeight *= 1.25; // Central congestion weighting
        }
        if (mode === 'emergency' && neighbor.to === 'hospital') {
          edgeWeight *= 0.8; // Hospital corridor green wave
        }

        const newDist = currentDist + edgeWeight;
        if (newDist < (distances[neighbor.to] ?? Infinity)) {
          distances[neighbor.to] = newDist;
          previous[neighbor.to] = curr;
          const priority = newDist + heuristic(neighbor.to);
          pq.push({ node: neighbor.to, priority, dist: newDist });
        }
      }
    }

    const path: string[] = [];
    let curr: string | undefined = target;
    while (curr) {
      path.unshift(curr);
      curr = previous[curr];
    }

    if (path[0] !== start) {
      path.length = 0;
      path.push(start, target);
    }

    // Calculate real km distance
    let totalKm = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const edge = CAIRO_EDGES.find(
        e => (e.from === path[i] && e.to === path[i+1]) || (e.from === path[i+1] && e.to === path[i])
      );
      totalKm += edge ? edge.baseDistanceKm : 12;
    }

    const travelTimeMin = Math.round(totalKm * (mode === 'emergency' ? 1.05 : trafficMultiplier * 1.3));
    const latencyMs = algo === 'astar' ? 34 : algo === 'dijkstra' ? 76 : 89;

    // Transit recommendations
    const hasMetro = path.includes('tahrir') && (path.includes('ramses') || path.includes('maadi') || path.includes('helwan'));
    const recommendedTransit = mode === 'emergency' 
      ? 'EMS Priority Ambulance' 
      : hasMetro 
      ? 'Metro Line M1 / M2' 
      : totalKm > 25 
      ? 'Express Bus B1 + Mehwar' 
      : 'Standard Taxi / Transit';

    const fareEgp = mode === 'emergency' ? 0 : hasMetro ? 8 : totalKm > 25 ? 15 : 65;
    const transitLine = hasMetro ? 'Metro Line M1 / M2' : totalKm > 25 ? 'Bus Line B1' : 'Ring Road Corridor';

    return {
      path,
      travelTimeMin,
      distanceKm: totalKm,
      exploredNodes: Math.min(exploredCount, CAIRO_NODES.length),
      latencyMs,
      recommendedTransit,
      fareEgp,
      transitLine
    };
  }, []);

  const [routeResult, setRouteResult] = useState(() => 
    calculateRouteData('october', 'tagamoa', 'astar', 'morning', false, 'standard')
  );

  // Recalculate route when inputs change
  React.useEffect(() => {
    setRouteResult(calculateRouteData(startNode, targetNode, algorithm, trafficTimeSlot, isBridgeClosed, cairoMode));
  }, [startNode, targetNode, algorithm, trafficTimeSlot, isBridgeClosed, cairoMode, calculateRouteData]);

  // Handle Sentiment Inference Run
  const handleRunInference = (textToRun = customText) => {
    setIsInferencing(true);
    setTimeout(() => {
      setAnalysisResult(analyzeSentimentSimulation(textToRun));
      setIsInferencing(false);
    }, 200);
  };

  // Handle Route Calculation manual button
  const handleCalculateRoute = () => {
    setIsRouting(true);
    setTimeout(() => {
      setRouteResult(calculateRouteData(startNode, targetNode, algorithm, trafficTimeSlot, isBridgeClosed, cairoMode));
      setIsRouting(false);
    }, 120);
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

                    <div className="p-3.5 sm:p-4 rounded-xl bg-base/60 border border-line/80 flex flex-wrap gap-2 leading-relaxed min-h-[80px] sm:min-h-[90px] items-center">
                      {analysisResult.tokenWeights.map((item, idx) => {
                        const isHigh = item.weight > 0.6;
                        const isMed = item.weight > 0.35;
                        const bgAlpha = Math.min(0.22, Math.max(0.04, item.weight * 0.22));
                        const borderAlpha = Math.min(0.55, Math.max(0.15, item.weight * 0.55));
                        
                        return (
                          <span
                            key={idx}
                            style={{
                              backgroundColor: `rgba(94, 234, 212, ${bgAlpha})`,
                              borderColor: `rgba(94, 234, 212, ${borderAlpha})`,
                            }}
                            className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-200 border ${
                              isHigh 
                                ? 'text-accent font-semibold shadow-glow-sm' 
                                : isMed 
                                ? 'text-teal-200 font-medium' 
                                : 'text-fg-secondary/80'
                            }`}
                            title={`Token: "${item.word}" | Attention weight: ${(item.weight * 100).toFixed(1)}%`}
                          >
                            <span>{item.word}</span>
                            {isHigh && (
                              <span className="text-[9px] text-accent/70 font-normal ml-1">
                                {(item.weight * 100).toFixed(0)}%
                              </span>
                            )}
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
                      <div className="p-2.5 sm:p-3 rounded-lg bg-surface border border-accent/30 text-center">
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

        {/* TAB 2: CAIRO ROUTE OPTIMIZATION & TRANSIT VISUALIZER */}
        {activeTab === 'cairo' && (
          <div className="space-y-6 sm:space-y-8">
            {/* Mode Switcher Banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl bg-elevated/80 border border-line">
              <div className="flex items-center gap-2 text-xs font-mono text-fg">
                <span className="text-accent uppercase tracking-wider font-semibold">Simulation Mode:</span>
              </div>

              <div className="inline-flex p-1 rounded-lg bg-surface border border-line gap-1">
                <button
                  onClick={() => {
                    setCairoMode('standard');
                    if (targetNode === 'hospital') setTargetNode('tagamoa');
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-1.5 ${
                    cairoMode === 'standard'
                      ? 'bg-accent text-base font-semibold shadow-glow-sm'
                      : 'text-fg-secondary hover:text-fg'
                  }`}
                >
                  <FontAwesomeIcon icon={faRoute} className="w-3 h-3" />
                  <span>A* vs Dijkstra Routing</span>
                </button>

                <button
                  onClick={() => {
                    setCairoMode('emergency');
                    setTargetNode('hospital');
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-1.5 ${
                    cairoMode === 'emergency'
                      ? 'bg-rose-500 text-white font-semibold shadow-glow-sm'
                      : 'text-fg-secondary hover:text-fg'
                  }`}
                >
                  <FontAwesomeIcon icon={faHospital} className="w-3 h-3 text-rose-400" />
                  <span>EMS Hospital Dispatch</span>
                </button>

                <button
                  onClick={() => setCairoMode('optimizer')}
                  className={`px-3 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-1.5 ${
                    cairoMode === 'optimizer'
                      ? 'bg-accent text-base font-semibold shadow-glow-sm'
                      : 'text-fg-secondary hover:text-fg'
                  }`}
                >
                  <FontAwesomeIcon icon={faTrainSubway} className="w-3 h-3" />
                  <span>Transit & Metro Optimizer</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
              {/* Controls Column */}
              <div className="lg:col-span-4 space-y-4 sm:space-y-6">
                <Card className="p-4 sm:p-6 bg-elevated/70 border-line space-y-4 sm:space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider">
                      <FontAwesomeIcon icon={faSliders} className="w-4 h-4" />
                      <span>Route Engine Parameters</span>
                    </div>
                    {cairoMode === 'emergency' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
                        EMS Priority
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-mono text-fg-secondary block mb-1">Origin Station / Hub:</label>
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
                    <label className="text-xs font-mono text-fg-secondary block mb-1">Destination Target:</label>
                    <select
                      value={targetNode}
                      onChange={(e) => setTargetNode(e.target.value)}
                      className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-xs font-mono text-fg focus:border-accent focus:outline-none"
                    >
                      {CAIRO_NODES.map((n) => (
                        <option key={n.id} value={n.id}>
                          {n.label} {n.id === 'hospital' ? '🏥 [EMS Hub]' : `(${n.zone})`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-fg-secondary block mb-1">Algorithm Strategy:</label>
                    <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
                      {[
                        { id: 'astar', label: 'A* Search' },
                        { id: 'dijkstra', label: 'Dijkstra' },
                        { id: 'adaptive', label: 'ML Traffic' },
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
                    <label className="text-xs font-mono text-fg-secondary block mb-1">Cairo Congestion Model:</label>
                    <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
                      {[
                        { id: 'morning', label: 'Morning Peak' },
                        { id: 'evening', label: 'Evening Peak' },
                        { id: 'offpeak', label: 'Off-Peak' },
                      ].map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => setTrafficTimeSlot(slot.id as any)}
                          className={`py-1.5 text-[10px] sm:text-[11px] font-mono rounded border transition-all ${
                            trafficTimeSlot === slot.id
                              ? 'bg-accent/20 border-accent text-accent font-semibold'
                              : 'bg-surface border-line text-fg-secondary'
                          }`}
                        >
                          {slot.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Detour Simulation Toggle */}
                  <div className="pt-2 border-t border-line/60">
                    <button
                      type="button"
                      onClick={() => setIsBridgeClosed(!isBridgeClosed)}
                      className={`w-full p-2.5 rounded-lg border text-xs font-mono flex items-center justify-between transition-all ${
                        isBridgeClosed
                          ? 'bg-rose-500/15 border-rose-500/50 text-rose-300'
                          : 'bg-surface border-line text-fg-secondary hover:text-fg'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faTriangleExclamation} className={isBridgeClosed ? 'text-rose-400' : 'text-fg-muted'} />
                        <span>Simulate 6th Oct Bridge Blocked</span>
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${isBridgeClosed ? 'bg-rose-500 text-white' : 'bg-elevated text-fg-muted'}`}>
                        {isBridgeClosed ? 'BLOCKED' : 'OPEN'}
                      </span>
                    </button>
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

                {/* Routing Telemetry & Transit Mode Card */}
                <Card className="p-4 sm:p-5 bg-elevated/70 border-line space-y-4">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-fg-secondary mb-3 flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faChartLine} className="w-3.5 h-3.5 text-accent" />
                      <span>Engine Telemetry & Analytics</span>
                    </h4>
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center font-mono">
                      <div className="p-2 sm:p-2.5 rounded bg-surface border border-line">
                        <span className="text-[9px] sm:text-[10px] text-fg-muted block truncate">Latency</span>
                        <span className="text-xs font-bold text-accent">{routeResult.latencyMs} ms</span>
                      </div>
                      <div className="p-2 sm:p-2.5 rounded bg-surface border border-line">
                        <span className="text-[9px] sm:text-[10px] text-fg-muted block truncate">Distance</span>
                        <span className="text-xs font-bold text-fg">{routeResult.distanceKm} km</span>
                      </div>
                      <div className="p-2 sm:p-2.5 rounded bg-surface border border-line">
                        <span className="text-[9px] sm:text-[10px] text-fg-muted block truncate">Travel Time</span>
                        <span className="text-xs font-bold text-teal-300">{routeResult.travelTimeMin} min</span>
                      </div>
                    </div>
                  </div>

                  {/* Transit Recommendation */}
                  <div className="p-3 rounded-lg bg-surface border border-line text-xs font-mono space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-fg-muted">
                      <span>Transit Recommendation:</span>
                      <span className="text-accent font-semibold">{routeResult.recommendedTransit}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-fg-muted">
                      <span>Estimated Fare:</span>
                      <span className="text-fg font-bold">{routeResult.fareEgp > 0 ? `${routeResult.fareEgp} EGP` : '0 EGP (Priority)'}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-fg-muted">
                      <span>Nodes Explored:</span>
                      <span className="text-accent font-semibold">{routeResult.exploredNodes} / {CAIRO_NODES.length} stations</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Interactive SVG Network Map */}
              <div className="lg:col-span-8">
                <Card className="p-4 sm:p-6 bg-elevated/70 border-line relative overflow-hidden flex flex-col justify-between h-full min-h-[440px] sm:min-h-[500px]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider">
                      <FontAwesomeIcon icon={faLocationArrow} className="w-4 h-4" />
                      <span>Greater Cairo Road Network Graph</span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-mono text-fg-muted truncate max-w-sm">
                      Path: {routeResult.path.join(' → ')}
                    </span>
                  </div>

                  {/* SVG Canvas */}
                  <div className="relative w-full h-[320px] sm:h-[380px] md:h-[400px] bg-base/80 rounded-xl border border-line/70 p-2 sm:p-4 flex items-center justify-center">
                    <svg viewBox="0 0 700 450" className="w-full h-full">
                      {/* Grid background lines */}
                      <defs>
                        <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse">
                          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />

                      {/* Metro Line 1 & 2 Visual Guides (Dotted) */}
                      <path
                        d="M 350,405 L 350,350 L 295,295 L 320,210 L 350,130 L 490,110"
                        fill="none"
                        stroke="rgba(244, 63, 94, 0.25)"
                        strokeWidth="3"
                        strokeDasharray="6 6"
                      />

                      {/* Edges */}
                      {CAIRO_EDGES.map((edge, idx) => {
                        const fromNode = CAIRO_NODES.find((n) => n.id === edge.from)!;
                        const toNode = CAIRO_NODES.find((n) => n.id === edge.to)!;
                        const isBlocked = isBridgeClosed && edge.isBridge;
                        const isPathEdge =
                          !isBlocked &&
                          routeResult.path.includes(edge.from) &&
                          routeResult.path.includes(edge.to) &&
                          Math.abs(routeResult.path.indexOf(edge.from) - routeResult.path.indexOf(edge.to)) === 1;

                        const strokeColor = isBlocked
                          ? '#EF4444'
                          : isPathEdge
                          ? cairoMode === 'emergency'
                            ? '#F43F5E'
                            : '#5EEAD4'
                          : edge.isMetro
                          ? 'rgba(94, 234, 212, 0.25)'
                          : 'rgba(255, 255, 255, 0.15)';

                        return (
                          <g key={idx}>
                            <line
                              x1={fromNode.x}
                              y1={fromNode.y}
                              x2={toNode.x}
                              y2={toNode.y}
                              stroke={strokeColor}
                              strokeWidth={isPathEdge ? 3.5 : isBlocked ? 2 : 1.5}
                              strokeDasharray={isBlocked ? '4 4' : isPathEdge ? 'none' : '3 3'}
                              className="transition-colors duration-200"
                            />
                            <text
                              x={(fromNode.x + toNode.x) / 2}
                              y={(fromNode.y + toNode.y) / 2 - 4}
                              fill={isBlocked ? '#EF4444' : isPathEdge ? '#5EEAD4' : '#6B7280'}
                              fontSize="8.5"
                              fontFamily="monospace"
                              textAnchor="middle"
                            >
                              {isBlocked ? 'BLOCKED' : `${edge.baseDistanceKm}km`}
                            </text>
                          </g>
                        );
                      })}

                      {/* Nodes */}
                      {CAIRO_NODES.map((node) => {
                        const isSelectedStart = node.id === startNode;
                        const isSelectedTarget = node.id === targetNode;
                        const isInPath = routeResult.path.includes(node.id);
                        const isHospital = node.id === 'hospital';

                        let fillColor = '#1A1A24';
                        let strokeColor = isHospital ? '#FB7185' : '#6B7280';
                        let nodeRadius = isHospital ? 11 : 9;

                        if (isSelectedStart) {
                          fillColor = '#34D399';
                          strokeColor = '#5EEAD4';
                          nodeRadius = 12;
                        } else if (isSelectedTarget) {
                          fillColor = '#F43F5E';
                          strokeColor = '#FB7185';
                          nodeRadius = 12;
                        } else if (isInPath) {
                          fillColor = cairoMode === 'emergency' ? '#F43F5E' : '#5EEAD4';
                          strokeColor = cairoMode === 'emergency' ? '#FB7185' : '#5EEAD4';
                          nodeRadius = 10;
                        }

                        return (
                          <g
                            key={node.id}
                            className="cursor-pointer group/node"
                            onClick={() => {
                              if (node.id === startNode) return;
                              setTargetNode(node.id);
                            }}
                          >
                            {(isSelectedStart || isSelectedTarget) && (
                              <circle
                                cx={node.x}
                                cy={node.y}
                                r={nodeRadius + 7}
                                fill="none"
                                stroke={strokeColor}
                                strokeWidth="2"
                                opacity="0.75"
                                className="animate-pulse"
                              />
                            )}

                            <circle
                              cx={node.x}
                              cy={node.y}
                              r={nodeRadius}
                              fill={fillColor}
                              stroke={strokeColor}
                              strokeWidth="2.5"
                              className="transition-colors duration-200"
                            />

                            {/* Center Dot for precision aesthetic */}
                            <circle
                              cx={node.x}
                              cy={node.y}
                              r={3}
                              fill={isSelectedStart ? '#042F2E' : isSelectedTarget ? '#4C0519' : '#FFFFFF'}
                              opacity={isInPath ? 1 : 0.6}
                            />

                            {/* Node Station Label */}
                            <text
                              x={node.x}
                              y={node.y > 320 ? node.y + 18 : node.y - 14}
                              fill={isSelectedStart ? '#34D399' : isSelectedTarget ? '#FB7185' : isInPath ? '#5EEAD4' : '#D1D5DB'}
                              fontSize="10"
                              fontWeight={isInPath ? 'bold' : '500'}
                              fontFamily="monospace"
                              textAnchor="middle"
                              className="select-none"
                            >
                              {node.label}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs font-mono text-fg-secondary pt-3 border-t border-line">
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Origin
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" /> Destination
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-accent inline-block" /> Route
                      </span>
                      <span className="flex items-center gap-1 text-fg-muted">
                        <span className="w-3 h-0.5 border-t border-rose-400/50 border-dashed inline-block" /> Metro Line
                      </span>
                    </div>
                    <span className="text-accent/90">Click any hub to set destination</span>
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
