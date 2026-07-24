"use client";
import React, { useState } from 'react';
import { Search, LayoutGrid, FileSpreadsheet, Presentation, Mail, CheckCircle2 } from 'lucide-react';

export default function FinancialModels() {
  const [toast, setToast] = useState<string | null>(null);
  const email = "pa8213243@gmail.com"; 

  const models = [
    {
      id: 'dcf',
      title: 'DCF Valuation Model',
      desc: 'Detailed 5-year discounted cash flow template with sensitivity analysis and WACC calculation.',
      format: 'Excel FORMAT',
      icon: <FileSpreadsheet className="w-5 h-5 text-emerald-400" />,
      formatColor: 'text-emerald-400',
    },
    {
      id: 'budget',
      title: 'Corporate Budget Model',
      desc: 'Zero-based budgeting template with departmental roll-ups and variance tracking.',
      format: 'Excel FORMAT',
      icon: <FileSpreadsheet className="w-5 h-5 text-emerald-400" />,
      formatColor: 'text-emerald-400',
    },
    {
      id: 'fpa',
      title: 'Enterprise FP&A Model',
      desc: 'Full 3-statement forecasting (Income, Balance Sheet, Cash Flow) with scenario toggles.',
      format: 'Excel FORMAT',
      icon: <FileSpreadsheet className="w-5 h-5 text-emerald-400" />,
      formatColor: 'text-emerald-400',
    },
    {
      id: 'lbo',
      title: 'LBO Model',
      desc: 'Leveraged buyout analysis for M&A scenarios including debt schedule and IRR returns.',
      format: 'Excel FORMAT',
      icon: <FileSpreadsheet className="w-5 h-5 text-emerald-400" />,
      formatColor: 'text-emerald-400',
    },
    {
      id: 'sales',
      title: 'Sales Variance Tracker',
      desc: 'Price-volume-mix (PVM) variance analysis template for detailed revenue bridging.',
      format: 'Power BI FORMAT',
      icon: <Presentation className="w-5 h-5 text-yellow-400" />,
      formatColor: 'text-yellow-400',
    },
    {
      id: 'dash',
      title: 'Executive KPI Dashboard',
      desc: 'High-level automated KPI tracking for C-suite presentations and board meetings.',
      format: 'Power BI FORMAT',
      icon: <Presentation className="w-5 h-5 text-yellow-400" />,
      formatColor: 'text-yellow-400',
    }
  ];

  // Button Click Handler function
  const handleRequestClick = (title: string) => {
    // 1. Website par pop-up message dikhayega
    setToast(`Opening email client for ${title} request...`);
    
    // Message ko 4 second baad automatically gayab kar dega
    setTimeout(() => {
      setToast(null);
    }, 4000);

    // 2. Exact usi model ka copy version user ke email mein auto-type karega
    const subject = encodeURIComponent(`Request for ${title} Template`);
    const body = encodeURIComponent(`Hi Parvej,\n\nI was reviewing your portfolio and would love to request access to the ${title} template.\n\nThank you!`);
    
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="w-full h-full text-white p-6 md:p-8 animate-in fade-in duration-700 relative">
      
      {/* Toast Notification (Success Message) */}
      {toast && (
        <div className="fixed bottom-10 right-10 z-50 bg-[#0B1120] border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)] text-white px-6 py-4 rounded-xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <p className="text-sm font-semibold font-mono">{toast}</p>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-space mb-2">Financial Models Vault</h1>
          <p className="text-white/60 text-sm md:text-base">Premium enterprise-grade analysis templates available upon request.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input 
              type="text" 
              placeholder="Search templates..." 
              className="w-full bg-[#111827] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 bg-[#111827] border border-white/10 px-4 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors">
            <LayoutGrid className="w-4 h-4 text-accent" /> Categories
          </button>
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <div key={model.id} className="bg-[#111827] border border-white/5 hover:border-white/10 rounded-2xl p-6 flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
            
            {/* Icon */}
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              {model.icon}
            </div>
            
            {/* Content */}
            <div className="mb-6 flex-1">
              <h3 className="text-xl font-bold font-space mb-2 group-hover:text-accent transition-colors">{model.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{model.desc}</p>
            </div>

            {/* Footer with Dynamic Request Button */}
            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/5 ${model.formatColor}`}>
                {model.format}
              </span>
              
              <button 
                onClick={() => handleRequestClick(model.title)}
                className="flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-black bg-white/5 hover:bg-accent px-4 py-2 rounded-lg transition-all"
              >
                <Mail className="w-4 h-4" /> Request
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}