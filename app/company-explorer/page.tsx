"use client";
import React, { useState, useEffect } from 'react';
import { Building2, Search, Filter, ExternalLink, Globe } from 'lucide-react';

export default function CompanyExplorer() {
  // Base data with real external links for Target Analysis
  const [companies, setCompanies] = useState([
    { id: 'adnoc', name: 'ADNOC', sector: 'Oil & Gas', hq: 'Abu Dhabi, UAE', revenue: 100.5, emp: '50k+', url: 'https://adnoc.ae/en/investors', isPublic: false },
    { id: 'aramco', name: 'Saudi Aramco', sector: 'Oil & Gas', hq: 'Dhahran, KSA', revenue: 400.2, emp: '70k+', url: 'https://finance.yahoo.com/quote/2222.SR', isPublic: true },
    { id: 'enbd', name: 'Emirates NBD', sector: 'Banking', hq: 'Dubai, UAE', revenue: 10.8, emp: '30k+', url: 'https://finance.yahoo.com/quote/EMIRATESNBD.AE', isPublic: true },
    { id: 'mubadala', name: 'Mubadala', sector: 'Sovereign Wealth', hq: 'Abu Dhabi, UAE', revenue: 0, emp: '100k+', url: 'https://www.mubadala.com/en/investors', isPublic: false },
    { id: 'msft', name: 'Microsoft', sector: 'Technology', hq: 'Redmond, USA', revenue: 200.4, emp: '221k+', url: 'https://finance.yahoo.com/quote/MSFT', isPublic: true },
    { id: 'amzn', name: 'Amazon', sector: 'E-commerce', hq: 'Seattle, USA', revenue: 500.1, emp: '1.5M+', url: 'https://finance.yahoo.com/quote/AMZN', isPublic: true },
    { id: 'tsla', name: 'Tesla', sector: 'Automotive', hq: 'Austin, USA', revenue: 80.6, emp: '120k+', url: 'https://finance.yahoo.com/quote/TSLA', isPublic: true },
    { id: 'aapl', name: 'Apple', sector: 'Technology', hq: 'Cupertino, USA', revenue: 380.9, emp: '164k+', url: 'https://finance.yahoo.com/quote/AAPL', isPublic: true },
  ]);

  // Live Ticker Effect: Fluctuates the revenue slightly every 3 seconds to simulate live data
  useEffect(() => {
    const interval = setInterval(() => {
      setCompanies(prevCompanies => 
        prevCompanies.map(company => {
          if (company.revenue > 0) {
            // Add a tiny random fluctuation (-0.2 to +0.2)
            const fluctuation = (Math.random() * 0.4) - 0.2;
            return { ...company, revenue: Math.max(0, company.revenue + fluctuation) };
          }
          return company;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full text-white p-6 md:p-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-space mb-2">Company Explorer</h1>
          <p className="text-white/60 text-sm md:text-base">UAE & Global Enterprise Targets. Live screening.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input 
              type="text" 
              placeholder="Search companies..." 
              className="w-full bg-[#111827] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 bg-[#111827] border border-white/10 px-4 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors">
            <Filter className="w-4 h-4 text-accent" /> Filters
          </button>
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {companies.map((company) => (
          <div key={company.id} className="bg-[#111827] border border-white/5 hover:border-white/10 rounded-2xl p-6 flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            
            {/* Card Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Live</span>
              </div>
            </div>

            {/* Company Info */}
            <div className="mb-6">
              <h3 className="text-xl font-bold font-space mb-1">{company.name}</h3>
              <p className="text-sm text-white/50">{company.sector}</p>
            </div>

            {/* Metrics */}
            <div className="space-y-3 mb-8 flex-1">
              <div className="flex justify-between text-sm">
                <span className="text-white/40">HQ</span>
                <span className="text-right">{company.hq}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Revenue</span>
                <span className="text-emerald-400 font-mono font-bold">
                  {company.revenue > 0 ? `$${company.revenue.toFixed(1)}B+` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Employees</span>
                <span>{company.emp}</span>
              </div>
            </div>

            {/* Action Button - NOW WORKING */}
            <a 
              href={company.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-[#0B1120] hover:bg-accent hover:text-black border border-white/10 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 group"
            >
              Target Analysis <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}