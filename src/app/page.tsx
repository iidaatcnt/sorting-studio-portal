'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  ExternalLink,
  Github,
  Search,
  Zap,
  Box,
  Layers,
  RefreshCw,
  Clock,
  Dices,
  Utensils,
  Skull,
  Waves,
  Hexagon,
  ArrowRightLeft,
  LayoutGrid,
  Info,
  ChevronRight,
  Sparkles,
  Construction,
  Moon,
  ChefHat,
  Shrub,
  Container
} from 'lucide-react';

// --- Types ---
interface Algorithm {
  id: string;
  name: string;
  japaneseName: string;
  category: 'Basic' | 'Fast' | 'Non-Comparison' | 'Special' | 'Joke';
  complexity: string;
  description: string;
  icon: React.ElementType;
  color: string;
  repo: string;
  tags: string[];
}

// --- Data ---
const ALGORITHMS: Algorithm[] = [
  {
    id: 'bubble',
    name: 'Bubble Sort',
    japaneseName: 'バブルソート',
    category: 'Basic',
    complexity: 'O(N²)',
    description: '隣り合う要素を比較して入れ替える、最も直感的な整列手法。',
    icon: RefreshCw,
    color: 'from-cyan-500 to-blue-500',
    repo: 'https://sorting-studio-bubble.vercel.app',
    tags: ['Stable', 'Swap']
  },
  {
    id: 'selection',
    name: 'Selection Sort',
    japaneseName: '選択ソート',
    category: 'Basic',
    complexity: 'O(N²)',
    description: '未整列の範囲から最小値を「選択」して先頭に移動させる手法。',
    icon: Target,
    color: 'from-rose-500 to-pink-500',
    repo: 'https://sorting-studio-selection.vercel.app',
    tags: ['Simple', 'Selection']
  },
  {
    id: 'insertion',
    name: 'Insertion Sort',
    japaneseName: '挿入ソート',
    category: 'Basic',
    complexity: 'O(N²)',
    description: '整列済みの列に対して、適切な位置に要素を「挿入」する手法。',
    icon: ArrowRightLeft,
    color: 'from-indigo-500 to-violet-500',
    repo: 'https://sorting-studio-insertion.vercel.app',
    tags: ['Online', 'Stable']
  },
  {
    id: 'binary-insertion',
    name: 'Binary Insertion Sort',
    japaneseName: '二分挿入ソート',
    category: 'Basic',
    complexity: 'O(N²)',
    description: '挿入位置の探索に「二分探索」を用い、比較回数を節約した進化形。',
    icon: Search,
    color: 'from-cyan-400 to-teal-500',
    repo: 'https://sorting-studio-binary-insertion.vercel.app',
    tags: ['Optimal', 'Search']
  },
  {
    id: 'quick',
    name: 'Quick Sort',
    japaneseName: 'クイックソート',
    category: 'Fast',
    complexity: 'O(N log N)',
    description: 'ピボットを基準に分割を繰り返す、実用上極めて高速なソート。',
    icon: Zap,
    color: 'from-emerald-500 to-teal-500',
    repo: 'https://sorting-studio-quick.vercel.app',
    tags: ['Divide & Conquer', 'Fast']
  },
  {
    id: 'merge',
    name: 'Merge Sort',
    japaneseName: 'マージソート',
    category: 'Fast',
    complexity: 'O(N log N)',
    description: '分割した塊を整列しながら「マージ（統合）」する安定した手法。',
    icon: Waves,
    color: 'from-violet-500 to-purple-600',
    repo: 'https://sorting-studio-merge.vercel.app',
    tags: ['Recursion', 'Stable']
  },
  {
    id: 'heap',
    name: 'Heap Sort',
    japaneseName: 'ヒープソート',
    category: 'Fast',
    complexity: 'O(N log N)',
    description: '「ヒープ構造」を構築し、最大値を効率よく取り出していく独創的な手法。',
    icon: Hexagon,
    color: 'from-amber-500 to-orange-600',
    repo: 'https://sorting-studio-heap.vercel.app',
    tags: ['Structure', 'Selection']
  },
  {
    id: 'shell',
    name: 'Shell Sort',
    japaneseName: 'シェルソート',
    category: 'Special',
    complexity: 'O(N¹.²⁵) ~',
    description: '一定の間隔でグループ分けしてソートする、挿入ソートの改良版。',
    icon: Layers,
    color: 'from-orange-500 to-red-600',
    repo: 'https://sorting-studio-shell.vercel.app',
    tags: ['Adaptive', 'Fast']
  },
  {
    id: 'radix',
    name: 'Radix Sort',
    japaneseName: '基数ソート',
    category: 'Non-Comparison',
    complexity: 'O(NK)',
    description: '数値を「桁（Digit）」ごとに分解し、下位桁から順に整列する非比較型。',
    icon: LayoutGrid,
    color: 'from-pink-500 to-rose-400',
    repo: 'https://sorting-studio-radix.vercel.app',
    tags: ['Fast', 'Linear']
  },
  {
    id: 'cocktail',
    name: 'Cocktail Sort',
    japaneseName: 'カクテルソート',
    category: 'Special',
    complexity: 'O(N²)',
    description: 'バブルソートを往復運動に拡張し、端への要素移動を高速化。',
    icon: ArrowRightLeft,
    color: 'from-lime-400 to-emerald-500',
    repo: 'https://sorting-studio-cocktail.vercel.app',
    tags: ['Bidirectional', 'Stable']
  },
  {
    id: 'bucket',
    name: 'Bucket Sort',
    japaneseName: 'バケツソート',
    category: 'Non-Comparison',
    complexity: 'O(N+K)',
    description: '数値を「バケツ（範囲）」に分配し、個別にソートして結合する手法。',
    icon: Container,
    color: 'from-indigo-400 to-blue-600',
    repo: 'https://sorting-studio-bucket.vercel.app',
    tags: ['Distribution', 'Fast']
  },
  {
    id: 'comb',
    name: 'Comb Sort',
    japaneseName: 'コムソート',
    category: 'Special',
    complexity: 'O(N log N)',
    description: '最初は大きな間隔で比較し、徐々に間隔を縮めていく高速バブルソート。',
    icon: Waves,
    color: 'from-blue-500 to-indigo-600',
    repo: 'https://sorting-studio-comb.vercel.app',
    tags: ['Shrink', 'Gap']
  },
  {
    id: 'gnome',
    name: 'Gnome Sort',
    japaneseName: 'ノームソート',
    category: 'Joke',
    complexity: 'O(N²)',
    description: '庭の小人が隣を見て「行ったり来たり」するような、ユニークな動きのソート。',
    icon: Shrub,
    color: 'from-emerald-600 to-green-700',
    repo: 'https://sorting-studio-gnome.vercel.app',
    tags: ['Stupid', 'Simple']
  },
  {
    id: 'sleep',
    name: 'Sleep Sort',
    japaneseName: 'スリープソート',
    category: 'Joke',
    complexity: 'O(max(N))',
    description: '各要素を自分の値の分だけ眠らせ、起きた順に並べる伝説のジョーク手法。',
    icon: Moon,
    color: 'from-indigo-600 to-slate-800',
    repo: 'https://sorting-studio-sleep.vercel.app',
    tags: ['Thread', 'Physical']
  },
  {
    id: 'bogo',
    name: 'Bogo Sort',
    japaneseName: 'ボゴソート',
    category: 'Joke',
    complexity: 'O(∞)',
    description: 'シャッフルを繰り返し、運良く整列するのを待つ究極の非効率手法。',
    icon: Dices,
    color: 'from-rose-600 to-red-600',
    repo: 'https://sorting-studio-bogo.vercel.app',
    tags: ['Chaos', 'Luck']
  },
  {
    id: 'pancake',
    name: 'Pancake Sort',
    japaneseName: 'パンケーキソート',
    category: 'Special',
    complexity: 'O(N) flips',
    description: 'パンケーキを「ひっくり返す」操作だけでデータを整列させるスタック手法。',
    icon: ChefHat,
    color: 'from-amber-600 to-orange-500',
    repo: 'https://sorting-studio-pancake.vercel.app',
    tags: ['Flip', 'Stack']
  },
  {
    id: 'stooge',
    name: 'Stooge Sort',
    japaneseName: 'ストゥージソート',
    category: 'Joke',
    complexity: 'O(N^2.71)',
    description: '範囲を3分割し、異常な回数の再帰を繰り返す「頑固」なソート手法。',
    icon: Construction,
    color: 'from-slate-700 to-zinc-900',
    repo: 'https://sorting-studio-stooge.vercel.app',
    tags: ['Overkill', 'Recursion']
  }
];



export default function Portal() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Basic', 'Fast', 'Non-Comparison', 'Special', 'Joke'];

  const filteredAlgos = ALGORITHMS.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.japaneseName.includes(search);
    const matchesFilter = filter === 'All' || a.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-cyan-500/30">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-cyan-500/[0.08] blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8"
          >
            <Sparkles size={14} className="text-cyan-400" />
            <span className="text-[10px] mono font-black uppercase tracking-[0.2em] text-cyan-600">interactive_learning_series_v2</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.9] text-slate-900"
          >
            Sorting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">Studio_World</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed font-medium"
          >
            アルゴリズムの多様性と美しさを探求する、最先端のソート学習コレクション。
            基本のバブルから究極のジョークまで、17種類の芸術的なビジュアライザーが集結しました。
          </motion.p>
        </div>
      </section>


      {/* Controls */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4" />
          <input
            type="text"
            placeholder="アルゴリズムを検索..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-14 pr-6 text-sm outline-none focus:border-cyan-500/30 shadow-sm transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 p-1.5 glass rounded-2xl overflow-x-auto max-w-full">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-xl text-[10px] mono font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredAlgos.map((algo, i) => {
              const Icon = algo.icon;
              return (
                <motion.div
                  layout
                  key={algo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  className="group"
                >
                  <a
                    href={algo.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="block h-full glass rounded-[2.5rem] p-8 glass-hover transition-all duration-500 group-hover:-translate-y-1 relative overflow-hidden"
                  >
                    {/* Background glow */}
                    <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${algo.color} opacity-0 group-hover:opacity-10 blur-[40px] transition-opacity duration-500`} />

                    <div className="flex justify-between items-start mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${algo.color} flex items-center justify-center shadow-lg shadow-current/10 relative z-10`}>
                        <Icon className="text-white w-7 h-7" />
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[9px] mono font-black text-slate-600 uppercase tracking-widest">{algo.category}</span>
                        <span className="text-[10px] mono font-bold text-cyan-600 mt-1">{algo.complexity}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <h2 className="text-xl font-black tracking-tight text-slate-900 group-hover:text-cyan-600 transition-colors">{algo.name}</h2>
                      <div className="text-[10px] mono text-slate-500 flex items-center gap-2">
                        <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">{algo.japaneseName}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 mb-8 font-medium">
                      {algo.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                      {algo.tags.map(tag => (
                        <span key={tag} className="text-[8px] mono font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="absolute bottom-8 right-8 text-slate-300 group-hover:text-cyan-600 transition-colors">
                      <ChevronRight size={18} />
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white/80 py-20 px-6 text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center grayscale opacity-50">
            <LayoutGrid size={24} />
          </div>
          <div className="space-y-2">
            <p className="text-[10px] mono font-black text-slate-600 uppercase tracking-[0.5em]">Sorting Studio Portal // Creative Edition</p>
            <div className="flex items-center gap-6 justify-center mt-6">
              <a href="https://github.com/iidaatcnt" className="text-slate-500 hover:text-white transition-colors"><Github size={20} /></a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Zap size={20} /></a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><InternalLink size={20} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function InternalLink(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

function Target(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}
