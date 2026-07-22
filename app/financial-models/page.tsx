import React from 'react';
import { FileSpreadsheet, Download, Search, LayoutGrid } from 'lucide-react';

const models = [
  { title: 'DCF Valuation Model', desc: 'Detailed 5-year discounted cash flow template with sensitivity analysis.', type: 'Excel' },
  { title: 'Corporate Budget Model', desc: 'Zero-based budgeting template with departmental roll-ups.', type: 'Excel' },
  { title: 'Enterprise FP&A Model', desc: 'Full 3-statement forecasting and variance tracking.', type: 'Power BI' },
  { title: 'LBO Model', desc: 'Leveraged buyout analysis for M&A scenarios.', type: 'Excel' },
  { title: 'Sales Variance Tracker', desc: 'Price-volume-mix variance analysis template.', type: 'Power BI' },
  { title: 'Executive Dashboard', desc: 'High-level KPI tracking for C-suite presentations.', type: 'Power BI' }
];

export default function FinancialModels() {
  return (
    <div className="w-full p-6 lg:p-10 pb-24">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black font-space text-white mb-2">Financial Models Vault</h1>
          <p className="text-white/50 font-mono text-sm">Downloadable enterprise-grade analysis templates.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-[#0B1120] border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-2 w-64 shadow-inner"><Search className="w-4 h-4 text-white/40"/><input type="text" placeholder="Search templates..." className="bg-transparent outline-none text-sm w-full"/></div>
          <button className="bg-[#0B1120] border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-2 hover:bg-white/5 transition-colors font-mono text-sm"><LayoutGrid className="w-4 h-4 text-accent"/> Categories</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {models.map(m => (
          <div key={m.title} className="bg-[#0B1120] border border-white/10 rounded-2xl p-6 hover:border-accent/50 transition-all shadow-xl flex flex-col group">
            <div className="w-12 h-12 rounded-xl bg-[#050816] border border-white/10 flex items-center justify-center mb-5"><FileSpreadsheet className={`w-6 h-6 ${m.type === 'Excel' ? 'text-success' : 'text-warning'}`}/></div>
            <h2 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors">{m.title}</h2>
            <p className="text-sm text-white/60 mb-8 flex-1 leading-relaxed">{m.desc}</p>
            <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/10">
              <span className={`text-[10px] font-mono px-3 py-1 rounded-full border ${m.type === 'Excel' ? 'bg-success/10 text-success border-success/20' : 'bg-warning/10 text-warning border-warning/20'}`}>{m.type} FORMAT</span>
              <button className="flex items-center gap-2 text-xs font-bold bg-white/5 hover:bg-accent hover:text-black px-4 py-2 rounded-lg transition-colors"><Download className="w-4 h-4"/> Fetch</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}