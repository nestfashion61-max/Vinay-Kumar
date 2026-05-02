/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  TrendingUp, 
  BookOpen, 
  DollarSign, 
  Youtube, 
  Laptop, 
  CheckCircle2,
  ChevronRight,
  Loader2,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { chat } from './services/gemini';

interface Message {
  role: 'user' | 'model';
  content: string;
}

const CATEGORIES = [
  { id: 'blogging', title: 'Blogging', icon: <BookOpen className="w-5 h-5" />, description: 'Start a free blog using Blogger' },
  { id: 'affiliate', title: 'Affiliate Marketing', icon: <TrendingUp className="w-5 h-5" />, description: 'Promote products and earn commission' },
  { id: 'shorts', title: 'YouTube Shorts', icon: <Youtube className="w-5 h-5" />, description: 'Create viral short videos' },
  { id: 'freelancing', title: 'Freelancing', icon: <Laptop className="w-5 h-5" />, description: 'Sell your skills online' },
];

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsChatOpen(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));

    const response = await chat(text, history);
    
    if (response) {
      setMessages(prev => [...prev, { role: 'model', content: response }]);
    }
    setIsLoading(false);
  };

  const handleCategoryClick = (category: string) => {
    const prompt = `Tell me more about how to start with ${category}.`;
    handleSend(prompt);
  };

  return (
    <div className="min-h-screen bg-bg font-sans text-text-main selection:bg-accent/20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border-warm px-6 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="bg-accent p-2 rounded-xl">
              <TrendingUp className="text-white w-6 h-6" />
            </div>
            <span className="font-serif italic font-bold text-2xl tracking-tight text-accent">Unlocked Earnings</span>
          </div>
          <a 
            href="https://unlockedearnings.blogspot.com/?m=1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold text-text-light hover:text-accent transition-colors"
          >
            Visit Blog <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-16 pb-32">
        <section className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-white border border-border-warm px-4 py-1 rounded-full mb-6"
          >
            <span className="text-xs font-bold text-text-light uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-accent" /> Assistant Ready
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-text-main mb-8 leading-tight"
          >
            Start Your Journey to <span className="text-accent">Online Freedom</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-light max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Practical, step-by-step guidance for students to master real-world skills and build sustainable income. Honest advice, zero fluff.
          </motion.p>
        </section>

        {/* Quick Start Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => handleCategoryClick(cat.title)}
              className="bg-white p-8 rounded-2xl border border-border-warm shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02)] hover:shadow-xl hover:border-accent/30 transition-all cursor-pointer group"
            >
              <div className="bg-sidebar w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-accent group-hover:bg-accent group-hover:text-white transition-all">
                {cat.icon}
              </div>
              <h3 className="font-serif italic font-bold text-xl mb-3 text-text-main">{cat.title}</h3>
              <p className="text-sm text-text-light mb-6 leading-relaxed">{cat.description}</p>
              <div className="flex items-center text-xs font-bold text-accent uppercase tracking-wider">
                Explore Method <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats / Proof Section */}
        <div className="bg-white rounded-[32px] p-10 lg:p-16 border border-border-warm shadow-[0_4px_20px_-1px_rgba(0,0,0,0.03)] flex flex-col lg:flex-row items-center gap-16 mb-20">
          <div className="flex-1">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-8 italic">Why Students Choose Us?</h2>
            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="bg-accent/10 text-accent p-3 rounded-2xl h-fit mt-1">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 leading-none">Vetted Earning Methods</h4>
                  <p className="text-sm text-text-light leading-relaxed">No scammy apps or fake promises. We only share methods we've personally tested.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="bg-accent/10 text-accent p-3 rounded-2xl h-fit mt-1">
                  <Laptop className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 leading-none">Simple Step-by-Step Plans</h4>
                  <p className="text-sm text-text-light leading-relaxed">Designed for total beginners. We break down complex skills into small, doable tasks.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="bg-accent/10 text-accent p-3 rounded-2xl h-fit mt-1">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 leading-none">Traffic Redirection</h4>
                  <p className="text-sm text-text-light leading-relaxed">Get the full roadmap on our blog, updated weekly with new case studies.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-sidebar w-full rounded-3xl p-10 border border-border-warm">
            <div className="flex items-center justify-between mb-10">
              <span className="text-xs font-bold text-text-light uppercase tracking-widest">Tutorial Status</span>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <div className="w-2 h-2 bg-accent/30 rounded-full"></div>
                <div className="w-2 h-2 bg-accent/30 rounded-full"></div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-4 bg-white/50 rounded-full w-3/4"></div>
              <div className="h-4 bg-white/50 rounded-full w-full"></div>
              <div className="bg-white border border-border-warm rounded-2xl p-6 shadow-sm">
                <p className="text-text-main font-medium text-center italic leading-relaxed">
                  "I just started my first blog on Blogger after following your guide. Can't wait to see the results!"
                </p>
                <div className="mt-4 flex flex-col items-center">
                  <div className="text-xs font-bold text-accent uppercase tracking-tighter">Verified Student</div>
                </div>
              </div>
              <div className="h-4 bg-white/50 rounded-full w-1/2"></div>
            </div>
          </div>
        </div>

        {/* CTA to Blog */}
        <section className="bg-accent rounded-[32px] p-16 text-center text-white overflow-hidden relative shadow-2xl shadow-accent/20">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <TrendingUp className="w-64 h-64" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 relative z-10 italic">Ready to Level Up?</h2>
          <p className="text-white/80 mb-10 relative z-10 max-w-xl mx-auto font-medium text-lg">
            Our private blog guides dive deep into the specific strategies that actually make money today.
          </p>
          <a
            href="https://unlockedearnings.blogspot.com/?m=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-accent px-10 py-5 rounded-full font-bold hover:bg-sidebar transition-all transform hover:scale-105 relative z-10 shadow-lg"
          >
            Explore Detailed Guides <ChevronRight className="w-5 h-5" />
          </a>
        </section>
      </main>

      {/* Floating Chat Interface */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[calc(100%-3rem)] md:w-[480px] max-h-[650px] h-[75vh] bg-white rounded-[32px] shadow-2xl border border-border-warm flex flex-col z-50 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-6 border-b border-border-warm flex items-center justify-between bg-sidebar text-text-main">
              <div className="flex items-center gap-4">
                <div className="bg-accent text-white p-2.5 rounded-2xl shadow-lg shadow-accent/20">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl italic">Earning Guide</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] text-text-light uppercase tracking-widest font-bold">Assistant Active</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="hover:bg-accent/10 p-2 rounded-full transition-colors text-text-light hover:text-accent"
              >
                <ChevronRight className="w-7 h-7 rotate-90" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-accent/20">
              {messages.length === 0 && (
                <div className="text-center py-16 px-8">
                  <div className="bg-sidebar w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-accent border border-border-warm shadow-inner">
                    <Sparkles className="w-10 h-10" />
                  </div>
                  <h4 className="font-serif font-bold text-2xl mb-3 italic">How can I help you today?</h4>
                  <p className="text-sm text-text-light leading-relaxed mb-6">Ask me about blogging, YouTube, or specific earning goals.</p>
                  <div className="bg-accent/5 rounded-2xl p-4 border border-accent/10">
                    <p className="text-sm text-accent italic font-medium">"How to start earning ₹5,000 from YouTube Shorts?"</p>
                  </div>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-[24px] p-5 ${
                    m.role === 'user' 
                      ? 'bg-accent text-white rounded-tr-none shadow-lg shadow-accent/20' 
                      : 'bg-sidebar text-text-main rounded-tl-none border border-border-warm'
                  }`}>
                    <div className={`markdown-content text-[15px] leading-relaxed ${m.role === 'user' ? 'text-white' : 'text-text-main'}`}>
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-sidebar rounded-2xl rounded-tl-none p-5 flex gap-3 items-center border border-border-warm">
                    <Loader2 className="w-5 h-5 animate-spin text-accent" />
                    <span className="text-sm text-text-light font-semibold">Generating your guide...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-6 border-t border-border-warm bg-bg">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Tell me your goal..."
                  className="w-full bg-white border border-border-warm rounded-2xl py-4 px-6 pr-14 text-[15px] text-text-main placeholder:text-text-light/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all shadow-sm"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent text-white p-2.5 rounded-xl hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 mt-4">
                <p className="text-[10px] text-text-light uppercase tracking-widest font-bold">
                  Community Focused • Practical Wisdom
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-8 right-8 bg-accent text-white w-20 h-20 rounded-full shadow-[0_8px_30px_rgb(143,162,143,0.4)] flex items-center justify-center z-50 hover:bg-accent/90 transition-all border-4 border-white/20"
      >
        <MessageSquare className="w-9 h-9" />
        {!isChatOpen && messages.length === 0 && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-accent border-2 border-white w-5 h-5 rounded-full shadow-md"
          />
        )}
      </motion.button>

      {/* Footer */}
      <footer className="bg-sidebar border-t border-border-warm py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="bg-accent p-1.5 rounded-lg">
              <TrendingUp className="text-white w-4 h-4" />
            </div>
            <span className="font-serif italic font-bold text-xl text-accent">Unlocked Earnings</span>
          </div>
          <p className="text-sm text-text-light font-medium italic">
            © 2026 Crafted with integrity for the ambitious student.
          </p>
          <div className="flex gap-8 text-sm font-bold text-text-light uppercase tracking-widest">
            <a href="https://unlockedearnings.blogspot.com/?m=1" className="hover:text-accent transition-colors">Guides</a>
            <a href="https://unlockedearnings.blogspot.com/?m=1" className="hover:text-accent transition-colors">Methods</a>
            <a href="https://unlockedearnings.blogspot.com/?m=1" className="hover:text-accent transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
