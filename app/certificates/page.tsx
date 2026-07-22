// @ts-nocheck
import React from 'react';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';
import { getCertificates } from '@/services/dataService';

export default function CertificatesPage() {
  const certificates = getCertificates();

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24 animate-in fade-in duration-700">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-space mb-4 flex items-center gap-4">
          <Award className="w-10 h-10 text-warning" /> Achievement Vault
        </h1>
        <p className="text-white/60 max-w-2xl text-lg">
          A curated collection of my professional qualifications, certifications, and technical achievements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => {
          const link = cert.credentialUrl || cert.verificationUrl || '#';

          return (
            <div key={cert.id} className="bg-[#0B1120] border border-white/10 rounded-2xl p-6 hover:bg-white/5 transition-all flex flex-col shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-success" />
                  <span className="text-xs font-mono text-white/50 uppercase tracking-wider">{cert.category || 'Professional'}</span>
                </div>
                <span className="text-xs font-mono text-white/40">{cert.date}</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
              <p className="text-white/60 text-sm mb-6">{cert.issuer}</p>

              {cert.credentialId && (
                <div className="mb-4 text-xs font-mono text-white/50 bg-black/20 p-2 rounded border border-white/5">
                  ID: {cert.credentialId}
                </div>
              )}

              <div className="mt-auto pt-4 border-t border-white/10">
                <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-accent hover:text-white transition-colors">
                  Verify Credential <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}