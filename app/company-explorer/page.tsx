import React from 'react';
import { Building2, Search, Filter, Globe } from 'lucide-react';

const companies = [
  { name: 'ADNOC', sector: 'Oil & Gas', hq: 'Abu Dhabi, UAE', rev: '$100B+', emp: '50k+', logo: 'bg-primary' },
  { name: 'Saudi Aramco', sector: 'Oil & Gas', hq: 'Dhahran, KSA', rev: '$400B+', emp: '70k+', logo: 'bg-success' },
  { name: 'Emirates NBD', sector: 'Banking', hq: 'Dubai, UAE', rev: '$10B+', emp: '30k+', logo: 'bg-warning' },
  { name: 'Mubadala', sector: 'Sovereign Wealth', hq: 'Abu Dhabi, UAE', rev: 'N/A', emp: '100k+', logo: 'bg-accent' },
  { name: 'Microsoft', sector: 'Technology', hq: 'Redmond, USA', rev: '$200B+', emp: '220k+', logo: 'bg-blue-500' },
  { name: 'Amazon', sector: 'E-commerce', hq: 'Seattle, USA', rev: '$500B+', emp: '1.5M+', logo: 'bg-orange-500' },
  { name: 'Tesla', sector: 'Automotive', hq: 'Austin, USA', rev: '$80B+', emp: '120k+', logo: 'bg-red-500' },
  { name: 'Apple', sector: 'Technology', hq: 'Cupertino, USA', rev: '$380B+', emp: '160k+', logo: 'bg-slate-300' }
];

export default function CompanyExplorer() {
  return (
    <div className="w-full p-6 lg:p-10 pb-24">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black font-space text-white mb-2">Company Explorer</h1>
          <p className="text-white/50 font-mono text-sm">UAE & Global Enterprise Targets. Live screening.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-[#0B1120] border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-2 w-64 shadow-inner"><Search className="w-4 h-4 text-white/40"/><input type="text" placeholder="Search companies..." className="bg-transparent outline-none text-sm w-full"/></div>
          <button className="bg-[#0B1120] border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-2 hover:bg-white/5 transition-colors font-mono text-sm"><Filter className="w-4 h-4 text-accent"/> Filters</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {companies.map(c => (
          <div key={c.name} className="bg-[#0B1120] border border-white/10 rounded-2xl p-6 hover:border-accent/50 transition-all shadow-xl group">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.logo} bg-opacity-20`}>
                <Building2 className={`w-6 h-6 ${c.logo.replace('bg-', 'text-')}`}/>
              </div>
              <span className="text-[10px] font-mono bg-white/5 px-2 py-1 rounded border border-white/10 flex items-center gap-1"><Globe className="w-3 h-3 text-accent"/> Live</span>
            </div>
            <h2 className="text-xl font-bold mb-1">{c.name}</h2>
            <p className="text-xs text-white/40 font-mono mb-6">{c.sector}</p>
            <div className="space-y-3 text-sm bg-[#050816] p-4 rounded-xl border border-white/5">
              <div className="flex justify-between"><span className="text-white/40 text-xs">HQ</span><span className="font-medium text-xs text-right">{c.hq}</span></div>
              <div className="flex justify-between"><span className="text-white/40 text-xs">Revenue</span><span className="font-medium text-xs text-success">{c.rev}</span></div>
              <div className="flex justify-between"><span className="text-white/40 text-xs">Employees</span><span className="font-medium text-xs">{c.emp}</span></div>
            </div>
            <button className="w-full mt-6 py-2.5 bg-accent/10 hover:bg-accent hover:text-black border border-accent/20 rounded-lg text-xs font-bold transition-colors">Target Analysis</button>
          </div>
        ))}
      </div>
    </div>
  );
}