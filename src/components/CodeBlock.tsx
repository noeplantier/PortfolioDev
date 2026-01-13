import React from 'react';
import { motion } from 'framer-motion';

const CodeBlock = () => {
  const codeLines = [
    { text: 'const', color: 'text-purple-400' },
    { text: ' Plantiers ', color: 'text-blue-400' },
    { text: '=', color: 'text-white' },
    { text: ' {', color: 'text-white' },
    { text: '  mission:', color: 'text-green-400', indent: true },
    { text: ' "Scaling the future of digital ecosystems"', color: 'text-yellow-200', indent: true },
    { text: ',', color: 'text-white' },
    { text: '  vision:', color: 'text-green-400', indent: true },
    { text: ' "Bridging innovation with high-performance code"', color: 'text-yellow-200', indent: true },
    { text: ',', color: 'text-white' },
    { text: '  stack:', color: 'text-green-400', indent: true },
    { text: ' ["React", "Next.js", "TypeScript", "AI"]', color: 'text-blue-300', indent: true },
    { text: '};', color: 'text-white' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="relative group w-full max-w-2xl mx-auto mt-12 mb-8"
    >
      {/* Outer Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      
      {/* Editor Container */}
      <div className="relative bg-[#0d1117] rounded-xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Header / Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="text-xs text-white/40 font-mono">Plantiers.ts — Editor</div>
          <div className="w-12"></div> {/* Spacer */}
        </div>

        {/* Code Content */}
        <div className="p-6 font-mono text-sm sm:text-base leading-relaxed overflow-x-auto">
          <div className="flex flex-col">
            {codeLines.map((line, index) => (
              <div key={index} className="flex">
                <span className="w-8 text-white/20 select-none text-right mr-4">{index + 1}</span>
                <span className={`${line.color} ${line.indent ? 'ml-4' : ''} whitespace-pre`}>
                  {line.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Shiny Overlay Effect */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-30"></div>
      </div>
    </motion.div>
  );
};

export default CodeBlock;
